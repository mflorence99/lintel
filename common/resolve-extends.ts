import * as fs from 'fs';
import * as path from 'path';

import { meldConfigurations } from './meld-configurations';

const moduleLoader = require('module');
const parser = require('js-yaml');

/** Resolve 'extends' references */

export type NormalizedExtensionName = { configName?: string, moduleName: string };
export type RequireExtensionResult = { extension: any, modulePath: string };

export function normalizeExtensionName(extensionName: string): NormalizedExtensionName {
  if ((extensionName.startsWith('/') 
    || extensionName.startsWith('.')
    || extensionName.startsWith('eslint:')))
    return { moduleName: extensionName };
  else if (extensionName.startsWith('plugin:')) {
    const parts = extensionName.substring(7).split('/');
    let moduleName;
    if (parts[0].startsWith('@')) {
      moduleName = `${parts[0]}/eslint-plugin`;
      if (parts.length > 2)
        moduleName += `-${parts.slice(1, parts.length - 1).join('-')}`;
    } else moduleName = `eslint-plugin-${parts[0]}`;
    const configName = parts[parts.length - 1];
    return { configName, moduleName };
  } else {
    let moduleName;
    if (extensionName.startsWith('@')) {
      if (!extensionName.includes('/eslint-config'))
        moduleName = `${extensionName}/eslint-config`;
      else moduleName = extensionName;
    } else if (!extensionName.startsWith('eslint-config-'))
      moduleName = `eslint-config-${extensionName}`;
    else moduleName = extensionName;
    return { moduleName };
  }
}

export function requireExtension(extensionName: string, modulePath: string): RequireExtensionResult {
  let extension;
  // TODO: eslint:all gives:
  // Uncaught TypeError: Cannot read property 'deprecated' of undefined
  if (extensionName === 'eslint:all')
    extension = require('eslint/conf/eslint-all');
  else if (extensionName === 'eslint:recommended')
    extension = require('eslint/conf/eslint-recommended');
  else if (extensionName.startsWith('/'))
    extension = requireExtensionFromFile(extensionName);
  else if (extensionName.startsWith('.'))
    extension = requireExtensionFromFile(path.join(path.dirname(modulePath), extensionName));
  else {
    const { configName, moduleName } = normalizeExtensionName(extensionName);
    modulePath = moduleLoader.createRequire(modulePath).resolve(moduleName);
    // NOTE: only plugins have a config name
    extension = configName ? require(modulePath).configs[configName] : require(modulePath);
  }
  return { extension, modulePath };  
}

function requireExtensionFromFile(filePath: string): any {
  if (filePath.endsWith('.yml') || filePath.endsWith('.yaml'))
    return parser.load(fs.readFileSync(filePath), { encoding: 'utf8' });
  else return require(filePath);
}

export function resolveExtension(extensionName: string, modulePath: string): any {
  const outer = requireExtension(extensionName, modulePath);
  const resolver = ({ extension, modulePath }) => {
    if (extension?.extends) {
      if (!Array.isArray(extension.extends))
        extension.extends = [extension.extends];
      extension.extends.forEach(extensionName => {
        const inner = requireExtension(extensionName, modulePath);
        if (inner.extension?.extends)
          resolver(inner);
        meldConfigurations(outer.extension, inner.extension);
      });
    }
  };
  resolver(outer);
  delete outer.extension.extends;
  return outer.extension;
}

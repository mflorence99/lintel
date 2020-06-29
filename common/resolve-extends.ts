import * as path from 'path';

const moduleLoader = require('module');

/** Resolve 'extends' references */

export type NormalizedExtensionName = { configName: string, moduleName: string };
export type RequiredExtension = { extension: any, modulePath: string };

export function normalizeExtensionName(extensionName: string): NormalizedExtensionName {
  const parts = extensionName.substring(7).split('/');
  let moduleName;
  if (parts[0].startsWith('@')) {
    moduleName = `${parts[0]}/eslint-plugin`;
    if (parts.length > 2)
      moduleName += `-${parts.slice(1, parts.length - 1).join('-')}`;
  } else moduleName = `eslint-plugin-${parts[0]}`;
  const configName = parts[parts.length - 1];
  return { configName, moduleName };
}

export function requireExtension(extensionName: string, modulePath: string): RequiredExtension {
  let extension;
  if (extensionName.startsWith('/'))
    extension = require(extensionName);
  else if (extensionName.startsWith('.'))
    extension = require(path.join(path.dirname(modulePath), extensionName));
  else {
    const { configName, moduleName } = normalizeExtensionName(extensionName);
    modulePath = moduleLoader.createRequire(modulePath).resolve(moduleName);
    extension = require(modulePath).configs[configName];
  }
  return { extension, modulePath };  
}

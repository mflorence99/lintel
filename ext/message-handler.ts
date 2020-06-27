import * as eslint from 'eslint';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

const moduleLoader = require('module');

const debouncer: Record<string, any> = { };
const extensionCache: Record<string, any> = { };
const ruleCache: Record<string, any> = { };

export function messageHandlerFactory(currentPanel: vscode.WebviewPanel, 
  fileCache: Record<string, string>): (message: any) => any {

  const fileSaverFactory = (fileName: string, source: string): Function => {
    return (): void => {
      fileCache[fileName] = source;
      fs.writeFileSync(fileName, source);
    };
  };

  const extensionsGenerator = (fileName, extensions: string[]): void => {
    extensions
      .filter(extensionName => extensionName.startsWith('plugin:'))
      .forEach(extensionName => {
        // TODO: we need to consider extensions versioning
        let config = extensionCache[extensionName];
        if (!config) {
          try {
            const { configName, moduleName } = normalizeExtensionName(extensionName);
            const modulePath = moduleLoader.createRequire(fileName).resolve(moduleName);
            config = require(modulePath)?.configs[configName];
            extensionResolverFactory(config, modulePath)(config);
            extensionCache[extensionName] = config;
          } catch (error) { 
            // TODO: telemetry on error
            // BUT ... we may just be loading a partially typed name
            console.log(error.message);
          } 
        }
        if (config && Object.keys(config).length)
          currentPanel.webview.postMessage({ command: 'extensions', extensions: { [extensionName]: config } });
      });
  };

  const extensionResolverFactory = (config: any, modulePath: string): Function => {
    const extensionResolver = (base: any): void => {
      if (base.extends) {
        if (!Array.isArray(base.extends))
          base.extends = [base.extends];
        base.extends.forEach(extensionName => {
          let extension;
          if (extensionName.startsWith('/'))
            extension = require(extensionName);
          else extension = require(path.join(path.dirname(modulePath), extensionName));
          if (extension.extends)
            extensionResolver(extension);
          Object.keys(extension)
            .filter(key => key !== 'extends')
            .forEach(key => {
              // TODO: this is really ugly but I need it in 3 places:
              // - bin/eslint-extensions.js - to generate extensions for testing
              // - ext/message-handler.ts - to generate extension for real
              // - src/../state/config.ts - to meld extensions together for a config
              // BUT ... not sure how to refactor
              if (Array.isArray(extension[key]))
                config[key] = Array.from(new Set([...config[key] || [], ...extension[key]]));
              // NOTE rules are melded specially
              else if (key === 'rules') {
                config['rules'] = config.rules || {};
                Object.entries(extension.rules)
                  .map(([ruleName, rule]) => [ruleName, Array.isArray(rule) ? rule : [rule]] as any[])
                  .forEach(([ruleName, rule]) => {
                    if (!config.rules[ruleName] || (rule.length > 1))
                      config.rules[ruleName] = rule;
                    else config.rules[ruleName] = [rule[0], ...config.rules[ruleName].slice(1)];
                  });
              } else if (typeof extension[key] === 'object')
                config[key] = Object.assign(config[key] || { }, extension[key]);
              else config[key] = extension[key];
            });
        });
      }
    };
    return extensionResolver;
  };

  const rulesGenerator = (fileName: string, plugins: string[]): void => {
    plugins.forEach(pluginName => {
      // TODO: we need to consider rules versioning
      let rules = ruleCache[pluginName];
      if (!rules) {
        try {
          const cli = new eslint.CLIEngine({
            baseConfig: { plugins: [pluginName] },
            // NOTE: we're going to use the node_modules of the 
            // workspace itself, not of the extension!!
            cwd: path.dirname(fileName),
            useEslintrc: false
          });
          // NOTE: we already have all the ESLint rules,
          // which the CLI as coded above always returns
          rules = { };
          cli.getRules().forEach((value, key) => {
            if (key.includes('/'))
              rules[key] = value;
          });
          ruleCache[pluginName] = rules;
        } catch (error) {
          // TODO: telemetry on error
          // BUT ... we may just be loading a partially typed name
          console.log(error.message);
        }
      }
      if (rules && Object.keys(rules).length)
        currentPanel.webview.postMessage({ command: 'rules', rules: { [pluginName]: rules } });
    });
  };

  return (message): void => {

    const debounceTimeout = vscode.workspace.getConfiguration('lintel')?.get('updateDebounceTime', 2500); 
    const fileSaver = fileSaverFactory(message.fileName, message.source);

    switch (message.command) {

      case 'bootFail':
        vscode.window.showErrorMessage('Lintel could not start. Please try again.');
        break;

      case 'clipboardCopy':
        vscode.env.clipboard.writeText(message.text);
        break;

      case 'editFile':
        vscode.window.showTextDocument(vscode.Uri.parse(message.fileName), { viewColumn: vscode.ViewColumn.Beside });
        break;

      case 'getExtensions':
        extensionsGenerator(message.fileName, message.extensions);
        break;

      case 'getRules':
        rulesGenerator(message.fileName, message.plugins);
        break;

      case 'openFile':
        vscode.env.openExternal(vscode.Uri.parse(message.url));
        break;

      case 'parseFail':
        vscode.window.showErrorMessage(`Lintel could not parse ${message.fileName}`);
        break;

      case 'saveFile':
        // NOTE: we deliberately isolate the debounce logic right here
        // because for testing we don't want it anywhere in the client app
        clearTimeout(debouncer[message.fileName]);
        if (debounceTimeout)
          debouncer[message.fileName] = setTimeout(fileSaver, debounceTimeout);
        else fileSaver();
        break;

    }

  };
  
}

// NOTE: isolate normalization for better unit tests

export type NormalizedExtensionName = { configName: string, moduleName: string };

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

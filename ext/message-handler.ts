import { resolveExtension } from './common/resolve-extends';

import * as eslint from 'eslint';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

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
      .forEach(extensionName => {
        // TODO: we need to consider extensions versioning
        let config = extensionCache[extensionName];
        if (!config) {
          try {
            config = resolveExtension(extensionName, fileName);
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

      case 'deleteOverride':
        vscode.window.showWarningMessage(message.text, { modal: true }, 'OK')
          .then(response => {
            if (response === 'OK')
              currentPanel.webview.postMessage({ command: 'deleteOverride', override: message.override });
          });
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

import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

/** @see https://code.visualstudio.com/api/extension-guides/webview */

export function activate(context: vscode.ExtensionContext): void {

  let currentPanel: vscode.WebviewPanel | undefined = undefined;

  context.subscriptions.push(
    vscode.commands.registerCommand('lintel.start', () => {

      // what column to use?
      const columnToShowIn = vscode.window.activeTextEditor
        ? vscode.window.activeTextEditor.viewColumn
        : undefined;

      // only show one instance at a time
      if (currentPanel)
        currentPanel.reveal(columnToShowIn);
      else currentPanel = vscode.window.createWebviewPanel('lintel', 'Lintel', columnToShowIn as any, { enableScripts: true });

      // clean up when we're done
      currentPanel.onDidDispose(() => currentPanel = undefined, null, context.subscriptions);

      // munge the Angular app's index.html
      const appDistPath = path.join(context.extensionPath, 'dist/lintel');
      const appDistPathUri = vscode.Uri.file(appDistPath);
      const baseUri = currentPanel.webview.asWebviewUri(appDistPathUri);
      const indexPath = path.join(appDistPath, 'index.html');
      // NOTE: strip out all the VSCode emulation code and add in the ESLint rules, schema
      const indexHtml = fs.readFileSync(indexPath, { encoding: 'utf8' })
        // TODO: not yet
        // .replace('src='assets/eslintrc-files.js'', '')
        // .replace('src='assets/eslint-schema.js'', '')
        .replace('src="assets/vscode-scripts.js"', '')
        .replace('href="assets/vscode-styles.css"', '')
        .replace('<base href="/">', `<base href="${String(baseUri)}/">`)
        .replace('<body class="vscode-dark">', '<body>');

      // now we can write out the index.html
      currentPanel.webview.html = indexHtml;

    })

  );
}

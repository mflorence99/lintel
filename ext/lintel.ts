import { messageHandlerFactory } from './message-handler';
import { webviewContentFactory } from './webview-content';

import * as vscode from 'vscode';

const fileCache: Record<string, string> = {};

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
      if (currentPanel) currentPanel.reveal(columnToShowIn);
      else
        currentPanel = vscode.window.createWebviewPanel(
          'lintel',
          'Lintel',
          columnToShowIn as any,
          { enableScripts: true }
        );

      // eslint files to process
      const filePattern =
        '**/{package.json,.eslintrc,.eslintrc.cjs,.eslintrc.js,.eslintrc.json,.eslintrc.yaml}';

      // handlers
      const messageHandler = messageHandlerFactory(currentPanel, fileCache);
      const webviewContent = webviewContentFactory(
        context,
        currentPanel,
        fileCache,
        filePattern
      );

      // watch for changes on ESLint files
      const watcher = vscode.workspace.createFileSystemWatcher(filePattern);
      watcher.onDidChange(() => webviewContent());
      watcher.onDidCreate(() => webviewContent());
      watcher.onDidDelete(() => webviewContent());

      // clean up when we're done
      currentPanel.onDidDispose(
        () => {
          currentPanel = undefined;
          Object.keys(fileCache).forEach((key) => delete fileCache[key]);
          watcher.dispose();
        },
        null,
        context.subscriptions
      );

      // listen for messages from webview
      currentPanel.webview.onDidReceiveMessage(messageHandler);

      // fire 'em up!
      webviewContent();
    })
  );
}

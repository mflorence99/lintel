import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext): void {

  let currentPanel: vscode.WebviewPanel | undefined = undefined;

  context.subscriptions.push(
    vscode.commands.registerCommand('lintel.start', () => {

      const columnToShowIn = vscode.window.activeTextEditor
        ? vscode.window.activeTextEditor.viewColumn
        : undefined;    

      if (currentPanel) 
        currentPanel.reveal(columnToShowIn);        
      else currentPanel = vscode.window.createWebviewPanel('lintel', 'Lintel', columnToShowIn as any, { enableScripts: true });

      const appDistPath = path.join(context.extensionPath, 'dist/lintel');
      const appDistPathUri = vscode.Uri.file(appDistPath);
      const baseUri = currentPanel.webview.asWebviewUri(appDistPathUri);
      const indexPath = path.join(appDistPath, 'index.html');
      const indexHtml = fs.readFileSync(indexPath, { encoding: 'utf8' });
      currentPanel.webview.html = indexHtml.replace('<base href="/">', `<base href="${String(baseUri)}/">`);

      currentPanel.onDidDispose(() => currentPanel = undefined, null, context.subscriptions);

    })

  );
}

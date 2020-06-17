import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

/** @see https://code.visualstudio.com/api/extension-guides/webview */

export function activate(context: vscode.ExtensionContext): void {

  let currentPanel: vscode.WebviewPanel | undefined = undefined;

  const debouncer: Record<string, any> = { };

  const debounceTimeout = 2500;

  let priorFiles: Record<string, string> = { };

  const vscodeScripts = `
    <script>
      lintelIsReady = Promise.resolve();
      lintelSearchParams = "?freshStart=false";
      lintelVSCodeAPI = acquireVsCodeApi();
    </script>
  `;

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

      // base directory of "current" project
      const projectFolder = vscode.workspace.workspaceFolders[0];
      if (!projectFolder) {
        vscode.window.showErrorMessage('Lintel cannot analyze this project');
        return;
      }
      const projectPath = projectFolder.uri.fsPath;

      // eslint files to process
      const filePattern = new vscode.RelativePattern(projectFolder, '**/{package.json,.eslintrc,.eslintrc.cjs,.eslintrc.js,.eslintrc.json,.eslintrc.yaml}');

      // watch for changes on ESLint files
      const watcher = vscode.workspace.createFileSystemWatcher(filePattern);
      watcher.onDidChange(_ => getWebviewContent());
      watcher.onDidCreate(_ => getWebviewContent());
      watcher.onDidDelete(_ => getWebviewContent());

      // clean up when we're done
      currentPanel.onDidDispose(() => {
        currentPanel = undefined;
        watcher.dispose();
      }, null, context.subscriptions);

      // listen for messages from Lintel
      currentPanel.webview.onDidReceiveMessage(message => {
        let filePath;
        switch (message.command) {

          case 'bootFail':
            vscode.window.showErrorMessage('Lintel could not start. Please try again.');
            break;

          case 'editFile':
            // TODO: there must be an easier way ... it works, docs suck
            vscode.window.showTextDocument(vscode.Uri.parse(path.join(projectPath, message.fileName)), { viewColumn: vscode.ViewColumn.Beside });
            break;

          case 'openFile':
            vscode.env.openExternal(vscode.Uri.parse(message.url));
            break;

          case 'saveFile':
            // NOTE: we deliberately isolate the debounce logic right here
            // because for testing we don't want it anywhere in the client app
            clearTimeout(debouncer[message.fileName]);
            debouncer[message.fileName] = setTimeout(() => {
              priorFiles[message.fileName] = message.source;
              filePath = path.join(projectPath, message.fileName);
              fs.writeFileSync(filePath, message.source);
            }, debounceTimeout);
            break;
        }
      });

      // this closure does the hard work
      const getWebviewContent = (): void => {
        vscode.workspace.findFiles(filePattern, '**/node_modules/**')
          .then((uris: vscode.Uri[]) => {

            // read all the ESLint files
            const eslintFiles: Record<string, string> = uris.reduce((acc, uri) => {
              const fileName = uri.fsPath.substring(projectPath.length + 1);
              const source = fs.readFileSync(uri.fsPath, { encoding: 'utf8' });
              if (!fileName.endsWith('package.json') || source.includes('"eslintConfig":'))
                acc[fileName] = source;
              return acc;
            }, { });

            // have any of them changed from when we read them last time?
            // NOTE: this simple test works because they're strings
            const delta = (Object.keys(priorFiles).length !== Object.keys(eslintFiles).length) || !Object.keys(priorFiles).every(fileName => {
              return eslintFiles[fileName] === priorFiles[fileName];
            });

            if (delta) {
              priorFiles = eslintFiles;

              // convert the files into a script that Lintel can process
              const eslintScript = Object.keys(eslintFiles)
                .map(fileName => `"${fileName}": \`${eslintFiles[fileName]}\``)
                .join(',');

              // munge the Angular app's index.html
              const appDistPath = path.join(context.extensionPath, 'dist/lintel');
              const appDistPathUri = vscode.Uri.file(appDistPath);
              const baseUri = currentPanel.webview.asWebviewUri(appDistPathUri);
              const indexPath = path.join(appDistPath, 'index.html');
              // NOTE: strip out all the VSCode emulation code and add in the ESLint rules, schema
              const indexHtml = fs.readFileSync(indexPath, { encoding: 'utf8' })
                .replace('<script src="assets/eslint-files.js"></script>', `<script>eslintFiles = { ${eslintScript} };</script>`)
                // TODO: maybe one day we'll generate these on-the-fly
                // .replace('<script src="assets/eslint-rules.js"></script>', '')
                // .replace('s<script src="assets/eslint-schema.js"></script>', '')
                .replace('<script src="assets/vscode-scripts.js"></script>', vscodeScripts)
                .replace('<link href="assets/vscode-styles.css" rel="stylesheet" type="text/css">', '')
                .replace('<base href="/">', `<base href="${String(baseUri)}/">`)
                .replace('<body class="vscode-dark">', '<body>');

              // now we can write out the index.html
              currentPanel.webview.html = indexHtml;
            }
          });
      };

      // fire 'em up!
      getWebviewContent();

    })

  );
}

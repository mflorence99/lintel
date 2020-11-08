import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

const vscodeScripts = `
  <script>
    lintelIsReady = Promise.resolve();
    lintelSearchParams = "?freshStart=false";
    lintelVSCodeAPI = acquireVsCodeApi();
  </script>
`;

export function webviewContentFactory(
  context: vscode.ExtensionContext,
  currentPanel: vscode.WebviewPanel,
  fileCache: Record<string, string>,
  filePattern: string
): () => void {
  return (): void => {
    const ignoredDirectories = vscode.workspace
      .getConfiguration('lintel')
      ?.get('ignoredDirectories', ['node_modules', 'build', 'dist', 'out']);

    vscode.workspace
      .findFiles(filePattern, `**/{${ignoredDirectories.join(',')}}/**`)
      .then((uris: vscode.Uri[]) => {
        // read all the ESLint files
        const eslintFiles: Record<string, string> = uris.reduce((acc, uri) => {
          const source = fs.readFileSync(uri.fsPath, { encoding: 'utf8' });
          if (
            !uri.fsPath.endsWith('package.json') ||
            source.includes('"eslintConfig":')
          )
            acc[uri.fsPath] = source;
          return acc;
        }, {});

        // have any of them changed from when we read them last time?
        // NOTE: this simple test works because they're strings
        const delta =
          Object.keys(fileCache).length !== Object.keys(eslintFiles).length ||
          !Object.keys(fileCache).every((fileName) => {
            return eslintFiles[fileName] === fileCache[fileName];
          });

        if (delta) {
          Object.keys(eslintFiles).forEach(
            (key) => (fileCache[key] = eslintFiles[key])
          );

          // convert the files into a script that Lintel can process
          const eslintScript = Object.keys(eslintFiles)
            .map((fileName) => {
              // #25: must escape embedded \
              const key = fileName.replace(/\\/g, '\\\\');
              // #24: must escape embedded `
              const value = eslintFiles[fileName].replace(/`/g, '\\`');
              return `"${key}": \`${value}\``;
            })
            .join(',');

          // munge the Angular app's index.html
          const appDistPath = path.join(context.extensionPath, 'dist/lintel');
          const appDistPathUri = vscode.Uri.file(appDistPath);
          const baseUri = currentPanel.webview.asWebviewUri(appDistPathUri);
          const indexPath = path.join(appDistPath, 'index.html');
          // NOTE: strip out all the VSCode emulation code and add in the ESLint rules, schema
          const indexHtml = fs
            .readFileSync(indexPath, { encoding: 'utf8' })
            .replace(
              '<script src="assets/eslint-files.js"></script>',
              `<script>eslintFiles = { ${eslintScript} };</script>`
            )
            .replace(
              '<script src="assets/vscode-scripts.js"></script>',
              vscodeScripts
            )
            .replace(
              '<link href="assets/vscode-styles.css" rel="stylesheet" type="text/css">',
              ''
            )
            .replace('<base href="/">', `<base href="${String(baseUri)}/">`)
            .replace('<body class="vscode-dark">', '<body>');

          // now we can write out the index.html
          currentPanel.webview.html = indexHtml;
        }
      });
  };
}

/* eslint-disable @typescript-eslint/naming-convention */
import { commandHandler } from './helpers';
import { messageHandler } from './helpers';

// @see https://www.richardkotze.com/coding/unit-test-mock-vs-code-extension-api-jest

const path = require('path');

let webviewContentResolver;
const webviewContent = new Promise<string>((resolve, _) => {
  webviewContentResolver = resolve;
});

const commands = {
  registerCommand: jest.fn(commandHandler)
};

const env = {
  openExternal: jest.fn(),
  clipboard: {
    readText: jest.fn(),
    writeText: jest.fn()
  }
};

const panel = {
  dispose: (): void => panel.onDidDispose.mock.calls[0][0](),
  onDidDispose: jest.fn(),
  reveal: jest.fn(),
  webview: {
    asWebviewUri: jest.fn((path) => path),
    onDidReceiveMessage: jest.fn(messageHandler),
    postMessage: jest.fn(),
    get html(): Promise<string> {
      return webviewContent;
    },
    set html(html) {
      webviewContentResolver(html);
    }
  }
};

const projectPath = path.join(__dirname, '../..');

const projectFolder = {
  uri: {
    fsPath: projectPath
  }
};

const RelativePattern = jest.fn();

const Uri = {
  file: jest.fn((path) => path),
  parse: jest.fn()
};

const ViewColumn = {
  Beside: undefined
};

const watcher = {
  dispose: jest.fn(),
  onDidChange: jest.fn(),
  onDidCreate: jest.fn(),
  onDidDelete: jest.fn()
};

const _window = {
  activeTextEditor: undefined,
  createWebviewPanel: jest.fn(() => panel),
  showErrorMessage: jest.fn(),
  showTextDocument: jest.fn(),
  showWarningMessage: jest.fn(() => Promise.resolve())
};

const workspace = {
  createFileSystemWatcher: jest.fn(() => watcher),
  findFiles: jest.fn(
    () =>
      new Promise((resolve, _) => {
        resolve([{ fsPath: path.join(projectPath, '.eslintrc.json') }]);
      })
  ),
  getConfiguration: jest.fn(() => ({
    get: jest.fn((nm, dflt) => {
      switch (nm) {
        case 'debounceTimeout':
          return 0;
        case 'ignoredDirectories':
          return dflt;
      }
    })
  })),
  workspaceFolders: [projectFolder]
};

const vscode = {
  commands,
  env,
  RelativePattern,
  Uri,
  ViewColumn,
  window: _window,
  workspace
};

module.exports = vscode;

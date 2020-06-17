// @see https://www.richardkotze.com/coding/unit-test-mock-vs-code-extension-api-jest

const path = require('path');

let html;

const commands = {
  registerCommand: jest.fn()
};

const panel = {
  onDidDispose: jest.fn(),
  webview: {
    asWebviewUri: jest.fn(path => path),
    onDidReceiveMessage: jest.fn(),
    get html() { return html },
    set html(html) { console.log(html) }
  }
};

const projectPath = path.join(__dirname, '../..');

const projectFolder = {
  uri: {
    fsPath: projectPath
  }
}

const RelativePattern = jest.fn();

const Uri = {
  file: jest.fn(path => path)
}

const watcher = {
  onDidChange: jest.fn(),
  onDidCreate: jest.fn(),
  onDidDelete: jest.fn()
}

const window = {
  activeTextEditor: undefined,
  createWebviewPanel: jest.fn(() => panel),
  showErrorMessage: jest.fn(projectFolder)
};

const workspace = {
  createFileSystemWatcher: jest.fn(() => watcher),
  findFiles: jest.fn(() => new Promise((resolve, reject) => {
    resolve([{ fsPath: path.join(projectPath, '.eslintrc.json') }]);
  })),
  workspaceFolders: [projectFolder]
};

const vscode = {
  commands,
  RelativePattern,
  window,
  workspace,
  Uri
};

module.exports = vscode;

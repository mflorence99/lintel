import { activate } from './lintel';

import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

// @see __mocks__/vscode.js

/* eslint-disable @typescript-eslint/unbound-method */

describe('VSCode extension', () => {
  let mockContext;

  beforeAll(() => {
    fs.mkdirSync(path.join(__dirname, '..', 'dist', 'lintel'), {
      recursive: true
    });
    fs.copyFileSync(
      path.join(__dirname, '..', 'src', 'index.html'),
      path.join(__dirname, '..', 'dist', 'lintel', 'index.html')
    );
  });

  beforeEach(() => {
    mockContext = {
      extensionPath: path.join(__dirname, '..'),
      subscriptions: []
    };
  });

  test('Smoke test', () => {
    activate(mockContext);
    expect(vscode.commands.registerCommand).toHaveBeenCalled();
    const command = (vscode.commands.registerCommand as any).mock.calls[0][0];
    expect(command).toBe('lintel.start');
  });

  test('Correct HTML is produced at launch', (done) => {
    activate(mockContext);
    const activator = (vscode.commands.registerCommand as any).mock.calls[0][1];
    const panel = vscode.window.createWebviewPanel(
      'lintel',
      'Lintel',
      undefined
    );
    (panel.webview.html as any).then((html: string) => {
      const filePath = path.join(mockContext.extensionPath, '.eslintrc.json');
      expect(html.includes(`<script>eslintFiles = { "${filePath}":`)).toBe(
        true
      );
      expect(html.includes('lintelVSCodeAPI = acquireVsCodeApi()')).toBe(true);
      done();
    });
    activator();
  });

  test('Extension reacts to messages from webview', (done) => {
    activate(mockContext);
    const activator = (vscode.commands.registerCommand as any).mock.calls[0][1];
    const panel = vscode.window.createWebviewPanel(
      'lintel',
      'Lintel',
      undefined
    );
    (panel.webview.html as any).then((_: string) => {
      let calls, message;
      const post = (panel.webview.onDidReceiveMessage as any).mock.calls[0][0];

      post({ command: 'bootFail' });
      expect(vscode.window.showErrorMessage).toHaveBeenCalled();

      post({ command: 'clipboardCopy', text: 'xxx' });
      expect(vscode.env.clipboard.writeText).toHaveBeenCalled();

      post({ command: 'deleteOverride', text: 'xxx', override: 99 });
      expect(vscode.window.showWarningMessage).toHaveBeenCalled();

      post({ command: 'editFile', fileName: 'xxx' });
      expect(vscode.window.showTextDocument).toHaveBeenCalled();

      // NOTE: must be a real file in this case
      post({
        command: 'getExtensions',
        fileName: path.join(mockContext.extensionPath, '.eslintrc.json'),
        extensions: [
          'plugin:jest/recommended',
          'plugin:vue/recommended',
          'plugin:@angular-eslint/recommended'
        ]
      });
      calls = (panel.webview.postMessage as any).mock.calls;
      // NOTE: will be called twice
      expect(calls.length).toBeGreaterThanOrEqual(2);
      message = calls[calls.length - 3][0];
      expect(message.command).toEqual('extensions');
      expect(message.extensions['plugin:jest/recommended']).toBeTruthy();
      message = calls[calls.length - 2][0];
      expect(message.extensions['plugin:vue/recommended']).toBeTruthy();
      message = calls[calls.length - 1][0];
      expect(
        message.extensions['plugin:@angular-eslint/recommended']
      ).toBeTruthy();

      // NOTE: must be a real file in this case
      post({
        command: 'getRules',
        fileName: path.join(mockContext.extensionPath, '.eslintrc.json'),
        plugins: ['jest']
      });
      expect(panel.webview.postMessage).toHaveBeenCalled();
      calls = (panel.webview.postMessage as any).mock.calls;
      expect(calls.length).toBeGreaterThanOrEqual(1);
      message = calls[calls.length - 1][0];
      expect(message.command).toEqual('rules');
      expect(message.rules['jest']).toBeTruthy();

      post({ command: 'openFile', url: 'xxx' });
      expect(vscode.env.openExternal).toHaveBeenCalled();

      post({ command: 'parseFail', fileName: 'xxx' });
      expect(vscode.window.showErrorMessage).toHaveBeenCalled();

      post({ command: 'saveFile', fileName: '.eslintrc.xxx', source: '{ }' });
      const contents = fs.readFileSync(
        path.join(mockContext.extensionPath, '.eslintrc.xxx'),
        { encoding: 'utf8' }
      );
      expect(contents).toBe('{ }');

      done();
    });
    activator();
  });

  test('Extension can be disposed', (done) => {
    activate(mockContext);
    const panel = vscode.window.createWebviewPanel(
      'lintel',
      'Lintel',
      undefined
    );
    const watcher = vscode.workspace.createFileSystemWatcher(undefined);
    (panel.webview.html as any).then((_: string) => {
      const dispose = (panel.onDidDispose as any).mock.calls[0][0];
      dispose();
      expect(watcher.dispose).toHaveBeenCalled();
      done();
    });
  });
});

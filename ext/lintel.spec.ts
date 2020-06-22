import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

import { activate } from './lintel';

// @see __mocks__/vscode.js 

/* eslint-disable @typescript-eslint/unbound-method */

describe('VSCode extension', () => {

  let mockContext;

  beforeEach(() => {

    mockContext = {
      extensionPath: path.join(__dirname, '..'),
      subscriptions: [],
    };

  });

  test('Smoke test', () => {
    activate(mockContext);
    expect(vscode.commands.registerCommand).toHaveBeenCalled();
    const command = (vscode.commands.registerCommand as any).mock.calls[0][0];
    expect(command).toBe('lintel.start');
  }); 

  test('Correct HTML is produced at launch', done => {
    activate(mockContext);
    const activator = (vscode.commands.registerCommand as any).mock.calls[0][1];
    const panel = vscode.window.createWebviewPanel('lintel', 'Lintel', undefined);
    (panel.webview.html as any).then((html: string) => {
      const filePath = path.join(mockContext.extensionPath, '.eslintrc.json');
      expect(html.includes(`<script>eslintFiles = { "${filePath}":`)).toBe(true);
      expect(html.includes('lintelVSCodeAPI = acquireVsCodeApi()')).toBe(true);
      done();
    });
    activator();
  }); 

  test('Extension reacts to messages from webview', done => {
    activate(mockContext);
    const activator = (vscode.commands.registerCommand as any).mock.calls[0][1];
    const panel = vscode.window.createWebviewPanel('lintel', 'Lintel', undefined);
    (panel.webview.html as any).then((_: string) => {
      const post = (panel.webview.onDidReceiveMessage as any).mock.calls[0][0];

      post({ command: 'bootFail' });
      expect(vscode.window.showErrorMessage).toHaveBeenCalled();

      post({ command: 'editFile', fileName: 'xxx' });
      expect(vscode.window.showTextDocument).toHaveBeenCalled();

      // NOTE: must be a real file in this case
      post({ command: 'getExtensions', fileName: path.join(mockContext.extensionPath, '.eslintrc.json'), extensions: ['plugin:jest/recommended'] });
      expect(panel.webview.postMessage).toHaveBeenCalled();

      post({ command: 'openFile', url: 'xxx' });
      expect(vscode.env.openExternal).toHaveBeenCalled();

      post({ command: 'parseFail', fileName: 'xxx' });
      expect(vscode.window.showErrorMessage).toHaveBeenCalled();

      post({ command: 'saveFile', fileName: '.eslintrc.xxx', source: '{ }' });
      const contents = fs.readFileSync(path.join(mockContext.extensionPath, '.eslintrc.xxx'), { encoding: 'utf8' });
      expect(contents).toBe('{ }');

      done();
    });
    activator();
  }); 

  test('Extension can be disposed', done => {
    activate(mockContext);
    const panel = vscode.window.createWebviewPanel('lintel', 'Lintel', undefined);
    const watcher = vscode.workspace.createFileSystemWatcher(undefined);
    (panel.webview.html as any).then((_: string) => {
      const dispose = (panel.onDidDispose as any).mock.calls[0][0];
      dispose();
      expect(watcher.dispose).toHaveBeenCalled();
      done();
    });
  }); 

});

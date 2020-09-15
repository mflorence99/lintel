import { activate } from './lintel';
import { handleCommand } from './__mocks__/helpers';
import { handleMessage } from './__mocks__/helpers';

import 'jest-extended';

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
    expect(vscode.commands.registerCommand).toHaveBeenCalledWith(
      'lintel.start',
      expect.any(Function)
    );
  });

  test('Correct HTML is produced at launch', (done) => {
    activate(mockContext);
    const panel = vscode.window.createWebviewPanel(
      'lintel',
      'Lintel',
      undefined
    );
    // when the test is started
    (panel.webview.html as any).then((html: string) => {
      const filePath = path.join(mockContext.extensionPath, '.eslintrc.json');
      expect(
        html.includes(`<script>eslintFiles = { "${filePath}":`)
      ).toBeTrue();
      expect(html.includes('lintelVSCodeAPI = acquireVsCodeApi()')).toBeTrue();
      done();
    });
    // start the test
    handleCommand('lintel.start')();
  });

  test('Extension reacts to messages from webview', (done) => {
    activate(mockContext);
    const panel = vscode.window.createWebviewPanel(
      'lintel',
      'Lintel',
      undefined
    );
    // when the test is started
    (panel.webview.html as any).then((_: string) => {
      handleMessage({ command: 'bootFail' });
      expect(vscode.window.showErrorMessage).toHaveBeenCalledWith(
        'Lintel could not start. Please try again.'
      );

      handleMessage({ command: 'clipboardCopy', text: 'xxx' });
      expect(vscode.env.clipboard.writeText).toHaveBeenCalledWith('xxx');

      handleMessage({ command: 'deleteOverride', text: 'xxx', override: 99 });
      expect(vscode.window.showWarningMessage).toHaveBeenCalledWith(
        'xxx',
        { modal: true },
        'OK'
      );

      handleMessage({ command: 'editFile', fileName: 'xxx' });
      expect(vscode.window.showTextDocument).toHaveBeenCalledWith(
        vscode.Uri.parse('xxx'),
        expect.any(Object)
      );

      // NOTE: must be a real file in this case
      handleMessage({
        command: 'getExtensions',
        fileName: path.join(mockContext.extensionPath, '.eslintrc.json'),
        extensions: [
          'plugin:jest/recommended',
          'plugin:vue/recommended',
          'plugin:@angular-eslint/recommended'
        ]
      });
      expect(panel.webview.postMessage).toHaveBeenNthCalledWith(1, {
        command: 'extensions',
        extensions: expect.objectContaining({
          'plugin:jest/recommended': expect.any(Object)
        })
      });
      expect(panel.webview.postMessage).toHaveBeenNthCalledWith(2, {
        command: 'extensions',
        extensions: expect.objectContaining({
          'plugin:vue/recommended': expect.any(Object)
        })
      });
      expect(panel.webview.postMessage).toHaveBeenNthCalledWith(3, {
        command: 'extensions',
        extensions: expect.objectContaining({
          'plugin:@angular-eslint/recommended': expect.any(Object)
        })
      });

      // NOTE: must be a real file in this case
      handleMessage({
        command: 'getRules',
        fileName: path.join(mockContext.extensionPath, '.eslintrc.json'),
        plugins: ['jest']
      });
      expect(panel.webview.postMessage).toHaveBeenCalledWith({
        command: 'rules',
        rules: expect.objectContaining({
          jest: expect.any(Object)
        })
      });

      handleMessage({ command: 'openFile', url: 'xxx' });
      expect(vscode.env.openExternal).toHaveBeenCalledWith(
        vscode.Uri.parse('xxx')
      );

      handleMessage({ command: 'parseFail', fileName: 'xxx' });
      expect(vscode.window.showErrorMessage).toHaveBeenCalledWith(
        'Lintel could not parse xxx'
      );

      handleMessage({
        command: 'saveFile',
        fileName: '.eslintrc.xxx',
        source: '{ }'
      });
      const contents = fs.readFileSync(
        path.join(mockContext.extensionPath, '.eslintrc.xxx'),
        { encoding: 'utf8' }
      );
      expect(contents).toBe('{ }');

      done();
    });

    // start the test
    handleCommand('lintel.start')();
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
      // const dispose = (panel.onDidDispose as any).mock.calls[0][0];
      panel.dispose();
      expect(watcher.dispose).toHaveBeenCalled();
      done();
    });
  });
});

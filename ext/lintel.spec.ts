import * as path from 'path';
import * as vscode from 'vscode';

import { activate } from './lintel';

function mockOf(fn: any): any {
  return fn.mock;
}

// @see __mocks__/vscode.js 

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
    expect(mockOf(vscode.commands.registerCommand).calls[0][0]).toBe('lintel.start');
  }); 

  test('Launch lintel', () => {
    activate(mockContext);
    mockOf(vscode.commands.registerCommand).calls[0][1]();
  }); 

});

import { Bundle } from './state.spec';

import { prepare } from './state.spec';

describe('FilesState', () => {

  let bundle: Bundle;

  beforeEach(() => bundle = prepare());

  test('FilesState is initialized', () => {
    expect(bundle.files.fileNames[0]).toEqual('package.json');
  });

  test('package.json is properly parsed', () => {
    const config = bundle.files.load('package.json');
    expect(config.parser).toEqual('@typescript-eslint/parser');
  });

  test('ext/.eslintrc.js is properly parsed', () => {
    const config = bundle.files.load('ext/.eslintrc.js');
    expect(config.plugins[0]).toEqual('does-not-exist');
  }); 

  test('src/.eslintrc.json is parsed without rules', () => {
    const config = bundle.files.load('src/.eslintrc.json');
    expect(config.rules).toEqual({ });
  }); 

  test('src/app/.eslintrc.yaml is properly parsed', () => {
    const config = bundle.files.load('src/app/.eslintrc.yaml');
    expect(config.parserOptions.ecmaFeatures.globalReturn).toBe(true);
    expect(config.rules['accessor-pairs']).toBe('warn');
  }); 

});

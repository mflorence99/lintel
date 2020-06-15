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
    expect(config.env.browser).toBe(true);
  }); 

  test('completely empty.json is properly parsed', () => {
    const config = bundle.files.load('empty.json');
    expect(config.rules).toEqual({ });
  }); 

  test('not-supported.cjs is parsed but the config is null', () => {
    const config = bundle.files.load('not-supported.cjs');
    expect(config).toBeNull();
  }); 

  test('invalid.json is parsed but the config is null', () => {
    const config = bundle.files.load('invalid.json');
    expect(config).toBeNull();
  }); 

  test('config can be changed in package.json', () => {
    bundle.files.changeConfiguration({ 
      fileName: 'package.json',
      replacement: {
        env: {
          browser: false
        }
      }
    });
    const config = bundle.files.load('package.json');
    expect(config.env.browser).toBe(false);
  });

  test('rule can be changed in package.json', () => {
    bundle.files.changeRule({
      fileName: 'package.json',
      ruleName: 'brace-style',
      replacement: ['off']
    });
    const config = bundle.files.load('package.json');
    expect(config.rules['brace-style']).toEqual(['off']);
  });

  test('config can be changed in ext/.eslintrc.js', () => {
    bundle.files.changeConfiguration({
      fileName: 'ext/.eslintrc.js',
      replacement: {
        env: {
          browser: false
        }
      }
    });
    const config = bundle.files.load('ext/.eslintrc.js');
    expect(config.env.browser).toBe(false);
  });

  test('rule can be changed in ext/.eslintrc.js', () => {
    bundle.files.changeRule({
      fileName: 'ext/.eslintrc.js',
      ruleName: 'brace-style',
      replacement: ['off']
    });
    const config = bundle.files.load('ext/.eslintrc.js');
    expect(config.rules['brace-style']).toEqual(['off']);
  });

  test('config can be changed in src/.eslintrc.json', () => {
    bundle.files.changeConfiguration({
      fileName: 'src/.eslintrc.json',
      replacement: {
        env: {
          browser: false
        }
      }
    });
    const config = bundle.files.load('src/.eslintrc.json');
    expect(config.env.browser).toBe(false);
  });

  test('rule can be changed in src/.eslintrc.json', () => {
    bundle.files.changeRule({
      fileName: 'src/.eslintrc.json',
      ruleName: 'brace-style',
      replacement: ['off']
    });
    const config = bundle.files.load('src/.eslintrc.json');
    expect(config.rules['brace-style']).toEqual(['off']);
  });

  test('config can be changed in src/app/.eslintrc.yaml', () => {
    bundle.files.changeConfiguration({
      fileName: 'src/app/.eslintrc.yaml',
      replacement: {
        env: {
          browser: false
        }
      }
    });
    const config = bundle.files.load('src/app/.eslintrc.yaml');
    expect(config.env.browser).toBe(false);
  });

  test('rule can be changed in src/app/.eslintrc.yaml', () => {
    bundle.files.changeRule({
      fileName: 'src/app/.eslintrc.yaml',
      ruleName: 'brace-style',
      replacement: ['off']
    });
    const config = bundle.files.load('src/app/.eslintrc.yaml');
    expect(config.rules['brace-style']).toEqual(['off']);
  });

});

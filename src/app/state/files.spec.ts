import { Bundle } from './state.spec';

import { prepare } from './state.spec';

describe('FilesState', () => {
  let bundle: Bundle;

  beforeEach(() => (bundle = prepare()));

  test('FilesState is initialized', () => {
    expect(bundle.files.fileNames[0]).toEqual(
      '/home/mflorence99/lintel/package.json'
    );
  });

  test('package.json is properly parsed', () => {
    const config = bundle.files.load('/home/mflorence99/lintel/package.json');
    expect(config.extends[0]).toEqual('eslint:recommended');
  });

  test('ext/.eslintrc.js is properly parsed', () => {
    const config = bundle.files.load('/home/mflorence99/el-3270/.eslintrc.js');
    expect(config.plugins[0]).toEqual('does-not-exist');
  });

  test('/home/mflorence99/el-file/.eslintrc.json is parsed without rules', () => {
    const config = bundle.files.load(
      '/home/mflorence99/el-file/.eslintrc.json'
    );
    expect(config.rules).toEqual({});
  });

  test('/home/mflorence99/lintel/src/app/.eslintrc.yaml is properly parsed', () => {
    const config = bundle.files.load(
      '/home/mflorence99/lintel/src/app/.eslintrc.yaml'
    );
    expect(config.parserOptions.ecmaFeatures.globalReturn).toBe(true);
    expect(config.rules['accessor-pairs']).toBe('warn');
    expect(config.env.browser).toBe(true);
  });

  test('completely /home/mflorence99/lintel/empty.json is properly parsed', () => {
    const config = bundle.files.load('/home/mflorence99/lintel/empty.json');
    expect(config.rules).toEqual({});
  });

  test('/home/mflorence99/lintel/common-js.cjs is parsed but the config is empty', () => {
    const config = bundle.files.load('/home/mflorence99/lintel/common-js.cjs');
    expect(config.rules).toEqual({});
  });

  test('/home/mflorence99/lintel/invalid.json is parsed but the config is null', () => {
    const config = bundle.files.load('/home/mflorence99/lintel/invalid.json');
    expect(config).toBeNull();
  });

  test('config can be changed in package.json', () => {
    bundle.files.changeConfiguration({
      fileName: '/home/mflorence99/lintel/package.json',
      ix: null,
      replacement: {
        env: {
          browser: false
        }
      }
    });
    const config = bundle.files.load('/home/mflorence99/lintel/package.json');
    expect(config.env.browser).toBe(false);
  });

  test('config can be changed in package.json override', () => {
    bundle.files.changeConfiguration({
      fileName: '/home/mflorence99/lintel/package.json',
      ix: 0,
      replacement: {
        env: {
          browser: true
        }
      }
    });
    const config = bundle.files.load('/home/mflorence99/lintel/package.json');
    expect(config.overrides[0].env.browser).toBe(true);
  });

  test('rule can be changed in package.json', () => {
    bundle.files.changeRule({
      fileName: '/home/mflorence99/lintel/package.json',
      ix: null,
      ruleName: 'brace-style',
      replacement: ['off']
    });
    const config = bundle.files.load('/home/mflorence99/lintel/package.json');
    expect(config.rules['brace-style']).toEqual(['off']);
  });

  test('rule can be changed in package.json override', () => {
    bundle.files.changeRule({
      fileName: '/home/mflorence99/lintel/package.json',
      ix: 0,
      ruleName: 'node/callback-return',
      replacement: ['off']
    });
    const config = bundle.files.load('/home/mflorence99/lintel/package.json');
    expect(config.overrides[0].rules['node/callback-return']).toEqual(['off']);
  });

  test('config can be changed in /home/mflorence99/el-3270/.eslintrc.js', () => {
    bundle.files.changeConfiguration({
      fileName: '/home/mflorence99/el-3270/.eslintrc.js',
      ix: null,
      replacement: {
        env: {
          browser: false
        }
      }
    });
    const config = bundle.files.load('/home/mflorence99/el-3270/.eslintrc.js');
    expect(config.env.browser).toBe(false);
  });

  test('rule can be changed in ext/.eslintrc.js', () => {
    bundle.files.changeRule({
      fileName: '/home/mflorence99/el-3270/.eslintrc.js',
      ix: null,
      ruleName: 'brace-style',
      replacement: ['off']
    });
    const config = bundle.files.load('/home/mflorence99/el-3270/.eslintrc.js');
    expect(config.rules['brace-style']).toEqual(['off']);
  });

  test('config can be changed in /home/mflorence99/el-file/.eslintrc.json', () => {
    bundle.files.changeConfiguration({
      fileName: '/home/mflorence99/el-file/.eslintrc.json',
      ix: null,
      replacement: {
        env: {
          browser: false
        }
      }
    });
    const config = bundle.files.load(
      '/home/mflorence99/el-file/.eslintrc.json'
    );
    expect(config.env.browser).toBe(false);
  });

  test('rule can be changed in /home/mflorence99/el-file/.eslintrc.json', () => {
    bundle.files.changeRule({
      fileName: '/home/mflorence99/el-file/.eslintrc.json',
      ix: null,
      ruleName: 'brace-style',
      replacement: ['off']
    });
    const config = bundle.files.load(
      '/home/mflorence99/el-file/.eslintrc.json'
    );
    expect(config.rules['brace-style']).toEqual(['off']);
  });

  test('config can be changed in /home/mflorence99/lintel/src/app/.eslintrc.yaml', () => {
    bundle.files.changeConfiguration({
      fileName: '/home/mflorence99/lintel/src/app/.eslintrc.yaml',
      ix: null,
      replacement: {
        env: {
          browser: false
        }
      }
    });
    const config = bundle.files.load(
      '/home/mflorence99/lintel/src/app/.eslintrc.yaml'
    );
    expect(config.env.browser).toBe(false);
  });

  test('rule can be changed in /home/mflorence99/lintel/src/app/.eslintrc.yaml', () => {
    bundle.files.changeRule({
      fileName: '/home/mflorence99/lintel/src/app/.eslintrc.yaml',
      ix: null,
      ruleName: 'brace-style',
      replacement: ['off']
    });
    const config = bundle.files.load(
      '/home/mflorence99/lintel/src/app/.eslintrc.yaml'
    );
    expect(config.rules['brace-style']).toEqual(['off']);
  });

  test('rule can be deleted in /home/mflorence99/lintel/package.json', () => {
    let config = bundle.files.load('/home/mflorence99/lintel/package.json');
    expect(config.rules['spaced-comment']).toBeTruthy();
    bundle.files.deleteRule({
      fileName: '/home/mflorence99/lintel/package.json',
      ix: null,
      ruleName: 'spaced-comment'
    });
    config = bundle.files.load('/home/mflorence99/lintel/package.json');
    expect(config.rules['spaced-comment']).toBeFalsy();
  });

  test('rule can be deleted in /home/mflorence99/lintel/package.json override', () => {
    let config = bundle.files.load('/home/mflorence99/lintel/package.json');
    expect(config.overrides[0].rules['node/callback-return']).toBeTruthy();
    bundle.files.deleteRule({
      fileName: '/home/mflorence99/lintel/package.json',
      ix: 0,
      ruleName: 'node/callback-return'
    });
    config = bundle.files.load('/home/mflorence99/lintel/package.json');
    expect(config.overrides[0].rules['node/callback-return']).toBeFalsy();
  });

  test('override can be added in /home/mflorence99/lintel/package.json', () => {
    let config = bundle.files.load('/home/mflorence99/lintel/package.json');
    expect(config.overrides.length).toBe(4);
    bundle.files.addOverride({
      fileName: '/home/mflorence99/lintel/package.json',
      override: {
        files: ['*.temp'],
        rules: {}
      }
    });
    config = bundle.files.load('/home/mflorence99/lintel/package.json');
    expect(config.overrides.length).toBe(5);
  });

  test('override can be deleted in /home/mflorence99/lintel/package.json', () => {
    let config = bundle.files.load('/home/mflorence99/lintel/package.json');
    expect(config.overrides.length).toBe(4);
    bundle.files.deleteOverride({
      fileName: '/home/mflorence99/lintel/package.json',
      ix: 0
    });
    config = bundle.files.load('/home/mflorence99/lintel/package.json');
    expect(config.overrides.length).toBe(3);
  });
});

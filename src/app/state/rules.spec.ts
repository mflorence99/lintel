import { Bundle } from './state.spec';

import { prepare } from './state.spec';

describe('RulesState', () => {

  let bundle: Bundle;

  beforeEach(() => bundle = prepare());

  test('RulesState is initialized', () => {
    expect(bundle.rules.snapshot[bundle.params.basePluginName]).toBeTruthy();
    expect(bundle.rules.snapshot['@typescript-eslint']).toBeTruthy();
  });

  test('no-mixed-operators cannot be processed', () => {
    const rule = bundle.rules.snapshot['eslint']['no-mixed-operators'];
    expect(rule).toBeTruthy();
    const digest = bundle.rules.makeSchemaDigest('no-mixed-operators', rule);
    expect(digest.canGUI).toBe(false);
    expect(digest.elements).toEqual([]);
  });

  test('react/jsx-no-script-url cannot be processed', () => {
    const rule = bundle.rules.snapshot['react']['react/jsx-no-script-url'];
    expect(rule).toBeTruthy();
    const digest = bundle.rules.makeSchemaDigest('react/jsx-no-script-url', rule);
    expect(digest.canGUI).toBe(false);
    expect(digest.elements).toEqual([]);
  });

  test('Rules with "oneOf" cannot be processed', () => {
    const rule = bundle.rules.snapshot['eslint']['array-bracket-newline'];
    expect(rule).toBeTruthy();
    const digest = bundle.rules.makeSchemaDigest('array-bracket-newline', rule);
    expect(digest.canGUI).toBe(false);
    expect(digest.elements).toEqual([]);
  });

  test('Rules with "anyOf" cannot be processed', () => {
    const rule = bundle.rules.snapshot['eslint']['arrow-body-style'];
    expect(rule).toBeTruthy();
    const digest = bundle.rules.makeSchemaDigest('arrow-body-style', rule);
    expect(digest.canGUI).toBe(false);
    expect(digest.elements).toEqual([]);
  });

  test('Rules with "allOf" cannot be processed', () => {
    const rule = bundle.rules.snapshot['react']['react/jsx-curly-spacing'];
    expect(rule).toBeTruthy();
    const digest = bundle.rules.makeSchemaDigest('react/jsx-curly-spacing', rule);
    expect(digest.canGUI).toBe(false);
    expect(digest.elements).toEqual([]);
  });

  test('Make rules with an object schema into an array schema', () => {
    const rule = bundle.rules.snapshot['vue']['vue/attributes-order'];
    expect(rule).toBeTruthy();
    const digest = bundle.rules.makeSchemaDigest('vue/attributes-order', rule);
    expect(digest.canGUI).toBe(true);
  });

  test('Make rules with an object schema into an array schema', () => {
    const rule = bundle.rules.snapshot['vue']['vue/html-self-closing'];
    expect(rule).toBeTruthy();
    const digest = bundle.rules.makeSchemaDigest('vue/html-self-closing', rule);
    expect(digest.canGUI).toBe(true);
  });

  test('Rules with type: boolean produce a checkbox', () => {
    const rule = bundle.rules.snapshot['eslint']['brace-style'];
    expect(rule).toBeTruthy();
    const digest = bundle.rules.makeSchemaDigest('brace-style', rule);
    expect(digest.canGUI).toBe(true);
    bundle.utils.deepSearch(digest.elements, 'name=allowSingleLine', obj => {
      expect(obj.type).toEqual('checkbox');
    });
  });

  test('Rules with additional boolean properties produce a key-value/checkbox', () => {
    const rule = bundle.rules.snapshot['react']['react/forbid-prop-types'];
    expect(rule).toBeTruthy();
    const digest = bundle.rules.makeSchemaDigest('react/forbid-prop-types', rule);
    expect(digest.canGUI).toBe(true);
    expect(digest.elements.length).toBe(1);
    expect(digest.elements[0].subType).toEqual('checkbox');
    expect(digest.elements[0].type).toEqual('key-value');
  });

  test('Rules with additional string properties produce a key-value/text', () => {
    const rule = bundle.rules.snapshot['eslint']['valid-jsdoc'];
    expect(rule).toBeTruthy();
    const digest = bundle.rules.makeSchemaDigest('valid-jsdoc', rule);
    expect(digest.canGUI).toBe(true);
    expect(digest.elements.length).toBe(1);
    expect(digest.elements[0].type).toEqual('object');
    expect(digest.elements[0].elements[0].subType).toEqual('text');
    expect(digest.elements[0].elements[0].type).toEqual('key-value');
  });

  test('Rules with an object that itself consists of all-boolean object produce a key-value/multicheckbox', () => {
    const rule = bundle.rules.snapshot['eslint']['keyword-spacing'];
    expect(rule).toBeTruthy();
    const digest = bundle.rules.makeSchemaDigest('keyword-spacing', rule);
    expect(digest.canGUI).toBe(true);
    expect(digest.elements.length).toBe(1);
    expect(digest.elements[0].type).toEqual('object');
    expect(digest.elements[0].elements[2].options).toEqual(['before', 'after']);
    expect(digest.elements[0].elements[2].subType).toEqual('multicheckbox');
    expect(digest.elements[0].elements[2].type).toEqual('key-value');
  });

  test('Rules with an all-boolean object produce a multiselect', () => {
    const rule = bundle.rules.snapshot['eslint']['accessor-pairs'];
    expect(rule).toBeTruthy();
    const digest = bundle.rules.makeSchemaDigest('accessor-pairs', rule);
    expect(digest.canGUI).toBe(true);
    expect(digest.elements.length).toBe(1);
    expect(digest.elements[0].type).toEqual('multiselect');
  });

  test('Rules with an empty object as the schema are a noop', () => {
    const rule = bundle.rules.snapshot['react']['react/require-render-return'];
    expect(rule).toBeTruthy();
    const digest = bundle.rules.makeSchemaDigest('react/require-render-return', rule);
    expect(digest.canGUI).toBe(true);
    expect(digest.elements.length).toBe(1);
    expect(digest.elements[0].type).toEqual('noop');
  });

  test('Rules with type: array of numbers produce a number-array', () => {
    const rule = bundle.rules.snapshot['eslint']['no-magic-numbers'];
    expect(rule).toBeTruthy();
    const digest = bundle.rules.makeSchemaDigest('no-magic-numbers', rule);
    expect(digest.canGUI).toBe(true);
    expect(digest.elements.length).toBe(1);
    expect(digest.elements[0].type).toEqual('object');
    expect(digest.elements[0].elements[2].type).toEqual('number-array');
  });

  test('Rules with type: integer produce a number-input', () => {
    const rule = bundle.rules.snapshot['eslint']['max-classes-per-file'];
    expect(rule).toBeTruthy();
    const digest = bundle.rules.makeSchemaDigest('max-classes-per-file', rule);
    expect(digest.canGUI).toBe(true);
    expect(digest.elements.length).toBe(1);
    expect(digest.elements[0].min).toBe(1);
    expect(digest.elements[0].type).toEqual('number-input');
  });

  test('Rules with type: array of enums produce a select-array', () => {
    const rule = bundle.rules.snapshot['eslint']['prefer-reflect'];
    expect(rule).toBeTruthy();
    const digest = bundle.rules.makeSchemaDigest('prefer-reflect', rule);
    expect(digest.canGUI).toBe(true);
    expect(digest.elements.length).toBe(1);
    expect(digest.elements[0].type).toEqual('object');
    expect(digest.elements[0].elements[0].options[0]).toEqual('apply');
    expect(digest.elements[0].elements[0].type).toEqual('select-array');
    expect(digest.elements[0].elements[0].uniqueItems).toBe(true);
  });

  test('Rules with enum produce a singleselect', () => {
    const rule = bundle.rules.snapshot['eslint']['block-spacing'];
    expect(rule).toBeTruthy();
    const digest = bundle.rules.makeSchemaDigest('block-spacing', rule);
    expect(digest.canGUI).toBe(true);
    expect(digest.elements.length).toBe(1);
    expect(digest.elements[0].type).toEqual('singleselect');
  });

  test('Rules with type: array of strings produce a string-array', () => {
    const rule = bundle.rules.snapshot['eslint']['no-native-reassign'];
    expect(rule).toBeTruthy();
    const digest = bundle.rules.makeSchemaDigest('no-native-reassign', rule);
    expect(digest.canGUI).toBe(true);
    expect(digest.elements.length).toBe(1);
    expect(digest.elements[0].type).toEqual('object');
    expect(digest.elements[0].elements[0].type).toEqual('string-array');
  });

  test('Rules with type: string produce a string-input', () => {
    const rule = bundle.rules.snapshot['eslint']['default-case'];
    expect(rule).toBeTruthy();
    const digest = bundle.rules.makeSchemaDigest('default-case', rule);
    expect(digest.canGUI).toBe(true);
    expect(digest.elements.length).toBe(1);
    expect(digest.elements[0].type).toEqual('object');
    expect(digest.elements[0].elements[0].type).toEqual('string-input');
  });

});

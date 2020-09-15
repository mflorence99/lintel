import * as fs from 'fs';

const cliEngine = require('eslint').CLIEngine;

const plugins = [
  '@angular-eslint',
  '@typescript-eslint',
  'compat',
  'eslint',
  'import-splitnsort',
  'jest',
  'lodash',
  'lodash-fp',
  'node',
  'react',
  'react-hooks',
  'react-native',
  'react-redux',
  'sonarjs',
  'unicorn',
  'vue'
];

const schema = {};

plugins.forEach((plugin) => {
  const cli = new cliEngine({
    baseConfig: {
      plugins: [plugin]
      // extends: [plugin[1]]
    },
    useEslintrc: false
  });

  const rules = cli.getRules();

  const obj = {};
  rules.forEach((value, key) => {
    // NOTE: we always get eslint:all -- why??
    if (plugin.startsWith('eslint') || key.includes('/')) obj[key] = value;
  });

  schema[plugin] = obj;
});

// NOTE: there are some well-known typos in plugin schemas
const normalized = JSON.stringify(schema, null, 2)
  .replace(/"onfOf"/gm, '"oneOf"')
  .replace(/"tyoe"/gm, '"type"');

const script = `
// autogenerated by bin/eslint-rules.ts
/* eslint-disable */
eslintRules = ${normalized}
`;

fs.writeFileSync('./src/assets/eslint-rules.js', script);

import * as fs from 'fs';

import { resolveExtension } from './common/resolve-extends';

const extensions = [
  'eslint:recommended',
  'eslint-config-eslint',
  'eslint-config-google',
  'plugin:compat/recommended',
  'plugin:jest/recommended',
  'plugin:lodash/recommended',
  'plugin:lodash-fp/recommended',
  'plugin:node/recommended',
  'plugin:react/recommended',
  'plugin:react-hooks/recommended',
  'plugin:react-redux/recommended',
  'plugin:sonarjs/recommended',
  'plugin:unicorn/recommended',
  'plugin:vue/recommended',
  'plugin:@angular-eslint/recommended',
  'plugin:@typescript-eslint/eslint-recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:@typescript-eslint/recommended-requiring-type-checking'
];

const schema = extensions.reduce((acc, extensionName) => {
  acc[extensionName] = resolveExtension(extensionName, __filename);
  return acc;
}, { });

const normalized = JSON.stringify(schema, null, 2);

const script = `
  // autogenerated by bin/eslint-extensions.ts
  /* eslint-disable */
  eslintExtensions = ${normalized}
  `;

fs.writeFileSync('./src/assets/eslint-extensions.js', script);

const fs = require('fs');
const path = require('path');

const moduleLoader = require('module');

const extensions = [
  'eslint:recommended',
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

const schema = { };

extensions.forEach(extensionName => {

  let config;
  if (extensionName === 'eslint:all')
    config = require('eslint/conf/eslint-all');
  else if (extensionName === 'eslint:recommended')
    config = require('eslint/conf/eslint-recommended');
  else {

    // load extension configuration
    const parts = extensionName.substring(7).split('/');
    let moduleName;
    if (parts[0].startsWith('@')) {
      moduleName = `${parts[0]}/eslint-plugin`;
      if (parts.length > 2)
        moduleName += `-${parts.slice(1, parts.length - 1).join('-')}`;
    } else moduleName = `eslint-plugin-${parts[0]}`;
    const configName = parts[parts.length - 1];
    const modulePath = moduleLoader.createRequire(__filename).resolve(moduleName);
    config = require(modulePath).configs[configName];

    // resolve extensions
    const resolveExtends = base => {
      if (base.extends) {
        if (!Array.isArray(base.extends))
          base.extends = [base.extends];
        base.extends.forEach(extensionName => {
          let extension;
          if (extensionName.startsWith('/'))
            extension = require(extensionName);
          else extension = require(path.join(path.dirname(modulePath), extensionName));
          if (extension.extends)
            resolveExtends(extension);
          Object.keys(extension)
            .filter(key => key !== 'extends')
            .forEach(key => {
              if (Array.isArray(extension[key]))
                config[key] = Array.from(new Set([...extension[key], ...config[key] || []]));
              else if (typeof extension[key] === 'object')
                config[key] = Object.assign(config[key] || { }, extension[key]);
              else config[key] = extension[key];
            });
        });
      }
    };

    resolveExtends(config);
    delete config.extends;
  }

  schema[extensionName] = config;

});

const normalized = JSON.stringify(schema, null, 2);

const script = `
// autogenerated by bin/eslint-extensions.ts
/* eslint-disable */
eslintExtensions = ${normalized}
`;

fs.writeFileSync('./src/assets/eslint-extensions.js', script);

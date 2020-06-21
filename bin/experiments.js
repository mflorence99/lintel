const plugin = require('@typescript-eslint/eslint-plugin');

const recommended = plugin.configs['recommended'];

console.log(JSON.stringify(recommended, null, 2));

// const eslint = require('eslint/conf/eslint-all');

// console.log(JSON.stringify(eslint.rules, null, 2));

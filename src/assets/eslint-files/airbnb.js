/**
  @see https://github.com/commercetools/eslint-config/blob/master/index.js
*/

eslintFiles = {

  '.eslintrc.js': `
module.exports = {

    parser: 'babel-eslint',

    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
    },

    extends: [
        'airbnb/base',
    ],

    env: {
        es6: true,
        jest: true,
        mocha: true,
        node: true,
    },

    rules: {
        'array-bracket-spacing': 0,
        camelcase: 2,
        'computed-property-spacing': [ 2, 'never' ],
        'consistent-return': 2,
        curly: [ 2, 'multi' ],
        'dot-notation': 0,
        'eol-last': 2,
        eqeqeq: 2,
        'keyword-spacing': 2,
        'max-len': [ 2, 80, 4 ],
        'new-cap': [ 2, { capIsNew: false } ],
        'no-eq-null': 2,
        'no-mixed-spaces-and-tabs': 2,
        'no-multiple-empty-lines': [ 2, { max: 2 } ],
        'no-trailing-spaces': 2,
        'no-use-before-define': [ 2, 'nofunc' ],
        'no-undef': 2,
        'no-underscore-dangle': 0,
        'no-unused-vars': 2,
        'object-curly-spacing': [ 2, 'always' ],
        quotes: [ 2, 'single' ],
        semi: [ 2, 'never' ],
        'no-unexpected-multiline': 2,
        'space-before-blocks': [ 2, 'always' ],
        'space-before-function-paren': [ 2, 'always' ],
        'no-warning-comments': [ 1,
            {
                terms: [ 'todo', 'fixme' ],
                location: 'anywhere',
            },
        ],
        strict: 0,
        'vars-on-top': 2,
        indent: [2, 4, { SwitchCase: 1 }],
        'import/no-extraneous-dependencies': [
            'error', {
                devDependencies: ['**/*.test.js', '**/*.spec.js'],
            },
        ],
    },
}`

};

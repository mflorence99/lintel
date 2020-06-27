/**
  Emulate ESLint settings when testing as straight Angular app

  NOTE:  deleted from index.html when running as extension
*/

// eslint-disable-next-line no-undef
eslintFiles = {

  '/home/mflorence99/lintel/package.json': `{
    "activationEvents": [
      "onCommand:lintel.start"
    ],
    "author": "Mark Florence",
    "categories": [
      "Linters"
    ],
    "contributes": {
      "commands": [
        {
          "category": "ESLint",
          "command": "lintel.start",
          "title": "Edit settings with Lintel"
        }
      ]
    },
    "dependencies": {
      "@angular/animations": "~9.1.4",
      "@angular/cdk": "^9.2.3",
      "@angular/common": "~9.1.4",
      "@angular/compiler": "~9.1.4",
      "@angular/core": "~9.1.4",
      "@angular/forms": "~9.1.4",
      "@angular/material": "^9.2.3",
      "@angular/platform-browser": "~9.1.4",
      "@angular/platform-browser-dynamic": "~9.1.4",
      "@angular/router": "~9.1.4",
      "@fortawesome/angular-fontawesome": "^0.6.1",
      "@fortawesome/fontawesome-svg-core": "^1.2.28",
      "@fortawesome/free-solid-svg-icons": "^5.13.0",
      "@ngxs-labs/data": "^3.0.4",
      "@ngxs/logger-plugin": "^3.6.2",
      "@ngxs/store": "^3.6.2",
      "rxjs": "~6.5.4",
      "tslib": "^1.10.0",
      "zone.js": "~0.10.2"
    },
    "description": "VSCode extension tovisualize ESLint configurations",
    "devDependencies": {
      "@angular-devkit/build-angular": "~0.901.4",
      "@angular-eslint/builder": "0.0.1-alpha.29",
      "@angular-eslint/eslint-plugin": "0.0.1-alpha.29",
      "@angular-eslint/eslint-plugin-template": "0.0.1-alpha.29",
      "@angular-eslint/schematics": "0.0.1-alpha.29",
      "@angular-eslint/template-parser": "0.0.1-alpha.29",
      "@angular/cli": "~9.1.4",
      "@angular/compiler-cli": "~9.1.4",
      "@angular/language-service": "~9.1.4",
      "@types/eslint": "^6.8.0",
      "@types/jest": "^25.2.1",
      "@types/node": "^12.11.1",
      "@types/vscode": "^1.44.0",
      "@typescript-eslint/eslint-plugin": "^2.31.0",
      "@typescript-eslint/eslint-plugin-tslint": "^2.31.0",
      "@typescript-eslint/parser": "^2.31.0",
      "eslint": "^6.8.0",
      "eslint-plugin-jest": "^23.9.0",
      "jest": "^25.2.1",
      "jest-preset-angular": "^8.1.3",
      "make-coverage-badge": "^1.2.0",
      "stylelint": "^13.3.3",
      "stylelint-config-standard": "^20.0.0",
      "stylelint-order": "^4.0.0",
      "stylelint-scss": "^3.17.1",
      "ts-node": "~8.3.0",
      "typescript": "~3.8.3",
      "vscode-test": "^1.3.0"
    },
    "engines": {
      "vscode": "^1.41.0"
    },
    "eslintConfig": {
      "extends": [
        "eslint:recommended",
        "plugin:compat/recommended",
        "plugin:jest/recommended",
        "plugin:lodash-fp/recommended",
        "plugin:node/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react-redux/recommended",
        "plugin:sonarjs/recommended",
        "plugin:unicorn/recommended",
        "plugin:vue/recommended",
        "plugin:@angular-eslint/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
      ],
      "globals": {
        "document": false,
        "globalThis": "off",
        "navigator": "readable",
        "window": true
      },
      "ignorePatterns": [
        "*.js",
        "node_modules/"
      ],
      "parserOptions": {
        "ecmaFeatures": {
          "arrowFunctions": true,
          "classes": false
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
      },
      "plugins": [
        "compat",
        "node",
        "react",
        "react-hooks",
        "react-native",
        "react-redux",
        "sonarjs",
        "unicorn",
        "vue",
        "@angular-eslint",
        "@typescript-eslint"
      ],
      "reportUnusedDisableDirectives": true,
      "rules": {
        "@typescript-eslint/brace-style": 2,
        "@typescript-eslint/class-literal-property-style": [
          "error",
          "fields"
        ],
        "@typescript-eslint/comma-spacing": [
          "error",
          {
            "after": true,
            "before": false
          }
        ],
        "@typescript-eslint/default-param-last": [
          "error"
        ],
        "@typescript-eslint/member-ordering": [
          "error",
          {
            "default": {
              "memberTypes": [
                "signature",
                "public-static-field",
                "protected-static-field",
                "private-static-field",
                "public-instance-field",
                "protected-instance-field",
                "private-instance-field",
                "public-abstract-field",
                "protected-abstract-field",
                "private-abstract-field",
                "public-field",
                "protected-field",
                "private-field",
                "static-field",
                "instance-field",
                "abstract-field",
                "field",
                "public-constructor",
                "protected-constructor",
                "private-constructor",
                "constructor",
                "public-static-method",
                "protected-static-method",
                "private-static-method",
                "public-instance-method",
                "protected-instance-method",
                "private-instance-method",
                "public-abstract-method",
                "protected-abstract-method",
                "private-abstract-method",
                "public-method",
                "protected-method",
                "private-method",
                "static-method",
                "instance-method",
                "abstract-method",
                "method"
              ],
              "order": "alphabetically"
            }
          }
        ],
        "@typescript-eslint/method-signature-style": [
          "warn",
          "method"
        ],
        "@typescript-eslint/naming-convention": [
          "warn",
          {
            "format": [
              "camelCase"
            ],
            "selector": "default"
          },
          {
            "format": [
              "camelCase",
              "UPPER_CASE"
            ],
            "selector": "variable"
          },
          {
            "format": [
              "camelCase"
            ],
            "selector": "parameter"
          },
          {
            "format": [
              "camelCase"
            ],
            "modifiers": [
              "private"
            ],
            "selector": "memberLike"
          },
          {
            "format": [
              "PascalCase"
            ],
            "selector": "typeLike"
          }
        ],
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-extra-non-null-assertion": [
          "error"
        ],
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
        "@typescript-eslint/no-unsafe-call": "error",
        "@typescript-eslint/no-unsafe-member-access": "error",
        "@typescript-eslint/no-unsafe-return": "error",
        "@typescript-eslint/quotes": [
          "error",
          "single"
        ],
        "@typescript-eslint/semi": [
          "error",
          "always"
        ],
        "brace-style": "error",
        "comma-spacing": "off",
        "default-param-last": "off",
        "eqeqeq": "error",
        "func-call-spacing": "error",
        "indent": [
          "error",
          2
        ],
        "jest/no-existential-angst": "warn",
        "keyword-spacing": [
          "error",
          {
            "after": true,
            "before": true
          }
        ],
        "prefer-shaken-not-stirred": "error",
        "quotes": 0,
        "semi": "off",
        "space-before-blocks": [
          "error",
          "always"
        ],
        "space-before-function-paren": [
          "error",
          "never"
        ],
        "space-in-parens": [
          "error",
          "never"
        ],
        "space-infix-ops": "error",
        "space-unary-ops": "error",
        "spaced-comment": [
          "error",
          "always"
        ]
      },
      "settings": {
        "hello": "World!",
        "goodbye": true,
        "ciao": 42
      }
    },
    "license": "MIT",
    "main": "./dist/ext/lintel.js",
    "name": "lintel",
    "private": true,
    "repository": {
      "type": "git",
      "url": "https://github.com/mflorence99/lintel"
    },
    "scripts": {
      "build": "ng build && tsc -p tsconfig.ext.json",
      "clean:caches": "jest --clearCache",
      "clean:deps": "rm -rf node_modules && rm package-lock.json && npm install",
      "lint": "eslint 'ext/**/*.ts' 'src/**/*.ts' --fix && stylelint 'src/**/*.css' 'src/**/*.scss' --fix",
      "ng": "ng",
      "start": "ng serve --open",
      "test": "jest --coverage && make-coverage-badge && mv ./coverage/badge.svg ./coverage.svg",
      "vscode:prepublish": "npm run build"
    },
    "version": "0.0.0"
  }`,
  '/home/mflorence99/el-3270/.eslintrc.js': `module.exports = {
    plugins: [
      "does-not-exist" // silly rule
    ],
    settings: {
      // cannot be edited
      complex: {
        setting: ['hello', 'world']
      }
    },
    rules: {
      // no braces
      "jest/no-existential-angst": "warn",
      "@typescript-eslint/brace-style": "off", // yep, really off
      curly: 0 + 1
    }
  };`,
  '/home/mflorence99/el-file/.eslintrc.json': `{
    "extends": "eslint:recommended",
    "plugins": [
      "does-not-exist"
    ]
    // the first rule is that there are no rules!
  }`,
  '/home/mflorence99/lintel/empty.json': '{ /* empty */ }',
  '/home/mflorence99/lintel/invalid.json': 'blah blah',
  '/home/mflorence99/lintel/common-js.cjs': 'module.exports = { };',
  '/home/mflorence99/lintel/src/app/.eslintrc.yaml': `
parserOptions:
  ecmaFeatures:
    globalReturn: true # turn it on
env:
  browser: true
rules:
  accessor-pairs: "warn"
  `
};

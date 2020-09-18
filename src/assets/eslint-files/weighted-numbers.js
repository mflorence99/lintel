eslintFiles = {
  '/home/mflorence99/weighted-numbers/package.json': `{
  "author": "Mark Florence",
  "description": "TypeScript implementation of bolazec's Go code",
  "devDependencies": {
    "@types/jest": "^25.2.3",
    "@types/node": "^13.13.14",
    "@typescript-eslint/eslint-plugin": "^3.6",
    "@typescript-eslint/parser": "^3.6",
    "eslint": "^6.8.0",
    "eslint-plugin-import-splitnsort": "^0.1.3",
    "jest": "^25.5.4",
    "make-coverage-badge": "^1.2.0",
    "ts-jest": "^25.5.1",
    "typescript": "^3.9.6"
  },
  "engines": {
    "node": ">= 12"
  },
  "eslintConfig": {
    "env": {
      "browser": true,
      "es2020": true,
      "jest": true,
      "node": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:import-splitnsort/recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "ignorePatterns": [
      "*.js",
      "node_modules/"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": 2018,
      "project": "./tsconfig.json",
      "sourceType": "module"
    },
    "plugins": [
      "@typescript-eslint",
      "import-splitnsort"
    ],
    "reportUnusedDisableDirectives": true,
    "rules": {
      "@typescript-eslint/brace-style": "error",
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
        "error",
        "method"
      ],
      "@typescript-eslint/naming-convention": [
        "error",
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
      "@typescript-eslint/no-explicit-any": "error",
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
      "keyword-spacing": [
        "error",
        {
          "after": true,
          "before": true
        }
      ],
      "quotes": "off",
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
    }
  },
  "jest": {
    "collectCoverage": true,
    "coveragePathIgnorePatterns": [
      "/node_modules/",
      "/dist/"
    ],
    "coverageReporters": [
      "json",
      "text"
    ],
    "preset": "ts-jest",
    "roots": [
      "<rootDir>/src"
    ],
    "testMatch": [
      "**/__tests__ /**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
      "^.+.(ts|tsx)$": "ts-jest"
    }
  },
  "license": "MIT",
  "name": "weighted-numbers",
  "repository": {
    "type": "git",
    "url": "https://github.com/mflorence99/weighted-numbers"
  },
  "scripts": {
    "clean": "rm -rf node_modules && rm package-lock.json && npm install",
    "lint": "eslint '*/**/*.ts' --fix",
    "test": "jest --coverage && make-coverage-badge && mv ./coverage/badge.svg ./coverage.svg"
  },
  "version": "0.0.0",
  "dependencies": {}
}`
};

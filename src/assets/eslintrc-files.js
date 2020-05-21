/**
  Emulate ESLint settings when testing as straight Angular app

  NOTE:  deleted from index.html when running as extension
*/

eslintrcFiles = {
  "package.json": {
    "env": {
      "browser": true,
      "es2020": true,
      "jest": true,
      "node": true
    },
    "extends": [
      "eslint:recommended",
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
      "@angular-eslint",
      "@typescript-eslint"
    ],
    "reportUnusedDisableDirectives": true,
    "root": true,
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
      "comma-spacing": "off",
      "brace-style": "error",
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
      ],
      "prefer-shaken-not-stirred": "error",
      "jest/no-existential-angst": "warn"
    }
  },
  "ext/.eslintrc.json": {
    "rules": {
      "@typescript-eslint/brace-style": "warn",
    }
  },
  "src/.eslintrc.yml": {
    "plugins": [
      'does-not-exist',
      "@typescript-eslint"
    ],
    "rules": {
      "@typescript-eslint/brace-style": "off",
    }
  },
  "src/app/.eslintrc.js": {
    "plugins": [
      "@typescript-eslint"
    ],
    "rules": {
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/no-explicit-any": "error"
    }
  }
}

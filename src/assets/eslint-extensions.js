
  // autogenerated by bin/eslint-extensions.ts
  /* eslint-disable */
  eslintExtensions = {
  "eslint:recommended": {
    "rules": {
      "constructor-super": "error",
      "for-direction": "error",
      "getter-return": "error",
      "no-async-promise-executor": "error",
      "no-case-declarations": "error",
      "no-class-assign": "error",
      "no-compare-neg-zero": "error",
      "no-cond-assign": "error",
      "no-const-assign": "error",
      "no-constant-condition": "error",
      "no-control-regex": "error",
      "no-debugger": "error",
      "no-delete-var": "error",
      "no-dupe-args": "error",
      "no-dupe-class-members": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-empty": "error",
      "no-empty-character-class": "error",
      "no-empty-pattern": "error",
      "no-ex-assign": "error",
      "no-extra-boolean-cast": "error",
      "no-extra-semi": "error",
      "no-fallthrough": "error",
      "no-func-assign": "error",
      "no-global-assign": "error",
      "no-inner-declarations": "error",
      "no-invalid-regexp": "error",
      "no-irregular-whitespace": "error",
      "no-misleading-character-class": "error",
      "no-mixed-spaces-and-tabs": "error",
      "no-new-symbol": "error",
      "no-obj-calls": "error",
      "no-octal": "error",
      "no-prototype-builtins": "error",
      "no-redeclare": "error",
      "no-regex-spaces": "error",
      "no-self-assign": "error",
      "no-shadow-restricted-names": "error",
      "no-sparse-arrays": "error",
      "no-this-before-super": "error",
      "no-undef": "error",
      "no-unexpected-multiline": "error",
      "no-unreachable": "error",
      "no-unsafe-finally": "error",
      "no-unsafe-negation": "error",
      "no-unused-labels": "error",
      "no-unused-vars": "error",
      "no-useless-catch": "error",
      "no-useless-escape": "error",
      "no-with": "error",
      "require-yield": "error",
      "use-isnan": "error",
      "valid-typeof": "error"
    }
  },
  "plugin:compat/recommended": {
    "plugins": [
      "compat"
    ],
    "env": {
      "browser": true
    },
    "rules": {
      "compat/compat": "error"
    }
  },
  "plugin:jest/recommended": {
    "plugins": [
      "jest"
    ],
    "env": {
      "jest/globals": true
    },
    "rules": {
      "jest/expect-expect": "warn",
      "jest/no-commented-out-tests": "warn",
      "jest/no-disabled-tests": "warn",
      "jest/no-export": "error",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/no-jest-import": "error",
      "jest/no-mocks-import": "error",
      "jest/no-jasmine-globals": "warn",
      "jest/no-standalone-expect": "error",
      "jest/no-test-callback": "error",
      "jest/no-test-prefixes": "error",
      "jest/no-try-expect": "error",
      "jest/valid-describe": "error",
      "jest/valid-expect": "error",
      "jest/valid-expect-in-promise": "error"
    }
  },
  "plugin:lodash/recommended": {
    "plugins": [
      "lodash"
    ],
    "rules": {
      "lodash/callback-binding": 2,
      "lodash/chain-style": [
        2,
        "as-needed"
      ],
      "lodash/chaining": 2,
      "lodash/collection-method-value": 2,
      "lodash/collection-ordering": 2,
      "lodash/collection-return": 2,
      "lodash/consistent-compose": [
        2,
        "flow"
      ],
      "lodash/identity-shorthand": [
        2,
        "always"
      ],
      "lodash/import-scope": [
        2
      ],
      "lodash/matches-prop-shorthand": [
        2,
        "always"
      ],
      "lodash/matches-shorthand": [
        2,
        "always",
        3
      ],
      "lodash/no-commit": 2,
      "lodash/no-double-unwrap": 2,
      "lodash/no-extra-args": 2,
      "lodash/no-unbound-this": 2,
      "lodash/path-style": [
        2,
        "string"
      ],
      "lodash/prefer-compact": 2,
      "lodash/prefer-constant": 2,
      "lodash/prefer-filter": [
        2,
        3
      ],
      "lodash/prefer-find": 2,
      "lodash/prefer-flat-map": 2,
      "lodash/prefer-get": [
        2,
        3
      ],
      "lodash/prefer-immutable-method": 2,
      "lodash/prefer-includes": [
        2,
        {
          "includeNative": true
        }
      ],
      "lodash/prefer-invoke-map": 2,
      "lodash/prefer-is-nil": 2,
      "lodash/prefer-lodash-chain": 2,
      "lodash/prefer-lodash-method": 2,
      "lodash/prefer-lodash-typecheck": 2,
      "lodash/prefer-map": 2,
      "lodash/prefer-matches": [
        2,
        3
      ],
      "lodash/prefer-noop": 2,
      "lodash/prefer-over-quantifier": 2,
      "lodash/prefer-reject": [
        2,
        3
      ],
      "lodash/prefer-some": [
        2,
        {
          "includeNative": true
        }
      ],
      "lodash/prefer-startswith": 2,
      "lodash/prefer-thru": 2,
      "lodash/prefer-times": 2,
      "lodash/prefer-wrapper-method": 2,
      "lodash/preferred-alias": 2,
      "lodash/prop-shorthand": [
        2,
        "always"
      ],
      "lodash/unwrap": 2
    }
  },
  "plugin:lodash-fp/recommended": {
    "plugins": [
      "lodash-fp"
    ],
    "rules": {
      "lodash-fp/consistent-compose": "off",
      "lodash-fp/consistent-name": [
        "error",
        "_"
      ],
      "lodash-fp/no-argumentless-calls": "error",
      "lodash-fp/no-chain": "error",
      "lodash-fp/no-extraneous-args": "error",
      "lodash-fp/no-extraneous-function-wrapping": "error",
      "lodash-fp/no-extraneous-iteratee-args": "error",
      "lodash-fp/no-extraneous-partials": "off",
      "lodash-fp/no-for-each": "off",
      "lodash-fp/no-partial-of-curried": "error",
      "lodash-fp/no-single-composition": "error",
      "lodash-fp/no-submodule-destructuring": "error",
      "lodash-fp/no-unused-result": "error",
      "lodash-fp/prefer-compact": "error",
      "lodash-fp/prefer-composition-grouping": "error",
      "lodash-fp/prefer-constant": [
        "error",
        {
          "arrowFunctions": false
        }
      ],
      "lodash-fp/prefer-flat-map": "error",
      "lodash-fp/prefer-get": "error",
      "lodash-fp/prefer-identity": [
        "error",
        {
          "arrowFunctions": false
        }
      ],
      "lodash-fp/preferred-alias": "off",
      "lodash-fp/use-fp": "error"
    }
  },
  "plugin:node/recommended": {
    "globals": {
      "ArrayBuffer": "readonly",
      "Atomics": "readonly",
      "BigInt": "readonly",
      "BigInt64Array": "readonly",
      "BigUint64Array": "readonly",
      "DataView": "readonly",
      "Float32Array": "readonly",
      "Float64Array": "readonly",
      "Int16Array": "readonly",
      "Int32Array": "readonly",
      "Int8Array": "readonly",
      "Map": "readonly",
      "Promise": "readonly",
      "Proxy": "readonly",
      "Reflect": "readonly",
      "Set": "readonly",
      "SharedArrayBuffer": "readonly",
      "Symbol": "readonly",
      "Uint16Array": "readonly",
      "Uint32Array": "readonly",
      "Uint8Array": "readonly",
      "Uint8ClampedArray": "readonly",
      "WeakMap": "readonly",
      "WeakSet": "readonly",
      "globalThis": "readonly",
      "Intl": "readonly",
      "TextDecoder": "readonly",
      "TextEncoder": "readonly",
      "URL": "readonly",
      "URLSearchParams": "readonly",
      "WebAssembly": "readonly",
      "clearInterval": "readonly",
      "clearTimeout": "readonly",
      "console": "readonly",
      "queueMicrotask": "readonly",
      "setInterval": "readonly",
      "setTimeout": "readonly",
      "Buffer": "readonly",
      "GLOBAL": "readonly",
      "clearImmediate": "readonly",
      "global": "readonly",
      "process": "readonly",
      "root": "readonly",
      "setImmediate": "readonly",
      "__dirname": "readonly",
      "__filename": "readonly",
      "exports": "writable",
      "module": "readonly",
      "require": "readonly"
    },
    "parserOptions": {
      "ecmaFeatures": {
        "globalReturn": true
      },
      "ecmaVersion": 2019,
      "sourceType": "script"
    },
    "plugins": [
      "node"
    ],
    "rules": {
      "no-process-exit": "error",
      "node/no-deprecated-api": "error",
      "node/no-extraneous-import": "error",
      "node/no-extraneous-require": "error",
      "node/no-exports-assign": "error",
      "node/no-missing-import": "error",
      "node/no-missing-require": "error",
      "node/no-unpublished-bin": "error",
      "node/no-unpublished-import": "error",
      "node/no-unpublished-require": "error",
      "node/no-unsupported-features/es-builtins": "error",
      "node/no-unsupported-features/es-syntax": [
        "error",
        {
          "ignores": []
        }
      ],
      "node/no-unsupported-features/node-builtins": "error",
      "node/process-exit-as-throw": "error",
      "node/shebang": "error"
    },
    "overrides": [
      {
        "files": [
          "*.cjs",
          ".*.cjs"
        ],
        "globals": {
          "ArrayBuffer": "readonly",
          "Atomics": "readonly",
          "BigInt": "readonly",
          "BigInt64Array": "readonly",
          "BigUint64Array": "readonly",
          "DataView": "readonly",
          "Float32Array": "readonly",
          "Float64Array": "readonly",
          "Int16Array": "readonly",
          "Int32Array": "readonly",
          "Int8Array": "readonly",
          "Map": "readonly",
          "Promise": "readonly",
          "Proxy": "readonly",
          "Reflect": "readonly",
          "Set": "readonly",
          "SharedArrayBuffer": "readonly",
          "Symbol": "readonly",
          "Uint16Array": "readonly",
          "Uint32Array": "readonly",
          "Uint8Array": "readonly",
          "Uint8ClampedArray": "readonly",
          "WeakMap": "readonly",
          "WeakSet": "readonly",
          "globalThis": "readonly",
          "Intl": "readonly",
          "TextDecoder": "readonly",
          "TextEncoder": "readonly",
          "URL": "readonly",
          "URLSearchParams": "readonly",
          "WebAssembly": "readonly",
          "clearInterval": "readonly",
          "clearTimeout": "readonly",
          "console": "readonly",
          "queueMicrotask": "readonly",
          "setInterval": "readonly",
          "setTimeout": "readonly",
          "Buffer": "readonly",
          "GLOBAL": "readonly",
          "clearImmediate": "readonly",
          "global": "readonly",
          "process": "readonly",
          "root": "readonly",
          "setImmediate": "readonly",
          "__dirname": "readonly",
          "__filename": "readonly",
          "exports": "writable",
          "module": "readonly",
          "require": "readonly"
        },
        "parserOptions": {
          "ecmaFeatures": {
            "globalReturn": true
          },
          "ecmaVersion": 2019,
          "sourceType": "script"
        },
        "plugins": [
          "node"
        ],
        "rules": {
          "no-process-exit": "error",
          "node/no-deprecated-api": "error",
          "node/no-extraneous-import": "error",
          "node/no-extraneous-require": "error",
          "node/no-exports-assign": "error",
          "node/no-missing-import": "error",
          "node/no-missing-require": "error",
          "node/no-unpublished-bin": "error",
          "node/no-unpublished-import": "error",
          "node/no-unpublished-require": "error",
          "node/no-unsupported-features/es-builtins": "error",
          "node/no-unsupported-features/es-syntax": [
            "error",
            {
              "ignores": []
            }
          ],
          "node/no-unsupported-features/node-builtins": "error",
          "node/process-exit-as-throw": "error",
          "node/shebang": "error"
        }
      },
      {
        "files": [
          "*.mjs",
          ".*.mjs"
        ],
        "globals": {
          "ArrayBuffer": "readonly",
          "Atomics": "readonly",
          "BigInt": "readonly",
          "BigInt64Array": "readonly",
          "BigUint64Array": "readonly",
          "DataView": "readonly",
          "Float32Array": "readonly",
          "Float64Array": "readonly",
          "Int16Array": "readonly",
          "Int32Array": "readonly",
          "Int8Array": "readonly",
          "Map": "readonly",
          "Promise": "readonly",
          "Proxy": "readonly",
          "Reflect": "readonly",
          "Set": "readonly",
          "SharedArrayBuffer": "readonly",
          "Symbol": "readonly",
          "Uint16Array": "readonly",
          "Uint32Array": "readonly",
          "Uint8Array": "readonly",
          "Uint8ClampedArray": "readonly",
          "WeakMap": "readonly",
          "WeakSet": "readonly",
          "globalThis": "readonly",
          "Intl": "readonly",
          "TextDecoder": "readonly",
          "TextEncoder": "readonly",
          "URL": "readonly",
          "URLSearchParams": "readonly",
          "WebAssembly": "readonly",
          "clearInterval": "readonly",
          "clearTimeout": "readonly",
          "console": "readonly",
          "queueMicrotask": "readonly",
          "setInterval": "readonly",
          "setTimeout": "readonly",
          "Buffer": "readonly",
          "GLOBAL": "readonly",
          "clearImmediate": "readonly",
          "global": "readonly",
          "process": "readonly",
          "root": "readonly",
          "setImmediate": "readonly",
          "__dirname": "off",
          "__filename": "off",
          "exports": "off",
          "module": "off",
          "require": "off"
        },
        "parserOptions": {
          "ecmaFeatures": {
            "globalReturn": false
          },
          "ecmaVersion": 2019,
          "sourceType": "module"
        },
        "plugins": [
          "node"
        ],
        "rules": {
          "no-process-exit": "error",
          "node/no-deprecated-api": "error",
          "node/no-extraneous-import": "error",
          "node/no-extraneous-require": "error",
          "node/no-exports-assign": "error",
          "node/no-missing-import": "error",
          "node/no-missing-require": "error",
          "node/no-unpublished-bin": "error",
          "node/no-unpublished-import": "error",
          "node/no-unpublished-require": "error",
          "node/no-unsupported-features/es-builtins": "error",
          "node/no-unsupported-features/es-syntax": [
            "error",
            {
              "ignores": [
                "modules"
              ]
            }
          ],
          "node/no-unsupported-features/node-builtins": "error",
          "node/process-exit-as-throw": "error",
          "node/shebang": "error"
        }
      }
    ]
  },
  "plugin:react/recommended": {
    "plugins": [
      "react"
    ],
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "rules": {
      "react/display-name": 2,
      "react/jsx-key": 2,
      "react/jsx-no-comment-textnodes": 2,
      "react/jsx-no-duplicate-props": 2,
      "react/jsx-no-target-blank": 2,
      "react/jsx-no-undef": 2,
      "react/jsx-uses-react": 2,
      "react/jsx-uses-vars": 2,
      "react/no-children-prop": 2,
      "react/no-danger-with-children": 2,
      "react/no-deprecated": 2,
      "react/no-direct-mutation-state": 2,
      "react/no-find-dom-node": 2,
      "react/no-is-mounted": 2,
      "react/no-render-return-value": 2,
      "react/no-string-refs": 2,
      "react/no-unescaped-entities": 2,
      "react/no-unknown-property": 2,
      "react/no-unsafe": 0,
      "react/prop-types": 2,
      "react/react-in-jsx-scope": 2,
      "react/require-render-return": 2
    }
  },
  "plugin:react-hooks/recommended": {
    "plugins": [
      "react-hooks"
    ],
    "rules": {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    }
  },
  "plugin:react-redux/recommended": {
    "rules": {
      "react-redux/connect-prefer-minimum-two-arguments": 0,
      "react-redux/connect-prefer-named-arguments": 2,
      "react-redux/mapDispatchToProps-prefer-parameters-names": 2,
      "react-redux/mapDispatchToProps-prefer-shorthand": 2,
      "react-redux/mapDispatchToProps-returns-object": 2,
      "react-redux/mapStateToProps-no-store": 2,
      "react-redux/mapStateToProps-prefer-hoisted": 2,
      "react-redux/mapStateToProps-prefer-parameters-names": 2,
      "react-redux/no-unused-prop-types": 2,
      "react-redux/prefer-separate-component-file": 1
    }
  },
  "plugin:sonarjs/recommended": {
    "plugins": [
      "sonarjs"
    ],
    "rules": {
      "sonarjs/cognitive-complexity": "error",
      "sonarjs/max-switch-cases": "error",
      "sonarjs/no-all-duplicated-branches": "error",
      "sonarjs/no-collapsible-if": "error",
      "sonarjs/no-collection-size-mischeck": "error",
      "sonarjs/no-duplicate-string": "error",
      "sonarjs/no-duplicated-branches": "error",
      "sonarjs/no-element-overwrite": "error",
      "sonarjs/no-extra-arguments": "error",
      "sonarjs/no-identical-conditions": "error",
      "sonarjs/no-identical-functions": "error",
      "sonarjs/no-identical-expressions": "error",
      "sonarjs/no-inverted-boolean-check": "error",
      "sonarjs/no-one-iteration-loop": "error",
      "sonarjs/no-redundant-boolean": "error",
      "sonarjs/no-redundant-jump": "error",
      "sonarjs/no-same-line-conditional": "error",
      "sonarjs/no-small-switch": "error",
      "sonarjs/no-unused-collection": "error",
      "sonarjs/no-use-of-empty-return-value": "error",
      "sonarjs/no-useless-catch": "error",
      "sonarjs/prefer-immediate-return": "error",
      "sonarjs/prefer-object-literal": "error",
      "sonarjs/prefer-single-boolean-return": "error",
      "sonarjs/prefer-while": "error"
    }
  },
  "plugin:unicorn/recommended": {
    "env": {
      "es6": true
    },
    "parserOptions": {
      "ecmaVersion": 2020,
      "sourceType": "module"
    },
    "plugins": [
      "unicorn"
    ],
    "rules": {
      "unicorn/better-regex": "error",
      "unicorn/catch-error-name": "error",
      "unicorn/consistent-function-scoping": "error",
      "unicorn/custom-error-definition": "off",
      "unicorn/error-message": "error",
      "unicorn/escape-case": "error",
      "unicorn/expiring-todo-comments": "error",
      "unicorn/explicit-length-check": "error",
      "unicorn/filename-case": "error",
      "unicorn/import-index": "error",
      "unicorn/new-for-builtins": "error",
      "unicorn/no-abusive-eslint-disable": "error",
      "unicorn/no-array-instanceof": "error",
      "unicorn/no-console-spaces": "error",
      "unicorn/no-fn-reference-in-iterator": "error",
      "unicorn/no-for-loop": "error",
      "unicorn/no-hex-escape": "error",
      "unicorn/no-keyword-prefix": "off",
      "no-nested-ternary": "off",
      "unicorn/no-nested-ternary": "error",
      "unicorn/no-new-buffer": "error",
      "unicorn/no-null": "error",
      "unicorn/no-process-exit": "error",
      "unicorn/no-unreadable-array-destructuring": "error",
      "unicorn/no-unsafe-regex": "off",
      "unicorn/no-unused-properties": "off",
      "unicorn/no-zero-fractions": "error",
      "unicorn/number-literal-case": "error",
      "unicorn/prefer-add-event-listener": "error",
      "unicorn/prefer-dataset": "error",
      "unicorn/prefer-event-key": "error",
      "unicorn/prefer-flat-map": "error",
      "unicorn/prefer-includes": "error",
      "unicorn/prefer-modern-dom-apis": "error",
      "unicorn/prefer-negative-index": "error",
      "unicorn/prefer-node-append": "error",
      "unicorn/prefer-node-remove": "error",
      "unicorn/prefer-number-properties": "error",
      "unicorn/prefer-query-selector": "error",
      "unicorn/prefer-reflect-apply": "error",
      "unicorn/prefer-replace-all": "off",
      "unicorn/prefer-set-has": "error",
      "unicorn/prefer-spread": "error",
      "unicorn/prefer-starts-ends-with": "error",
      "unicorn/prefer-string-slice": "error",
      "unicorn/prefer-text-content": "error",
      "unicorn/prefer-trim-start-end": "error",
      "unicorn/prefer-type-error": "error",
      "unicorn/prevent-abbreviations": "error",
      "unicorn/string-content": "off",
      "unicorn/throw-new-error": "error"
    }
  },
  "plugin:vue/recommended": {
    "rules": {
      "vue/attributes-order": "warn",
      "vue/no-v-html": "warn",
      "vue/order-in-components": "warn",
      "vue/this-in-template": "warn",
      "vue/comment-directive": [
        "error"
      ],
      "vue/jsx-uses-vars": [
        "error"
      ],
      "vue/no-async-in-computed-properties": [
        "error"
      ],
      "vue/no-dupe-keys": [
        "error"
      ],
      "vue/no-duplicate-attributes": [
        "error"
      ],
      "vue/no-parsing-error": [
        "error"
      ],
      "vue/no-reserved-keys": [
        "error"
      ],
      "vue/no-shared-component-data": [
        "error"
      ],
      "vue/no-side-effects-in-computed-properties": [
        "error"
      ],
      "vue/no-template-key": [
        "error"
      ],
      "vue/no-textarea-mustache": [
        "error"
      ],
      "vue/no-unused-components": [
        "error"
      ],
      "vue/no-unused-vars": [
        "error"
      ],
      "vue/no-use-v-if-with-v-for": [
        "error"
      ],
      "vue/require-component-is": [
        "error"
      ],
      "vue/require-prop-type-constructor": [
        "error"
      ],
      "vue/require-render-return": [
        "error"
      ],
      "vue/require-v-for-key": [
        "error"
      ],
      "vue/require-valid-default-prop": [
        "error"
      ],
      "vue/return-in-computed-property": [
        "error"
      ],
      "vue/use-v-on-exact": [
        "error"
      ],
      "vue/valid-template-root": [
        "error"
      ],
      "vue/valid-v-bind": [
        "error"
      ],
      "vue/valid-v-cloak": [
        "error"
      ],
      "vue/valid-v-else-if": [
        "error"
      ],
      "vue/valid-v-else": [
        "error"
      ],
      "vue/valid-v-for": [
        "error"
      ],
      "vue/valid-v-html": [
        "error"
      ],
      "vue/valid-v-if": [
        "error"
      ],
      "vue/valid-v-model": [
        "error"
      ],
      "vue/valid-v-on": [
        "error"
      ],
      "vue/valid-v-once": [
        "error"
      ],
      "vue/valid-v-pre": [
        "error"
      ],
      "vue/valid-v-show": [
        "error"
      ],
      "vue/valid-v-text": [
        "error"
      ],
      "vue/attribute-hyphenation": [
        "warn"
      ],
      "vue/html-closing-bracket-newline": [
        "warn"
      ],
      "vue/html-closing-bracket-spacing": [
        "warn"
      ],
      "vue/html-end-tags": [
        "warn"
      ],
      "vue/html-indent": [
        "warn"
      ],
      "vue/html-quotes": [
        "warn"
      ],
      "vue/html-self-closing": [
        "warn"
      ],
      "vue/max-attributes-per-line": [
        "warn"
      ],
      "vue/multiline-html-element-content-newline": [
        "warn"
      ],
      "vue/mustache-interpolation-spacing": [
        "warn"
      ],
      "vue/name-property-casing": [
        "warn"
      ],
      "vue/no-multi-spaces": [
        "warn"
      ],
      "vue/no-spaces-around-equal-signs-in-attribute": [
        "warn"
      ],
      "vue/no-template-shadow": [
        "warn"
      ],
      "vue/prop-name-casing": [
        "warn"
      ],
      "vue/require-default-prop": [
        "warn"
      ],
      "vue/require-prop-types": [
        "warn"
      ],
      "vue/singleline-html-element-content-newline": [
        "warn"
      ],
      "vue/v-bind-style": [
        "warn"
      ],
      "vue/v-on-style": [
        "warn"
      ]
    },
    "parser": "/home/mflo/mflorence99/lintel/node_modules/vue-eslint-parser/index.js",
    "parserOptions": {
      "ecmaVersion": 2018,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "env": {
      "browser": true,
      "es6": true
    },
    "plugins": [
      "vue"
    ]
  },
  "plugin:@angular-eslint/recommended": {
    "rules": {
      "@typescript-eslint/array-type": "off",
      "arrow-parens": "off",
      "no-restricted-imports": [
        "error",
        {
          "paths": [
            {
              "name": "rxjs/Rx",
              "message": "Please import directly from 'rxjs' instead"
            }
          ]
        }
      ],
      "@typescript-eslint/interface-name-prefix": "off",
      "max-classes-per-file": "off",
      "max-len": [
        "error",
        {
          "code": 140
        }
      ],
      "@typescript-eslint/explicit-member-accessibility": "off",
      "@typescript-eslint/member-ordering": [
        "error",
        {
          "default": [
            "static-field",
            "instance-field",
            "static-method",
            "instance-method"
          ]
        }
      ],
      "no-multiple-empty-lines": "off",
      "no-restricted-syntax": [
        "error",
        {
          "selector": "CallExpression[callee.object.name=\"console\"][callee.property.name=/^(debug|info|time|timeEnd|trace)$/]",
          "message": "Unexpected property on console object was called"
        }
      ],
      "no-empty": "off",
      "@typescript-eslint/no-inferrable-types": [
        "error",
        {
          "ignoreParameters": true
        }
      ],
      "@typescript-eslint/no-non-null-assertion": "error",
      "no-fallthrough": "error",
      "@typescript-eslint/no-var-requires": "off",
      "quote-props": [
        "error",
        "as-needed"
      ],
      "sort-keys": "off",
      "quotes": [
        "error",
        "single"
      ],
      "comma-dangle": "off",
      "@angular-eslint/component-class-suffix": "error",
      "@angular-eslint/contextual-lifecycle": "error",
      "@angular-eslint/directive-class-suffix": "error",
      "@angular-eslint/no-conflicting-lifecycle": "error",
      "@angular-eslint/no-host-metadata-property": "error",
      "@angular-eslint/no-input-rename": "error",
      "@angular-eslint/no-inputs-metadata-property": "error",
      "@angular-eslint/no-output-native": "error",
      "@angular-eslint/no-output-on-prefix": "error",
      "@angular-eslint/no-output-rename": "error",
      "@angular-eslint/no-outputs-metadata-property": "error",
      "@angular-eslint/use-lifecycle-interface": "warn",
      "@angular-eslint/use-pipe-transform-interface": "error"
    },
    "overrides": [
      {
        "files": [
          "*.component.html"
        ],
        "parser": "@angular-eslint/template-parser",
        "plugins": [
          "@angular-eslint/template"
        ],
        "rules": {
          "@angular-eslint/template/banana-in-a-box": "error",
          "@angular-eslint/template/no-negated-async": "error"
        }
      }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": 2020,
      "sourceType": "module",
      "project": "./tsconfig.json"
    },
    "plugins": [
      "@typescript-eslint",
      "@angular-eslint"
    ]
  },
  "plugin:@typescript-eslint/eslint-recommended": {
    "overrides": [
      {
        "files": [
          "*.ts",
          "*.tsx"
        ],
        "rules": {
          "constructor-super": "off",
          "getter-return": "off",
          "no-const-assign": "off",
          "no-dupe-args": "off",
          "no-dupe-class-members": "off",
          "no-dupe-keys": "off",
          "no-func-assign": "off",
          "no-import-assign": "off",
          "no-new-symbol": "off",
          "no-obj-calls": "off",
          "no-redeclare": "off",
          "no-setter-return": "off",
          "no-this-before-super": "off",
          "no-undef": "off",
          "no-unreachable": "off",
          "no-unsafe-negation": "off",
          "no-var": "error",
          "prefer-const": "error",
          "prefer-rest-params": "error",
          "prefer-spread": "error",
          "valid-typeof": "off"
        }
      }
    ]
  },
  "plugin:@typescript-eslint/recommended": {
    "rules": {
      "@typescript-eslint/adjacent-overload-signatures": "error",
      "@typescript-eslint/ban-ts-comment": "error",
      "@typescript-eslint/ban-types": "error",
      "@typescript-eslint/explicit-module-boundary-types": "warn",
      "no-array-constructor": "off",
      "@typescript-eslint/no-array-constructor": "error",
      "no-empty-function": "off",
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-extra-non-null-assertion": "error",
      "no-extra-semi": "off",
      "@typescript-eslint/no-extra-semi": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/no-misused-new": "error",
      "@typescript-eslint/no-namespace": "error",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-this-alias": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/prefer-as-const": "error",
      "@typescript-eslint/prefer-namespace-keyword": "error",
      "@typescript-eslint/triple-slash-reference": "error"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "sourceType": "module"
    },
    "plugins": [
      "@typescript-eslint"
    ],
    "overrides": [
      {
        "files": [
          "*.ts",
          "*.tsx"
        ],
        "rules": {
          "constructor-super": "off",
          "getter-return": "off",
          "no-const-assign": "off",
          "no-dupe-args": "off",
          "no-dupe-class-members": "off",
          "no-dupe-keys": "off",
          "no-func-assign": "off",
          "no-import-assign": "off",
          "no-new-symbol": "off",
          "no-obj-calls": "off",
          "no-redeclare": "off",
          "no-setter-return": "off",
          "no-this-before-super": "off",
          "no-undef": "off",
          "no-unreachable": "off",
          "no-unsafe-negation": "off",
          "no-var": "error",
          "prefer-const": "error",
          "prefer-rest-params": "error",
          "prefer-spread": "error",
          "valid-typeof": "off"
        }
      }
    ]
  },
  "plugin:@typescript-eslint/recommended-requiring-type-checking": {
    "rules": {
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-for-in-array": "error",
      "@typescript-eslint/no-implied-eval": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/prefer-regexp-exec": "error",
      "require-await": "off",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/restrict-plus-operands": "error",
      "@typescript-eslint/restrict-template-expressions": "error",
      "@typescript-eslint/unbound-method": "error"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "sourceType": "module"
    },
    "plugins": [
      "@typescript-eslint"
    ],
    "overrides": [
      {
        "files": [
          "*.ts",
          "*.tsx"
        ],
        "rules": {
          "constructor-super": "off",
          "getter-return": "off",
          "no-const-assign": "off",
          "no-dupe-args": "off",
          "no-dupe-class-members": "off",
          "no-dupe-keys": "off",
          "no-func-assign": "off",
          "no-import-assign": "off",
          "no-new-symbol": "off",
          "no-obj-calls": "off",
          "no-redeclare": "off",
          "no-setter-return": "off",
          "no-this-before-super": "off",
          "no-undef": "off",
          "no-unreachable": "off",
          "no-unsafe-negation": "off",
          "no-var": "error",
          "prefer-const": "error",
          "prefer-rest-params": "error",
          "prefer-spread": "error",
          "valid-typeof": "off"
        }
      }
    ]
  }
}
  
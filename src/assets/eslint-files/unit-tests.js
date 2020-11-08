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
      "overrides": [
        {
          "files": ["*.md"],
          "ignorePatterns": ["*.mdx"],
          "rules": {
            "node/callback-return": "error"
          }
        },
        {
          "files": ["*.html"],
          "globals": { "Event": "off" },
          "rules": {
            "node/exports-style": "warn"
          }
        },
        {
          "files": ["*.ts", "*.tsx"],
          "parser": "esprima",
          "rules": {
            "node/file-extension-in-import": "off"
          }
        },
        {
          "files": ["*.empty"]
        }
      ],
      "extends": [
        "eslint:recommended",
        "plugin:compat/recommended",
        "plugin:import-splitnsort/recommended",
        "plugin:jest/recommended",
        "plugin:lodash-fp/recommended",
        "plugin:node/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react-redux/recommended",
        "plugin:vue/recommended",
        "plugin:@angular-eslint/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
      ],
      "globals": {
        "document": "readonly",
        "globalThis": "off",
        "navigator": "readable",
        "xwindow": "writable"
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
        "project": [
          "./tsconfig.app.json",
          "./tsconfig.bin.json",
          "./tsconfig.ext.json",
          "./tsconfig.spec.json"
        ],
        "sourceType": "module"
      },
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
  '/home/mflorence99/issue-24/.eslintrc.json': `/**
 * -----------------------------------------------------
 * NOTES ON CONFIGURATION STRUCTURE
 * -----------------------------------------------------
 *
 * Out of the box, ESLint does not support TypeScript or HTML. Naturally those are the two
 * main file types we care about in Angular projects, so we have to do a little extra work
 * to configure ESLint exactly how we need to.
 *
 * Fortunately, ESLint gives us an "overrides" configuration option which allows us to set
 * different lint tooling (parser, plugins, rules etc) for different file types, which is
 * critical because our .ts files require a different parser and different rules to our
 * .html (and our inline Component) templates.
 */
{
	"root": true,
	"overrides": [
		/**
		 * -----------------------------------------------------
		 * TYPESCRIPT FILES (COMPONENTS, SERVICES ETC) (.ts)
		 * -----------------------------------------------------
		 * The 'parser'-property is defined in 'plugin:@angular-eslint/recommended'.
		 */
		{
			"files": ["*.ts"],
			"parserOptions": {
				"project": ["**/tsconfig.*?.json"],
				"createDefaultProgram": true
			},
			"extends": [
				// Uses the recommended rules for TypeScript and Angular.
				// https://github.com/angular-eslint/angular-eslint#rules-list
				// https://github.com/angular-eslint/angular-eslint/tree/master/packages/eslint-plugin/src/configs
				"plugin:@angular-eslint/recommended",

				// Uses eslint-config-prettier to disable ESLint rules that would conflict with prettier.
				"prettier/@typescript-eslint",

				// Enables eslint-plugin-prettier and eslint-config-prettier.
				// This will display prettier errors as ESLint errors.
				// Make sure this is always the last configuration in the extends array.
				"plugin:prettier/recommended"
			],
			"rules": {
				/**
				 * Any TypeScript related rules you wish to use/reconfigure over and above the
				 * recommended set provided by the @angular-eslint project would go here.
				 */

				// Prettier has 'printWidth' set to a lower number, which is the preferred *readable* line length.
				// But Prettier doesn't enforce this on all lines, e.g. single imports.
				// This setting just ensures that we never have too long lines.
				"max-len": ["error", { "code": 140, "ignoreUrls": true }],

				// Require explicit accessibility modifiers on class properties and methods.
				"@typescript-eslint/explicit-member-accessibility": ["error"],

				// Disallows explicit type declarations on parameters, variables and properties.
				// TODO: find rule to enforce explicit type declarations.
				"@typescript-eslint/no-inferrable-types": ["off"],

				// Disallow the use of console.
				"no-console": ["warn", { "allow": ["error"] }],

				// Use generic array 'Array<T>'.
				"@typescript-eslint/array-type": ["error", { "default": "generic" }],

				// TypeScript suggests never prefixing interfaces with "I".
				// https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines#names
				"@typescript-eslint/naming-convention": [
					"error",
					{
						"selector": "interface",
						"format": ["PascalCase"],
						"custom": {
							"regex": "^I[A-Z]",
							"match": false
						}
					}
				],

				// Only one class per file.
				"max-classes-per-file": ["error", 1],

				// Use TypeScript import syntax.
				"@typescript-eslint/no-var-requires": ["error"],

				// Use dot notation 'foo.bar' over square-bracket notation 'foo["bar"]'.
				"dot-notation": ["error"],

				// Disallow unused variables & declarations.
				"no-unused-vars": "off", // Disable the base rule as it can report incorrect errors.
				"@typescript-eslint/no-unused-vars": ["error"],

				// Remove useless constructor.
				"no-useless-constructor": "off", // Disable the base rule as it can report incorrect errors.
				"@typescript-eslint/no-useless-constructor": ["error"],

				// This rule enforces not using parameter properties.
				// Actually, this rule should be inversed and 'private readonly' should be enforced.
				// But for now no parameter properties are allowed, but 'private readonly' is preferred.
				// TODO: find solution to inverse this rule and enforce 'private readonly'. See https://github.com/typescript-eslint/typescript-eslint/issues/103
				"@typescript-eslint/no-parameter-properties": [
					"error",
					{ "allows": ["private readonly"] }
				],

				// Disallow reassignment of parameters.
				"no-param-reassign": ["error"]

				// "@typescript-eslint/strict-boolean-expressions": ["error"]
			}
		},

		/**
		 * -----------------------------------------------------
		 * COMPONENT TEMPLATES
		 * -----------------------------------------------------
		 *
		 * If you use inline templates, make sure you read the notes on the configuration
		 * object after this one to understand how they relate to this configuration directly
		 * below.
		 */
		{
			"files": ["*.component.html"],
			"extends": [
				// HTML specific rules.
				// https://github.com/angular-eslint/angular-eslint/tree/master/packages/eslint-plugin-template/src/configs
				"plugin:@angular-eslint/template/recommended"
			],
			"rules": {
				// No 'autofocus'-attribute in HTML.
				"@angular-eslint/template/no-autofocus": "error",

				// No positive 'tabindex'-attribute in HTML.
				"@angular-eslint/template/no-positive-tabindex": "error"
			}
		},

		/**
		 * -----------------------------------------------------
		 * EXTRACT INLINE TEMPLATES (from within .component.ts)
		 * -----------------------------------------------------
		 *
		 * This extra piece of configuration is necessary to extract inline
		 * templates from within Component metadata, e.g.:
		 *
		 * @Component({
		 *  template: '<h1>Hello, World!</h1>'
		 * })
		 * ...
		 *
		 * It works by extracting the template part of the file and treating it as
		 * if it were a full .html file, and it will therefore match the configuration
		 * specific for *.component.html above when it comes to actual rules etc.
		 *
		 * NOTE: This processor will skip a lot of work when it runs if you don't use
		 * inline templates in your \`projects\` currently, so there is no great benefit
		 * in removing it, but you can if you want to.
		 *
		 * You won't specify any rules here. As noted above, the rules that are relevant
		 * to inline templates are the same as the ones defined for *.component.html.
		 */
		{
			"files": ["*.component.ts"],
			"extends": [
				// https://github.com/angular-eslint/angular-eslint/blob/master/packages/eslint-plugin-template/src/configs/process-inline-templates.json
				"plugin:@angular-eslint/template/process-inline-templates"
			]
		}
	]
}`,
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

/**
  @see https://github.com/i-ron-y/eslintrc-starter-files/blob/master/.eslintrc.js
*/

eslintFiles = {

  '.eslintrc.js': `
module.exports = {

  // [JS]
  //
  // An .eslintrc starter file with all rules (set to 0) and envs (set to false) listed.
  // Other options (although by no means comprehensive) are either set to false or else commented out.
  //
  // Updated on 2017-12-16.
  //
  // Starter file generated by ESLint Starter File Generator:
  //     https://github.com/i-ron-y/eslint-starter-generator
  //
  // ESLint docs -- Configuring ESLint:      https://eslint.org/docs/user-guide/configuring
  // ESLint docs -- List of available rules: https://eslint.org/docs/rules/


  "parserOptions": {

    // "ecmaVersion": 5,                       // set to 3, 5 (default), 6, 7, or 8 to specify the version of ECMAScript syntax you want to use.
    //                                         // You can also set to 2015 (same as 6), 2016 (same as 7), or 2017 (same as 8) to use the year-based naming.

    // "sourceType": "script",                 // set to "script" (default) or "module" if your code is in ECMAScript modules.

    "ecmaFeatures": {

      "globalReturn": false,              // allow return statements in the global scope
      "impliedStrict": false,             // enable global strict mode (if ecmaVersion is 5 or greater)
      "jsx": false,                       // enable JSX

      "experimentalObjectRestSpread": false   // enable support for the experimental object rest/spread properties
      // (IMPORTANT: This is an experimental feature that may change significantly in the future.
      // It�s recommended that you do not write rules relying on this functionality unless you are
      // willing to incur maintenance cost when it changes.)

    }

  },


  // "parser": "espree",                         // compatible parsers: "espree" (default), "esprima", "babel-eslint", and "typescript-eslint-parser" (experimental)


  "env": {

    "browser": false, /* browser global variables */
    "node": false,                          // Node.js global variables and Node.js scoping.
    "commonjs": false,                      // CommonJS global variables and CommonJS scoping (use this for browser-only code that uses Browserify/WebPack).
    "shared-node-browser": false,           // Globals common to both Node and Browser.
    "es6": false,                           // enable all ECMAScript 6 features except for modules (this automatically sets the ecmaVersion parser option to 6).
    "worker": false,                        // web workers global variables.
    "amd": false,                           // defines require() and define() as global variables as per the amd spec
    "mocha": false,                         // adds all of the Mocha testing global variables
    "jasmine": false,                       // adds all of the Jasmine testing global variables for version 1.3 and 2.0
    "jest": false,                          // Jest global variables.
    "phantomjs": false,                     // PhantomJS global variables
    "protractor": false,                    // Protractor global variables
    "qunit": false,                         // QUnit global variables.
    "jquery": false,                        // jQuery global variables
    "prototypejs": false,                   // Prototype.js global variables
    "shelljs": false,                       // ShellJS global variables
    "meteor": false,                        // Meteor global variables.
    "mongo": false,                         // MongoDB global variables.
    "applescript": false,                   // AppleScript global variables.
    "nashorn": false,                       // Java 8 Nashorn global variables.
    "serviceworker": false,                 // Service Worker global variables.
    "atomtest": false,                      // Atom test helper globals.
    "embertest": false,                     // Ember test helper globals.
    "webextensions": false,                 // WebExtensions globals.
    "greasemonkey": false                   // GreaseMonkey globals.

  },


  "globals": {

    // e.g. "angular": true

  },


  "plugins": [

    // e.g. "react" (must run \`npm install eslint-plugin-react\` first)

  ],


  "extends": [

    // "eslint:recommended"                    // enables a subset of core rules that report common problems, which have a check mark on the rules page
    // "eslint:all"                            // enable all core rules in the currently installed version of ESLint

  ],


  "rules": {

    // Usage:
    //    "off" or 0 - turn the rule off
    //    "warn" or 1 - turn the rule on as a warning (doesn�t affect exit code)
    //    "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
    //
    //    If a rule has additional options, you can specify them using array literal syntax, such as:
    //        "quotes": [2, "double"]


    //////// Possible Errors ////////

    "for-direction": 0,                     // enforce �for� loop update clause moving the counter in the right direction.
    "getter-return": 0,                     // enforce return statements in getters
    "no-await-in-loop": 0,                  // disallow await inside of loops
    "no-compare-neg-zero": 0,               // disallow comparing against -0
    "no-cond-assign": 0,                    // disallow assignment operators in conditional expressions
    "no-console": 0,                        // disallow the use of console
    "no-constant-condition": 0,             // disallow constant expressions in conditions
    "no-control-regex": 0,                  // disallow control characters in regular expressions
    "no-debugger": 0,                       // disallow the use of debugger
    "no-dupe-args": 0,                      // disallow duplicate arguments in function definitions
    "no-dupe-keys": 0,                      // disallow duplicate keys in object literals
    "no-duplicate-case": 0,                 // disallow duplicate case labels
    "no-empty": 0,                          // disallow empty block statements
    "no-empty-character-class": 0,          // disallow empty character classes in regular expressions
    "no-ex-assign": 0,                      // disallow reassigning exceptions in catch clauses
    "no-extra-boolean-cast": 0,             // disallow unnecessary boolean casts
    "no-extra-parens": 0,                   // disallow unnecessary parentheses
    "no-extra-semi": 0,                     // disallow unnecessary semicolons
    "no-func-assign": 0,                    // disallow reassigning function declarations
    "no-inner-declarations": 0,             // disallow variable or function declarations in nested blocks
    "no-invalid-regexp": 0,                 // disallow invalid regular expression strings in RegExp constructors
    "no-irregular-whitespace": 0,           // disallow irregular whitespace outside of strings and comments
    "no-obj-calls": 0,                      // disallow calling global object properties as functions
    "no-prototype-builtins": 0,             // disallow calling some Object.prototype methods directly on objects
    "no-regex-spaces": 0,                   // disallow multiple spaces in regular expressions
    "no-sparse-arrays": 0,                  // disallow sparse arrays
    "no-template-curly-in-string": 0,       // disallow template literal placeholder syntax in regular strings
    "no-unexpected-multiline": 0,           // disallow confusing multiline expressions
    "no-unreachable": 0,                    // disallow unreachable code after return, throw, continue, and break statements
    "no-unsafe-finally": 0,                 // disallow control flow statements in finally blocks
    "no-unsafe-negation": 0,                // disallow negating the left operand of relational operators
    "use-isnan": 0,                         // require calls to isNaN() when checking for NaN
    "valid-jsdoc": 0,                       // enforce valid JSDoc comments
    "valid-typeof": 0,                      // enforce comparing typeof expressions against valid strings


    //////// Best Practices ////////

    "accessor-pairs": 0,                    // enforce getter and setter pairs in objects
    "array-callback-return": 0,             // enforce return statements in callbacks of array methods
    "block-scoped-var": 0,                  // enforce the use of variables within the scope they are defined
    "class-methods-use-this": 0,            // enforce that class methods utilize this
    "complexity": 0,                        // enforce a maximum cyclomatic complexity allowed in a program
    "consistent-return": 0,                 // require return statements to either always or never specify values
    "curly": 0,                             // enforce consistent brace style for all control statements
    "default-case": 0,                      // require default cases in switch statements
    "dot-location": 0,                      // enforce consistent newlines before and after dots
    "dot-notation": 0,                      // enforce dot notation whenever possible
    "eqeqeq": 0,                            // require the use of === and !==
    "guard-for-in": 0,                      // require for-in loops to include an if statement
    "no-alert": 0,                          // disallow the use of alert, confirm, and prompt
    "no-caller": 0,                         // disallow the use of arguments.caller or arguments.callee
    "no-case-declarations": 0,              // disallow lexical declarations in case clauses
    "no-div-regex": 0,                      // disallow division operators explicitly at the beginning of regular expressions
    "no-else-return": 0,                    // disallow else blocks after return statements in if statements
    "no-empty-function": 0,                 // disallow empty functions
    "no-empty-pattern": 0,                  // disallow empty destructuring patterns
    "no-eq-null": 0,                        // disallow null comparisons without type-checking operators
    "no-eval": 0,                           // disallow the use of eval()
    "no-extend-native": 0,                  // disallow extending native types
    "no-extra-bind": 0,                     // disallow unnecessary calls to .bind()
    "no-extra-label": 0,                    // disallow unnecessary labels
    "no-fallthrough": 0,                    // disallow fallthrough of case statements
    "no-floating-decimal": 0,               // disallow leading or trailing decimal points in numeric literals
    "no-global-assign": 0,                  // disallow assignments to native objects or read-only global variables
    "no-implicit-coercion": 0,              // disallow shorthand type conversions
    "no-implicit-globals": 0,               // disallow variable and function declarations in the global scope
    "no-implied-eval": 0,                   // disallow the use of eval()-like methods
    "no-invalid-this": 0,                   // disallow this keywords outside of classes or class-like objects
    "no-iterator": 0,                       // disallow the use of the __iterator__ property
    "no-labels": 0,                         // disallow labeled statements
    "no-lone-blocks": 0,                    // disallow unnecessary nested blocks
    "no-loop-func": 0,                      // disallow function declarations and expressions inside loop statements
    "no-magic-numbers": 0,                  // disallow magic numbers
    "no-multi-spaces": 0,                   // disallow multiple spaces
    "no-multi-str": 0,                      // disallow multiline strings
    "no-new": 0,                            // disallow new operators outside of assignments or comparisons
    "no-new-func": 0,                       // disallow new operators with the Function object
    "no-new-wrappers": 0,                   // disallow new operators with the String, Number, and Boolean objects
    "no-octal": 0,                          // disallow octal literals
    "no-octal-escape": 0,                   // disallow octal escape sequences in string literals
    "no-param-reassign": 0,                 // disallow reassigning function parameters
    "no-proto": 0,                          // disallow the use of the __proto__ property
    "no-redeclare": 0,                      // disallow variable redeclaration
    "no-restricted-properties": 0,          // disallow certain properties on certain objects
    "no-return-assign": 0,                  // disallow assignment operators in return statements
    "no-return-await": 0,                   // disallow unnecessary return await
    "no-script-url": 0,                     // disallow javascript: urls
    "no-self-assign": 0,                    // disallow assignments where both sides are exactly the same
    "no-self-compare": 0,                   // disallow comparisons where both sides are exactly the same
    "no-sequences": 0,                      // disallow comma operators
    "no-throw-literal": 0,                  // disallow throwing literals as exceptions
    "no-unmodified-loop-condition": 0,      // disallow unmodified loop conditions
    "no-unused-expressions": 0,             // disallow unused expressions
    "no-unused-labels": 0,                  // disallow unused labels
    "no-useless-call": 0,                   // disallow unnecessary calls to .call() and .apply()
    "no-useless-concat": 0,                 // disallow unnecessary concatenation of literals or template literals
    "no-useless-escape": 0,                 // disallow unnecessary escape characters
    "no-useless-return": 0,                 // disallow redundant return statements
    "no-void": 0,                           // disallow void operators
    "no-warning-comments": 0,               // disallow specified warning terms in comments
    "no-with": 0,                           // disallow with statements
    "prefer-promise-reject-errors": 0,      // require using Error objects as Promise rejection reasons
    "radix": 0,                             // enforce the consistent use of the radix argument when using parseInt()
    "require-await": 0,                     // disallow async functions which have no await expression
    "vars-on-top": 0,                       // require var declarations be placed at the top of their containing scope
    "wrap-iife": 0,                         // require parentheses around immediate function invocations
    "yoda": 0,                              // require or disallow �Yoda� conditions


    //////// Strict Mode ////////

    "strict": 0,                            // require or disallow strict mode directives


    //////// Variables ////////

    "init-declarations": 0,                 // require or disallow initialization in variable declarations
    "no-catch-shadow": 0,                   // disallow catch clause parameters from shadowing variables in the outer scope
    "no-delete-var": 0,                     // disallow deleting variables
    "no-label-var": 0,                      // disallow labels that share a name with a variable
    "no-restricted-globals": 0,             // disallow specified global variables
    "no-shadow": 0,                         // disallow variable declarations from shadowing variables declared in the outer scope
    "no-shadow-restricted-names": 0,        // disallow identifiers from shadowing restricted names
    "no-undef": 0,                          // disallow the use of undeclared variables unless mentioned in /*global */ comments
    "no-undef-init": 0,                     // disallow initializing variables to undefined
    "no-undefined": 0,                      // disallow the use of undefined as an identifier
    "no-unused-vars": 0,                    // disallow unused variables
    "no-use-before-define": 0,              // disallow the use of variables before they are defined


    //////// Node.js and CommonJS ////////

    "callback-return": 0,                   // require return statements after callbacks
    "global-require": 0,                    // require require() calls to be placed at top-level module scope
    "handle-callback-err": 0,               // require error handling in callbacks
    "no-buffer-constructor": 0,             // disallow use of the Buffer() constructor
    "no-mixed-requires": 0,                 // disallow require calls to be mixed with regular variable declarations
    "no-new-require": 0,                    // disallow new operators with calls to require
    "no-path-concat": 0,                    // disallow string concatenation with __dirname and __filename
    "no-process-env": 0,                    // disallow the use of process.env
    "no-process-exit": 0,                   // disallow the use of process.exit()
    "no-restricted-modules": 0,             // disallow specified modules when loaded by require
    "no-sync": 0,                           // disallow synchronous methods


    //////// Stylistic Issues ////////

    "array-bracket-newline": 0,             // enforce linebreaks after opening and before closing array brackets
    "array-bracket-spacing": 0,             // enforce consistent spacing inside array brackets
    "array-element-newline": 0,             // enforce line breaks after each array element
    "block-spacing": 0,                     // disallow or enforce spaces inside of blocks after opening block and before closing block
    "brace-style": 0,                       // enforce consistent brace style for blocks
    "camelcase": 0,                         // enforce camelcase naming convention
    "capitalized-comments": 0,              // enforce or disallow capitalization of the first letter of a comment
    "comma-dangle": 0,                      // require or disallow trailing commas
    "comma-spacing": 0,                     // enforce consistent spacing before and after commas
    "comma-style": 0,                       // enforce consistent comma style
    "computed-property-spacing": 0,         // enforce consistent spacing inside computed property brackets
    "consistent-this": 0,                   // enforce consistent naming when capturing the current execution context
    "eol-last": 0,                          // require or disallow newline at the end of files
    "func-call-spacing": 0,                 // require or disallow spacing between function identifiers and their invocations
    "func-name-matching": 0,                // require function names to match the name of the variable or property to which they are assigned
    "func-names": 0,                        // require or disallow named function expressions
    "func-style": 0,                        // enforce the consistent use of either function declarations or expressions
    "function-paren-newline": 0,            // enforce consistent line breaks inside function parentheses
    "id-blacklist": 0,                      // disallow specified identifiers
    "id-length": 0,                         // enforce minimum and maximum identifier lengths
    "id-match": 0,                          // require identifiers to match a specified regular expression
    "implicit-arrow-linebreak": 0,          // enforce the location of arrow function bodies
    "indent": 0,                            // enforce consistent indentation
    "jsx-quotes": 0,                        // enforce the consistent use of either double or single quotes in JSX attributes
    "key-spacing": 0,                       // enforce consistent spacing between keys and values in object literal properties
    "keyword-spacing": 0,                   // enforce consistent spacing before and after keywords
    "line-comment-position": 0,             // enforce position of line comments
    "linebreak-style": 0,                   // enforce consistent linebreak style
    "lines-around-comment": 0,              // require empty lines around comments
    "lines-between-class-members": 0,       // require or disallow an empty line between class members
    "max-depth": 0,                         // enforce a maximum depth that blocks can be nested
    "max-len": 0,                           // enforce a maximum line length
    "max-lines": 0,                         // enforce a maximum number of lines per file
    "max-nested-callbacks": 0,              // enforce a maximum depth that callbacks can be nested
    "max-params": 0,                        // enforce a maximum number of parameters in function definitions
    "max-statements": 0,                    // enforce a maximum number of statements allowed in function blocks
    "max-statements-per-line": 0,           // enforce a maximum number of statements allowed per line
    "multiline-comment-style": 0,           // enforce a particular style for multiline comments
    "multiline-ternary": 0,                 // enforce newlines between operands of ternary expressions
    "new-cap": 0,                           // require constructor names to begin with a capital letter
    "new-parens": 0,                        // require parentheses when invoking a constructor with no arguments
    "newline-per-chained-call": 0,          // require a newline after each call in a method chain
    "no-array-constructor": 0,              // disallow Array constructors
    "no-bitwise": 0,                        // disallow bitwise operators
    "no-continue": 0,                       // disallow continue statements
    "no-inline-comments": 0,                // disallow inline comments after code
    "no-lonely-if": 0,                      // disallow if statements as the only statement in else blocks
    "no-mixed-operators": 0,                // disallow mixed binary operators
    "no-mixed-spaces-and-tabs": 0,          // disallow mixed spaces and tabs for indentation
    "no-multi-assign": 0,                   // disallow use of chained assignment expressions
    "no-multiple-empty-lines": 0,           // disallow multiple empty lines
    "no-negated-condition": 0,              // disallow negated conditions
    "no-nested-ternary": 0,                 // disallow nested ternary expressions
    "no-new-object": 0,                     // disallow Object constructors
    "no-plusplus": 0,                       // disallow the unary operators ++ and --
    "no-restricted-syntax": 0,              // disallow specified syntax
    "no-tabs": 0,                           // disallow all tabs
    "no-ternary": 0,                        // disallow ternary operators
    "no-trailing-spaces": 0,                // disallow trailing whitespace at the end of lines
    "no-underscore-dangle": 0,              // disallow dangling underscores in identifiers
    "no-unneeded-ternary": 0,               // disallow ternary operators when simpler alternatives exist
    "no-whitespace-before-property": 0,     // disallow whitespace before properties
    "nonblock-statement-body-position": 0,  // enforce the location of single-line statements
    "object-curly-newline": 0,              // enforce consistent line breaks inside braces
    "object-curly-spacing": 0,              // enforce consistent spacing inside braces
    "object-property-newline": 0,           // enforce placing object properties on separate lines
    "one-var": 0,                           // enforce variables to be declared either together or separately in functions
    "one-var-declaration-per-line": 0,      // require or disallow newlines around variable declarations
    "operator-assignment": 0,               // require or disallow assignment operator shorthand where possible
    "operator-linebreak": 0,                // enforce consistent linebreak style for operators
    "padded-blocks": 0,                     // require or disallow padding within blocks
    "padding-line-between-statements": 0,   // require or disallow padding lines between statements
    "quote-props": 0,                       // require quotes around object literal property names
    "quotes": 0,                            // enforce the consistent use of either backticks, double, or single quotes
    "require-jsdoc": 0,                     // require JSDoc comments
    "semi": 0,                              // require or disallow semicolons instead of ASI
    "semi-spacing": 0,                      // enforce consistent spacing before and after semicolons
    "semi-style": 0,                        // enforce location of semicolons
    "sort-keys": 0,                         // require object keys to be sorted
    "sort-vars": 0,                         // require variables within the same declaration block to be sorted
    "space-before-blocks": 0,               // enforce consistent spacing before blocks
    "space-before-function-paren": 0,       // enforce consistent spacing before function definition opening parenthesis
    "space-in-parens": 0,                   // enforce consistent spacing inside parentheses
    "space-infix-ops": 0,                   // require spacing around infix operators
    "space-unary-ops": 0,                   // enforce consistent spacing before or after unary operators
    "spaced-comment": 0,                    // enforce consistent spacing after the // or /* in a comment
    "switch-colon-spacing": 0,              // enforce spacing around colons of switch statements
    "template-tag-spacing": 0,              // require or disallow spacing between template tags and their literals
    "unicode-bom": 0,                       // require or disallow Unicode byte order mark (BOM)
    "wrap-regex": 0,                        // require parenthesis around regex literals


    //////// ECMAScript 6 ////////

    "arrow-body-style": 0,                  // require braces around arrow function bodies
    "arrow-parens": 0,                      // require parentheses around arrow function arguments
    "arrow-spacing": 0,                     // enforce consistent spacing before and after the arrow in arrow functions
    "constructor-super": 0,                 // require super() calls in constructors
    "generator-star-spacing": 0,            // enforce consistent spacing around * operators in generator functions
    "no-class-assign": 0,                   // disallow reassigning class members
    "no-confusing-arrow": 0,                // disallow arrow functions where they could be confused with comparisons
    "no-const-assign": 0,                   // disallow reassigning const variables
    "no-dupe-class-members": 0,             // disallow duplicate class members
    "no-duplicate-imports": 0,              // disallow duplicate module imports
    "no-new-symbol": 0,                     // disallow new operators with the Symbol object
    "no-restricted-imports": 0,             // disallow specified modules when loaded by import
    "no-this-before-super": 0,              // disallow this/super before calling super() in constructors
    "no-useless-computed-key": 0,           // disallow unnecessary computed property keys in object literals
    "no-useless-constructor": 0,            // disallow unnecessary constructors
    "no-useless-rename": 0,                 // disallow renaming import, export, and destructured assignments to the same name
    "no-var": 0,                            // require let or const instead of var
    "object-shorthand": 0,                  // require or disallow method and property shorthand syntax for object literals
    "prefer-arrow-callback": 0,             // require using arrow functions for callbacks
    "prefer-const": 0,                      // require const declarations for variables that are never reassigned after declared
    "prefer-destructuring": 0,              // require destructuring from arrays and/or objects
    "prefer-numeric-literals": 0,           // disallow parseInt() and Number.parseInt() in favor of binary, octal, and hexadecimal literals
    "prefer-rest-params": 0,                // require rest parameters instead of arguments
    "prefer-spread": 0,                     // require spread operators instead of .apply()
    "prefer-template": 0,                   // require template literals instead of string concatenation
    "require-yield": 0,                     // require generator functions to contain yield
    "rest-spread-spacing": 0,               // enforce spacing between rest and spread operators and their expressions
    "sort-imports": 0,                      // enforce sorted import declarations within modules
    "symbol-description": 0,                // require symbol descriptions
    "template-curly-spacing": 0,            // require or disallow spacing around embedded expressions of template strings
    "yield-star-spacing": 0                 // require or disallow spacing around the * in yield* expressions


  }

}`

};

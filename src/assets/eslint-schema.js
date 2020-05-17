/**
  Emulate ESLint schema when testing as straight Angular app

  NOTE:  deleted from index.html when running as extension
*/

eslintSchema = {
  "@typescript-eslint": {
    "lintel": {
      "inherits": {
        "plugin:@typescript-eslint/eslint-recommended": {
          "extendsBaseRule": "truthy"
        },
        "plugin:@typescript-eslint/recommended": {
          "recommended": "truthy",
          "requiresTypeChecking": "falsey"
        },
        "plugin:@typescript-eslint/recommended-requiring-type-checking": {
          "recommended": "truthy",
          "requiresTypeChecking": "truthy"
        }
      }
    },
    "rules": {
      "@typescript-eslint/adjacent-overload-signatures": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Require that member overloads be consecutive",
            "recommended": "error",
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/adjacent-overload-signatures.md"
          },
          "messages": {
            "adjacentSignature": "All '{{name}}' signatures should be adjacent."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/array-type": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "Requires using either `T[]` or `Array<T>` for arrays",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/array-type.md"
          },
          "fixable": "code",
          "messages": {
            "errorStringArray": "Array type using 'Array<{{type}}>' is forbidden. Use '{{type}}[]' instead.",
            "errorStringArraySimple": "Array type using 'Array<{{type}}>' is forbidden for simple types. Use '{{type}}[]' instead.",
            "errorStringGeneric": "Array type using '{{type}}[]' is forbidden. Use 'Array<{{type}}>' instead.",
            "errorStringGenericSimple": "Array type using '{{type}}[]' is forbidden for non-simple types. Use 'Array<{{type}}>' instead."
          },
          "schema": [
            {
              "properties": {
                "default": {
                  "enum": [
                    "array",
                    "generic",
                    "array-simple"
                  ]
                },
                "readonly": {
                  "enum": [
                    "array",
                    "generic",
                    "array-simple"
                  ]
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/await-thenable": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Disallows awaiting a value that is not a Thenable",
            "recommended": "error",
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/await-thenable.md"
          },
          "messages": {
            "await": "Unexpected `await` of a non-Promise (non-\"Thenable\") value."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "@typescript-eslint/ban-ts-comment": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Bans `// @ts-<directive>` comments from being used",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/ban-ts-comment.md"
          },
          "messages": {
            "tsDirectiveComment": "Do not use \"// @ts-{{directive}}\" because it alters compilation errors."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "ts-check": {
                  "default": false,
                  "type": "boolean"
                },
                "ts-expect-error": {
                  "default": true,
                  "type": "boolean"
                },
                "ts-ignore": {
                  "default": true,
                  "type": "boolean"
                },
                "ts-nocheck": {
                  "default": true,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "problem"
        }
      },
      "@typescript-eslint/ban-ts-ignore": {
        "meta": {
          "deprecated": true,
          "docs": {
            "category": "Best Practices",
            "description": "Bans “// @ts-ignore” comments from being used",
            "recommended": "error",
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/ban-ts-ignore.md"
          },
          "messages": {
            "tsIgnoreComment": "Do not use \"// @ts-ignore\" comments because they suppress compilation errors."
          },
          "replacedBy": [
            "ban-ts-comment"
          ],
          "schema": [],
          "type": "problem"
        }
      },
      "@typescript-eslint/ban-types": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Bans specific types from being used",
            "recommended": "error",
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/ban-types.md"
          },
          "fixable": "code",
          "messages": {
            "bannedTypeMessage": "Don't use '{{name}}' as a type.{{customMessage}}"
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "extendDefaults": {
                  "type": "boolean"
                },
                "types": {
                  "additionalProperties": {
                    "oneOf": [
                      {
                        "type": "null"
                      },
                      {
                        "type": "string"
                      },
                      {
                        "additionalProperties": false,
                        "properties": {
                          "fixWith": {
                            "type": "string"
                          },
                          "message": {
                            "type": "string"
                          }
                        },
                        "type": "object"
                      }
                    ]
                  },
                  "type": "object"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/brace-style": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "Enforce consistent brace style for blocks",
            "extendsBaseRule": true,
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/brace-style.md"
          },
          "fixable": "whitespace",
          "messages": {
            "blockSameLine": "Statement inside of curly braces should be on next line.",
            "nextLineClose": "Closing curly brace does not appear on the same line as the subsequent block.",
            "nextLineOpen": "Opening curly brace does not appear on the same line as controlling statement.",
            "sameLineClose": "Closing curly brace appears on the same line as the subsequent block.",
            "sameLineOpen": "Opening curly brace appears on the same line as controlling statement.",
            "singleLineClose": "Closing curly brace should be on the same line as opening curly brace or on the line after the previous block."
          },
          "schema": [
            {
              "enum": [
                "1tbs",
                "stroustrup",
                "allman"
              ]
            },
            {
              "additionalProperties": false,
              "properties": {
                "allowSingleLine": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "@typescript-eslint/camelcase": {
        "meta": {
          "deprecated": true,
          "docs": {
            "category": "Stylistic Issues",
            "description": "Enforce camelCase naming convention",
            "extendsBaseRule": true,
            "recommended": "error",
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/camelcase.md"
          },
          "messages": {
            "notCamelCase": "Identifier '{{name}}' is not in camel case."
          },
          "replacedBy": [
            "naming-convention"
          ],
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allow": {
                  "items": [
                    {
                      "type": "string"
                    }
                  ],
                  "minItems": 0,
                  "type": "array",
                  "uniqueItems": true
                },
                "genericType": {
                  "enum": [
                    "always",
                    "never"
                  ]
                },
                "ignoreDestructuring": {
                  "default": false,
                  "type": "boolean"
                },
                "ignoreImports": {
                  "default": false,
                  "type": "boolean"
                },
                "properties": {
                  "enum": [
                    "always",
                    "never"
                  ]
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/class-literal-property-style": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Ensures that literals on classes are exposed in a consistent style",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/class-literal-property-style.md"
          },
          "fixable": "code",
          "messages": {
            "preferFieldStyle": "Literals should be exposed using readonly fields.",
            "preferGetterStyle": "Literals should be exposed using getters."
          },
          "schema": [
            {
              "enum": [
                "fields",
                "getters"
              ]
            }
          ],
          "type": "problem"
        }
      },
      "@typescript-eslint/class-name-casing": {
        "meta": {
          "deprecated": true,
          "docs": {
            "category": "Best Practices",
            "description": "Require PascalCased class and interface names",
            "recommended": "error",
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/class-name-casing.md"
          },
          "messages": {
            "notPascalCased": "{{friendlyName}} '{{name}}' must be PascalCased."
          },
          "replacedBy": [
            "naming-convention"
          ],
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowUnderscorePrefix": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/comma-spacing": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "Enforces consistent spacing before and after commas",
            "extendsBaseRule": true,
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/comma-spacing.md"
          },
          "fixable": "whitespace",
          "messages": {
            "missing": "A space is required {{loc}} ','.",
            "unexpected": "There should be no space {{loc}} ','."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "after": {
                  "default": true,
                  "type": "boolean"
                },
                "before": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/consistent-type-assertions": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Enforces consistent usage of type assertions",
            "recommended": "error",
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/consistent-type-assertions.md"
          },
          "messages": {
            "angle-bracket": "Use '<{{cast}}>' instead of 'as {{cast}}'.",
            "as": "Use 'as {{cast}}' instead of '<{{cast}}>'.",
            "never": "Do not use any type assertions.",
            "unexpectedObjectTypeAssertion": "Always prefer const x: T = { ... }."
          },
          "schema": [
            {
              "oneOf": [
                {
                  "additionalProperties": false,
                  "properties": {
                    "assertionStyle": {
                      "enum": [
                        "never"
                      ]
                    }
                  },
                  "required": [
                    "assertionStyle"
                  ],
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "assertionStyle": {
                      "enum": [
                        "as",
                        "angle-bracket"
                      ]
                    },
                    "objectLiteralTypeAssertions": {
                      "enum": [
                        "allow",
                        "allow-as-parameter",
                        "never"
                      ]
                    }
                  },
                  "required": [
                    "assertionStyle"
                  ],
                  "type": "object"
                }
              ]
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/consistent-type-definitions": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "Consistent with type definition either `interface` or `type`",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/consistent-type-definitions.md"
          },
          "fixable": "code",
          "messages": {
            "interfaceOverType": "Use an `interface` instead of a `type`.",
            "typeOverInterface": "Use a `type` instead of an `interface`."
          },
          "schema": [
            {
              "enum": [
                "interface",
                "type"
              ]
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/default-param-last": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Enforce default parameters to be last",
            "extendsBaseRule": true,
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/default-param-last.md"
          },
          "messages": {
            "shouldBeLast": "Default parameters should be last."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/dot-notation": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "enforce dot notation whenever possible",
            "extendsBaseRule": true,
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/dot-notation.md"
          },
          "fixable": "code",
          "messages": {
            "useBrackets": ".{{key}} is a syntax error.",
            "useDot": "[{{key}}] is better written in dot notation."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowKeywords": {
                  "default": true,
                  "type": "boolean"
                },
                "allowPattern": {
                  "default": "",
                  "type": "string"
                },
                "allowPrivateClassPropertyAccess": {
                  "default": false,
                  "tyoe": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/explicit-function-return-type": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "Require explicit return types on functions and class methods",
            "recommended": "warn",
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/explicit-function-return-type.md"
          },
          "messages": {
            "missingReturnType": "Missing return type on function."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowConciseArrowFunctionExpressionsStartingWithVoid": {
                  "type": "boolean"
                },
                "allowDirectConstAssertionInArrowFunctions": {
                  "type": "boolean"
                },
                "allowExpressions": {
                  "type": "boolean"
                },
                "allowHigherOrderFunctions": {
                  "type": "boolean"
                },
                "allowTypedFunctionExpressions": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "problem"
        }
      },
      "@typescript-eslint/explicit-member-accessibility": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "Require explicit accessibility modifiers on class properties and methods",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md"
          },
          "fixable": "code",
          "messages": {
            "missingAccessibility": "Missing accessibility modifier on {{type}} {{name}}.",
            "unwantedPublicAccessibility": "Public accessibility modifier on {{type}} {{name}}."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "accessibility": {
                  "enum": [
                    "explicit",
                    "no-public",
                    "off"
                  ]
                },
                "ignoredMethodNames": {
                  "items": {
                    "type": "string"
                  },
                  "type": "array"
                },
                "overrides": {
                  "additionalProperties": false,
                  "properties": {
                    "accessors": {
                      "enum": [
                        "explicit",
                        "no-public",
                        "off"
                      ]
                    },
                    "constructors": {
                      "enum": [
                        "explicit",
                        "no-public",
                        "off"
                      ]
                    },
                    "methods": {
                      "enum": [
                        "explicit",
                        "no-public",
                        "off"
                      ]
                    },
                    "parameterProperties": {
                      "enum": [
                        "explicit",
                        "no-public",
                        "off"
                      ]
                    },
                    "properties": {
                      "enum": [
                        "explicit",
                        "no-public",
                        "off"
                      ]
                    }
                  },
                  "type": "object"
                }
              },
              "type": "object"
            }
          ],
          "type": "problem"
        }
      },
      "@typescript-eslint/explicit-module-boundary-types": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "Require explicit return and argument types on exported functions' and classes' public class methods",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md"
          },
          "messages": {
            "missingArgType": "Argument '{{name}}' should be typed.",
            "missingReturnType": "Missing return type on function."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowDirectConstAssertionInArrowFunctions": {
                  "type": "boolean"
                },
                "allowHigherOrderFunctions": {
                  "type": "boolean"
                },
                "allowTypedFunctionExpressions": {
                  "type": "boolean"
                },
                "allowedNames": {
                  "items": {
                    "type": "string"
                  },
                  "type": "array"
                },
                "shouldTrackReferences": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "problem"
        }
      },
      "@typescript-eslint/func-call-spacing": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "Require or disallow spacing between function identifiers and their invocations",
            "extendsBaseRule": true,
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/func-call-spacing.md"
          },
          "fixable": "whitespace",
          "messages": {
            "missing": "Missing space between function name and paren.",
            "unexpected": "Unexpected space or newline between function name and paren."
          },
          "schema": {
            "anyOf": [
              {
                "items": [
                  {
                    "enum": [
                      "never"
                    ]
                  }
                ],
                "maxItems": 1,
                "minItems": 0,
                "type": "array"
              },
              {
                "items": [
                  {
                    "enum": [
                      "always"
                    ]
                  },
                  {
                    "additionalProperties": false,
                    "properties": {
                      "allowNewlines": {
                        "type": "boolean"
                      }
                    },
                    "type": "object"
                  }
                ],
                "maxItems": 2,
                "minItems": 0,
                "type": "array"
              }
            ]
          },
          "type": "layout"
        }
      },
      "@typescript-eslint/generic-type-naming": {
        "meta": {
          "deprecated": true,
          "docs": {
            "category": "Stylistic Issues",
            "description": "Enforces naming of generic type variables",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/generic-type-naming.md"
          },
          "messages": {
            "paramNotMatchRule": "Type parameter {{name}} does not match rule {{rule}}."
          },
          "replacedBy": [
            "naming-convention"
          ],
          "schema": [
            {
              "type": "string"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/indent": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "Enforce consistent indentation",
            "extendsBaseRule": true,
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/indent.md"
          },
          "fixable": "whitespace",
          "messages": {
            "wrongIndentation": "Expected indentation of {{expected}} but found {{actual}}."
          },
          "schema": [
            {
              "oneOf": [
                {
                  "enum": [
                    "tab"
                  ]
                },
                {
                  "minimum": 0,
                  "type": "integer"
                }
              ]
            },
            {
              "additionalProperties": false,
              "properties": {
                "ArrayExpression": {
                  "oneOf": [
                    {
                      "minimum": 0,
                      "type": "integer"
                    },
                    {
                      "enum": [
                        "first",
                        "off"
                      ]
                    }
                  ]
                },
                "CallExpression": {
                  "additionalProperties": false,
                  "properties": {
                    "arguments": {
                      "oneOf": [
                        {
                          "minimum": 0,
                          "type": "integer"
                        },
                        {
                          "enum": [
                            "first",
                            "off"
                          ]
                        }
                      ]
                    }
                  },
                  "type": "object"
                },
                "FunctionDeclaration": {
                  "additionalProperties": false,
                  "properties": {
                    "body": {
                      "minimum": 0,
                      "type": "integer"
                    },
                    "parameters": {
                      "oneOf": [
                        {
                          "minimum": 0,
                          "type": "integer"
                        },
                        {
                          "enum": [
                            "first",
                            "off"
                          ]
                        }
                      ]
                    }
                  },
                  "type": "object"
                },
                "FunctionExpression": {
                  "additionalProperties": false,
                  "properties": {
                    "body": {
                      "minimum": 0,
                      "type": "integer"
                    },
                    "parameters": {
                      "oneOf": [
                        {
                          "minimum": 0,
                          "type": "integer"
                        },
                        {
                          "enum": [
                            "first",
                            "off"
                          ]
                        }
                      ]
                    }
                  },
                  "type": "object"
                },
                "ImportDeclaration": {
                  "oneOf": [
                    {
                      "minimum": 0,
                      "type": "integer"
                    },
                    {
                      "enum": [
                        "first",
                        "off"
                      ]
                    }
                  ]
                },
                "MemberExpression": {
                  "oneOf": [
                    {
                      "minimum": 0,
                      "type": "integer"
                    },
                    {
                      "enum": [
                        "off"
                      ]
                    }
                  ]
                },
                "ObjectExpression": {
                  "oneOf": [
                    {
                      "minimum": 0,
                      "type": "integer"
                    },
                    {
                      "enum": [
                        "first",
                        "off"
                      ]
                    }
                  ]
                },
                "SwitchCase": {
                  "default": 0,
                  "minimum": 0,
                  "type": "integer"
                },
                "VariableDeclarator": {
                  "oneOf": [
                    {
                      "oneOf": [
                        {
                          "minimum": 0,
                          "type": "integer"
                        },
                        {
                          "enum": [
                            "first",
                            "off"
                          ]
                        }
                      ]
                    },
                    {
                      "additionalProperties": false,
                      "properties": {
                        "const": {
                          "oneOf": [
                            {
                              "minimum": 0,
                              "type": "integer"
                            },
                            {
                              "enum": [
                                "first",
                                "off"
                              ]
                            }
                          ]
                        },
                        "let": {
                          "oneOf": [
                            {
                              "minimum": 0,
                              "type": "integer"
                            },
                            {
                              "enum": [
                                "first",
                                "off"
                              ]
                            }
                          ]
                        },
                        "var": {
                          "oneOf": [
                            {
                              "minimum": 0,
                              "type": "integer"
                            },
                            {
                              "enum": [
                                "first",
                                "off"
                              ]
                            }
                          ]
                        }
                      },
                      "type": "object"
                    }
                  ]
                },
                "flatTernaryExpressions": {
                  "default": false,
                  "type": "boolean"
                },
                "ignoreComments": {
                  "default": false,
                  "type": "boolean"
                },
                "ignoredNodes": {
                  "items": {
                    "not": {
                      "pattern": ":exit$"
                    },
                    "type": "string"
                  },
                  "type": "array"
                },
                "outerIIFEBody": {
                  "minimum": 0,
                  "type": "integer"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "@typescript-eslint/init-declarations": {
        "meta": {
          "docs": {
            "category": "Variables",
            "description": "require or disallow initialization in variable declarations",
            "extendsBaseRule": true,
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/init-declarations.md"
          },
          "messages": {
            "initialized": "Variable '{{idName}}' should be initialized on declaration.",
            "notInitialized": "Variable '{{idName}}' should not be initialized on declaration."
          },
          "schema": {
            "anyOf": [
              {
                "items": [
                  {
                    "enum": [
                      "always"
                    ]
                  }
                ],
                "maxItems": 1,
                "minItems": 0,
                "type": "array"
              },
              {
                "items": [
                  {
                    "enum": [
                      "never"
                    ]
                  },
                  {
                    "additionalProperties": false,
                    "properties": {
                      "ignoreForLoopInit": {
                        "type": "boolean"
                      }
                    },
                    "type": "object"
                  }
                ],
                "maxItems": 2,
                "minItems": 0,
                "type": "array"
              }
            ]
          },
          "type": "suggestion"
        }
      },
      "@typescript-eslint/interface-name-prefix": {
        "meta": {
          "deprecated": true,
          "docs": {
            "category": "Stylistic Issues",
            "description": "Require that interface names should or should not prefixed with `I`",
            "recommended": "error",
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/interface-name-prefix.md"
          },
          "messages": {
            "alwaysPrefix": "Interface name must be prefixed with \"I\".",
            "noPrefix": "Interface name must not be prefixed with \"I\"."
          },
          "replacedBy": [
            "naming-convention"
          ],
          "schema": [
            {
              "oneOf": [
                {
                  "enum": [
                    "never",
                    "always"
                  ]
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "prefixWithI": {
                      "enum": [
                        "never"
                      ],
                      "type": "string"
                    }
                  },
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "allowUnderscorePrefix": {
                      "type": "boolean"
                    },
                    "prefixWithI": {
                      "enum": [
                        "always"
                      ],
                      "type": "string"
                    }
                  },
                  "required": [
                    "prefixWithI"
                  ],
                  "type": "object"
                }
              ]
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/keyword-spacing": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "Enforce consistent spacing before and after keywords",
            "extendsBaseRule": true,
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/keyword-spacing.md"
          },
          "fixable": "whitespace",
          "messages": {
            "expectedAfter": "Expected space(s) after \"{{value}}\".",
            "expectedBefore": "Expected space(s) before \"{{value}}\".",
            "unexpectedAfter": "Unexpected space(s) after \"{{value}}\".",
            "unexpectedBefore": "Unexpected space(s) before \"{{value}}\"."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "after": {
                  "default": true,
                  "type": "boolean"
                },
                "before": {
                  "default": true,
                  "type": "boolean"
                },
                "overrides": {
                  "additionalProperties": false,
                  "properties": {
                    "abstract": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "as": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "async": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "await": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "boolean": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "break": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "byte": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "case": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "catch": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "char": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "class": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "const": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "continue": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "debugger": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "default": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "delete": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "do": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "double": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "else": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "enum": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "export": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "extends": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "false": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "final": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "finally": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "float": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "for": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "from": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "function": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "get": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "goto": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "if": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "implements": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "import": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "in": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "instanceof": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "int": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "interface": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "let": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "long": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "native": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "new": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "null": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "of": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "package": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "private": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "protected": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "public": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "return": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "set": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "short": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "static": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "super": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "switch": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "synchronized": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "this": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "throw": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "throws": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "transient": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "true": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "try": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "typeof": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "var": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "void": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "volatile": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "while": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "with": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "yield": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    }
                  },
                  "type": "object"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "@typescript-eslint/member-delimiter-style": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "Require a specific member delimiter style for interfaces and type literals",
            "recommended": "error",
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/member-delimiter-style.md"
          },
          "fixable": "code",
          "messages": {
            "expectedComma": "Expected a comma.",
            "expectedSemi": "Expected a semicolon.",
            "unexpectedComma": "Unexpected separator (,).",
            "unexpectedSemi": "Unexpected separator (;)."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "multiline": {
                  "additionalProperties": false,
                  "properties": {
                    "delimiter": {
                      "enum": [
                        "none",
                        "semi",
                        "comma"
                      ]
                    },
                    "requireLast": {
                      "type": "boolean"
                    }
                  },
                  "type": "object"
                },
                "overrides": {
                  "additionalProperties": false,
                  "properties": {
                    "interface": {
                      "additionalProperties": false,
                      "properties": {
                        "multiline": {
                          "additionalProperties": false,
                          "properties": {
                            "delimiter": {
                              "enum": [
                                "none",
                                "semi",
                                "comma"
                              ]
                            },
                            "requireLast": {
                              "type": "boolean"
                            }
                          },
                          "type": "object"
                        },
                        "singleline": {
                          "additionalProperties": false,
                          "properties": {
                            "delimiter": {
                              "enum": [
                                "semi",
                                "comma"
                              ]
                            },
                            "requireLast": {
                              "type": "boolean"
                            }
                          },
                          "type": "object"
                        }
                      },
                      "type": "object"
                    },
                    "typeLiteral": {
                      "additionalProperties": false,
                      "properties": {
                        "multiline": {
                          "additionalProperties": false,
                          "properties": {
                            "delimiter": {
                              "enum": [
                                "none",
                                "semi",
                                "comma"
                              ]
                            },
                            "requireLast": {
                              "type": "boolean"
                            }
                          },
                          "type": "object"
                        },
                        "singleline": {
                          "additionalProperties": false,
                          "properties": {
                            "delimiter": {
                              "enum": [
                                "semi",
                                "comma"
                              ]
                            },
                            "requireLast": {
                              "type": "boolean"
                            }
                          },
                          "type": "object"
                        }
                      },
                      "type": "object"
                    }
                  },
                  "type": "object"
                },
                "singleline": {
                  "additionalProperties": false,
                  "properties": {
                    "delimiter": {
                      "enum": [
                        "semi",
                        "comma"
                      ]
                    },
                    "requireLast": {
                      "type": "boolean"
                    }
                  },
                  "type": "object"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/member-naming": {
        "meta": {
          "deprecated": true,
          "docs": {
            "category": "Stylistic Issues",
            "description": "Enforces naming conventions for class members by visibility",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/member-naming.md"
          },
          "messages": {
            "incorrectName": "{{accessibility}} property {{name}} should match {{convention}}."
          },
          "replacedBy": [
            "naming-convention"
          ],
          "schema": [
            {
              "additionalProperties": false,
              "minProperties": 1,
              "properties": {
                "private": {
                  "format": "regex",
                  "minLength": 1,
                  "type": "string"
                },
                "protected": {
                  "format": "regex",
                  "minLength": 1,
                  "type": "string"
                },
                "public": {
                  "format": "regex",
                  "minLength": 1,
                  "type": "string"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/member-ordering": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "Require a consistent member declaration order",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/member-ordering.md"
          },
          "messages": {
            "incorrectGroupOrder": "Member {{name}} should be declared before all {{rank}} definitions.",
            "incorrectOrder": "Member \"{{member}}\" should be declared before member \"{{beforeMember}}\"."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "classExpressions": {
                  "oneOf": [
                    {
                      "enum": [
                        "never"
                      ],
                      "type": "string"
                    },
                    {
                      "items": {
                        "enum": [
                          "signature",
                          "field",
                          "public-field",
                          "public-decorated-field",
                          "decorated-field",
                          "static-field",
                          "public-static-field",
                          "instance-field",
                          "public-instance-field",
                          "abstract-field",
                          "public-abstract-field",
                          "protected-field",
                          "protected-decorated-field",
                          "protected-static-field",
                          "protected-instance-field",
                          "protected-abstract-field",
                          "private-field",
                          "private-decorated-field",
                          "private-static-field",
                          "private-instance-field",
                          "private-abstract-field",
                          "method",
                          "public-method",
                          "public-decorated-method",
                          "decorated-method",
                          "static-method",
                          "public-static-method",
                          "instance-method",
                          "public-instance-method",
                          "abstract-method",
                          "public-abstract-method",
                          "protected-method",
                          "protected-decorated-method",
                          "protected-static-method",
                          "protected-instance-method",
                          "protected-abstract-method",
                          "private-method",
                          "private-decorated-method",
                          "private-static-method",
                          "private-instance-method",
                          "private-abstract-method",
                          "constructor",
                          "public-constructor",
                          "protected-constructor",
                          "private-constructor"
                        ]
                      },
                      "type": "array"
                    },
                    {
                      "additionalProperties": false,
                      "properties": {
                        "memberTypes": {
                          "oneOf": [
                            {
                              "items": {
                                "enum": [
                                  "signature",
                                  "field",
                                  "public-field",
                                  "public-decorated-field",
                                  "decorated-field",
                                  "static-field",
                                  "public-static-field",
                                  "instance-field",
                                  "public-instance-field",
                                  "abstract-field",
                                  "public-abstract-field",
                                  "protected-field",
                                  "protected-decorated-field",
                                  "protected-static-field",
                                  "protected-instance-field",
                                  "protected-abstract-field",
                                  "private-field",
                                  "private-decorated-field",
                                  "private-static-field",
                                  "private-instance-field",
                                  "private-abstract-field",
                                  "method",
                                  "public-method",
                                  "public-decorated-method",
                                  "decorated-method",
                                  "static-method",
                                  "public-static-method",
                                  "instance-method",
                                  "public-instance-method",
                                  "abstract-method",
                                  "public-abstract-method",
                                  "protected-method",
                                  "protected-decorated-method",
                                  "protected-static-method",
                                  "protected-instance-method",
                                  "protected-abstract-method",
                                  "private-method",
                                  "private-decorated-method",
                                  "private-static-method",
                                  "private-instance-method",
                                  "private-abstract-method",
                                  "constructor",
                                  "public-constructor",
                                  "protected-constructor",
                                  "private-constructor"
                                ]
                              },
                              "type": "array"
                            },
                            {
                              "enum": [
                                "never"
                              ],
                              "type": "string"
                            }
                          ]
                        },
                        "order": {
                          "enum": [
                            "alphabetically",
                            "as-written"
                          ],
                          "type": "string"
                        }
                      },
                      "type": "object"
                    }
                  ]
                },
                "classes": {
                  "oneOf": [
                    {
                      "enum": [
                        "never"
                      ],
                      "type": "string"
                    },
                    {
                      "items": {
                        "enum": [
                          "signature",
                          "field",
                          "public-field",
                          "public-decorated-field",
                          "decorated-field",
                          "static-field",
                          "public-static-field",
                          "instance-field",
                          "public-instance-field",
                          "abstract-field",
                          "public-abstract-field",
                          "protected-field",
                          "protected-decorated-field",
                          "protected-static-field",
                          "protected-instance-field",
                          "protected-abstract-field",
                          "private-field",
                          "private-decorated-field",
                          "private-static-field",
                          "private-instance-field",
                          "private-abstract-field",
                          "method",
                          "public-method",
                          "public-decorated-method",
                          "decorated-method",
                          "static-method",
                          "public-static-method",
                          "instance-method",
                          "public-instance-method",
                          "abstract-method",
                          "public-abstract-method",
                          "protected-method",
                          "protected-decorated-method",
                          "protected-static-method",
                          "protected-instance-method",
                          "protected-abstract-method",
                          "private-method",
                          "private-decorated-method",
                          "private-static-method",
                          "private-instance-method",
                          "private-abstract-method",
                          "constructor",
                          "public-constructor",
                          "protected-constructor",
                          "private-constructor"
                        ]
                      },
                      "type": "array"
                    },
                    {
                      "additionalProperties": false,
                      "properties": {
                        "memberTypes": {
                          "oneOf": [
                            {
                              "items": {
                                "enum": [
                                  "signature",
                                  "field",
                                  "public-field",
                                  "public-decorated-field",
                                  "decorated-field",
                                  "static-field",
                                  "public-static-field",
                                  "instance-field",
                                  "public-instance-field",
                                  "abstract-field",
                                  "public-abstract-field",
                                  "protected-field",
                                  "protected-decorated-field",
                                  "protected-static-field",
                                  "protected-instance-field",
                                  "protected-abstract-field",
                                  "private-field",
                                  "private-decorated-field",
                                  "private-static-field",
                                  "private-instance-field",
                                  "private-abstract-field",
                                  "method",
                                  "public-method",
                                  "public-decorated-method",
                                  "decorated-method",
                                  "static-method",
                                  "public-static-method",
                                  "instance-method",
                                  "public-instance-method",
                                  "abstract-method",
                                  "public-abstract-method",
                                  "protected-method",
                                  "protected-decorated-method",
                                  "protected-static-method",
                                  "protected-instance-method",
                                  "protected-abstract-method",
                                  "private-method",
                                  "private-decorated-method",
                                  "private-static-method",
                                  "private-instance-method",
                                  "private-abstract-method",
                                  "constructor",
                                  "public-constructor",
                                  "protected-constructor",
                                  "private-constructor"
                                ]
                              },
                              "type": "array"
                            },
                            {
                              "enum": [
                                "never"
                              ],
                              "type": "string"
                            }
                          ]
                        },
                        "order": {
                          "enum": [
                            "alphabetically",
                            "as-written"
                          ],
                          "type": "string"
                        }
                      },
                      "type": "object"
                    }
                  ]
                },
                "default": {
                  "oneOf": [
                    {
                      "enum": [
                        "never"
                      ],
                      "type": "string"
                    },
                    {
                      "items": {
                        "enum": [
                          "signature",
                          "field",
                          "public-field",
                          "public-decorated-field",
                          "decorated-field",
                          "static-field",
                          "public-static-field",
                          "instance-field",
                          "public-instance-field",
                          "abstract-field",
                          "public-abstract-field",
                          "protected-field",
                          "protected-decorated-field",
                          "protected-static-field",
                          "protected-instance-field",
                          "protected-abstract-field",
                          "private-field",
                          "private-decorated-field",
                          "private-static-field",
                          "private-instance-field",
                          "private-abstract-field",
                          "method",
                          "public-method",
                          "public-decorated-method",
                          "decorated-method",
                          "static-method",
                          "public-static-method",
                          "instance-method",
                          "public-instance-method",
                          "abstract-method",
                          "public-abstract-method",
                          "protected-method",
                          "protected-decorated-method",
                          "protected-static-method",
                          "protected-instance-method",
                          "protected-abstract-method",
                          "private-method",
                          "private-decorated-method",
                          "private-static-method",
                          "private-instance-method",
                          "private-abstract-method",
                          "constructor",
                          "public-constructor",
                          "protected-constructor",
                          "private-constructor"
                        ]
                      },
                      "type": "array"
                    },
                    {
                      "additionalProperties": false,
                      "properties": {
                        "memberTypes": {
                          "oneOf": [
                            {
                              "items": {
                                "enum": [
                                  "signature",
                                  "field",
                                  "public-field",
                                  "public-decorated-field",
                                  "decorated-field",
                                  "static-field",
                                  "public-static-field",
                                  "instance-field",
                                  "public-instance-field",
                                  "abstract-field",
                                  "public-abstract-field",
                                  "protected-field",
                                  "protected-decorated-field",
                                  "protected-static-field",
                                  "protected-instance-field",
                                  "protected-abstract-field",
                                  "private-field",
                                  "private-decorated-field",
                                  "private-static-field",
                                  "private-instance-field",
                                  "private-abstract-field",
                                  "method",
                                  "public-method",
                                  "public-decorated-method",
                                  "decorated-method",
                                  "static-method",
                                  "public-static-method",
                                  "instance-method",
                                  "public-instance-method",
                                  "abstract-method",
                                  "public-abstract-method",
                                  "protected-method",
                                  "protected-decorated-method",
                                  "protected-static-method",
                                  "protected-instance-method",
                                  "protected-abstract-method",
                                  "private-method",
                                  "private-decorated-method",
                                  "private-static-method",
                                  "private-instance-method",
                                  "private-abstract-method",
                                  "constructor",
                                  "public-constructor",
                                  "protected-constructor",
                                  "private-constructor"
                                ]
                              },
                              "type": "array"
                            },
                            {
                              "enum": [
                                "never"
                              ],
                              "type": "string"
                            }
                          ]
                        },
                        "order": {
                          "enum": [
                            "alphabetically",
                            "as-written"
                          ],
                          "type": "string"
                        }
                      },
                      "type": "object"
                    }
                  ]
                },
                "interfaces": {
                  "oneOf": [
                    {
                      "enum": [
                        "never"
                      ],
                      "type": "string"
                    },
                    {
                      "items": {
                        "enum": [
                          "signature",
                          "field",
                          "method",
                          "constructor"
                        ]
                      },
                      "type": "array"
                    },
                    {
                      "additionalProperties": false,
                      "properties": {
                        "memberTypes": {
                          "oneOf": [
                            {
                              "items": {
                                "enum": [
                                  "signature",
                                  "field",
                                  "method",
                                  "constructor"
                                ]
                              },
                              "type": "array"
                            },
                            {
                              "enum": [
                                "never"
                              ],
                              "type": "string"
                            }
                          ]
                        },
                        "order": {
                          "enum": [
                            "alphabetically",
                            "as-written"
                          ],
                          "type": "string"
                        }
                      },
                      "type": "object"
                    }
                  ]
                },
                "typeLiterals": {
                  "oneOf": [
                    {
                      "enum": [
                        "never"
                      ],
                      "type": "string"
                    },
                    {
                      "items": {
                        "enum": [
                          "signature",
                          "field",
                          "method",
                          "constructor"
                        ]
                      },
                      "type": "array"
                    },
                    {
                      "additionalProperties": false,
                      "properties": {
                        "memberTypes": {
                          "oneOf": [
                            {
                              "items": {
                                "enum": [
                                  "signature",
                                  "field",
                                  "method",
                                  "constructor"
                                ]
                              },
                              "type": "array"
                            },
                            {
                              "enum": [
                                "never"
                              ],
                              "type": "string"
                            }
                          ]
                        },
                        "order": {
                          "enum": [
                            "alphabetically",
                            "as-written"
                          ],
                          "type": "string"
                        }
                      },
                      "type": "object"
                    }
                  ]
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/method-signature-style": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Enforces using a particular method signature syntax.",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/method-signature-style.md"
          },
          "fixable": "code",
          "messages": {
            "errorMethod": "Shorthand method signature is forbidden. Use a function property instead.",
            "errorProperty": "Function property signature is forbidden. Use a method shorthand instead."
          },
          "schema": [
            {
              "enum": [
                "property",
                "method"
              ]
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/naming-convention": {
        "meta": {
          "docs": {
            "category": "Variables",
            "description": "Enforces naming conventions for everything across a codebase",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/naming-convention.md"
          },
          "messages": {
            "doesNotMatchFormat": "{{type}} name {{name}} must match one of the following formats: {{formats}}",
            "missingAffix": "{{type}} name {{name}} must have one of the following {{position}}es: {{affixes}}",
            "missingUnderscore": "{{type}} name {{name}} must have a {{position}} underscore.",
            "satisfyCustom": "{{type}} name {{name}} must {{regexMatch}} the RegExp: {{regex}}",
            "unexpectedUnderscore": "{{type}} name {{name}} must not have a {{position}} underscore."
          },
          "schema": {
            "additionalItems": false,
            "items": {
              "oneOf": [
                {
                  "additionalProperties": false,
                  "properties": {
                    "custom": {
                      "properties": {
                        "match": {
                          "type": "boolean"
                        },
                        "regex": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "match",
                        "regex"
                      ],
                      "type": "object"
                    },
                    "filter": {
                      "oneOf": [
                        {
                          "minLength": 1,
                          "type": "string"
                        },
                        {
                          "properties": {
                            "match": {
                              "type": "boolean"
                            },
                            "regex": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "match",
                            "regex"
                          ],
                          "type": "object"
                        }
                      ]
                    },
                    "format": {
                      "oneOf": [
                        {
                          "additionalItems": false,
                          "items": {
                            "enum": [
                              "camelCase",
                              "strictCamelCase",
                              "PascalCase",
                              "StrictPascalCase",
                              "snake_case",
                              "UPPER_CASE"
                            ],
                            "type": "string"
                          },
                          "type": "array"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "leadingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    },
                    "modifiers": {
                      "additionalItems": false,
                      "items": {
                        "enum": [
                          "readonly",
                          "static",
                          "public",
                          "protected",
                          "private",
                          "abstract"
                        ],
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "prefix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "selector": {
                      "enum": [
                        "default"
                      ],
                      "type": "string"
                    },
                    "suffix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "trailingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    }
                  },
                  "required": [
                    "selector",
                    "format"
                  ],
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "custom": {
                      "properties": {
                        "match": {
                          "type": "boolean"
                        },
                        "regex": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "match",
                        "regex"
                      ],
                      "type": "object"
                    },
                    "filter": {
                      "oneOf": [
                        {
                          "minLength": 1,
                          "type": "string"
                        },
                        {
                          "properties": {
                            "match": {
                              "type": "boolean"
                            },
                            "regex": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "match",
                            "regex"
                          ],
                          "type": "object"
                        }
                      ]
                    },
                    "format": {
                      "oneOf": [
                        {
                          "additionalItems": false,
                          "items": {
                            "enum": [
                              "camelCase",
                              "strictCamelCase",
                              "PascalCase",
                              "StrictPascalCase",
                              "snake_case",
                              "UPPER_CASE"
                            ],
                            "type": "string"
                          },
                          "type": "array"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "leadingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    },
                    "prefix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "selector": {
                      "enum": [
                        "variableLike"
                      ],
                      "type": "string"
                    },
                    "suffix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "trailingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    }
                  },
                  "required": [
                    "selector",
                    "format"
                  ],
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "custom": {
                      "properties": {
                        "match": {
                          "type": "boolean"
                        },
                        "regex": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "match",
                        "regex"
                      ],
                      "type": "object"
                    },
                    "filter": {
                      "oneOf": [
                        {
                          "minLength": 1,
                          "type": "string"
                        },
                        {
                          "properties": {
                            "match": {
                              "type": "boolean"
                            },
                            "regex": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "match",
                            "regex"
                          ],
                          "type": "object"
                        }
                      ]
                    },
                    "format": {
                      "oneOf": [
                        {
                          "additionalItems": false,
                          "items": {
                            "enum": [
                              "camelCase",
                              "strictCamelCase",
                              "PascalCase",
                              "StrictPascalCase",
                              "snake_case",
                              "UPPER_CASE"
                            ],
                            "type": "string"
                          },
                          "type": "array"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "leadingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    },
                    "prefix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "selector": {
                      "enum": [
                        "variable"
                      ],
                      "type": "string"
                    },
                    "suffix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "trailingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    },
                    "types": {
                      "additionalItems": false,
                      "items": {
                        "enum": [
                          "boolean",
                          "string",
                          "number",
                          "function",
                          "array"
                        ],
                        "type": "string"
                      },
                      "type": "array"
                    }
                  },
                  "required": [
                    "selector",
                    "format"
                  ],
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "custom": {
                      "properties": {
                        "match": {
                          "type": "boolean"
                        },
                        "regex": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "match",
                        "regex"
                      ],
                      "type": "object"
                    },
                    "filter": {
                      "oneOf": [
                        {
                          "minLength": 1,
                          "type": "string"
                        },
                        {
                          "properties": {
                            "match": {
                              "type": "boolean"
                            },
                            "regex": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "match",
                            "regex"
                          ],
                          "type": "object"
                        }
                      ]
                    },
                    "format": {
                      "oneOf": [
                        {
                          "additionalItems": false,
                          "items": {
                            "enum": [
                              "camelCase",
                              "strictCamelCase",
                              "PascalCase",
                              "StrictPascalCase",
                              "snake_case",
                              "UPPER_CASE"
                            ],
                            "type": "string"
                          },
                          "type": "array"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "leadingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    },
                    "prefix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "selector": {
                      "enum": [
                        "function"
                      ],
                      "type": "string"
                    },
                    "suffix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "trailingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    }
                  },
                  "required": [
                    "selector",
                    "format"
                  ],
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "custom": {
                      "properties": {
                        "match": {
                          "type": "boolean"
                        },
                        "regex": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "match",
                        "regex"
                      ],
                      "type": "object"
                    },
                    "filter": {
                      "oneOf": [
                        {
                          "minLength": 1,
                          "type": "string"
                        },
                        {
                          "properties": {
                            "match": {
                              "type": "boolean"
                            },
                            "regex": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "match",
                            "regex"
                          ],
                          "type": "object"
                        }
                      ]
                    },
                    "format": {
                      "oneOf": [
                        {
                          "additionalItems": false,
                          "items": {
                            "enum": [
                              "camelCase",
                              "strictCamelCase",
                              "PascalCase",
                              "StrictPascalCase",
                              "snake_case",
                              "UPPER_CASE"
                            ],
                            "type": "string"
                          },
                          "type": "array"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "leadingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    },
                    "prefix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "selector": {
                      "enum": [
                        "parameter"
                      ],
                      "type": "string"
                    },
                    "suffix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "trailingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    },
                    "types": {
                      "additionalItems": false,
                      "items": {
                        "enum": [
                          "boolean",
                          "string",
                          "number",
                          "function",
                          "array"
                        ],
                        "type": "string"
                      },
                      "type": "array"
                    }
                  },
                  "required": [
                    "selector",
                    "format"
                  ],
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "custom": {
                      "properties": {
                        "match": {
                          "type": "boolean"
                        },
                        "regex": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "match",
                        "regex"
                      ],
                      "type": "object"
                    },
                    "filter": {
                      "oneOf": [
                        {
                          "minLength": 1,
                          "type": "string"
                        },
                        {
                          "properties": {
                            "match": {
                              "type": "boolean"
                            },
                            "regex": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "match",
                            "regex"
                          ],
                          "type": "object"
                        }
                      ]
                    },
                    "format": {
                      "oneOf": [
                        {
                          "additionalItems": false,
                          "items": {
                            "enum": [
                              "camelCase",
                              "strictCamelCase",
                              "PascalCase",
                              "StrictPascalCase",
                              "snake_case",
                              "UPPER_CASE"
                            ],
                            "type": "string"
                          },
                          "type": "array"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "leadingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    },
                    "modifiers": {
                      "additionalItems": false,
                      "items": {
                        "enum": [
                          "private",
                          "protected",
                          "public",
                          "static",
                          "readonly",
                          "abstract"
                        ],
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "prefix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "selector": {
                      "enum": [
                        "memberLike"
                      ],
                      "type": "string"
                    },
                    "suffix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "trailingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    }
                  },
                  "required": [
                    "selector",
                    "format"
                  ],
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "custom": {
                      "properties": {
                        "match": {
                          "type": "boolean"
                        },
                        "regex": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "match",
                        "regex"
                      ],
                      "type": "object"
                    },
                    "filter": {
                      "oneOf": [
                        {
                          "minLength": 1,
                          "type": "string"
                        },
                        {
                          "properties": {
                            "match": {
                              "type": "boolean"
                            },
                            "regex": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "match",
                            "regex"
                          ],
                          "type": "object"
                        }
                      ]
                    },
                    "format": {
                      "oneOf": [
                        {
                          "additionalItems": false,
                          "items": {
                            "enum": [
                              "camelCase",
                              "strictCamelCase",
                              "PascalCase",
                              "StrictPascalCase",
                              "snake_case",
                              "UPPER_CASE"
                            ],
                            "type": "string"
                          },
                          "type": "array"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "leadingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    },
                    "modifiers": {
                      "additionalItems": false,
                      "items": {
                        "enum": [
                          "private",
                          "protected",
                          "public",
                          "static",
                          "readonly",
                          "abstract"
                        ],
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "prefix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "selector": {
                      "enum": [
                        "property"
                      ],
                      "type": "string"
                    },
                    "suffix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "trailingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    },
                    "types": {
                      "additionalItems": false,
                      "items": {
                        "enum": [
                          "boolean",
                          "string",
                          "number",
                          "function",
                          "array"
                        ],
                        "type": "string"
                      },
                      "type": "array"
                    }
                  },
                  "required": [
                    "selector",
                    "format"
                  ],
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "custom": {
                      "properties": {
                        "match": {
                          "type": "boolean"
                        },
                        "regex": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "match",
                        "regex"
                      ],
                      "type": "object"
                    },
                    "filter": {
                      "oneOf": [
                        {
                          "minLength": 1,
                          "type": "string"
                        },
                        {
                          "properties": {
                            "match": {
                              "type": "boolean"
                            },
                            "regex": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "match",
                            "regex"
                          ],
                          "type": "object"
                        }
                      ]
                    },
                    "format": {
                      "oneOf": [
                        {
                          "additionalItems": false,
                          "items": {
                            "enum": [
                              "camelCase",
                              "strictCamelCase",
                              "PascalCase",
                              "StrictPascalCase",
                              "snake_case",
                              "UPPER_CASE"
                            ],
                            "type": "string"
                          },
                          "type": "array"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "leadingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    },
                    "modifiers": {
                      "additionalItems": false,
                      "items": {
                        "enum": [
                          "private",
                          "protected",
                          "public",
                          "readonly"
                        ],
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "prefix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "selector": {
                      "enum": [
                        "parameterProperty"
                      ],
                      "type": "string"
                    },
                    "suffix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "trailingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    },
                    "types": {
                      "additionalItems": false,
                      "items": {
                        "enum": [
                          "boolean",
                          "string",
                          "number",
                          "function",
                          "array"
                        ],
                        "type": "string"
                      },
                      "type": "array"
                    }
                  },
                  "required": [
                    "selector",
                    "format"
                  ],
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "custom": {
                      "properties": {
                        "match": {
                          "type": "boolean"
                        },
                        "regex": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "match",
                        "regex"
                      ],
                      "type": "object"
                    },
                    "filter": {
                      "oneOf": [
                        {
                          "minLength": 1,
                          "type": "string"
                        },
                        {
                          "properties": {
                            "match": {
                              "type": "boolean"
                            },
                            "regex": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "match",
                            "regex"
                          ],
                          "type": "object"
                        }
                      ]
                    },
                    "format": {
                      "oneOf": [
                        {
                          "additionalItems": false,
                          "items": {
                            "enum": [
                              "camelCase",
                              "strictCamelCase",
                              "PascalCase",
                              "StrictPascalCase",
                              "snake_case",
                              "UPPER_CASE"
                            ],
                            "type": "string"
                          },
                          "type": "array"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "leadingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    },
                    "modifiers": {
                      "additionalItems": false,
                      "items": {
                        "enum": [
                          "private",
                          "protected",
                          "public",
                          "static",
                          "abstract"
                        ],
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "prefix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "selector": {
                      "enum": [
                        "method"
                      ],
                      "type": "string"
                    },
                    "suffix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "trailingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    }
                  },
                  "required": [
                    "selector",
                    "format"
                  ],
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "custom": {
                      "properties": {
                        "match": {
                          "type": "boolean"
                        },
                        "regex": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "match",
                        "regex"
                      ],
                      "type": "object"
                    },
                    "filter": {
                      "oneOf": [
                        {
                          "minLength": 1,
                          "type": "string"
                        },
                        {
                          "properties": {
                            "match": {
                              "type": "boolean"
                            },
                            "regex": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "match",
                            "regex"
                          ],
                          "type": "object"
                        }
                      ]
                    },
                    "format": {
                      "oneOf": [
                        {
                          "additionalItems": false,
                          "items": {
                            "enum": [
                              "camelCase",
                              "strictCamelCase",
                              "PascalCase",
                              "StrictPascalCase",
                              "snake_case",
                              "UPPER_CASE"
                            ],
                            "type": "string"
                          },
                          "type": "array"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "leadingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    },
                    "modifiers": {
                      "additionalItems": false,
                      "items": {
                        "enum": [
                          "private",
                          "protected",
                          "public",
                          "static",
                          "abstract"
                        ],
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "prefix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "selector": {
                      "enum": [
                        "accessor"
                      ],
                      "type": "string"
                    },
                    "suffix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "trailingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    },
                    "types": {
                      "additionalItems": false,
                      "items": {
                        "enum": [
                          "boolean",
                          "string",
                          "number",
                          "function",
                          "array"
                        ],
                        "type": "string"
                      },
                      "type": "array"
                    }
                  },
                  "required": [
                    "selector",
                    "format"
                  ],
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "custom": {
                      "properties": {
                        "match": {
                          "type": "boolean"
                        },
                        "regex": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "match",
                        "regex"
                      ],
                      "type": "object"
                    },
                    "filter": {
                      "oneOf": [
                        {
                          "minLength": 1,
                          "type": "string"
                        },
                        {
                          "properties": {
                            "match": {
                              "type": "boolean"
                            },
                            "regex": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "match",
                            "regex"
                          ],
                          "type": "object"
                        }
                      ]
                    },
                    "format": {
                      "oneOf": [
                        {
                          "additionalItems": false,
                          "items": {
                            "enum": [
                              "camelCase",
                              "strictCamelCase",
                              "PascalCase",
                              "StrictPascalCase",
                              "snake_case",
                              "UPPER_CASE"
                            ],
                            "type": "string"
                          },
                          "type": "array"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "leadingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    },
                    "prefix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "selector": {
                      "enum": [
                        "enumMember"
                      ],
                      "type": "string"
                    },
                    "suffix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "trailingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    }
                  },
                  "required": [
                    "selector",
                    "format"
                  ],
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "custom": {
                      "properties": {
                        "match": {
                          "type": "boolean"
                        },
                        "regex": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "match",
                        "regex"
                      ],
                      "type": "object"
                    },
                    "filter": {
                      "oneOf": [
                        {
                          "minLength": 1,
                          "type": "string"
                        },
                        {
                          "properties": {
                            "match": {
                              "type": "boolean"
                            },
                            "regex": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "match",
                            "regex"
                          ],
                          "type": "object"
                        }
                      ]
                    },
                    "format": {
                      "oneOf": [
                        {
                          "additionalItems": false,
                          "items": {
                            "enum": [
                              "camelCase",
                              "strictCamelCase",
                              "PascalCase",
                              "StrictPascalCase",
                              "snake_case",
                              "UPPER_CASE"
                            ],
                            "type": "string"
                          },
                          "type": "array"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "leadingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    },
                    "modifiers": {
                      "additionalItems": false,
                      "items": {
                        "enum": [
                          "abstract"
                        ],
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "prefix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "selector": {
                      "enum": [
                        "typeLike"
                      ],
                      "type": "string"
                    },
                    "suffix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "trailingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    }
                  },
                  "required": [
                    "selector",
                    "format"
                  ],
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "custom": {
                      "properties": {
                        "match": {
                          "type": "boolean"
                        },
                        "regex": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "match",
                        "regex"
                      ],
                      "type": "object"
                    },
                    "filter": {
                      "oneOf": [
                        {
                          "minLength": 1,
                          "type": "string"
                        },
                        {
                          "properties": {
                            "match": {
                              "type": "boolean"
                            },
                            "regex": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "match",
                            "regex"
                          ],
                          "type": "object"
                        }
                      ]
                    },
                    "format": {
                      "oneOf": [
                        {
                          "additionalItems": false,
                          "items": {
                            "enum": [
                              "camelCase",
                              "strictCamelCase",
                              "PascalCase",
                              "StrictPascalCase",
                              "snake_case",
                              "UPPER_CASE"
                            ],
                            "type": "string"
                          },
                          "type": "array"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "leadingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    },
                    "modifiers": {
                      "additionalItems": false,
                      "items": {
                        "enum": [
                          "abstract"
                        ],
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "prefix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "selector": {
                      "enum": [
                        "class"
                      ],
                      "type": "string"
                    },
                    "suffix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "trailingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    }
                  },
                  "required": [
                    "selector",
                    "format"
                  ],
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "custom": {
                      "properties": {
                        "match": {
                          "type": "boolean"
                        },
                        "regex": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "match",
                        "regex"
                      ],
                      "type": "object"
                    },
                    "filter": {
                      "oneOf": [
                        {
                          "minLength": 1,
                          "type": "string"
                        },
                        {
                          "properties": {
                            "match": {
                              "type": "boolean"
                            },
                            "regex": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "match",
                            "regex"
                          ],
                          "type": "object"
                        }
                      ]
                    },
                    "format": {
                      "oneOf": [
                        {
                          "additionalItems": false,
                          "items": {
                            "enum": [
                              "camelCase",
                              "strictCamelCase",
                              "PascalCase",
                              "StrictPascalCase",
                              "snake_case",
                              "UPPER_CASE"
                            ],
                            "type": "string"
                          },
                          "type": "array"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "leadingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    },
                    "prefix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "selector": {
                      "enum": [
                        "interface"
                      ],
                      "type": "string"
                    },
                    "suffix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "trailingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    }
                  },
                  "required": [
                    "selector",
                    "format"
                  ],
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "custom": {
                      "properties": {
                        "match": {
                          "type": "boolean"
                        },
                        "regex": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "match",
                        "regex"
                      ],
                      "type": "object"
                    },
                    "filter": {
                      "oneOf": [
                        {
                          "minLength": 1,
                          "type": "string"
                        },
                        {
                          "properties": {
                            "match": {
                              "type": "boolean"
                            },
                            "regex": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "match",
                            "regex"
                          ],
                          "type": "object"
                        }
                      ]
                    },
                    "format": {
                      "oneOf": [
                        {
                          "additionalItems": false,
                          "items": {
                            "enum": [
                              "camelCase",
                              "strictCamelCase",
                              "PascalCase",
                              "StrictPascalCase",
                              "snake_case",
                              "UPPER_CASE"
                            ],
                            "type": "string"
                          },
                          "type": "array"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "leadingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    },
                    "prefix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "selector": {
                      "enum": [
                        "typeAlias"
                      ],
                      "type": "string"
                    },
                    "suffix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "trailingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    }
                  },
                  "required": [
                    "selector",
                    "format"
                  ],
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "custom": {
                      "properties": {
                        "match": {
                          "type": "boolean"
                        },
                        "regex": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "match",
                        "regex"
                      ],
                      "type": "object"
                    },
                    "filter": {
                      "oneOf": [
                        {
                          "minLength": 1,
                          "type": "string"
                        },
                        {
                          "properties": {
                            "match": {
                              "type": "boolean"
                            },
                            "regex": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "match",
                            "regex"
                          ],
                          "type": "object"
                        }
                      ]
                    },
                    "format": {
                      "oneOf": [
                        {
                          "additionalItems": false,
                          "items": {
                            "enum": [
                              "camelCase",
                              "strictCamelCase",
                              "PascalCase",
                              "StrictPascalCase",
                              "snake_case",
                              "UPPER_CASE"
                            ],
                            "type": "string"
                          },
                          "type": "array"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "leadingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    },
                    "prefix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "selector": {
                      "enum": [
                        "enum"
                      ],
                      "type": "string"
                    },
                    "suffix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "trailingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    }
                  },
                  "required": [
                    "selector",
                    "format"
                  ],
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "custom": {
                      "properties": {
                        "match": {
                          "type": "boolean"
                        },
                        "regex": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "match",
                        "regex"
                      ],
                      "type": "object"
                    },
                    "filter": {
                      "oneOf": [
                        {
                          "minLength": 1,
                          "type": "string"
                        },
                        {
                          "properties": {
                            "match": {
                              "type": "boolean"
                            },
                            "regex": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "match",
                            "regex"
                          ],
                          "type": "object"
                        }
                      ]
                    },
                    "format": {
                      "oneOf": [
                        {
                          "additionalItems": false,
                          "items": {
                            "enum": [
                              "camelCase",
                              "strictCamelCase",
                              "PascalCase",
                              "StrictPascalCase",
                              "snake_case",
                              "UPPER_CASE"
                            ],
                            "type": "string"
                          },
                          "type": "array"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "leadingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    },
                    "prefix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "selector": {
                      "enum": [
                        "typeParameter"
                      ],
                      "type": "string"
                    },
                    "suffix": {
                      "additionalItems": false,
                      "items": {
                        "minLength": 1,
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "trailingUnderscore": {
                      "enum": [
                        "forbid",
                        "allow",
                        "require"
                      ],
                      "type": "string"
                    }
                  },
                  "required": [
                    "selector",
                    "format"
                  ],
                  "type": "object"
                }
              ]
            },
            "type": "array"
          },
          "type": "suggestion"
        }
      },
      "@typescript-eslint/no-array-constructor": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "Disallow generic `Array` constructors",
            "extendsBaseRule": true,
            "recommended": "error",
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-array-constructor.md"
          },
          "fixable": "code",
          "messages": {
            "useLiteral": "The array literal notation [] is preferable."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/no-base-to-string": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Requires that `.toString()` is only called on objects which provide useful information when stringified",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-base-to-string.md"
          },
          "messages": {
            "baseToString": "'{{name}} {{certainty}} evaluate to '[object Object]' when stringified."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "ignoreTaggedTemplateExpressions": {
                  "default": true,
                  "type": "boolean"
                },
                "ignoredTypeNames": {
                  "items": {
                    "type": "string"
                  },
                  "type": "array"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/no-dupe-class-members": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "Disallow duplicate class members",
            "extendsBaseRule": true,
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-dupe-class-members.md"
          },
          "messages": {
            "unexpected": "Duplicate name '{{name}}'."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "@typescript-eslint/no-dynamic-delete": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Disallow the delete operator with computed key expressions",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-dynamic-delete.md"
          },
          "fixable": "code",
          "messages": {
            "dynamicDelete": "Do not delete dynamically computed property keys."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/no-empty-function": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Disallow empty functions",
            "extendsBaseRule": true,
            "recommended": "error",
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-empty-function.md"
          },
          "messages": {
            "unexpected": "Unexpected empty {{name}}."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allow": {
                  "items": {
                    "enum": [
                      "functions",
                      "arrowFunctions",
                      "generatorFunctions",
                      "methods",
                      "generatorMethods",
                      "getters",
                      "setters",
                      "constructors",
                      "private-constructors",
                      "protected-constructors"
                    ]
                  },
                  "type": "array",
                  "uniqueItems": true
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/no-empty-interface": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Disallow the declaration of empty interfaces",
            "recommended": "error",
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-empty-interface.md"
          },
          "fixable": "code",
          "messages": {
            "noEmpty": "An empty interface is equivalent to `{}`.",
            "noEmptyWithSuper": "An interface declaring no members is equivalent to its supertype."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowSingleExtends": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/no-explicit-any": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Disallow usage of the `any` type",
            "recommended": "warn",
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-explicit-any.md"
          },
          "fixable": "code",
          "messages": {
            "suggestNever": "Use `never` instead, this is useful when instantiating generic type parameters that you don't need to know the type of.",
            "suggestUnknown": "Use `unknown` instead, this will force you to explicitly, and safely assert the type is correct.",
            "unexpectedAny": "Unexpected any. Specify a different type."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "fixToUnknown": {
                  "type": "boolean"
                },
                "ignoreRestArgs": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/no-extra-non-null-assertion": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "Disallow extra non-null assertion",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-extra-non-null-assertion.md"
          },
          "fixable": "code",
          "messages": {
            "noExtraNonNullAssertion": "Forbidden extra non-null assertion."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "@typescript-eslint/no-extra-parens": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "Disallow unnecessary parentheses",
            "extendsBaseRule": true,
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-extra-parens.md"
          },
          "fixable": "code",
          "messages": {
            "unexpected": "Unnecessary parentheses around expression."
          },
          "schema": {
            "anyOf": [
              {
                "items": [
                  {
                    "enum": [
                      "functions"
                    ]
                  }
                ],
                "maxItems": 1,
                "minItems": 0,
                "type": "array"
              },
              {
                "items": [
                  {
                    "enum": [
                      "all"
                    ]
                  },
                  {
                    "additionalProperties": false,
                    "properties": {
                      "conditionalAssign": {
                        "type": "boolean"
                      },
                      "enforceForArrowConditionals": {
                        "type": "boolean"
                      },
                      "enforceForNewInMemberExpressions": {
                        "type": "boolean"
                      },
                      "enforceForSequenceExpressions": {
                        "type": "boolean"
                      },
                      "ignoreJSX": {
                        "enum": [
                          "none",
                          "all",
                          "single-line",
                          "multi-line"
                        ]
                      },
                      "nestedBinaryExpressions": {
                        "type": "boolean"
                      },
                      "returnAssign": {
                        "type": "boolean"
                      }
                    },
                    "type": "object"
                  }
                ],
                "maxItems": 2,
                "minItems": 0,
                "type": "array"
              }
            ]
          },
          "type": "layout"
        }
      },
      "@typescript-eslint/no-extra-semi": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "Disallow unnecessary semicolons",
            "extendsBaseRule": true,
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-extra-semi.md"
          },
          "fixable": "code",
          "messages": {
            "unexpected": "Unnecessary semicolon."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/no-extraneous-class": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Forbids the use of classes as namespaces",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-extraneous-class.md"
          },
          "messages": {
            "empty": "Unexpected empty class.",
            "onlyConstructor": "Unexpected class with only a constructor.",
            "onlyStatic": "Unexpected class with only static properties."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowConstructorOnly": {
                  "type": "boolean"
                },
                "allowEmpty": {
                  "type": "boolean"
                },
                "allowStaticOnly": {
                  "type": "boolean"
                },
                "allowWithDecorator": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/no-floating-promises": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Requires Promise-like values to be handled appropriately",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-floating-promises.md"
          },
          "messages": {
            "floating": "Promises must be handled appropriately.",
            "floatingFixVoid": "Add void operator to ignore.",
            "floatingVoid": "Promises must be handled appropriately or explicitly marked as ignored with the `void` operator."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "ignoreIIFE": {
                  "type": "boolean"
                },
                "ignoreVoid": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "problem"
        }
      },
      "@typescript-eslint/no-for-in-array": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Disallow iterating over an array with a for-in loop",
            "recommended": "error",
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-for-in-array.md"
          },
          "messages": {
            "forInViolation": "For-in loops over arrays are forbidden. Use for-of or array.forEach instead."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "@typescript-eslint/no-implied-eval": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Disallow the use of `eval()`-like methods",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-implied-eval.md"
          },
          "messages": {
            "noFunctionConstructor": "Implied eval. Do not use the Function constructor to create functions.",
            "noImpliedEvalError": "Implied eval. Consider passing a function."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/no-inferrable-types": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Disallows explicit type declarations for variables or parameters initialized to a number, string, or boolean",
            "recommended": "error",
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-inferrable-types.md"
          },
          "fixable": "code",
          "messages": {
            "noInferrableType": "Type {{type}} trivially inferred from a {{type}} literal, remove type annotation."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "ignoreParameters": {
                  "type": "boolean"
                },
                "ignoreProperties": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/no-invalid-this": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow `this` keywords outside of classes or class-like objects",
            "extendsBaseRule": true,
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-invalid-this.md"
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "capIsConstructor": {
                  "default": true,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/no-invalid-void-type": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Disallows usage of `void` type outside of generic or return types",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-invalid-void-type.md"
          },
          "messages": {
            "invalidVoidForGeneric": "{{ generic }} may not have void as a type variable",
            "invalidVoidNotReturn": "void is only valid as a return type",
            "invalidVoidNotReturnOrGeneric": "void is only valid as a return type or generic type variable"
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowInGenericTypeArguments": {
                  "oneOf": [
                    {
                      "type": "boolean"
                    },
                    {
                      "items": {
                        "type": "string"
                      },
                      "minLength": 1,
                      "type": "array"
                    }
                  ]
                }
              },
              "type": "object"
            }
          ],
          "type": "problem"
        }
      },
      "@typescript-eslint/no-magic-numbers": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Disallow magic numbers",
            "extendsBaseRule": true,
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-magic-numbers.md"
          },
          "messages": {
            "noMagic": "No magic number: {{raw}}.",
            "useConst": "Number constants declarations must use 'const'."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "detectObjects": {
                  "default": false,
                  "type": "boolean"
                },
                "enforceConst": {
                  "default": false,
                  "type": "boolean"
                },
                "ignore": {
                  "items": {
                    "type": "number"
                  },
                  "type": "array",
                  "uniqueItems": true
                },
                "ignoreArrayIndexes": {
                  "default": false,
                  "type": "boolean"
                },
                "ignoreEnums": {
                  "type": "boolean"
                },
                "ignoreNumericLiteralTypes": {
                  "type": "boolean"
                },
                "ignoreReadonlyClassProperties": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/no-misused-new": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Enforce valid definition of `new` and `constructor`",
            "recommended": "error",
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-misused-new.md"
          },
          "messages": {
            "errorMessageClass": "Class cannot have method named `new`.",
            "errorMessageInterface": "Interfaces cannot be constructed, only classes."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "@typescript-eslint/no-misused-promises": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Avoid using promises in places not designed to handle them",
            "recommended": "error",
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-misused-promises.md"
          },
          "messages": {
            "conditional": "Expected non-Promise value in a boolean conditional.",
            "voidReturn": "Promise returned in function argument where a void return was expected."
          },
          "schema": [
            {
              "properties": {
                "checksConditionals": {
                  "type": "boolean"
                },
                "checksVoidReturn": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "problem"
        }
      },
      "@typescript-eslint/no-namespace": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Disallow the use of custom TypeScript modules and namespaces",
            "recommended": "error",
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-namespace.md"
          },
          "messages": {
            "moduleSyntaxIsPreferred": "ES2015 module syntax is preferred over custom TypeScript modules and namespaces."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowDeclarations": {
                  "type": "boolean"
                },
                "allowDefinitionFiles": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/no-non-null-asserted-optional-chain": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "Disallows using a non-null assertion after an optional chain expression",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-non-null-asserted-optional-chain.md"
          },
          "messages": {
            "noNonNullOptionalChain": "Optional chain expressions can return undefined by design - using a non-null assertion is unsafe and wrong.",
            "suggestRemovingNonNull": "You should remove the non-null assertion."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "@typescript-eslint/no-non-null-assertion": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "Disallows non-null assertions using the `!` postfix operator",
            "recommended": "warn",
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-non-null-assertion.md"
          },
          "messages": {
            "noNonNull": "Forbidden non-null assertion.",
            "suggestOptionalChain": "Consider using the optional chain operator `?.` instead. This operator includes runtime checks, so it is safer than the compile-only non-null assertion operator."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "@typescript-eslint/no-parameter-properties": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "Disallow the use of parameter properties in class constructors",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-parameter-properties.md"
          },
          "messages": {
            "noParamProp": "Property {{parameter}} cannot be declared in the constructor."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allows": {
                  "items": {
                    "enum": [
                      "readonly",
                      "private",
                      "protected",
                      "public",
                      "private readonly",
                      "protected readonly",
                      "public readonly"
                    ]
                  },
                  "minItems": 1,
                  "type": "array"
                }
              },
              "type": "object"
            }
          ],
          "type": "problem"
        }
      },
      "@typescript-eslint/no-require-imports": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Disallows invocation of `require()`",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-require-imports.md"
          },
          "messages": {
            "noRequireImports": "A `require()` style import is forbidden."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "@typescript-eslint/no-this-alias": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Disallow aliasing `this`",
            "recommended": "error",
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-this-alias.md"
          },
          "messages": {
            "thisAssignment": "Unexpected aliasing of 'this' to local variable.",
            "thisDestructure": "Unexpected aliasing of members of 'this' to local variables."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowDestructuring": {
                  "type": "boolean"
                },
                "allowedNames": {
                  "items": {
                    "type": "string"
                  },
                  "type": "array"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/no-throw-literal": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Disallow throwing literals as exceptions",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-throw-literal.md"
          },
          "messages": {
            "object": "Expected an error object to be thrown.",
            "undef": "Do not throw undefined."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "@typescript-eslint/no-type-alias": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "Disallow the use of type aliases",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-type-alias.md"
          },
          "messages": {
            "noCompositionAlias": "{{typeName}} in {{compositionType}} types are not allowed.",
            "noTypeAlias": "Type {{alias}} are not allowed."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowAliases": {
                  "enum": [
                    "always",
                    "never",
                    "in-unions",
                    "in-intersections",
                    "in-unions-and-intersections"
                  ]
                },
                "allowCallbacks": {
                  "enum": [
                    "always",
                    "never"
                  ]
                },
                "allowConditionalTypes": {
                  "enum": [
                    "always",
                    "never"
                  ]
                },
                "allowConstructors": {
                  "enum": [
                    "always",
                    "never"
                  ]
                },
                "allowLiterals": {
                  "enum": [
                    "always",
                    "never",
                    "in-unions",
                    "in-intersections",
                    "in-unions-and-intersections"
                  ]
                },
                "allowMappedTypes": {
                  "enum": [
                    "always",
                    "never",
                    "in-unions",
                    "in-intersections",
                    "in-unions-and-intersections"
                  ]
                },
                "allowTupleTypes": {
                  "enum": [
                    "always",
                    "never",
                    "in-unions",
                    "in-intersections",
                    "in-unions-and-intersections"
                  ]
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "Flags unnecessary equality comparisons against boolean literals",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-unnecessary-boolean-literal-compare.md"
          },
          "fixable": "code",
          "messages": {
            "direct": "This expression unnecessarily compares a boolean value to a boolean instead of using it directly.",
            "negated": "This expression unnecessarily compares a boolean value to a boolean instead of negating it."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/no-unnecessary-condition": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Prevents conditionals where the type is always truthy or always falsy",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-unnecessary-condition.md"
          },
          "fixable": "code",
          "messages": {
            "alwaysFalsy": "Unnecessary conditional, value is always falsy.",
            "alwaysFalsyFunc": "This callback should return a conditional, but return is always falsy.",
            "alwaysNullish": "Unnecessary conditional, left-hand side of `??` operator is always `null` or `undefined`.",
            "alwaysTruthy": "Unnecessary conditional, value is always truthy.",
            "alwaysTruthyFunc": "This callback should return a conditional, but return is always truthy.",
            "literalBooleanExpression": "Unnecessary conditional, both sides of the expression are literal values.",
            "never": "Unnecessary conditional, value is `never`.",
            "neverNullish": "Unnecessary conditional, expected left-hand side of `??` operator to be possibly null or undefined.",
            "neverOptionalChain": "Unnecessary optional chain on a non-nullish value."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowConstantLoopConditions": {
                  "type": "boolean"
                },
                "checkArrayPredicates": {
                  "type": "boolean"
                },
                "ignoreRhs": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/no-unnecessary-qualifier": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Warns when a namespace qualifier is unnecessary",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-unnecessary-qualifier.md"
          },
          "fixable": "code",
          "messages": {
            "unnecessaryQualifier": "Qualifier is unnecessary since '{{ name }}' is in scope."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/no-unnecessary-type-arguments": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Enforces that type arguments will not be used if not required",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-unnecessary-type-arguments.md"
          },
          "fixable": "code",
          "messages": {
            "unnecessaryTypeParameter": "This is the default value for this type parameter, so it can be omitted."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/no-unnecessary-type-assertion": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Warns if a type assertion does not change the type of an expression",
            "recommended": "error",
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-unnecessary-type-assertion.md"
          },
          "fixable": "code",
          "messages": {
            "contextuallyUnnecessary": "This assertion is unnecessary since the receiver accepts the original type of the expression.",
            "unnecessaryAssertion": "This assertion is unnecessary since it does not change the type of the expression."
          },
          "schema": [
            {
              "properties": {
                "typesToIgnore": {
                  "items": {
                    "type": "string"
                  },
                  "type": "array"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/no-unsafe-assignment": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "Disallows assigning any to variables and properties",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-unsafe-assignment.md"
          },
          "messages": {
            "anyAssignment": "Unsafe assignment of an any value.",
            "unsafeArrayPattern": "Unsafe array destructuring of an any array value.",
            "unsafeArrayPatternFromTuple": "Unsafe array destructuring of a tuple element with an any value.",
            "unsafeArraySpread": "Unsafe spread of an any value in an array.",
            "unsafeAssignment": "Unsafe asignment of type {{sender}} to a variable of type {{receiver}}."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "@typescript-eslint/no-unsafe-call": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "Disallows calling an any type value",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-unsafe-call.md"
          },
          "messages": {
            "unsafeCall": "Unsafe call of an any typed value.",
            "unsafeNew": "Unsafe construction of an any type value.",
            "unsafeTemplateTag": "Unsafe any typed template tag."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "@typescript-eslint/no-unsafe-member-access": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "Disallows member access on any typed variables",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-unsafe-member-access.md"
          },
          "messages": {
            "unsafeComputedMemberAccess": "Computed name {{property}} resolves to an any value.",
            "unsafeMemberExpression": "Unsafe member access {{property}} on an any value."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "@typescript-eslint/no-unsafe-return": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "Disallows returning any from a function",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-unsafe-return.md"
          },
          "messages": {
            "unsafeReturn": "Unsafe return of an {{type}} typed value",
            "unsafeReturnAssignment": "Unsafe return of type {{sender}} from function with return type {{receiver}}."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "@typescript-eslint/no-untyped-public-signature": {
        "meta": {
          "deprecated": true,
          "docs": {
            "category": "Best Practices",
            "description": "Disallow untyped public methods",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-untyped-public-signature.md"
          },
          "messages": {
            "noReturnType": "Public method has no return type.",
            "untypedParameter": "Public method parameters should be typed."
          },
          "replacedBy": [
            "explicit-module-boundary-types"
          ],
          "schema": [
            {
              "allowAdditionalProperties": false,
              "properties": {
                "ignoredMethods": {
                  "items": {
                    "type": "string"
                  },
                  "type": "array"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/no-unused-expressions": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Disallow unused expressions",
            "extendsBaseRule": true,
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-unused-expressions.md"
          },
          "messages": {},
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowShortCircuit": {
                  "default": false,
                  "type": "boolean"
                },
                "allowTaggedTemplates": {
                  "default": false,
                  "type": "boolean"
                },
                "allowTernary": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/no-unused-vars": {
        "meta": {
          "docs": {
            "category": "Variables",
            "description": "Disallow unused variables",
            "extendsBaseRule": true,
            "recommended": "warn",
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-unused-vars.md"
          },
          "schema": [
            {
              "oneOf": [
                {
                  "enum": [
                    "all",
                    "local"
                  ]
                },
                {
                  "properties": {
                    "args": {
                      "enum": [
                        "all",
                        "after-used",
                        "none"
                      ]
                    },
                    "argsIgnorePattern": {
                      "type": "string"
                    },
                    "caughtErrors": {
                      "enum": [
                        "all",
                        "none"
                      ]
                    },
                    "caughtErrorsIgnorePattern": {
                      "type": "string"
                    },
                    "ignoreRestSiblings": {
                      "type": "boolean"
                    },
                    "vars": {
                      "enum": [
                        "all",
                        "local"
                      ]
                    },
                    "varsIgnorePattern": {
                      "type": "string"
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "problem"
        }
      },
      "@typescript-eslint/no-unused-vars-experimental": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Disallow unused variables and arguments",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-unused-vars-experimental.md"
          },
          "messages": {
            "unused": "{{type}} '{{name}}' is declared but its value is never read.",
            "unusedImport": "All imports in import declaration are unused.",
            "unusedTypeParameters": "All type parameters are unused.",
            "unusedWithIgnorePattern": "{{type}} '{{name}}' is declared but its value is never read. Allowed unused names must match {{pattern}}."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "ignoreArgsIfArgsAfterAreUsed": {
                  "type": "boolean"
                },
                "ignoredNamesRegex": {
                  "oneOf": [
                    {
                      "type": "string"
                    },
                    {
                      "enum": [
                        false
                      ],
                      "type": "boolean"
                    }
                  ]
                }
              },
              "type": "object"
            }
          ],
          "type": "problem"
        }
      },
      "@typescript-eslint/no-use-before-define": {
        "meta": {
          "docs": {
            "category": "Variables",
            "description": "Disallow the use of variables before they are defined",
            "extendsBaseRule": true,
            "recommended": "error",
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-use-before-define.md"
          },
          "messages": {
            "noUseBeforeDefine": "'{{name}}' was used before it was defined."
          },
          "schema": [
            {
              "oneOf": [
                {
                  "enum": [
                    "nofunc"
                  ]
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "classes": {
                      "type": "boolean"
                    },
                    "enums": {
                      "type": "boolean"
                    },
                    "functions": {
                      "type": "boolean"
                    },
                    "typedefs": {
                      "type": "boolean"
                    },
                    "variables": {
                      "type": "boolean"
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "problem"
        }
      },
      "@typescript-eslint/no-useless-constructor": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Disallow unnecessary constructors",
            "extendsBaseRule": true,
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-useless-constructor.md"
          },
          "schema": [],
          "type": "problem"
        }
      },
      "@typescript-eslint/no-var-requires": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Disallows the use of require statements except in import statements",
            "recommended": "error",
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/no-var-requires.md"
          },
          "messages": {
            "noVarReqs": "Require statement not part of import statement."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "@typescript-eslint/prefer-as-const": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Prefer usage of `as const` over literal type",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/prefer-as-const.md"
          },
          "fixable": "code",
          "messages": {
            "preferConstAssertion": "Expected a `const` instead of a literal type assertion.",
            "variableConstAssertion": "Expected a `const` assertion instead of a literal type annotation.",
            "variableSuggest": "You should use `as const` instead of type annotation."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/prefer-for-of": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "Prefer a ‘for-of’ loop over a standard ‘for’ loop if the index is only used to access the array being iterated",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/prefer-for-of.md"
          },
          "messages": {
            "preferForOf": "Expected a `for-of` loop instead of a `for` loop with this simple iteration."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/prefer-function-type": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Use function types instead of interfaces with call signatures",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/prefer-function-type.md"
          },
          "fixable": "code",
          "messages": {
            "functionTypeOverCallableType": "{{ type }} has only a call signature - use '{{ sigSuggestion }}' instead."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/prefer-includes": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Enforce `includes` method over `indexOf` method",
            "recommended": "error",
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/prefer-includes.md"
          },
          "fixable": "code",
          "messages": {
            "preferIncludes": "Use 'includes()' method instead.",
            "preferStringIncludes": "Use `String#includes()` method with a string instead."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/prefer-namespace-keyword": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Require the use of the `namespace` keyword instead of the `module` keyword to declare custom TypeScript modules",
            "recommended": "error",
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/prefer-namespace-keyword.md"
          },
          "fixable": "code",
          "messages": {
            "useNamespace": "Use 'namespace' instead of 'module' to declare custom TypeScript modules."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/prefer-nullish-coalescing": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Enforce the usage of the nullish coalescing operator instead of logical chaining",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/prefer-nullish-coalescing.md"
          },
          "fixable": "code",
          "messages": {
            "preferNullish": "Prefer using nullish coalescing operator (`??`) instead of a logical or (`||`), as it is a safer operator."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "forceSuggestionFixer": {
                  "type": "boolean"
                },
                "ignoreConditionalTests": {
                  "type": "boolean"
                },
                "ignoreMixedLogicalExpressions": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/prefer-optional-chain": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Prefer using concise optional chain expressions instead of chained logical ands",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/prefer-optional-chain.md"
          },
          "fixable": "code",
          "messages": {
            "optionalChainSuggest": "Change to an optional chain.",
            "preferOptionalChain": "Prefer using an optional chain expression instead, as it's more concise and easier to read."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "suggestInsteadOfAutofix": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/prefer-readonly": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Requires that private members are marked as `readonly` if they're never modified outside of the constructor",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/prefer-readonly.md"
          },
          "fixable": "code",
          "messages": {
            "preferReadonly": "Member '{{name}}' is never reassigned; mark it as `readonly`."
          },
          "schema": [
            {
              "allowAdditionalProperties": false,
              "properties": {
                "onlyInlineLambdas": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/prefer-readonly-parameter-types": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "Requires that function parameters are typed as readonly to prevent accidental mutation of inputs",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/prefer-readonly-parameter-types.md"
          },
          "messages": {
            "shouldBeReadonly": "Parameter should be a read only type."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "checkParameterProperties": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/prefer-reduce-type-parameter": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Prefer using type parameter when calling `Array#reduce` instead of casting",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/prefer-reduce-type-parameter.md"
          },
          "fixable": "code",
          "messages": {
            "preferTypeParameter": "Unnecessary cast: Array#reduce accepts a type parameter for the default value."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "@typescript-eslint/prefer-regexp-exec": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Enforce that `RegExp#exec` is used instead of `String#match` if no global flag is provided",
            "recommended": "error",
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/prefer-regexp-exec.md"
          },
          "messages": {
            "regExpExecOverStringMatch": "Use the `RegExp#exec()` method instead."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/prefer-string-starts-ends-with": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Enforce the use of `String#startsWith` and `String#endsWith` instead of other equivalent methods of checking substrings",
            "recommended": "error",
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/prefer-string-starts-ends-with.md"
          },
          "fixable": "code",
          "messages": {
            "preferEndsWith": "Use the 'String#endsWith' method instead.",
            "preferStartsWith": "Use 'String#startsWith' method instead."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/prefer-ts-expect-error": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Recommends using `// @ts-expect-error` over `// @ts-ignore`",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/prefer-ts-expect-error.md"
          },
          "fixable": "code",
          "messages": {
            "preferExpectErrorComment": "Use \"// @ts-expect-error\" to ensure an error is actually being suppressed."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "@typescript-eslint/promise-function-async": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Requires any function or method that returns a Promise to be marked async",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/promise-function-async.md"
          },
          "messages": {
            "missingAsync": "Functions that return promises must be async."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowAny": {
                  "type": "boolean"
                },
                "allowedPromiseNames": {
                  "items": {
                    "type": "string"
                  },
                  "type": "array"
                },
                "checkArrowFunctions": {
                  "type": "boolean"
                },
                "checkFunctionDeclarations": {
                  "type": "boolean"
                },
                "checkFunctionExpressions": {
                  "type": "boolean"
                },
                "checkMethodDeclarations": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/quotes": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "Enforce the consistent use of either backticks, double, or single quotes",
            "extendsBaseRule": true,
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/quotes.md"
          },
          "fixable": "code",
          "schema": [
            {
              "enum": [
                "single",
                "double",
                "backtick"
              ]
            },
            {
              "anyOf": [
                {
                  "enum": [
                    "avoid-escape"
                  ]
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "allowTemplateLiterals": {
                      "type": "boolean"
                    },
                    "avoidEscape": {
                      "type": "boolean"
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "layout"
        }
      },
      "@typescript-eslint/require-array-sort-compare": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Requires `Array#sort` calls to always provide a `compareFunction`",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/require-array-sort-compare.md"
          },
          "messages": {
            "requireCompare": "Require 'compare' argument."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "@typescript-eslint/require-await": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Disallow async functions which have no `await` expression",
            "extendsBaseRule": true,
            "recommended": "error",
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/require-await.md"
          },
          "messages": {
            "missingAwait": "{{name}} has no 'await' expression."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/restrict-plus-operands": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "When adding two variables, operands must both be of type number or of type string",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/restrict-plus-operands.md"
          },
          "messages": {
            "notBigInts": "Operands of '+' operation must be both bigints.",
            "notNumbers": "Operands of '+' operation must either be both strings or both numbers.",
            "notStrings": "Operands of '+' operation must either be both strings or both numbers. Consider using a template literal."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "checkCompoundAssignments": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "problem"
        }
      },
      "@typescript-eslint/restrict-template-expressions": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Enforce template literal expressions to be of string type",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/restrict-template-expressions.md"
          },
          "messages": {
            "invalidType": "Invalid type of template literal expression."
          },
          "schema": [
            {
              "properties": {
                "allowAny": {
                  "type": "boolean"
                },
                "allowBoolean": {
                  "type": "boolean"
                },
                "allowNullable": {
                  "type": "boolean"
                },
                "allowNumber": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "problem"
        }
      },
      "@typescript-eslint/return-await": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Enforces consistent returning of awaited values",
            "extendsBaseRule": "no-return-await",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/return-await.md"
          },
          "fixable": "code",
          "messages": {
            "disallowedPromiseAwait": "Returning an awaited promise is not allowed in this context.",
            "nonPromiseAwait": "Returning an awaited value that is not a promise is not allowed.",
            "requiredPromiseAwait": "Returning an awaited promise is required in this context."
          },
          "schema": [
            {
              "enum": [
                "in-try-catch",
                "always",
                "never"
              ]
            }
          ],
          "type": "problem"
        }
      },
      "@typescript-eslint/semi": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "Require or disallow semicolons instead of ASI",
            "extendsBaseRule": true,
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/semi.md"
          },
          "fixable": "code",
          "schema": {
            "anyOf": [
              {
                "items": [
                  {
                    "enum": [
                      "never"
                    ]
                  },
                  {
                    "additionalProperties": false,
                    "properties": {
                      "beforeStatementContinuationChars": {
                        "enum": [
                          "always",
                          "any",
                          "never"
                        ]
                      }
                    },
                    "type": "object"
                  }
                ],
                "maxItems": 2,
                "minItems": 0,
                "type": "array"
              },
              {
                "items": [
                  {
                    "enum": [
                      "always"
                    ]
                  },
                  {
                    "additionalProperties": false,
                    "properties": {
                      "omitLastInOneLineBlock": {
                        "type": "boolean"
                      }
                    },
                    "type": "object"
                  }
                ],
                "maxItems": 2,
                "minItems": 0,
                "type": "array"
              }
            ]
          },
          "type": "layout"
        }
      },
      "@typescript-eslint/space-before-function-paren": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "Enforces consistent spacing before function parenthesis",
            "extendsBaseRule": true,
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/space-before-function-paren.md"
          },
          "fixable": "whitespace",
          "messages": {
            "missing": "Missing space before function parentheses.",
            "unexpected": "Unexpected space before function parentheses."
          },
          "schema": [
            {
              "oneOf": [
                {
                  "enum": [
                    "always",
                    "never"
                  ]
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "anonymous": {
                      "enum": [
                        "always",
                        "never",
                        "ignore"
                      ]
                    },
                    "asyncArrow": {
                      "enum": [
                        "always",
                        "never",
                        "ignore"
                      ]
                    },
                    "named": {
                      "enum": [
                        "always",
                        "never",
                        "ignore"
                      ]
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "layout"
        }
      },
      "@typescript-eslint/strict-boolean-expressions": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Restricts the types allowed in boolean expressions",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/strict-boolean-expressions.md"
          },
          "messages": {
            "conditionErrorAny": "Unexpected any value in conditional. An explicit comparison or type cast is required.",
            "conditionErrorNullableBoolean": "Unexpected nullable boolean value in conditional. Please handle the nullish case explicitly.",
            "conditionErrorNullableNumber": "Unexpected nullable number value in conditional. Please handle the nullish/zero/NaN cases explicitly.",
            "conditionErrorNullableObject": "Unexpected nullable object value in conditional. An explicit null check is required.",
            "conditionErrorNullableString": "Unexpected nullable string value in conditional. Please handle the nullish/empty cases explicitly.",
            "conditionErrorNullish": "Unexpected nullish value in conditional. The condition is always false.",
            "conditionErrorNumber": "Unexpected number value in conditional. An explicit zero/NaN check is required.",
            "conditionErrorObject": "Unexpected object value in conditional. The condition is always true.",
            "conditionErrorOther": "Unexpected value in conditional. A boolean expression is required.",
            "conditionErrorString": "Unexpected string value in conditional. An explicit empty string check is required."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowNullable": {
                  "type": "boolean"
                },
                "allowSafe": {
                  "type": "boolean"
                },
                "ignoreRhs": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/switch-exhaustiveness-check": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Exhaustiveness checking in switch with union type",
            "recommended": false,
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/switch-exhaustiveness-check.md"
          },
          "messages": {
            "addMissingCases": "Add branches for missing cases.",
            "switchIsNotExhaustive": "Switch is not exhaustive. Cases not matched: {{missingBranches}}"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/triple-slash-reference": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Sets preference level for triple slash directives versus ES6-style import declarations",
            "recommended": "error",
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/triple-slash-reference.md"
          },
          "messages": {
            "tripleSlashReference": "Do not use a triple slash reference for {{module}}, use `import` style instead."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "lib": {
                  "enum": [
                    "always",
                    "never"
                  ]
                },
                "path": {
                  "enum": [
                    "always",
                    "never"
                  ]
                },
                "types": {
                  "enum": [
                    "always",
                    "never",
                    "prefer-import"
                  ]
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/type-annotation-spacing": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "Require consistent spacing around type annotations",
            "recommended": "error",
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/type-annotation-spacing.md"
          },
          "fixable": "whitespace",
          "messages": {
            "expectedSpaceAfter": "Expected a space after the '{{type}}'.",
            "expectedSpaceBefore": "Expected a space before the '{{type}}'.",
            "unexpectedSpaceAfter": "Unexpected space after the '{{type}}'.",
            "unexpectedSpaceBefore": "Unexpected space before the '{{type}}'."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "after": {
                  "type": "boolean"
                },
                "before": {
                  "type": "boolean"
                },
                "overrides": {
                  "additionalProperties": false,
                  "properties": {
                    "arrow": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "colon": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "parameter": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "property": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "returnType": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "variable": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    }
                  },
                  "type": "object"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "@typescript-eslint/typedef": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "Requires type annotations to exist",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/typedef.md"
          },
          "messages": {
            "expectedTypedef": "Expected a type annotation.",
            "expectedTypedefNamed": "Expected {{name}} to have a type annotation."
          },
          "schema": [
            {
              "properties": {
                "arrayDestructuring": {
                  "type": "boolean"
                },
                "arrowParameter": {
                  "type": "boolean"
                },
                "memberVariableDeclaration": {
                  "type": "boolean"
                },
                "objectDestructuring": {
                  "type": "boolean"
                },
                "parameter": {
                  "type": "boolean"
                },
                "propertyDeclaration": {
                  "type": "boolean"
                },
                "variableDeclaration": {
                  "type": "boolean"
                },
                "variableDeclarationIgnoreFunction": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "@typescript-eslint/unbound-method": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "Enforces unbound methods are called with their expected scope",
            "recommended": "error",
            "requiresTypeChecking": true,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/unbound-method.md"
          },
          "messages": {
            "unbound": "Avoid referencing unbound methods which may cause unintentional scoping of `this`."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "ignoreStatic": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "problem"
        }
      },
      "@typescript-eslint/unified-signatures": {
        "meta": {
          "docs": {
            "category": "Variables",
            "description": "Warns for any two overloads that could be unified into one by using a union or an optional/rest parameter",
            "recommended": false,
            "url": "https://github.com/typescript-eslint/typescript-eslint/blob/v2.31.0/packages/eslint-plugin/docs/rules/unified-signatures.md"
          },
          "messages": {
            "omittingRestParameter": "{{failureStringStart}} with a rest parameter.",
            "omittingSingleParameter": "{{failureStringStart}} with an optional parameter.",
            "singleParameterDifference": "{{failureStringStart}} taking `{{type1}} | {{type2}}`."
          },
          "schema": [],
          "type": "suggestion"
        }
      }
    },
    "version": "2.31.0"
  },
  "eslint": {
    "lintel": {
      "inherits": {
        "eslint:recommended": {
          "recommended": "truthy",
        }
      }
    },
    "rules": {
      "accessor-pairs": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "enforce getter and setter pairs in objects and classes",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/accessor-pairs"
          },
          "messages": {
            "missingGetterInClass": "Getter is not present for class {{ name }}.",
            "missingGetterInObjectLiteral": "Getter is not present for {{ name }}.",
            "missingGetterInPropertyDescriptor": "Getter is not present in property descriptor.",
            "missingSetterInClass": "Setter is not present for class {{ name }}.",
            "missingSetterInObjectLiteral": "Setter is not present for {{ name }}.",
            "missingSetterInPropertyDescriptor": "Setter is not present in property descriptor."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "enforceForClassMembers": {
                  "default": false,
                  "type": "boolean"
                },
                "getWithoutSet": {
                  "default": false,
                  "type": "boolean"
                },
                "setWithoutGet": {
                  "default": true,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "array-bracket-newline": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce linebreaks after opening and before closing array brackets",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/array-bracket-newline"
          },
          "fixable": "whitespace",
          "messages": {
            "missingClosingLinebreak": "A linebreak is required before ']'.",
            "missingOpeningLinebreak": "A linebreak is required after '['.",
            "unexpectedClosingLinebreak": "There should be no linebreak before ']'.",
            "unexpectedOpeningLinebreak": "There should be no linebreak after '['."
          },
          "schema": [
            {
              "oneOf": [
                {
                  "enum": [
                    "always",
                    "never",
                    "consistent"
                  ]
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "minItems": {
                      "minimum": 0,
                      "type": [
                        "integer",
                        "null"
                      ]
                    },
                    "multiline": {
                      "type": "boolean"
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "layout"
        }
      },
      "array-bracket-spacing": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce consistent spacing inside array brackets",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/array-bracket-spacing"
          },
          "fixable": "whitespace",
          "messages": {
            "missingSpaceAfter": "A space is required after '{{tokenValue}}'.",
            "missingSpaceBefore": "A space is required before '{{tokenValue}}'.",
            "unexpectedSpaceAfter": "There should be no space after '{{tokenValue}}'.",
            "unexpectedSpaceBefore": "There should be no space before '{{tokenValue}}'."
          },
          "schema": [
            {
              "enum": [
                "always",
                "never"
              ]
            },
            {
              "additionalProperties": false,
              "properties": {
                "arraysInArrays": {
                  "type": "boolean"
                },
                "objectsInArrays": {
                  "type": "boolean"
                },
                "singleValue": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "array-callback-return": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "enforce `return` statements in callbacks of array methods",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/array-callback-return"
          },
          "messages": {
            "expectedAtEnd": "Expected to return a value at the end of {{name}}.",
            "expectedInside": "Expected to return a value in {{name}}.",
            "expectedReturnValue": "{{name}} expected a return value."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowImplicit": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "problem"
        }
      },
      "array-element-newline": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce line breaks after each array element",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/array-element-newline"
          },
          "fixable": "whitespace",
          "messages": {
            "missingLineBreak": "There should be a linebreak after this element.",
            "unexpectedLineBreak": "There should be no linebreak here."
          },
          "schema": [
            {
              "oneOf": [
                {
                  "enum": [
                    "always",
                    "never",
                    "consistent"
                  ]
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "minItems": {
                      "minimum": 0,
                      "type": [
                        "integer",
                        "null"
                      ]
                    },
                    "multiline": {
                      "type": "boolean"
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "layout"
        }
      },
      "arrow-body-style": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "require braces around arrow function bodies",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/arrow-body-style"
          },
          "fixable": "code",
          "messages": {
            "expectedBlock": "Expected block statement surrounding arrow body.",
            "unexpectedEmptyBlock": "Unexpected block statement surrounding arrow body; put a value of `undefined` immediately after the `=>`.",
            "unexpectedObjectBlock": "Unexpected block statement surrounding arrow body; parenthesize the returned value and move it immediately after the `=>`.",
            "unexpectedOtherBlock": "Unexpected block statement surrounding arrow body.",
            "unexpectedSingleBlock": "Unexpected block statement surrounding arrow body; move the returned value immediately after the `=>`."
          },
          "schema": {
            "anyOf": [
              {
                "items": [
                  {
                    "enum": [
                      "always",
                      "never"
                    ]
                  }
                ],
                "maxItems": 1,
                "minItems": 0,
                "type": "array"
              },
              {
                "items": [
                  {
                    "enum": [
                      "as-needed"
                    ]
                  },
                  {
                    "additionalProperties": false,
                    "properties": {
                      "requireReturnForObjectLiteral": {
                        "type": "boolean"
                      }
                    },
                    "type": "object"
                  }
                ],
                "maxItems": 2,
                "minItems": 0,
                "type": "array"
              }
            ]
          },
          "type": "suggestion"
        }
      },
      "arrow-parens": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "require parentheses around arrow function arguments",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/arrow-parens"
          },
          "fixable": "code",
          "messages": {
            "expectedParens": "Expected parentheses around arrow function argument.",
            "expectedParensBlock": "Expected parentheses around arrow function argument having a body with curly braces.",
            "unexpectedParens": "Unexpected parentheses around single function argument.",
            "unexpectedParensInline": "Unexpected parentheses around single function argument having a body with no curly braces."
          },
          "schema": [
            {
              "enum": [
                "always",
                "as-needed"
              ]
            },
            {
              "additionalProperties": false,
              "properties": {
                "requireForBlockBody": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "arrow-spacing": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "enforce consistent spacing before and after the arrow in arrow functions",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/arrow-spacing"
          },
          "fixable": "whitespace",
          "messages": {
            "expectedAfter": "Missing space after =>.",
            "expectedBefore": "Missing space before =>.",
            "unexpectedAfter": "Unexpected space after =>.",
            "unexpectedBefore": "Unexpected space before =>."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "after": {
                  "default": true,
                  "type": "boolean"
                },
                "before": {
                  "default": true,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "block-scoped-var": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "enforce the use of variables within the scope they are defined",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/block-scoped-var"
          },
          "messages": {
            "outOfScope": "'{{name}}' used outside of binding context."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "block-spacing": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow or enforce spaces inside of blocks after opening block and before closing block",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/block-spacing"
          },
          "fixable": "whitespace",
          "messages": {
            "extra": "Unexpected space(s) {{location}} '{{token}}'.",
            "missing": "Requires a space {{location}} '{{token}}'."
          },
          "schema": [
            {
              "enum": [
                "always",
                "never"
              ]
            }
          ],
          "type": "layout"
        }
      },
      "brace-style": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce consistent brace style for blocks",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/brace-style"
          },
          "fixable": "whitespace",
          "messages": {
            "blockSameLine": "Statement inside of curly braces should be on next line.",
            "nextLineClose": "Closing curly brace does not appear on the same line as the subsequent block.",
            "nextLineOpen": "Opening curly brace does not appear on the same line as controlling statement.",
            "sameLineClose": "Closing curly brace appears on the same line as the subsequent block.",
            "sameLineOpen": "Opening curly brace appears on the same line as controlling statement.",
            "singleLineClose": "Closing curly brace should be on the same line as opening curly brace or on the line after the previous block."
          },
          "schema": [
            {
              "enum": [
                "1tbs",
                "stroustrup",
                "allman"
              ]
            },
            {
              "additionalProperties": false,
              "properties": {
                "allowSingleLine": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "callback-return": {
        "meta": {
          "docs": {
            "category": "Node.js and CommonJS",
            "description": "require `return` statements after callbacks",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/callback-return"
          },
          "messages": {
            "missingReturn": "Expected return with your callback function."
          },
          "schema": [
            {
              "items": {
                "type": "string"
              },
              "type": "array"
            }
          ],
          "type": "suggestion"
        }
      },
      "camelcase": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce camelcase naming convention",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/camelcase"
          },
          "messages": {
            "notCamelCase": "Identifier '{{name}}' is not in camel case."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allow": {
                  "items": [
                    {
                      "type": "string"
                    }
                  ],
                  "minItems": 0,
                  "type": "array",
                  "uniqueItems": true
                },
                "ignoreDestructuring": {
                  "default": false,
                  "type": "boolean"
                },
                "ignoreImports": {
                  "default": false,
                  "type": "boolean"
                },
                "properties": {
                  "enum": [
                    "always",
                    "never"
                  ]
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "capitalized-comments": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce or disallow capitalization of the first letter of a comment",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/capitalized-comments"
          },
          "fixable": "code",
          "messages": {
            "unexpectedLowercaseComment": "Comments should not begin with a lowercase character.",
            "unexpectedUppercaseComment": "Comments should not begin with an uppercase character."
          },
          "schema": [
            {
              "enum": [
                "always",
                "never"
              ]
            },
            {
              "oneOf": [
                {
                  "additionalProperties": false,
                  "properties": {
                    "ignoreConsecutiveComments": {
                      "type": "boolean"
                    },
                    "ignoreInlineComments": {
                      "type": "boolean"
                    },
                    "ignorePattern": {
                      "type": "string"
                    }
                  },
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "block": {
                      "additionalProperties": false,
                      "properties": {
                        "ignoreConsecutiveComments": {
                          "type": "boolean"
                        },
                        "ignoreInlineComments": {
                          "type": "boolean"
                        },
                        "ignorePattern": {
                          "type": "string"
                        }
                      },
                      "type": "object"
                    },
                    "line": {
                      "additionalProperties": false,
                      "properties": {
                        "ignoreConsecutiveComments": {
                          "type": "boolean"
                        },
                        "ignoreInlineComments": {
                          "type": "boolean"
                        },
                        "ignorePattern": {
                          "type": "string"
                        }
                      },
                      "type": "object"
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "suggestion"
        }
      },
      "class-methods-use-this": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "enforce that class methods utilize `this`",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/class-methods-use-this"
          },
          "messages": {
            "missingThis": "Expected 'this' to be used by class {{name}}."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "exceptMethods": {
                  "items": {
                    "type": "string"
                  },
                  "type": "array"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "comma-dangle": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "require or disallow trailing commas",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/comma-dangle"
          },
          "fixable": "code",
          "messages": {
            "missing": "Missing trailing comma.",
            "unexpected": "Unexpected trailing comma."
          },
          "schema": {
            "definitions": {
              "value": {
                "enum": [
                  "always-multiline",
                  "always",
                  "never",
                  "only-multiline"
                ]
              },
              "valueWithIgnore": {
                "enum": [
                  "always-multiline",
                  "always",
                  "ignore",
                  "never",
                  "only-multiline"
                ]
              }
            },
            "items": [
              {
                "oneOf": [
                  {
                    "$ref": "#/definitions/value"
                  },
                  {
                    "additionalProperties": false,
                    "properties": {
                      "arrays": {
                        "$ref": "#/definitions/valueWithIgnore"
                      },
                      "exports": {
                        "$ref": "#/definitions/valueWithIgnore"
                      },
                      "functions": {
                        "$ref": "#/definitions/valueWithIgnore"
                      },
                      "imports": {
                        "$ref": "#/definitions/valueWithIgnore"
                      },
                      "objects": {
                        "$ref": "#/definitions/valueWithIgnore"
                      }
                    },
                    "type": "object"
                  }
                ]
              }
            ],
            "type": "array"
          },
          "type": "layout"
        }
      },
      "comma-spacing": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce consistent spacing before and after commas",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/comma-spacing"
          },
          "fixable": "whitespace",
          "messages": {
            "missing": "A space is required {{loc}} ','.",
            "unexpected": "There should be no space {{loc}} ','."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "after": {
                  "default": true,
                  "type": "boolean"
                },
                "before": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "comma-style": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce consistent comma style",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/comma-style"
          },
          "fixable": "code",
          "messages": {
            "expectedCommaFirst": "',' should be placed first.",
            "expectedCommaLast": "',' should be placed last.",
            "unexpectedLineBeforeAndAfterComma": "Bad line breaking before and after ','."
          },
          "schema": [
            {
              "enum": [
                "first",
                "last"
              ]
            },
            {
              "additionalProperties": false,
              "properties": {
                "exceptions": {
                  "additionalProperties": {
                    "type": "boolean"
                  },
                  "type": "object"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "complexity": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "enforce a maximum cyclomatic complexity allowed in a program",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/complexity"
          },
          "messages": {
            "complex": "{{name}} has a complexity of {{complexity}}. Maximum allowed is {{max}}."
          },
          "schema": [
            {
              "oneOf": [
                {
                  "minimum": 0,
                  "type": "integer"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "max": {
                      "minimum": 0,
                      "type": "integer"
                    },
                    "maximum": {
                      "minimum": 0,
                      "type": "integer"
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "suggestion"
        }
      },
      "computed-property-spacing": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce consistent spacing inside computed property brackets",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/computed-property-spacing"
          },
          "fixable": "whitespace",
          "messages": {
            "missingSpaceAfter": "A space is required after '{{tokenValue}}'.",
            "missingSpaceBefore": "A space is required before '{{tokenValue}}'.",
            "unexpectedSpaceAfter": "There should be no space after '{{tokenValue}}'.",
            "unexpectedSpaceBefore": "There should be no space before '{{tokenValue}}'."
          },
          "schema": [
            {
              "enum": [
                "always",
                "never"
              ]
            },
            {
              "additionalProperties": false,
              "properties": {
                "enforceForClassMembers": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "consistent-return": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "require `return` statements to either always or never specify values",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/consistent-return"
          },
          "messages": {
            "missingReturn": "Expected to return a value at the end of {{name}}.",
            "missingReturnValue": "{{name}} expected a return value.",
            "unexpectedReturnValue": "{{name}} expected no return value."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "treatUndefinedAsUnspecified": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "consistent-this": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce consistent naming when capturing the current execution context",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/consistent-this"
          },
          "messages": {
            "aliasNotAssignedToThis": "Designated alias '{{name}}' is not assigned to 'this'.",
            "unexpectedAlias": "Unexpected alias '{{name}}' for 'this'."
          },
          "schema": {
            "items": {
              "minLength": 1,
              "type": "string"
            },
            "type": "array",
            "uniqueItems": true
          },
          "type": "suggestion"
        }
      },
      "constructor-super": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "require `super()` calls in constructors",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/constructor-super"
          },
          "messages": {
            "badSuper": "Unexpected 'super()' because 'super' is not a constructor.",
            "duplicate": "Unexpected duplicate 'super()'.",
            "missingAll": "Expected to call 'super()'.",
            "missingSome": "Lacked a call of 'super()' in some code paths.",
            "unexpected": "Unexpected 'super()'."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "curly": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "enforce consistent brace style for all control statements",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/curly"
          },
          "fixable": "code",
          "messages": {
            "missingCurlyAfter": "Expected { after '{{name}}'.",
            "missingCurlyAfterCondition": "Expected { after '{{name}}' condition.",
            "unexpectedCurlyAfter": "Unnecessary { after '{{name}}'.",
            "unexpectedCurlyAfterCondition": "Unnecessary { after '{{name}}' condition."
          },
          "schema": {
            "anyOf": [
              {
                "items": [
                  {
                    "enum": [
                      "all"
                    ]
                  }
                ],
                "maxItems": 1,
                "minItems": 0,
                "type": "array"
              },
              {
                "items": [
                  {
                    "enum": [
                      "multi",
                      "multi-line",
                      "multi-or-nest"
                    ]
                  },
                  {
                    "enum": [
                      "consistent"
                    ]
                  }
                ],
                "maxItems": 2,
                "minItems": 0,
                "type": "array"
              }
            ]
          },
          "type": "suggestion"
        }
      },
      "default-case": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "require `default` cases in `switch` statements",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/default-case"
          },
          "messages": {
            "missingDefaultCase": "Expected a default case."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "commentPattern": {
                  "type": "string"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "default-param-last": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "enforce default parameters to be last",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/default-param-last"
          },
          "messages": {
            "shouldBeLast": "Default parameters should be last."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "dot-location": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "enforce consistent newlines before and after dots",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/dot-location"
          },
          "fixable": "code",
          "messages": {
            "expectedDotAfterObject": "Expected dot to be on same line as object.",
            "expectedDotBeforeProperty": "Expected dot to be on same line as property."
          },
          "schema": [
            {
              "enum": [
                "object",
                "property"
              ]
            }
          ],
          "type": "layout"
        }
      },
      "dot-notation": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "enforce dot notation whenever possible",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/dot-notation"
          },
          "fixable": "code",
          "messages": {
            "useBrackets": ".{{key}} is a syntax error.",
            "useDot": "[{{key}}] is better written in dot notation."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowKeywords": {
                  "default": true,
                  "type": "boolean"
                },
                "allowPattern": {
                  "default": "",
                  "type": "string"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "eol-last": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "require or disallow newline at the end of files",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/eol-last"
          },
          "fixable": "whitespace",
          "messages": {
            "missing": "Newline required at end of file but not found.",
            "unexpected": "Newline not allowed at end of file."
          },
          "schema": [
            {
              "enum": [
                "always",
                "never",
                "unix",
                "windows"
              ]
            }
          ],
          "type": "layout"
        }
      },
      "eqeqeq": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "require the use of `===` and `!==`",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/eqeqeq"
          },
          "fixable": "code",
          "messages": {
            "unexpected": "Expected '{{expectedOperator}}' and instead saw '{{actualOperator}}'."
          },
          "schema": {
            "anyOf": [
              {
                "additionalItems": false,
                "items": [
                  {
                    "enum": [
                      "always"
                    ]
                  },
                  {
                    "additionalProperties": false,
                    "properties": {
                      "null": {
                        "enum": [
                          "always",
                          "never",
                          "ignore"
                        ]
                      }
                    },
                    "type": "object"
                  }
                ],
                "type": "array"
              },
              {
                "additionalItems": false,
                "items": [
                  {
                    "enum": [
                      "smart",
                      "allow-null"
                    ]
                  }
                ],
                "type": "array"
              }
            ]
          },
          "type": "suggestion"
        }
      },
      "for-direction": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "enforce \"for\" loop update clause moving the counter in the right direction.",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/for-direction"
          },
          "fixable": null,
          "messages": {
            "incorrectDirection": "The update clause in this loop moves the variable in the wrong direction."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "func-call-spacing": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "require or disallow spacing between function identifiers and their invocations",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/func-call-spacing"
          },
          "fixable": "whitespace",
          "messages": {
            "missing": "Missing space between function name and paren.",
            "unexpected": "Unexpected newline between function name and paren."
          },
          "schema": {
            "anyOf": [
              {
                "items": [
                  {
                    "enum": [
                      "never"
                    ]
                  }
                ],
                "maxItems": 1,
                "minItems": 0,
                "type": "array"
              },
              {
                "items": [
                  {
                    "enum": [
                      "always"
                    ]
                  },
                  {
                    "additionalProperties": false,
                    "properties": {
                      "allowNewlines": {
                        "type": "boolean"
                      }
                    },
                    "type": "object"
                  }
                ],
                "maxItems": 2,
                "minItems": 0,
                "type": "array"
              }
            ]
          },
          "type": "layout"
        }
      },
      "func-name-matching": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "require function names to match the name of the variable or property to which they are assigned",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/func-name-matching"
          },
          "messages": {
            "matchProperty": "Function name `{{funcName}}` should match property name `{{name}}`.",
            "matchVariable": "Function name `{{funcName}}` should match variable name `{{name}}`.",
            "notMatchProperty": "Function name `{{funcName}}` should not match property name `{{name}}`.",
            "notMatchVariable": "Function name `{{funcName}}` should not match variable name `{{name}}`."
          },
          "schema": {
            "anyOf": [
              {
                "additionalItems": false,
                "items": [
                  {
                    "enum": [
                      "always",
                      "never"
                    ]
                  },
                  {
                    "additionalProperties": false,
                    "properties": {
                      "considerPropertyDescriptor": {
                        "type": "boolean"
                      },
                      "includeCommonJSModuleExports": {
                        "type": "boolean"
                      }
                    },
                    "type": "object"
                  }
                ],
                "type": "array"
              },
              {
                "additionalItems": false,
                "items": [
                  {
                    "additionalProperties": false,
                    "properties": {
                      "considerPropertyDescriptor": {
                        "type": "boolean"
                      },
                      "includeCommonJSModuleExports": {
                        "type": "boolean"
                      }
                    },
                    "type": "object"
                  }
                ],
                "type": "array"
              }
            ]
          },
          "type": "suggestion"
        }
      },
      "func-names": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "require or disallow named `function` expressions",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/func-names"
          },
          "messages": {
            "named": "Unexpected named {{name}}.",
            "unnamed": "Unexpected unnamed {{name}}."
          },
          "schema": {
            "definitions": {
              "value": {
                "enum": [
                  "always",
                  "as-needed",
                  "never"
                ]
              }
            },
            "items": [
              {
                "$ref": "#/definitions/value"
              },
              {
                "additionalProperties": false,
                "properties": {
                  "generators": {
                    "$ref": "#/definitions/value"
                  }
                },
                "type": "object"
              }
            ]
          },
          "type": "suggestion"
        }
      },
      "func-style": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce the consistent use of either `function` declarations or expressions",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/func-style"
          },
          "messages": {
            "declaration": "Expected a function declaration.",
            "expression": "Expected a function expression."
          },
          "schema": [
            {
              "enum": [
                "declaration",
                "expression"
              ]
            },
            {
              "additionalProperties": false,
              "properties": {
                "allowArrowFunctions": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "function-call-argument-newline": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce line breaks between arguments of a function call",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/function-call-argument-newline"
          },
          "fixable": "whitespace",
          "messages": {
            "missingLineBreak": "There should be a line break after this argument.",
            "unexpectedLineBreak": "There should be no line break here."
          },
          "schema": [
            {
              "enum": [
                "always",
                "never",
                "consistent"
              ]
            }
          ],
          "type": "layout"
        }
      },
      "function-paren-newline": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce consistent line breaks inside function parentheses",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/function-paren-newline"
          },
          "fixable": "whitespace",
          "messages": {
            "expectedAfter": "Expected newline after '('.",
            "expectedBefore": "Expected newline before ')'.",
            "expectedBetween": "Expected newline between arguments/params.",
            "unexpectedAfter": "Unexpected newline after '('.",
            "unexpectedBefore": "Unexpected newline before ')'."
          },
          "schema": [
            {
              "oneOf": [
                {
                  "enum": [
                    "always",
                    "never",
                    "consistent",
                    "multiline",
                    "multiline-arguments"
                  ]
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "minItems": {
                      "minimum": 0,
                      "type": "integer"
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "layout"
        }
      },
      "generator-star-spacing": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "enforce consistent spacing around `*` operators in generator functions",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/generator-star-spacing"
          },
          "fixable": "whitespace",
          "messages": {
            "missingAfter": "Missing space after *.",
            "missingBefore": "Missing space before *.",
            "unexpectedAfter": "Unexpected space after *.",
            "unexpectedBefore": "Unexpected space before *."
          },
          "schema": [
            {
              "oneOf": [
                {
                  "enum": [
                    "before",
                    "after",
                    "both",
                    "neither"
                  ]
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "after": {
                      "type": "boolean"
                    },
                    "anonymous": {
                      "oneOf": [
                        {
                          "enum": [
                            "before",
                            "after",
                            "both",
                            "neither"
                          ]
                        },
                        {
                          "additionalProperties": false,
                          "properties": {
                            "after": {
                              "type": "boolean"
                            },
                            "before": {
                              "type": "boolean"
                            }
                          },
                          "type": "object"
                        }
                      ]
                    },
                    "before": {
                      "type": "boolean"
                    },
                    "method": {
                      "oneOf": [
                        {
                          "enum": [
                            "before",
                            "after",
                            "both",
                            "neither"
                          ]
                        },
                        {
                          "additionalProperties": false,
                          "properties": {
                            "after": {
                              "type": "boolean"
                            },
                            "before": {
                              "type": "boolean"
                            }
                          },
                          "type": "object"
                        }
                      ]
                    },
                    "named": {
                      "oneOf": [
                        {
                          "enum": [
                            "before",
                            "after",
                            "both",
                            "neither"
                          ]
                        },
                        {
                          "additionalProperties": false,
                          "properties": {
                            "after": {
                              "type": "boolean"
                            },
                            "before": {
                              "type": "boolean"
                            }
                          },
                          "type": "object"
                        }
                      ]
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "layout"
        }
      },
      "getter-return": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "enforce `return` statements in getters",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/getter-return"
          },
          "fixable": null,
          "messages": {
            "expected": "Expected to return a value in {{name}}.",
            "expectedAlways": "Expected {{name}} to always return a value."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowImplicit": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "problem"
        }
      },
      "global-require": {
        "meta": {
          "docs": {
            "category": "Node.js and CommonJS",
            "description": "require `require()` calls to be placed at top-level module scope",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/global-require"
          },
          "messages": {
            "unexpected": "Unexpected require()."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "grouped-accessor-pairs": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "require grouped accessor pairs in object literals and classes",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/grouped-accessor-pairs"
          },
          "messages": {
            "invalidOrder": "Expected {{ latterName }} to be before {{ formerName }}.",
            "notGrouped": "Accessor pair {{ formerName }} and {{ latterName }} should be grouped."
          },
          "schema": [
            {
              "enum": [
                "anyOrder",
                "getBeforeSet",
                "setBeforeGet"
              ]
            }
          ],
          "type": "suggestion"
        }
      },
      "guard-for-in": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "require `for-in` loops to include an `if` statement",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/guard-for-in"
          },
          "messages": {
            "wrap": "The body of a for-in should be wrapped in an if statement to filter unwanted properties from the prototype."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "handle-callback-err": {
        "meta": {
          "docs": {
            "category": "Node.js and CommonJS",
            "description": "require error handling in callbacks",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/handle-callback-err"
          },
          "messages": {
            "expected": "Expected error to be handled."
          },
          "schema": [
            {
              "type": "string"
            }
          ],
          "type": "suggestion"
        }
      },
      "id-blacklist": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow specified identifiers",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/id-blacklist"
          },
          "messages": {
            "blacklisted": "Identifier '{{name}}' is blacklisted."
          },
          "schema": {
            "items": {
              "type": "string"
            },
            "type": "array",
            "uniqueItems": true
          },
          "type": "suggestion"
        }
      },
      "id-length": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce minimum and maximum identifier lengths",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/id-length"
          },
          "messages": {
            "tooLong": "Identifier name '{{name}}' is too long (> {{max}}).",
            "tooShort": "Identifier name '{{name}}' is too short (< {{min}})."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "exceptions": {
                  "items": {
                    "type": "string"
                  },
                  "type": "array",
                  "uniqueItems": true
                },
                "max": {
                  "type": "integer"
                },
                "min": {
                  "default": 2,
                  "type": "integer"
                },
                "properties": {
                  "enum": [
                    "always",
                    "never"
                  ]
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "id-match": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "require identifiers to match a specified regular expression",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/id-match"
          },
          "messages": {
            "notMatch": "Identifier '{{name}}' does not match the pattern '{{pattern}}'."
          },
          "schema": [
            {
              "type": "string"
            },
            {
              "properties": {
                "ignoreDestructuring": {
                  "default": false,
                  "type": "boolean"
                },
                "onlyDeclarations": {
                  "default": false,
                  "type": "boolean"
                },
                "properties": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "implicit-arrow-linebreak": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce the location of arrow function bodies",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/implicit-arrow-linebreak"
          },
          "fixable": "whitespace",
          "messages": {
            "expected": "Expected a linebreak before this expression.",
            "unexpected": "Expected no linebreak before this expression."
          },
          "schema": [
            {
              "enum": [
                "beside",
                "below"
              ]
            }
          ],
          "type": "layout"
        }
      },
      "indent": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce consistent indentation",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/indent"
          },
          "fixable": "whitespace",
          "messages": {
            "wrongIndentation": "Expected indentation of {{expected}} but found {{actual}}."
          },
          "schema": [
            {
              "oneOf": [
                {
                  "enum": [
                    "tab"
                  ]
                },
                {
                  "minimum": 0,
                  "type": "integer"
                }
              ]
            },
            {
              "additionalProperties": false,
              "properties": {
                "ArrayExpression": {
                  "oneOf": [
                    {
                      "minimum": 0,
                      "type": "integer"
                    },
                    {
                      "enum": [
                        "first",
                        "off"
                      ]
                    }
                  ]
                },
                "CallExpression": {
                  "additionalProperties": false,
                  "properties": {
                    "arguments": {
                      "oneOf": [
                        {
                          "minimum": 0,
                          "type": "integer"
                        },
                        {
                          "enum": [
                            "first",
                            "off"
                          ]
                        }
                      ]
                    }
                  },
                  "type": "object"
                },
                "FunctionDeclaration": {
                  "additionalProperties": false,
                  "properties": {
                    "body": {
                      "minimum": 0,
                      "type": "integer"
                    },
                    "parameters": {
                      "oneOf": [
                        {
                          "minimum": 0,
                          "type": "integer"
                        },
                        {
                          "enum": [
                            "first",
                            "off"
                          ]
                        }
                      ]
                    }
                  },
                  "type": "object"
                },
                "FunctionExpression": {
                  "additionalProperties": false,
                  "properties": {
                    "body": {
                      "minimum": 0,
                      "type": "integer"
                    },
                    "parameters": {
                      "oneOf": [
                        {
                          "minimum": 0,
                          "type": "integer"
                        },
                        {
                          "enum": [
                            "first",
                            "off"
                          ]
                        }
                      ]
                    }
                  },
                  "type": "object"
                },
                "ImportDeclaration": {
                  "oneOf": [
                    {
                      "minimum": 0,
                      "type": "integer"
                    },
                    {
                      "enum": [
                        "first",
                        "off"
                      ]
                    }
                  ]
                },
                "MemberExpression": {
                  "oneOf": [
                    {
                      "minimum": 0,
                      "type": "integer"
                    },
                    {
                      "enum": [
                        "off"
                      ]
                    }
                  ]
                },
                "ObjectExpression": {
                  "oneOf": [
                    {
                      "minimum": 0,
                      "type": "integer"
                    },
                    {
                      "enum": [
                        "first",
                        "off"
                      ]
                    }
                  ]
                },
                "SwitchCase": {
                  "default": 0,
                  "minimum": 0,
                  "type": "integer"
                },
                "VariableDeclarator": {
                  "oneOf": [
                    {
                      "oneOf": [
                        {
                          "minimum": 0,
                          "type": "integer"
                        },
                        {
                          "enum": [
                            "first",
                            "off"
                          ]
                        }
                      ]
                    },
                    {
                      "additionalProperties": false,
                      "properties": {
                        "const": {
                          "oneOf": [
                            {
                              "minimum": 0,
                              "type": "integer"
                            },
                            {
                              "enum": [
                                "first",
                                "off"
                              ]
                            }
                          ]
                        },
                        "let": {
                          "oneOf": [
                            {
                              "minimum": 0,
                              "type": "integer"
                            },
                            {
                              "enum": [
                                "first",
                                "off"
                              ]
                            }
                          ]
                        },
                        "var": {
                          "oneOf": [
                            {
                              "minimum": 0,
                              "type": "integer"
                            },
                            {
                              "enum": [
                                "first",
                                "off"
                              ]
                            }
                          ]
                        }
                      },
                      "type": "object"
                    }
                  ]
                },
                "flatTernaryExpressions": {
                  "default": false,
                  "type": "boolean"
                },
                "ignoreComments": {
                  "default": false,
                  "type": "boolean"
                },
                "ignoredNodes": {
                  "items": {
                    "not": {
                      "pattern": ":exit$"
                    },
                    "type": "string"
                  },
                  "type": "array"
                },
                "outerIIFEBody": {
                  "minimum": 0,
                  "type": "integer"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "indent-legacy": {
        "meta": {
          "deprecated": true,
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce consistent indentation",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/indent-legacy"
          },
          "fixable": "whitespace",
          "messages": {
            "expected": "Expected indentation of {{expected}} but found {{actual}}."
          },
          "replacedBy": [
            "indent"
          ],
          "schema": [
            {
              "oneOf": [
                {
                  "enum": [
                    "tab"
                  ]
                },
                {
                  "minimum": 0,
                  "type": "integer"
                }
              ]
            },
            {
              "additionalProperties": false,
              "properties": {
                "ArrayExpression": {
                  "oneOf": [
                    {
                      "minimum": 0,
                      "type": "integer"
                    },
                    {
                      "enum": [
                        "first"
                      ]
                    }
                  ]
                },
                "CallExpression": {
                  "properties": {
                    "parameters": {
                      "oneOf": [
                        {
                          "minimum": 0,
                          "type": "integer"
                        },
                        {
                          "enum": [
                            "first"
                          ]
                        }
                      ]
                    }
                  },
                  "type": "object"
                },
                "FunctionDeclaration": {
                  "properties": {
                    "body": {
                      "minimum": 0,
                      "type": "integer"
                    },
                    "parameters": {
                      "oneOf": [
                        {
                          "minimum": 0,
                          "type": "integer"
                        },
                        {
                          "enum": [
                            "first"
                          ]
                        }
                      ]
                    }
                  },
                  "type": "object"
                },
                "FunctionExpression": {
                  "properties": {
                    "body": {
                      "minimum": 0,
                      "type": "integer"
                    },
                    "parameters": {
                      "oneOf": [
                        {
                          "minimum": 0,
                          "type": "integer"
                        },
                        {
                          "enum": [
                            "first"
                          ]
                        }
                      ]
                    }
                  },
                  "type": "object"
                },
                "MemberExpression": {
                  "minimum": 0,
                  "type": "integer"
                },
                "ObjectExpression": {
                  "oneOf": [
                    {
                      "minimum": 0,
                      "type": "integer"
                    },
                    {
                      "enum": [
                        "first"
                      ]
                    }
                  ]
                },
                "SwitchCase": {
                  "minimum": 0,
                  "type": "integer"
                },
                "VariableDeclarator": {
                  "oneOf": [
                    {
                      "minimum": 0,
                      "type": "integer"
                    },
                    {
                      "properties": {
                        "const": {
                          "minimum": 0,
                          "type": "integer"
                        },
                        "let": {
                          "minimum": 0,
                          "type": "integer"
                        },
                        "var": {
                          "minimum": 0,
                          "type": "integer"
                        }
                      },
                      "type": "object"
                    }
                  ]
                },
                "outerIIFEBody": {
                  "minimum": 0,
                  "type": "integer"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "init-declarations": {
        "meta": {
          "docs": {
            "category": "Variables",
            "description": "require or disallow initialization in variable declarations",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/init-declarations"
          },
          "messages": {
            "initialized": "Variable '{{idName}}' should be initialized on declaration.",
            "notInitialized": "Variable '{{idName}}' should not be initialized on declaration."
          },
          "schema": {
            "anyOf": [
              {
                "items": [
                  {
                    "enum": [
                      "always"
                    ]
                  }
                ],
                "maxItems": 1,
                "minItems": 0,
                "type": "array"
              },
              {
                "items": [
                  {
                    "enum": [
                      "never"
                    ]
                  },
                  {
                    "additionalProperties": false,
                    "properties": {
                      "ignoreForLoopInit": {
                        "type": "boolean"
                      }
                    },
                    "type": "object"
                  }
                ],
                "maxItems": 2,
                "minItems": 0,
                "type": "array"
              }
            ]
          },
          "type": "suggestion"
        }
      },
      "jsx-quotes": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce the consistent use of either double or single quotes in JSX attributes",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/jsx-quotes"
          },
          "fixable": "whitespace",
          "messages": {
            "unexpected": "Unexpected usage of {{description}}."
          },
          "schema": [
            {
              "enum": [
                "prefer-single",
                "prefer-double"
              ]
            }
          ],
          "type": "layout"
        }
      },
      "key-spacing": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce consistent spacing between keys and values in object literal properties",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/key-spacing"
          },
          "fixable": "whitespace",
          "messages": {
            "extraKey": "Extra space after {{computed}}key '{{key}}'.",
            "extraValue": "Extra space before value for {{computed}}key '{{key}}'.",
            "missingKey": "Missing space after {{computed}}key '{{key}}'.",
            "missingValue": "Missing space before value for {{computed}}key '{{key}}'."
          },
          "schema": [
            {
              "anyOf": [
                {
                  "additionalProperties": false,
                  "properties": {
                    "afterColon": {
                      "type": "boolean"
                    },
                    "align": {
                      "anyOf": [
                        {
                          "enum": [
                            "colon",
                            "value"
                          ]
                        },
                        {
                          "additionalProperties": false,
                          "properties": {
                            "afterColon": {
                              "type": "boolean"
                            },
                            "beforeColon": {
                              "type": "boolean"
                            },
                            "mode": {
                              "enum": [
                                "strict",
                                "minimum"
                              ]
                            },
                            "on": {
                              "enum": [
                                "colon",
                                "value"
                              ]
                            }
                          },
                          "type": "object"
                        }
                      ]
                    },
                    "beforeColon": {
                      "type": "boolean"
                    },
                    "mode": {
                      "enum": [
                        "strict",
                        "minimum"
                      ]
                    }
                  },
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "multiLine": {
                      "additionalProperties": false,
                      "properties": {
                        "afterColon": {
                          "type": "boolean"
                        },
                        "align": {
                          "anyOf": [
                            {
                              "enum": [
                                "colon",
                                "value"
                              ]
                            },
                            {
                              "additionalProperties": false,
                              "properties": {
                                "afterColon": {
                                  "type": "boolean"
                                },
                                "beforeColon": {
                                  "type": "boolean"
                                },
                                "mode": {
                                  "enum": [
                                    "strict",
                                    "minimum"
                                  ]
                                },
                                "on": {
                                  "enum": [
                                    "colon",
                                    "value"
                                  ]
                                }
                              },
                              "type": "object"
                            }
                          ]
                        },
                        "beforeColon": {
                          "type": "boolean"
                        },
                        "mode": {
                          "enum": [
                            "strict",
                            "minimum"
                          ]
                        }
                      },
                      "type": "object"
                    },
                    "singleLine": {
                      "additionalProperties": false,
                      "properties": {
                        "afterColon": {
                          "type": "boolean"
                        },
                        "beforeColon": {
                          "type": "boolean"
                        },
                        "mode": {
                          "enum": [
                            "strict",
                            "minimum"
                          ]
                        }
                      },
                      "type": "object"
                    }
                  },
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "align": {
                      "additionalProperties": false,
                      "properties": {
                        "afterColon": {
                          "type": "boolean"
                        },
                        "beforeColon": {
                          "type": "boolean"
                        },
                        "mode": {
                          "enum": [
                            "strict",
                            "minimum"
                          ]
                        },
                        "on": {
                          "enum": [
                            "colon",
                            "value"
                          ]
                        }
                      },
                      "type": "object"
                    },
                    "multiLine": {
                      "additionalProperties": false,
                      "properties": {
                        "afterColon": {
                          "type": "boolean"
                        },
                        "beforeColon": {
                          "type": "boolean"
                        },
                        "mode": {
                          "enum": [
                            "strict",
                            "minimum"
                          ]
                        }
                      },
                      "type": "object"
                    },
                    "singleLine": {
                      "additionalProperties": false,
                      "properties": {
                        "afterColon": {
                          "type": "boolean"
                        },
                        "beforeColon": {
                          "type": "boolean"
                        },
                        "mode": {
                          "enum": [
                            "strict",
                            "minimum"
                          ]
                        }
                      },
                      "type": "object"
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "layout"
        }
      },
      "keyword-spacing": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce consistent spacing before and after keywords",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/keyword-spacing"
          },
          "fixable": "whitespace",
          "messages": {
            "expectedAfter": "Expected space(s) after \"{{value}}\".",
            "expectedBefore": "Expected space(s) before \"{{value}}\".",
            "unexpectedAfter": "Unexpected space(s) after \"{{value}}\".",
            "unexpectedBefore": "Unexpected space(s) before \"{{value}}\"."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "after": {
                  "default": true,
                  "type": "boolean"
                },
                "before": {
                  "default": true,
                  "type": "boolean"
                },
                "overrides": {
                  "additionalProperties": false,
                  "properties": {
                    "abstract": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "as": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "async": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "await": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "boolean": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "break": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "byte": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "case": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "catch": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "char": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "class": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "const": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "continue": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "debugger": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "default": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "delete": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "do": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "double": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "else": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "enum": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "export": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "extends": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "false": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "final": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "finally": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "float": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "for": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "from": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "function": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "get": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "goto": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "if": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "implements": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "import": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "in": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "instanceof": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "int": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "interface": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "let": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "long": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "native": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "new": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "null": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "of": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "package": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "private": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "protected": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "public": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "return": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "set": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "short": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "static": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "super": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "switch": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "synchronized": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "this": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "throw": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "throws": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "transient": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "true": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "try": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "typeof": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "var": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "void": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "volatile": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "while": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "with": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "yield": {
                      "additionalProperties": false,
                      "properties": {
                        "after": {
                          "type": "boolean"
                        },
                        "before": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    }
                  },
                  "type": "object"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "line-comment-position": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce position of line comments",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/line-comment-position"
          },
          "messages": {
            "above": "Expected comment to be above code.",
            "beside": "Expected comment to be beside code."
          },
          "schema": [
            {
              "oneOf": [
                {
                  "enum": [
                    "above",
                    "beside"
                  ]
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "applyDefaultIgnorePatterns": {
                      "type": "boolean"
                    },
                    "applyDefaultPatterns": {
                      "type": "boolean"
                    },
                    "ignorePattern": {
                      "type": "string"
                    },
                    "position": {
                      "enum": [
                        "above",
                        "beside"
                      ]
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "layout"
        }
      },
      "linebreak-style": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce consistent linebreak style",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/linebreak-style"
          },
          "fixable": "whitespace",
          "messages": {
            "expectedCRLF": "Expected linebreaks to be 'CRLF' but found 'LF'.",
            "expectedLF": "Expected linebreaks to be 'LF' but found 'CRLF'."
          },
          "schema": [
            {
              "enum": [
                "unix",
                "windows"
              ]
            }
          ],
          "type": "layout"
        }
      },
      "lines-around-comment": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "require empty lines around comments",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/lines-around-comment"
          },
          "fixable": "whitespace",
          "messages": {
            "after": "Expected line after comment.",
            "before": "Expected line before comment."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "afterBlockComment": {
                  "default": false,
                  "type": "boolean"
                },
                "afterLineComment": {
                  "default": false,
                  "type": "boolean"
                },
                "allowArrayEnd": {
                  "type": "boolean"
                },
                "allowArrayStart": {
                  "type": "boolean"
                },
                "allowBlockEnd": {
                  "default": false,
                  "type": "boolean"
                },
                "allowBlockStart": {
                  "default": false,
                  "type": "boolean"
                },
                "allowClassEnd": {
                  "type": "boolean"
                },
                "allowClassStart": {
                  "type": "boolean"
                },
                "allowObjectEnd": {
                  "type": "boolean"
                },
                "allowObjectStart": {
                  "type": "boolean"
                },
                "applyDefaultIgnorePatterns": {
                  "type": "boolean"
                },
                "beforeBlockComment": {
                  "default": true,
                  "type": "boolean"
                },
                "beforeLineComment": {
                  "default": false,
                  "type": "boolean"
                },
                "ignorePattern": {
                  "type": "string"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "lines-around-directive": {
        "meta": {
          "deprecated": true,
          "docs": {
            "category": "Stylistic Issues",
            "description": "require or disallow newlines around directives",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/lines-around-directive"
          },
          "fixable": "whitespace",
          "messages": {
            "expected": "Expected newline {{location}} \"{{value}}\" directive.",
            "unexpected": "Unexpected newline {{location}} \"{{value}}\" directive."
          },
          "replacedBy": [
            "padding-line-between-statements"
          ],
          "schema": [
            {
              "oneOf": [
                {
                  "enum": [
                    "always",
                    "never"
                  ]
                },
                {
                  "additionalProperties": false,
                  "minProperties": 2,
                  "properties": {
                    "after": {
                      "enum": [
                        "always",
                        "never"
                      ]
                    },
                    "before": {
                      "enum": [
                        "always",
                        "never"
                      ]
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "layout"
        }
      },
      "lines-between-class-members": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "require or disallow an empty line between class members",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/lines-between-class-members"
          },
          "fixable": "whitespace",
          "messages": {
            "always": "Expected blank line between class members.",
            "never": "Unexpected blank line between class members."
          },
          "schema": [
            {
              "enum": [
                "always",
                "never"
              ]
            },
            {
              "additionalProperties": false,
              "properties": {
                "exceptAfterSingleLine": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "max-classes-per-file": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "enforce a maximum number of classes per file",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/max-classes-per-file"
          },
          "messages": {
            "maximumExceeded": "File has too many classes ({{ classCount }}). Maximum allowed is {{ max }}."
          },
          "schema": [
            {
              "minimum": 1,
              "type": "integer"
            }
          ],
          "type": "suggestion"
        }
      },
      "max-depth": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce a maximum depth that blocks can be nested",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/max-depth"
          },
          "messages": {
            "tooDeeply": "Blocks are nested too deeply ({{depth}}). Maximum allowed is {{maxDepth}}."
          },
          "schema": [
            {
              "oneOf": [
                {
                  "minimum": 0,
                  "type": "integer"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "max": {
                      "minimum": 0,
                      "type": "integer"
                    },
                    "maximum": {
                      "minimum": 0,
                      "type": "integer"
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "suggestion"
        }
      },
      "max-len": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce a maximum line length",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/max-len"
          },
          "messages": {
            "max": "This line has a length of {{lineLength}}. Maximum allowed is {{maxLength}}.",
            "maxComment": "This line has a comment length of {{lineLength}}. Maximum allowed is {{maxCommentLength}}."
          },
          "schema": [
            {
              "anyOf": [
                {
                  "additionalProperties": false,
                  "properties": {
                    "code": {
                      "minimum": 0,
                      "type": "integer"
                    },
                    "comments": {
                      "minimum": 0,
                      "type": "integer"
                    },
                    "ignoreComments": {
                      "type": "boolean"
                    },
                    "ignorePattern": {
                      "type": "string"
                    },
                    "ignoreRegExpLiterals": {
                      "type": "boolean"
                    },
                    "ignoreStrings": {
                      "type": "boolean"
                    },
                    "ignoreTemplateLiterals": {
                      "type": "boolean"
                    },
                    "ignoreTrailingComments": {
                      "type": "boolean"
                    },
                    "ignoreUrls": {
                      "type": "boolean"
                    },
                    "tabWidth": {
                      "minimum": 0,
                      "type": "integer"
                    }
                  },
                  "type": "object"
                },
                {
                  "minimum": 0,
                  "type": "integer"
                }
              ]
            },
            {
              "anyOf": [
                {
                  "additionalProperties": false,
                  "properties": {
                    "code": {
                      "minimum": 0,
                      "type": "integer"
                    },
                    "comments": {
                      "minimum": 0,
                      "type": "integer"
                    },
                    "ignoreComments": {
                      "type": "boolean"
                    },
                    "ignorePattern": {
                      "type": "string"
                    },
                    "ignoreRegExpLiterals": {
                      "type": "boolean"
                    },
                    "ignoreStrings": {
                      "type": "boolean"
                    },
                    "ignoreTemplateLiterals": {
                      "type": "boolean"
                    },
                    "ignoreTrailingComments": {
                      "type": "boolean"
                    },
                    "ignoreUrls": {
                      "type": "boolean"
                    },
                    "tabWidth": {
                      "minimum": 0,
                      "type": "integer"
                    }
                  },
                  "type": "object"
                },
                {
                  "minimum": 0,
                  "type": "integer"
                }
              ]
            },
            {
              "additionalProperties": false,
              "properties": {
                "code": {
                  "minimum": 0,
                  "type": "integer"
                },
                "comments": {
                  "minimum": 0,
                  "type": "integer"
                },
                "ignoreComments": {
                  "type": "boolean"
                },
                "ignorePattern": {
                  "type": "string"
                },
                "ignoreRegExpLiterals": {
                  "type": "boolean"
                },
                "ignoreStrings": {
                  "type": "boolean"
                },
                "ignoreTemplateLiterals": {
                  "type": "boolean"
                },
                "ignoreTrailingComments": {
                  "type": "boolean"
                },
                "ignoreUrls": {
                  "type": "boolean"
                },
                "tabWidth": {
                  "minimum": 0,
                  "type": "integer"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "max-lines": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce a maximum number of lines per file",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/max-lines"
          },
          "messages": {
            "exceed": "File has too many lines ({{actual}}). Maximum allowed is {{max}}."
          },
          "schema": [
            {
              "oneOf": [
                {
                  "minimum": 0,
                  "type": "integer"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "max": {
                      "minimum": 0,
                      "type": "integer"
                    },
                    "skipBlankLines": {
                      "type": "boolean"
                    },
                    "skipComments": {
                      "type": "boolean"
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "suggestion"
        }
      },
      "max-lines-per-function": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce a maximum number of line of code in a function",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/max-lines-per-function"
          },
          "messages": {
            "exceed": "{{name}} has too many lines ({{lineCount}}). Maximum allowed is {{maxLines}}."
          },
          "schema": [
            {
              "oneOf": [
                {
                  "additionalProperties": false,
                  "properties": {
                    "IIFEs": {
                      "type": "boolean"
                    },
                    "max": {
                      "minimum": 0,
                      "type": "integer"
                    },
                    "skipBlankLines": {
                      "type": "boolean"
                    },
                    "skipComments": {
                      "type": "boolean"
                    }
                  },
                  "type": "object"
                },
                {
                  "minimum": 1,
                  "type": "integer"
                }
              ]
            }
          ],
          "type": "suggestion"
        }
      },
      "max-nested-callbacks": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce a maximum depth that callbacks can be nested",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/max-nested-callbacks"
          },
          "messages": {
            "exceed": "Too many nested callbacks ({{num}}). Maximum allowed is {{max}}."
          },
          "schema": [
            {
              "oneOf": [
                {
                  "minimum": 0,
                  "type": "integer"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "max": {
                      "minimum": 0,
                      "type": "integer"
                    },
                    "maximum": {
                      "minimum": 0,
                      "type": "integer"
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "suggestion"
        }
      },
      "max-params": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce a maximum number of parameters in function definitions",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/max-params"
          },
          "messages": {
            "exceed": "{{name}} has too many parameters ({{count}}). Maximum allowed is {{max}}."
          },
          "schema": [
            {
              "oneOf": [
                {
                  "minimum": 0,
                  "type": "integer"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "max": {
                      "minimum": 0,
                      "type": "integer"
                    },
                    "maximum": {
                      "minimum": 0,
                      "type": "integer"
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "suggestion"
        }
      },
      "max-statements": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce a maximum number of statements allowed in function blocks",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/max-statements"
          },
          "messages": {
            "exceed": "{{name}} has too many statements ({{count}}). Maximum allowed is {{max}}."
          },
          "schema": [
            {
              "oneOf": [
                {
                  "minimum": 0,
                  "type": "integer"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "max": {
                      "minimum": 0,
                      "type": "integer"
                    },
                    "maximum": {
                      "minimum": 0,
                      "type": "integer"
                    }
                  },
                  "type": "object"
                }
              ]
            },
            {
              "additionalProperties": false,
              "properties": {
                "ignoreTopLevelFunctions": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "max-statements-per-line": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce a maximum number of statements allowed per line",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/max-statements-per-line"
          },
          "messages": {
            "exceed": "This line has {{numberOfStatementsOnThisLine}} {{statements}}. Maximum allowed is {{maxStatementsPerLine}}."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "max": {
                  "default": 1,
                  "minimum": 1,
                  "type": "integer"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "multiline-comment-style": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce a particular style for multiline comments",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/multiline-comment-style"
          },
          "fixable": "whitespace",
          "messages": {
            "alignment": "Expected this line to be aligned with the start of the comment.",
            "endNewline": "Expected a linebreak before '*/'.",
            "expectedBareBlock": "Expected a block comment without padding stars.",
            "expectedBlock": "Expected a block comment instead of consecutive line comments.",
            "expectedLines": "Expected multiple line comments instead of a block comment.",
            "missingStar": "Expected a '*' at the start of this line.",
            "startNewline": "Expected a linebreak after '/*'."
          },
          "schema": [
            {
              "enum": [
                "starred-block",
                "separate-lines",
                "bare-block"
              ]
            }
          ],
          "type": "suggestion"
        }
      },
      "multiline-ternary": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce newlines between operands of ternary expressions",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/multiline-ternary"
          },
          "messages": {
            "expectedConsAlt": "Expected newline between consequent and alternate of ternary expression.",
            "expectedTestCons": "Expected newline between test and consequent of ternary expression.",
            "unexpectedConsAlt": "Unexpected newline between consequent and alternate of ternary expression.",
            "unexpectedTestCons": "Unexpected newline between test and consequent of ternary expression."
          },
          "schema": [
            {
              "enum": [
                "always",
                "always-multiline",
                "never"
              ]
            }
          ],
          "type": "layout"
        }
      },
      "new-cap": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "require constructor names to begin with a capital letter",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/new-cap"
          },
          "messages": {
            "lower": "A constructor name should not start with a lowercase letter.",
            "upper": "A function with a name starting with an uppercase letter should only be used as a constructor."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "capIsNew": {
                  "default": true,
                  "type": "boolean"
                },
                "capIsNewExceptionPattern": {
                  "type": "string"
                },
                "capIsNewExceptions": {
                  "items": {
                    "type": "string"
                  },
                  "type": "array"
                },
                "newIsCap": {
                  "default": true,
                  "type": "boolean"
                },
                "newIsCapExceptionPattern": {
                  "type": "string"
                },
                "newIsCapExceptions": {
                  "items": {
                    "type": "string"
                  },
                  "type": "array"
                },
                "properties": {
                  "default": true,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "new-parens": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce or disallow parentheses when invoking a constructor with no arguments",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/new-parens"
          },
          "fixable": "code",
          "messages": {
            "missing": "Missing '()' invoking a constructor.",
            "unnecessary": "Unnecessary '()' invoking a constructor with no arguments."
          },
          "schema": {
            "anyOf": [
              {
                "items": [
                  {
                    "enum": [
                      "always",
                      "never"
                    ]
                  }
                ],
                "maxItems": 1,
                "minItems": 0,
                "type": "array"
              }
            ]
          },
          "type": "layout"
        }
      },
      "newline-after-var": {
        "meta": {
          "deprecated": true,
          "docs": {
            "category": "Stylistic Issues",
            "description": "require or disallow an empty line after variable declarations",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/newline-after-var"
          },
          "fixable": "whitespace",
          "messages": {
            "expected": "Expected blank line after variable declarations.",
            "unexpected": "Unexpected blank line after variable declarations."
          },
          "replacedBy": [
            "padding-line-between-statements"
          ],
          "schema": [
            {
              "enum": [
                "never",
                "always"
              ]
            }
          ],
          "type": "layout"
        }
      },
      "newline-before-return": {
        "meta": {
          "deprecated": true,
          "docs": {
            "category": "Stylistic Issues",
            "description": "require an empty line before `return` statements",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/newline-before-return"
          },
          "fixable": "whitespace",
          "messages": {
            "expected": "Expected newline before return statement."
          },
          "replacedBy": [
            "padding-line-between-statements"
          ],
          "schema": [],
          "type": "layout"
        }
      },
      "newline-per-chained-call": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "require a newline after each call in a method chain",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/newline-per-chained-call"
          },
          "fixable": "whitespace",
          "messages": {
            "expected": "Expected line break before `{{callee}}`."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "ignoreChainWithDepth": {
                  "default": 2,
                  "maximum": 10,
                  "minimum": 1,
                  "type": "integer"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "no-alert": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow the use of `alert`, `confirm`, and `prompt`",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-alert"
          },
          "messages": {
            "unexpected": "Unexpected {{name}}."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-array-constructor": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow `Array` constructors",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-array-constructor"
          },
          "messages": {
            "preferLiteral": "The array literal notation [] is preferable."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-async-promise-executor": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow using an async function as a Promise executor",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-async-promise-executor"
          },
          "fixable": null,
          "messages": {
            "async": "Promise executor functions should not be async."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-await-in-loop": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow `await` inside of loops",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-await-in-loop"
          },
          "messages": {
            "unexpectedAwait": "Unexpected `await` inside a loop."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-bitwise": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow bitwise operators",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-bitwise"
          },
          "messages": {
            "unexpected": "Unexpected use of '{{operator}}'."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allow": {
                  "items": {
                    "enum": [
                      "^",
                      "|",
                      "&",
                      "<<",
                      ">>",
                      ">>>",
                      "^=",
                      "|=",
                      "&=",
                      "<<=",
                      ">>=",
                      ">>>=",
                      "~"
                    ]
                  },
                  "type": "array",
                  "uniqueItems": true
                },
                "int32Hint": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-buffer-constructor": {
        "meta": {
          "docs": {
            "category": "Node.js and CommonJS",
            "description": "disallow use of the `Buffer()` constructor",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-buffer-constructor"
          },
          "messages": {
            "deprecated": "{{expr}} is deprecated. Use Buffer.from(), Buffer.alloc(), or Buffer.allocUnsafe() instead."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-caller": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow the use of `arguments.caller` or `arguments.callee`",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-caller"
          },
          "messages": {
            "unexpected": "Avoid arguments.{{prop}}."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-case-declarations": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow lexical declarations in case clauses",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-case-declarations"
          },
          "messages": {
            "unexpected": "Unexpected lexical declaration in case block."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-catch-shadow": {
        "meta": {
          "deprecated": true,
          "docs": {
            "category": "Variables",
            "description": "disallow `catch` clause parameters from shadowing variables in the outer scope",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-catch-shadow"
          },
          "messages": {
            "mutable": "Value of '{{name}}' may be overwritten in IE 8 and earlier."
          },
          "replacedBy": [
            "no-shadow"
          ],
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-class-assign": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "disallow reassigning class members",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-class-assign"
          },
          "messages": {
            "class": "'{{name}}' is a class."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-compare-neg-zero": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow comparing against -0",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-compare-neg-zero"
          },
          "fixable": null,
          "messages": {
            "unexpected": "Do not use the '{{operator}}' operator to compare against -0."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-cond-assign": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow assignment operators in conditional expressions",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-cond-assign"
          },
          "messages": {
            "missing": "Expected a conditional expression and instead saw an assignment.",
            "unexpected": "Unexpected assignment within {{type}}."
          },
          "schema": [
            {
              "enum": [
                "except-parens",
                "always"
              ]
            }
          ],
          "type": "problem"
        }
      },
      "no-confusing-arrow": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "disallow arrow functions where they could be confused with comparisons",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-confusing-arrow"
          },
          "fixable": "code",
          "messages": {
            "confusing": "Arrow function used ambiguously with a conditional expression."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowParens": {
                  "default": true,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-console": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow the use of `console`",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-console"
          },
          "messages": {
            "unexpected": "Unexpected console statement."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allow": {
                  "items": {
                    "type": "string"
                  },
                  "minItems": 1,
                  "type": "array",
                  "uniqueItems": true
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-const-assign": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "disallow reassigning `const` variables",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-const-assign"
          },
          "messages": {
            "const": "'{{name}}' is constant."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-constant-condition": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow constant expressions in conditions",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-constant-condition"
          },
          "messages": {
            "unexpected": "Unexpected constant condition."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "checkLoops": {
                  "default": true,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "problem"
        }
      },
      "no-constructor-return": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow returning value from constructor",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-constructor-return"
          },
          "fixable": null,
          "messages": {
            "unexpected": "Unexpected return statement in constructor."
          },
          "schema": {},
          "type": "problem"
        }
      },
      "no-continue": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow `continue` statements",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-continue"
          },
          "messages": {
            "unexpected": "Unexpected use of continue statement."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-control-regex": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow control characters in regular expressions",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-control-regex"
          },
          "messages": {
            "unexpected": "Unexpected control character(s) in regular expression: {{controlChars}}."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-debugger": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow the use of `debugger`",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-debugger"
          },
          "fixable": null,
          "messages": {
            "unexpected": "Unexpected 'debugger' statement."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-delete-var": {
        "meta": {
          "docs": {
            "category": "Variables",
            "description": "disallow deleting variables",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-delete-var"
          },
          "messages": {
            "unexpected": "Variables should not be deleted."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-div-regex": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow division operators explicitly at the beginning of regular expressions",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-div-regex"
          },
          "fixable": "code",
          "messages": {
            "unexpected": "A regular expression literal can be confused with '/='."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-dupe-args": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow duplicate arguments in `function` definitions",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-dupe-args"
          },
          "messages": {
            "unexpected": "Duplicate param '{{name}}'."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-dupe-class-members": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "disallow duplicate class members",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-dupe-class-members"
          },
          "messages": {
            "unexpected": "Duplicate name '{{name}}'."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-dupe-else-if": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow duplicate conditions in if-else-if chains",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-dupe-else-if"
          },
          "messages": {
            "unexpected": "This branch can never execute. Its condition is a duplicate or covered by previous conditions in the if-else-if chain."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-dupe-keys": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow duplicate keys in object literals",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-dupe-keys"
          },
          "messages": {
            "unexpected": "Duplicate key '{{name}}'."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-duplicate-case": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow duplicate case labels",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-duplicate-case"
          },
          "messages": {
            "unexpected": "Duplicate case label."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-duplicate-imports": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "disallow duplicate module imports",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-duplicate-imports"
          },
          "messages": {
            "export": "'{{module}}' export is duplicated.",
            "exportAs": "'{{module}}' export is duplicated as import.",
            "import": "'{{module}}' import is duplicated.",
            "importAs": "'{{module}}' import is duplicated as export."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "includeExports": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "problem"
        }
      },
      "no-else-return": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow `else` blocks after `return` statements in `if` statements",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-else-return"
          },
          "fixable": "code",
          "messages": {
            "unexpected": "Unnecessary 'else' after 'return'."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowElseIf": {
                  "default": true,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-empty": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow empty block statements",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-empty"
          },
          "messages": {
            "unexpected": "Empty {{type}} statement."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowEmptyCatch": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-empty-character-class": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow empty character classes in regular expressions",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-empty-character-class"
          },
          "messages": {
            "unexpected": "Empty class."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-empty-function": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow empty functions",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-empty-function"
          },
          "messages": {
            "unexpected": "Unexpected empty {{name}}."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allow": {
                  "items": {
                    "enum": [
                      "functions",
                      "arrowFunctions",
                      "generatorFunctions",
                      "methods",
                      "generatorMethods",
                      "getters",
                      "setters",
                      "constructors"
                    ]
                  },
                  "type": "array",
                  "uniqueItems": true
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-empty-pattern": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow empty destructuring patterns",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-empty-pattern"
          },
          "messages": {
            "unexpected": "Unexpected empty {{type}} pattern."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-eq-null": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow `null` comparisons without type-checking operators",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-eq-null"
          },
          "messages": {
            "unexpected": "Use '===' to compare with null."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-eval": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow the use of `eval()`",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-eval"
          },
          "messages": {
            "unexpected": "eval can be harmful."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowIndirect": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-ex-assign": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow reassigning exceptions in `catch` clauses",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-ex-assign"
          },
          "messages": {
            "unexpected": "Do not assign to the exception parameter."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-extend-native": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow extending native types",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-extend-native"
          },
          "messages": {
            "unexpected": "{{builtin}} prototype is read only, properties should not be added."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "exceptions": {
                  "items": {
                    "type": "string"
                  },
                  "type": "array",
                  "uniqueItems": true
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-extra-bind": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow unnecessary calls to `.bind()`",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-extra-bind"
          },
          "fixable": "code",
          "messages": {
            "unexpected": "The function binding is unnecessary."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-extra-boolean-cast": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow unnecessary boolean casts",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-extra-boolean-cast"
          },
          "fixable": "code",
          "messages": {
            "unexpectedCall": "Redundant Boolean call.",
            "unexpectedNegation": "Redundant double negation."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-extra-label": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow unnecessary labels",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-extra-label"
          },
          "fixable": "code",
          "messages": {
            "unexpected": "This label '{{name}}' is unnecessary."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-extra-parens": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow unnecessary parentheses",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-extra-parens"
          },
          "fixable": "code",
          "messages": {
            "unexpected": "Unnecessary parentheses around expression."
          },
          "schema": {
            "anyOf": [
              {
                "items": [
                  {
                    "enum": [
                      "functions"
                    ]
                  }
                ],
                "maxItems": 1,
                "minItems": 0,
                "type": "array"
              },
              {
                "items": [
                  {
                    "enum": [
                      "all"
                    ]
                  },
                  {
                    "additionalProperties": false,
                    "properties": {
                      "conditionalAssign": {
                        "type": "boolean"
                      },
                      "enforceForArrowConditionals": {
                        "type": "boolean"
                      },
                      "enforceForNewInMemberExpressions": {
                        "type": "boolean"
                      },
                      "enforceForSequenceExpressions": {
                        "type": "boolean"
                      },
                      "ignoreJSX": {
                        "enum": [
                          "none",
                          "all",
                          "single-line",
                          "multi-line"
                        ]
                      },
                      "nestedBinaryExpressions": {
                        "type": "boolean"
                      },
                      "returnAssign": {
                        "type": "boolean"
                      }
                    },
                    "type": "object"
                  }
                ],
                "maxItems": 2,
                "minItems": 0,
                "type": "array"
              }
            ]
          },
          "type": "layout"
        }
      },
      "no-extra-semi": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow unnecessary semicolons",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-extra-semi"
          },
          "fixable": "code",
          "messages": {
            "unexpected": "Unnecessary semicolon."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-fallthrough": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow fallthrough of `case` statements",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-fallthrough"
          },
          "messages": {
            "case": "Expected a 'break' statement before 'case'.",
            "default": "Expected a 'break' statement before 'default'."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "commentPattern": {
                  "default": "",
                  "type": "string"
                }
              },
              "type": "object"
            }
          ],
          "type": "problem"
        }
      },
      "no-floating-decimal": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow leading or trailing decimal points in numeric literals",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-floating-decimal"
          },
          "fixable": "code",
          "messages": {
            "leading": "A leading decimal point can be confused with a dot.",
            "trailing": "A trailing decimal point can be confused with a dot."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-func-assign": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow reassigning `function` declarations",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-func-assign"
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-global-assign": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow assignments to native objects or read-only global variables",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-global-assign"
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "exceptions": {
                  "items": {
                    "type": "string"
                  },
                  "type": "array",
                  "uniqueItems": true
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-implicit-coercion": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow shorthand type conversions",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-implicit-coercion"
          },
          "fixable": "code",
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allow": {
                  "items": {
                    "enum": [
                      "~",
                      "!!",
                      "+",
                      "*"
                    ]
                  },
                  "type": "array",
                  "uniqueItems": true
                },
                "boolean": {
                  "default": true,
                  "type": "boolean"
                },
                "number": {
                  "default": true,
                  "type": "boolean"
                },
                "string": {
                  "default": true,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-implicit-globals": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow declarations in the global scope",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-implicit-globals"
          },
          "messages": {
            "assignmentToReadonlyGlobal": "Unexpected assignment to read-only global variable.",
            "globalLexicalBinding": "Unexpected {{kind}} declaration in the global scope, wrap in a block or in an IIFE.",
            "globalNonLexicalBinding": "Unexpected {{kind}} declaration in the global scope, wrap in an IIFE for a local variable, assign as global property for a global variable.",
            "globalVariableLeak": "Global variable leak, declare the variable if it is intended to be local.",
            "redeclarationOfReadonlyGlobal": "Unexpected redeclaration of read-only global variable."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "lexicalBindings": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-implied-eval": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow the use of `eval()`-like methods",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-implied-eval"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-import-assign": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow assigning to imported bindings",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-import-assign"
          },
          "messages": {
            "readonly": "'{{name}}' is read-only.",
            "readonlyMember": "The members of '{{name}}' are read-only."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-inline-comments": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow inline comments after code",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-inline-comments"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-inner-declarations": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow variable or `function` declarations in nested blocks",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-inner-declarations"
          },
          "schema": [
            {
              "enum": [
                "functions",
                "both"
              ]
            }
          ],
          "type": "problem"
        }
      },
      "no-invalid-regexp": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow invalid regular expression strings in `RegExp` constructors",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-invalid-regexp"
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowConstructorFlags": {
                  "items": {
                    "type": "string"
                  },
                  "type": "array"
                }
              },
              "type": "object"
            }
          ],
          "type": "problem"
        }
      },
      "no-invalid-this": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow `this` keywords outside of classes or class-like objects",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-invalid-this"
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "capIsConstructor": {
                  "default": true,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-irregular-whitespace": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow irregular whitespace",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-irregular-whitespace"
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "skipComments": {
                  "default": false,
                  "type": "boolean"
                },
                "skipRegExps": {
                  "default": false,
                  "type": "boolean"
                },
                "skipStrings": {
                  "default": true,
                  "type": "boolean"
                },
                "skipTemplates": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "problem"
        }
      },
      "no-iterator": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow the use of the `__iterator__` property",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-iterator"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-label-var": {
        "meta": {
          "docs": {
            "category": "Variables",
            "description": "disallow labels that share a name with a variable",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-label-var"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-labels": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow labeled statements",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-labels"
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowLoop": {
                  "default": false,
                  "type": "boolean"
                },
                "allowSwitch": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-lone-blocks": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow unnecessary nested blocks",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-lone-blocks"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-lonely-if": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow `if` statements as the only statement in `else` blocks",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-lonely-if"
          },
          "fixable": "code",
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-loop-func": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow function declarations that contain unsafe references inside loop statements",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-loop-func"
          },
          "messages": {
            "unsafeRefs": "Function declared in a loop contains unsafe references to variable(s) {{ varNames }}."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-magic-numbers": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow magic numbers",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-magic-numbers"
          },
          "messages": {
            "noMagic": "No magic number: {{raw}}.",
            "useConst": "Number constants declarations must use 'const'."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "detectObjects": {
                  "default": false,
                  "type": "boolean"
                },
                "enforceConst": {
                  "default": false,
                  "type": "boolean"
                },
                "ignore": {
                  "items": {
                    "type": "number"
                  },
                  "type": "array",
                  "uniqueItems": true
                },
                "ignoreArrayIndexes": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-misleading-character-class": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow characters which are made with multiple code points in character class syntax",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-misleading-character-class"
          },
          "messages": {
            "combiningClass": "Unexpected combined character in character class.",
            "emojiModifier": "Unexpected modified Emoji in character class.",
            "regionalIndicatorSymbol": "Unexpected national flag in character class.",
            "surrogatePairWithoutUFlag": "Unexpected surrogate pair in character class. Use 'u' flag.",
            "zwj": "Unexpected joined character sequence in character class."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-mixed-operators": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow mixed binary operators",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-mixed-operators"
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowSamePrecedence": {
                  "default": true,
                  "type": "boolean"
                },
                "groups": {
                  "items": {
                    "items": {
                      "enum": [
                        "+",
                        "-",
                        "*",
                        "/",
                        "%",
                        "**",
                        "&",
                        "|",
                        "^",
                        "~",
                        "<<",
                        ">>",
                        ">>>",
                        "==",
                        "!=",
                        "===",
                        "!==",
                        ">",
                        ">=",
                        "<",
                        "<=",
                        "&&",
                        "||",
                        "in",
                        "instanceof",
                        "?:"
                      ]
                    },
                    "minItems": 2,
                    "type": "array",
                    "uniqueItems": true
                  },
                  "type": "array",
                  "uniqueItems": true
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-mixed-requires": {
        "meta": {
          "docs": {
            "category": "Node.js and CommonJS",
            "description": "disallow `require` calls to be mixed with regular variable declarations",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-mixed-requires"
          },
          "schema": [
            {
              "oneOf": [
                {
                  "type": "boolean"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "allowCall": {
                      "type": "boolean"
                    },
                    "grouping": {
                      "type": "boolean"
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "suggestion"
        }
      },
      "no-mixed-spaces-and-tabs": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow mixed spaces and tabs for indentation",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-mixed-spaces-and-tabs"
          },
          "schema": [
            {
              "enum": [
                "smart-tabs",
                true,
                false
              ]
            }
          ],
          "type": "layout"
        }
      },
      "no-multi-assign": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow use of chained assignment expressions",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-multi-assign"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-multi-spaces": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow multiple spaces",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-multi-spaces"
          },
          "fixable": "whitespace",
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "exceptions": {
                  "additionalProperties": false,
                  "patternProperties": {
                    "^([A-Z][a-z]*)+$": {
                      "type": "boolean"
                    }
                  },
                  "type": "object"
                },
                "ignoreEOLComments": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "no-multi-str": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow multiline strings",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-multi-str"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-multiple-empty-lines": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow multiple empty lines",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-multiple-empty-lines"
          },
          "fixable": "whitespace",
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "max": {
                  "minimum": 0,
                  "type": "integer"
                },
                "maxBOF": {
                  "minimum": 0,
                  "type": "integer"
                },
                "maxEOF": {
                  "minimum": 0,
                  "type": "integer"
                }
              },
              "required": [
                "max"
              ],
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "no-native-reassign": {
        "meta": {
          "deprecated": true,
          "docs": {
            "category": "Best Practices",
            "description": "disallow assignments to native objects or read-only global variables",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-native-reassign"
          },
          "replacedBy": [
            "no-global-assign"
          ],
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "exceptions": {
                  "items": {
                    "type": "string"
                  },
                  "type": "array",
                  "uniqueItems": true
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-negated-condition": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow negated conditions",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-negated-condition"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-negated-in-lhs": {
        "meta": {
          "deprecated": true,
          "docs": {
            "category": "Possible Errors",
            "description": "disallow negating the left operand in `in` expressions",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-negated-in-lhs"
          },
          "replacedBy": [
            "no-unsafe-negation"
          ],
          "schema": [],
          "type": "problem"
        }
      },
      "no-nested-ternary": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow nested ternary expressions",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-nested-ternary"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-new": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow `new` operators outside of assignments or comparisons",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-new"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-new-func": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow `new` operators with the `Function` object",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-new-func"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-new-object": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow `Object` constructors",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-new-object"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-new-require": {
        "meta": {
          "docs": {
            "category": "Node.js and CommonJS",
            "description": "disallow `new` operators with calls to `require`",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-new-require"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-new-symbol": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "disallow `new` operators with the `Symbol` object",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-new-symbol"
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-new-wrappers": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow `new` operators with the `String`, `Number`, and `Boolean` objects",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-new-wrappers"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-obj-calls": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow calling global object properties as functions",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-obj-calls"
          },
          "messages": {
            "unexpectedCall": "'{{name}}' is not a function."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-octal": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow octal literals",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-octal"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-octal-escape": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow octal escape sequences in string literals",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-octal-escape"
          },
          "messages": {
            "octalEscapeSequence": "Don't use octal: '\\{{sequence}}'. Use '\\u....' instead."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-param-reassign": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow reassigning `function` parameters",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-param-reassign"
          },
          "schema": [
            {
              "oneOf": [
                {
                  "additionalProperties": false,
                  "properties": {
                    "props": {
                      "enum": [
                        false
                      ]
                    }
                  },
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "ignorePropertyModificationsFor": {
                      "items": {
                        "type": "string"
                      },
                      "type": "array",
                      "uniqueItems": true
                    },
                    "ignorePropertyModificationsForRegex": {
                      "items": {
                        "type": "string"
                      },
                      "type": "array",
                      "uniqueItems": true
                    },
                    "props": {
                      "enum": [
                        true
                      ]
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "suggestion"
        }
      },
      "no-path-concat": {
        "meta": {
          "docs": {
            "category": "Node.js and CommonJS",
            "description": "disallow string concatenation with `__dirname` and `__filename`",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-path-concat"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-plusplus": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow the unary operators `++` and `--`",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-plusplus"
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowForLoopAfterthoughts": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-process-env": {
        "meta": {
          "docs": {
            "category": "Node.js and CommonJS",
            "description": "disallow the use of `process.env`",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-process-env"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-process-exit": {
        "meta": {
          "docs": {
            "category": "Node.js and CommonJS",
            "description": "disallow the use of `process.exit()`",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-process-exit"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-proto": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow the use of the `__proto__` property",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-proto"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-prototype-builtins": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow calling some `Object.prototype` methods directly on objects",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-prototype-builtins"
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-redeclare": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow variable redeclaration",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-redeclare"
          },
          "messages": {
            "redeclared": "'{{id}}' is already defined.",
            "redeclaredAsBuiltin": "'{{id}}' is already defined as a built-in global variable.",
            "redeclaredBySyntax": "'{{id}}' is already defined by a variable declaration."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "builtinGlobals": {
                  "default": true,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-regex-spaces": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow multiple spaces in regular expressions",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-regex-spaces"
          },
          "fixable": "code",
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-restricted-globals": {
        "meta": {
          "docs": {
            "category": "Variables",
            "description": "disallow specified global variables",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-restricted-globals"
          },
          "schema": {
            "items": {
              "oneOf": [
                {
                  "type": "string"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "name"
                  ],
                  "type": "object"
                }
              ]
            },
            "minItems": 0,
            "type": "array",
            "uniqueItems": true
          },
          "type": "suggestion"
        }
      },
      "no-restricted-imports": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "disallow specified modules when loaded by `import`",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-restricted-imports"
          },
          "messages": {
            "everything": "* import is invalid because '{{importNames}}' from '{{importSource}}' is restricted.",
            "everythingWithCustomMessage": "* import is invalid because '{{importNames}}' from '{{importSource}}' is restricted. {{customMessage}}",
            "path": "'{{importSource}}' import is restricted from being used.",
            "pathWithCustomMessage": "'{{importSource}}' import is restricted from being used. {{customMessage}}",
            "patterns": "'{{importSource}}' import is restricted from being used by a pattern."
          },
          "schema": {
            "anyOf": [
              {
                "items": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "additionalProperties": false,
                      "properties": {
                        "importNames": {
                          "items": {
                            "type": "string"
                          },
                          "type": "array"
                        },
                        "message": {
                          "minLength": 1,
                          "type": "string"
                        },
                        "name": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "name"
                      ],
                      "type": "object"
                    }
                  ]
                },
                "type": "array",
                "uniqueItems": true
              },
              {
                "additionalItems": false,
                "items": [
                  {
                    "additionalProperties": false,
                    "properties": {
                      "paths": {
                        "items": {
                          "anyOf": [
                            {
                              "type": "string"
                            },
                            {
                              "additionalProperties": false,
                              "properties": {
                                "importNames": {
                                  "items": {
                                    "type": "string"
                                  },
                                  "type": "array"
                                },
                                "message": {
                                  "minLength": 1,
                                  "type": "string"
                                },
                                "name": {
                                  "type": "string"
                                }
                              },
                              "required": [
                                "name"
                              ],
                              "type": "object"
                            }
                          ]
                        },
                        "type": "array",
                        "uniqueItems": true
                      },
                      "patterns": {
                        "items": {
                          "type": "string"
                        },
                        "type": "array",
                        "uniqueItems": true
                      }
                    },
                    "type": "object"
                  }
                ],
                "type": "array"
              }
            ]
          },
          "type": "suggestion"
        }
      },
      "no-restricted-modules": {
        "meta": {
          "docs": {
            "category": "Node.js and CommonJS",
            "description": "disallow specified modules when loaded by `require`",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-restricted-modules"
          },
          "schema": {
            "anyOf": [
              {
                "items": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "additionalProperties": false,
                      "properties": {
                        "message": {
                          "minLength": 1,
                          "type": "string"
                        },
                        "name": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "name"
                      ],
                      "type": "object"
                    }
                  ]
                },
                "type": "array",
                "uniqueItems": true
              },
              {
                "additionalItems": false,
                "items": {
                  "additionalProperties": false,
                  "properties": {
                    "paths": {
                      "items": {
                        "anyOf": [
                          {
                            "type": "string"
                          },
                          {
                            "additionalProperties": false,
                            "properties": {
                              "message": {
                                "minLength": 1,
                                "type": "string"
                              },
                              "name": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "name"
                            ],
                            "type": "object"
                          }
                        ]
                      },
                      "type": "array",
                      "uniqueItems": true
                    },
                    "patterns": {
                      "items": {
                        "type": "string"
                      },
                      "type": "array",
                      "uniqueItems": true
                    }
                  },
                  "type": "object"
                },
                "type": "array"
              }
            ]
          },
          "type": "suggestion"
        }
      },
      "no-restricted-properties": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow certain properties on certain objects",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-restricted-properties"
          },
          "schema": {
            "items": {
              "anyOf": [
                {
                  "additionalProperties": false,
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "object": {
                      "type": "string"
                    },
                    "property": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "object"
                  ],
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "object": {
                      "type": "string"
                    },
                    "property": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "property"
                  ],
                  "type": "object"
                }
              ]
            },
            "type": "array",
            "uniqueItems": true
          },
          "type": "suggestion"
        }
      },
      "no-restricted-syntax": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow specified syntax",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-restricted-syntax"
          },
          "schema": {
            "items": {
              "oneOf": [
                {
                  "type": "string"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "selector": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "selector"
                  ],
                  "type": "object"
                }
              ]
            },
            "minItems": 0,
            "type": "array",
            "uniqueItems": true
          },
          "type": "suggestion"
        }
      },
      "no-return-assign": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow assignment operators in `return` statements",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-return-assign"
          },
          "schema": [
            {
              "enum": [
                "except-parens",
                "always"
              ]
            }
          ],
          "type": "suggestion"
        }
      },
      "no-return-await": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow unnecessary `return await`",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-return-await"
          },
          "fixable": null,
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-script-url": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow `javascript:` urls",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-script-url"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-self-assign": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow assignments where both sides are exactly the same",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-self-assign"
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "props": {
                  "default": true,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "problem"
        }
      },
      "no-self-compare": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow comparisons where both sides are exactly the same",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-self-compare"
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-sequences": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow comma operators",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-sequences"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-setter-return": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow returning values from setters",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-setter-return"
          },
          "messages": {
            "returnsValue": "Setter cannot return a value."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-shadow": {
        "meta": {
          "docs": {
            "category": "Variables",
            "description": "disallow variable declarations from shadowing variables declared in the outer scope",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-shadow"
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allow": {
                  "items": {
                    "type": "string"
                  },
                  "type": "array"
                },
                "builtinGlobals": {
                  "default": false,
                  "type": "boolean"
                },
                "hoist": {
                  "default": "functions",
                  "enum": [
                    "all",
                    "functions",
                    "never"
                  ]
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-shadow-restricted-names": {
        "meta": {
          "docs": {
            "category": "Variables",
            "description": "disallow identifiers from shadowing restricted names",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-shadow-restricted-names"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-spaced-func": {
        "meta": {
          "deprecated": true,
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow spacing between function identifiers and their applications (deprecated)",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-spaced-func"
          },
          "fixable": "whitespace",
          "replacedBy": [
            "func-call-spacing"
          ],
          "schema": [],
          "type": "layout"
        }
      },
      "no-sparse-arrays": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow sparse arrays",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-sparse-arrays"
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-sync": {
        "meta": {
          "docs": {
            "category": "Node.js and CommonJS",
            "description": "disallow synchronous methods",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-sync"
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowAtRootLevel": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-tabs": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow all tabs",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-tabs"
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowIndentationTabs": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "no-template-curly-in-string": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow template literal placeholder syntax in regular strings",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-template-curly-in-string"
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-ternary": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow ternary operators",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-ternary"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-this-before-super": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "disallow `this`/`super` before calling `super()` in constructors",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-this-before-super"
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-throw-literal": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow throwing literals as exceptions",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-throw-literal"
          },
          "messages": {
            "object": "Expected an error object to be thrown.",
            "undef": "Do not throw undefined."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-trailing-spaces": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow trailing whitespace at the end of lines",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-trailing-spaces"
          },
          "fixable": "whitespace",
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "ignoreComments": {
                  "default": false,
                  "type": "boolean"
                },
                "skipBlankLines": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "no-undef": {
        "meta": {
          "docs": {
            "category": "Variables",
            "description": "disallow the use of undeclared variables unless mentioned in `/*global */` comments",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-undef"
          },
          "messages": {
            "undef": "'{{name}}' is not defined."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "typeof": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "problem"
        }
      },
      "no-undef-init": {
        "meta": {
          "docs": {
            "category": "Variables",
            "description": "disallow initializing variables to `undefined`",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-undef-init"
          },
          "fixable": "code",
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-undefined": {
        "meta": {
          "docs": {
            "category": "Variables",
            "description": "disallow the use of `undefined` as an identifier",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-undefined"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-underscore-dangle": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow dangling underscores in identifiers",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-underscore-dangle"
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allow": {
                  "items": {
                    "type": "string"
                  },
                  "type": "array"
                },
                "allowAfterSuper": {
                  "default": false,
                  "type": "boolean"
                },
                "allowAfterThis": {
                  "default": false,
                  "type": "boolean"
                },
                "allowAfterThisConstructor": {
                  "default": false,
                  "type": "boolean"
                },
                "enforceInMethodNames": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-unexpected-multiline": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow confusing multiline expressions",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-unexpected-multiline"
          },
          "messages": {
            "division": "Unexpected newline between numerator and division operator.",
            "function": "Unexpected newline between function and ( of function call.",
            "property": "Unexpected newline between object and [ of property access.",
            "taggedTemplate": "Unexpected newline between template tag and template literal."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-unmodified-loop-condition": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow unmodified loop conditions",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-unmodified-loop-condition"
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-unneeded-ternary": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow ternary operators when simpler alternatives exist",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-unneeded-ternary"
          },
          "fixable": "code",
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "defaultAssignment": {
                  "default": true,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-unreachable": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow unreachable code after `return`, `throw`, `continue`, and `break` statements",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-unreachable"
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-unsafe-finally": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow control flow statements in `finally` blocks",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-unsafe-finally"
          },
          "schema": [],
          "type": "problem"
        }
      },
      "no-unsafe-negation": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow negating the left operand of relational operators",
            "recommended": true,
            "suggestion": true,
            "url": "https://eslint.org/docs/rules/no-unsafe-negation"
          },
          "fixable": null,
          "messages": {
            "suggestNegatedExpression": "Negate '{{operator}}' expression instead of its left operand. This changes the current behavior.",
            "suggestParenthesisedNegation": "Wrap negation in '()' to make the intention explicit. This preserves the current behavior.",
            "unexpected": "Unexpected negating the left operand of '{{operator}}' operator."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "enforceForOrderingRelations": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "problem"
        }
      },
      "no-unused-expressions": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow unused expressions",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-unused-expressions"
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowShortCircuit": {
                  "default": false,
                  "type": "boolean"
                },
                "allowTaggedTemplates": {
                  "default": false,
                  "type": "boolean"
                },
                "allowTernary": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-unused-labels": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow unused labels",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-unused-labels"
          },
          "fixable": "code",
          "messages": {
            "unused": "'{{name}}:' is defined but never used."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-unused-vars": {
        "meta": {
          "docs": {
            "category": "Variables",
            "description": "disallow unused variables",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-unused-vars"
          },
          "schema": [
            {
              "oneOf": [
                {
                  "enum": [
                    "all",
                    "local"
                  ]
                },
                {
                  "properties": {
                    "args": {
                      "enum": [
                        "all",
                        "after-used",
                        "none"
                      ]
                    },
                    "argsIgnorePattern": {
                      "type": "string"
                    },
                    "caughtErrors": {
                      "enum": [
                        "all",
                        "none"
                      ]
                    },
                    "caughtErrorsIgnorePattern": {
                      "type": "string"
                    },
                    "ignoreRestSiblings": {
                      "type": "boolean"
                    },
                    "vars": {
                      "enum": [
                        "all",
                        "local"
                      ]
                    },
                    "varsIgnorePattern": {
                      "type": "string"
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "problem"
        }
      },
      "no-use-before-define": {
        "meta": {
          "docs": {
            "category": "Variables",
            "description": "disallow the use of variables before they are defined",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-use-before-define"
          },
          "schema": [
            {
              "oneOf": [
                {
                  "enum": [
                    "nofunc"
                  ]
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "classes": {
                      "type": "boolean"
                    },
                    "functions": {
                      "type": "boolean"
                    },
                    "variables": {
                      "type": "boolean"
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "problem"
        }
      },
      "no-useless-call": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow unnecessary calls to `.call()` and `.apply()`",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-useless-call"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-useless-catch": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow unnecessary `catch` clauses",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-useless-catch"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-useless-computed-key": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "disallow unnecessary computed property keys in objects and classes",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-useless-computed-key"
          },
          "fixable": "code",
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "enforceForClassMembers": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-useless-concat": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow unnecessary concatenation of literals or template literals",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-useless-concat"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-useless-constructor": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "disallow unnecessary constructors",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-useless-constructor"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-useless-escape": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow unnecessary escape characters",
            "recommended": true,
            "suggestion": true,
            "url": "https://eslint.org/docs/rules/no-useless-escape"
          },
          "messages": {
            "escapeBackslash": "Replace the `\\` with `\\\\` to include the actual backslash character.",
            "removeEscape": "Remove the `\\`. This maintains the current functionality.",
            "unnecessaryEscape": "Unnecessary escape character: \\{{character}}."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-useless-rename": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "disallow renaming import, export, and destructured assignments to the same name",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-useless-rename"
          },
          "fixable": "code",
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "ignoreDestructuring": {
                  "default": false,
                  "type": "boolean"
                },
                "ignoreExport": {
                  "default": false,
                  "type": "boolean"
                },
                "ignoreImport": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-useless-return": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow redundant return statements",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-useless-return"
          },
          "fixable": "code",
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-var": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "require `let` or `const` instead of `var`",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-var"
          },
          "fixable": "code",
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-void": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow `void` operators",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-void"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "no-warning-comments": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow specified warning terms in comments",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-warning-comments"
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "location": {
                  "enum": [
                    "start",
                    "anywhere"
                  ]
                },
                "terms": {
                  "items": {
                    "type": "string"
                  },
                  "type": "array"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "no-whitespace-before-property": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow whitespace before properties",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/no-whitespace-before-property"
          },
          "fixable": "whitespace",
          "schema": [],
          "type": "layout"
        }
      },
      "no-with": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow `with` statements",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/no-with"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "nonblock-statement-body-position": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce the location of single-line statements",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/nonblock-statement-body-position"
          },
          "fixable": "whitespace",
          "schema": [
            {
              "enum": [
                "beside",
                "below",
                "any"
              ]
            },
            {
              "additionalProperties": false,
              "properties": {
                "overrides": {
                  "additionalProperties": false,
                  "properties": {
                    "do": {
                      "enum": [
                        "beside",
                        "below",
                        "any"
                      ]
                    },
                    "else": {
                      "enum": [
                        "beside",
                        "below",
                        "any"
                      ]
                    },
                    "for": {
                      "enum": [
                        "beside",
                        "below",
                        "any"
                      ]
                    },
                    "if": {
                      "enum": [
                        "beside",
                        "below",
                        "any"
                      ]
                    },
                    "while": {
                      "enum": [
                        "beside",
                        "below",
                        "any"
                      ]
                    }
                  }
                }
              }
            }
          ],
          "type": "layout"
        }
      },
      "object-curly-newline": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce consistent line breaks inside braces",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/object-curly-newline"
          },
          "fixable": "whitespace",
          "schema": [
            {
              "oneOf": [
                {
                  "oneOf": [
                    {
                      "enum": [
                        "always",
                        "never"
                      ]
                    },
                    {
                      "additionalProperties": false,
                      "minProperties": 1,
                      "properties": {
                        "consistent": {
                          "type": "boolean"
                        },
                        "minProperties": {
                          "minimum": 0,
                          "type": "integer"
                        },
                        "multiline": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    }
                  ]
                },
                {
                  "additionalProperties": false,
                  "minProperties": 1,
                  "properties": {
                    "ExportDeclaration": {
                      "oneOf": [
                        {
                          "enum": [
                            "always",
                            "never"
                          ]
                        },
                        {
                          "additionalProperties": false,
                          "minProperties": 1,
                          "properties": {
                            "consistent": {
                              "type": "boolean"
                            },
                            "minProperties": {
                              "minimum": 0,
                              "type": "integer"
                            },
                            "multiline": {
                              "type": "boolean"
                            }
                          },
                          "type": "object"
                        }
                      ]
                    },
                    "ImportDeclaration": {
                      "oneOf": [
                        {
                          "enum": [
                            "always",
                            "never"
                          ]
                        },
                        {
                          "additionalProperties": false,
                          "minProperties": 1,
                          "properties": {
                            "consistent": {
                              "type": "boolean"
                            },
                            "minProperties": {
                              "minimum": 0,
                              "type": "integer"
                            },
                            "multiline": {
                              "type": "boolean"
                            }
                          },
                          "type": "object"
                        }
                      ]
                    },
                    "ObjectExpression": {
                      "oneOf": [
                        {
                          "enum": [
                            "always",
                            "never"
                          ]
                        },
                        {
                          "additionalProperties": false,
                          "minProperties": 1,
                          "properties": {
                            "consistent": {
                              "type": "boolean"
                            },
                            "minProperties": {
                              "minimum": 0,
                              "type": "integer"
                            },
                            "multiline": {
                              "type": "boolean"
                            }
                          },
                          "type": "object"
                        }
                      ]
                    },
                    "ObjectPattern": {
                      "oneOf": [
                        {
                          "enum": [
                            "always",
                            "never"
                          ]
                        },
                        {
                          "additionalProperties": false,
                          "minProperties": 1,
                          "properties": {
                            "consistent": {
                              "type": "boolean"
                            },
                            "minProperties": {
                              "minimum": 0,
                              "type": "integer"
                            },
                            "multiline": {
                              "type": "boolean"
                            }
                          },
                          "type": "object"
                        }
                      ]
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "layout"
        }
      },
      "object-curly-spacing": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce consistent spacing inside braces",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/object-curly-spacing"
          },
          "fixable": "whitespace",
          "schema": [
            {
              "enum": [
                "always",
                "never"
              ]
            },
            {
              "additionalProperties": false,
              "properties": {
                "arraysInObjects": {
                  "type": "boolean"
                },
                "objectsInObjects": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "object-property-newline": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce placing object properties on separate lines",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/object-property-newline"
          },
          "fixable": "whitespace",
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowAllPropertiesOnSameLine": {
                  "default": false,
                  "type": "boolean"
                },
                "allowMultiplePropertiesPerLine": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "object-shorthand": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "require or disallow method and property shorthand syntax for object literals",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/object-shorthand"
          },
          "fixable": "code",
          "schema": {
            "anyOf": [
              {
                "items": [
                  {
                    "enum": [
                      "always",
                      "methods",
                      "properties",
                      "never",
                      "consistent",
                      "consistent-as-needed"
                    ]
                  }
                ],
                "maxItems": 1,
                "minItems": 0,
                "type": "array"
              },
              {
                "items": [
                  {
                    "enum": [
                      "always",
                      "methods",
                      "properties"
                    ]
                  },
                  {
                    "additionalProperties": false,
                    "properties": {
                      "avoidQuotes": {
                        "type": "boolean"
                      }
                    },
                    "type": "object"
                  }
                ],
                "maxItems": 2,
                "minItems": 0,
                "type": "array"
              },
              {
                "items": [
                  {
                    "enum": [
                      "always",
                      "methods"
                    ]
                  },
                  {
                    "additionalProperties": false,
                    "properties": {
                      "avoidExplicitReturnArrows": {
                        "type": "boolean"
                      },
                      "avoidQuotes": {
                        "type": "boolean"
                      },
                      "ignoreConstructors": {
                        "type": "boolean"
                      }
                    },
                    "type": "object"
                  }
                ],
                "maxItems": 2,
                "minItems": 0,
                "type": "array"
              }
            ]
          },
          "type": "suggestion"
        }
      },
      "one-var": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce variables to be declared either together or separately in functions",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/one-var"
          },
          "fixable": "code",
          "schema": [
            {
              "oneOf": [
                {
                  "enum": [
                    "always",
                    "never",
                    "consecutive"
                  ]
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "const": {
                      "enum": [
                        "always",
                        "never",
                        "consecutive"
                      ]
                    },
                    "let": {
                      "enum": [
                        "always",
                        "never",
                        "consecutive"
                      ]
                    },
                    "separateRequires": {
                      "type": "boolean"
                    },
                    "var": {
                      "enum": [
                        "always",
                        "never",
                        "consecutive"
                      ]
                    }
                  },
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "initialized": {
                      "enum": [
                        "always",
                        "never",
                        "consecutive"
                      ]
                    },
                    "uninitialized": {
                      "enum": [
                        "always",
                        "never",
                        "consecutive"
                      ]
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "suggestion"
        }
      },
      "one-var-declaration-per-line": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "require or disallow newlines around variable declarations",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/one-var-declaration-per-line"
          },
          "fixable": "whitespace",
          "schema": [
            {
              "enum": [
                "always",
                "initializations"
              ]
            }
          ],
          "type": "suggestion"
        }
      },
      "operator-assignment": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "require or disallow assignment operator shorthand where possible",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/operator-assignment"
          },
          "fixable": "code",
          "messages": {
            "replaced": "Assignment can be replaced with operator assignment.",
            "unexpected": "Unexpected operator assignment shorthand."
          },
          "schema": [
            {
              "enum": [
                "always",
                "never"
              ]
            }
          ],
          "type": "suggestion"
        }
      },
      "operator-linebreak": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce consistent linebreak style for operators",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/operator-linebreak"
          },
          "fixable": "code",
          "schema": [
            {
              "enum": [
                "after",
                "before",
                "none",
                null
              ]
            },
            {
              "additionalProperties": false,
              "properties": {
                "overrides": {
                  "properties": {
                    "anyOf": {
                      "enum": [
                        "after",
                        "before",
                        "none",
                        "ignore"
                      ],
                      "type": "string"
                    }
                  },
                  "type": "object"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "padded-blocks": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "require or disallow padding within blocks",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/padded-blocks"
          },
          "fixable": "whitespace",
          "schema": [
            {
              "oneOf": [
                {
                  "enum": [
                    "always",
                    "never"
                  ]
                },
                {
                  "additionalProperties": false,
                  "minProperties": 1,
                  "properties": {
                    "blocks": {
                      "enum": [
                        "always",
                        "never"
                      ]
                    },
                    "classes": {
                      "enum": [
                        "always",
                        "never"
                      ]
                    },
                    "switches": {
                      "enum": [
                        "always",
                        "never"
                      ]
                    }
                  },
                  "type": "object"
                }
              ]
            },
            {
              "properties": {
                "allowSingleLineBlocks": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "padding-line-between-statements": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "require or disallow padding lines between statements",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/padding-line-between-statements"
          },
          "fixable": "whitespace",
          "schema": {
            "additionalItems": false,
            "definitions": {
              "paddingType": {
                "enum": [
                  "any",
                  "never",
                  "always"
                ]
              },
              "statementType": {
                "anyOf": [
                  {
                    "enum": [
                      "*",
                      "block-like",
                      "cjs-export",
                      "cjs-import",
                      "directive",
                      "expression",
                      "iife",
                      "multiline-block-like",
                      "multiline-expression",
                      "multiline-const",
                      "multiline-let",
                      "multiline-var",
                      "singleline-const",
                      "singleline-let",
                      "singleline-var",
                      "block",
                      "empty",
                      "function",
                      "break",
                      "case",
                      "class",
                      "const",
                      "continue",
                      "debugger",
                      "default",
                      "do",
                      "export",
                      "for",
                      "if",
                      "import",
                      "let",
                      "return",
                      "switch",
                      "throw",
                      "try",
                      "var",
                      "while",
                      "with"
                    ]
                  },
                  {
                    "additionalItems": false,
                    "items": {
                      "enum": [
                        "*",
                        "block-like",
                        "cjs-export",
                        "cjs-import",
                        "directive",
                        "expression",
                        "iife",
                        "multiline-block-like",
                        "multiline-expression",
                        "multiline-const",
                        "multiline-let",
                        "multiline-var",
                        "singleline-const",
                        "singleline-let",
                        "singleline-var",
                        "block",
                        "empty",
                        "function",
                        "break",
                        "case",
                        "class",
                        "const",
                        "continue",
                        "debugger",
                        "default",
                        "do",
                        "export",
                        "for",
                        "if",
                        "import",
                        "let",
                        "return",
                        "switch",
                        "throw",
                        "try",
                        "var",
                        "while",
                        "with"
                      ]
                    },
                    "minItems": 1,
                    "type": "array",
                    "uniqueItems": true
                  }
                ]
              }
            },
            "items": {
              "additionalProperties": false,
              "properties": {
                "blankLine": {
                  "$ref": "#/definitions/paddingType"
                },
                "next": {
                  "$ref": "#/definitions/statementType"
                },
                "prev": {
                  "$ref": "#/definitions/statementType"
                }
              },
              "required": [
                "blankLine",
                "prev",
                "next"
              ],
              "type": "object"
            },
            "type": "array"
          },
          "type": "layout"
        }
      },
      "prefer-arrow-callback": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "require using arrow functions for callbacks",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/prefer-arrow-callback"
          },
          "fixable": "code",
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowNamedFunctions": {
                  "default": false,
                  "type": "boolean"
                },
                "allowUnboundThis": {
                  "default": true,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "prefer-const": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "require `const` declarations for variables that are never reassigned after declared",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/prefer-const"
          },
          "fixable": "code",
          "messages": {
            "useConst": "'{{name}}' is never reassigned. Use 'const' instead."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "destructuring": {
                  "default": "any",
                  "enum": [
                    "any",
                    "all"
                  ]
                },
                "ignoreReadBeforeAssign": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "prefer-destructuring": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "require destructuring from arrays and/or objects",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/prefer-destructuring"
          },
          "fixable": "code",
          "schema": [
            {
              "oneOf": [
                {
                  "additionalProperties": false,
                  "properties": {
                    "AssignmentExpression": {
                      "additionalProperties": false,
                      "properties": {
                        "array": {
                          "type": "boolean"
                        },
                        "object": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    },
                    "VariableDeclarator": {
                      "additionalProperties": false,
                      "properties": {
                        "array": {
                          "type": "boolean"
                        },
                        "object": {
                          "type": "boolean"
                        }
                      },
                      "type": "object"
                    }
                  },
                  "type": "object"
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "array": {
                      "type": "boolean"
                    },
                    "object": {
                      "type": "boolean"
                    }
                  },
                  "type": "object"
                }
              ]
            },
            {
              "additionalProperties": false,
              "properties": {
                "enforceForRenamedProperties": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "prefer-exponentiation-operator": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow the use of `Math.pow` in favor of the `**` operator",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/prefer-exponentiation-operator"
          },
          "fixable": "code",
          "messages": {
            "useExponentiation": "Use the '**' operator instead of 'Math.pow'."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "prefer-named-capture-group": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "enforce using named capture group in regular expression",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/prefer-named-capture-group"
          },
          "messages": {
            "required": "Capture group '{{group}}' should be converted to a named or non-capturing group."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "prefer-numeric-literals": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "disallow `parseInt()` and `Number.parseInt()` in favor of binary, octal, and hexadecimal literals",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/prefer-numeric-literals"
          },
          "fixable": "code",
          "messages": {
            "useLiteral": "Use {{system}} literals instead of {{functionName}}()."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "prefer-object-spread": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "disallow using Object.assign with an object literal as the first argument and prefer the use of object spread instead.",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/prefer-object-spread"
          },
          "fixable": "code",
          "messages": {
            "useLiteralMessage": "Use an object literal instead of `Object.assign`. eg: `{ foo: bar }`.",
            "useSpreadMessage": "Use an object spread instead of `Object.assign` eg: `{ ...foo }`."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "prefer-promise-reject-errors": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "require using Error objects as Promise rejection reasons",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/prefer-promise-reject-errors"
          },
          "fixable": null,
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "allowEmptyReject": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "prefer-reflect": {
        "meta": {
          "deprecated": true,
          "docs": {
            "category": "ECMAScript 6",
            "description": "require `Reflect` methods where applicable",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/prefer-reflect"
          },
          "replacedBy": [],
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "exceptions": {
                  "items": {
                    "enum": [
                      "apply",
                      "call",
                      "delete",
                      "defineProperty",
                      "getOwnPropertyDescriptor",
                      "getPrototypeOf",
                      "setPrototypeOf",
                      "isExtensible",
                      "getOwnPropertyNames",
                      "preventExtensions"
                    ]
                  },
                  "type": "array",
                  "uniqueItems": true
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "prefer-regex-literals": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow use of the `RegExp` constructor in favor of regular expression literals",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/prefer-regex-literals"
          },
          "messages": {
            "unexpectedRegExp": "Use a regular expression literal instead of the 'RegExp' constructor."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "prefer-rest-params": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "require rest parameters instead of `arguments`",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/prefer-rest-params"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "prefer-spread": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "require spread operators instead of `.apply()`",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/prefer-spread"
          },
          "fixable": null,
          "schema": [],
          "type": "suggestion"
        }
      },
      "prefer-template": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "require template literals instead of string concatenation",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/prefer-template"
          },
          "fixable": "code",
          "schema": [],
          "type": "suggestion"
        }
      },
      "quote-props": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "require quotes around object literal property names",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/quote-props"
          },
          "fixable": "code",
          "schema": {
            "anyOf": [
              {
                "items": [
                  {
                    "enum": [
                      "always",
                      "as-needed",
                      "consistent",
                      "consistent-as-needed"
                    ]
                  }
                ],
                "maxItems": 1,
                "minItems": 0,
                "type": "array"
              },
              {
                "items": [
                  {
                    "enum": [
                      "always",
                      "as-needed",
                      "consistent",
                      "consistent-as-needed"
                    ]
                  },
                  {
                    "additionalProperties": false,
                    "properties": {
                      "keywords": {
                        "type": "boolean"
                      },
                      "numbers": {
                        "type": "boolean"
                      },
                      "unnecessary": {
                        "type": "boolean"
                      }
                    },
                    "type": "object"
                  }
                ],
                "maxItems": 2,
                "minItems": 0,
                "type": "array"
              }
            ]
          },
          "type": "suggestion"
        }
      },
      "quotes": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce the consistent use of either backticks, double, or single quotes",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/quotes"
          },
          "fixable": "code",
          "schema": [
            {
              "enum": [
                "single",
                "double",
                "backtick"
              ]
            },
            {
              "anyOf": [
                {
                  "enum": [
                    "avoid-escape"
                  ]
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "allowTemplateLiterals": {
                      "type": "boolean"
                    },
                    "avoidEscape": {
                      "type": "boolean"
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "layout"
        }
      },
      "radix": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "enforce the consistent use of the radix argument when using `parseInt()`",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/radix"
          },
          "schema": [
            {
              "enum": [
                "always",
                "as-needed"
              ]
            }
          ],
          "type": "suggestion"
        }
      },
      "require-atomic-updates": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "disallow assignments that can lead to race conditions due to usage of `await` or `yield`",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/require-atomic-updates"
          },
          "fixable": null,
          "messages": {
            "nonAtomicUpdate": "Possible race condition: `{{value}}` might be reassigned based on an outdated value of `{{value}}`."
          },
          "schema": [],
          "type": "problem"
        }
      },
      "require-await": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "disallow async functions which have no `await` expression",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/require-await"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "require-jsdoc": {
        "meta": {
          "deprecated": true,
          "docs": {
            "category": "Stylistic Issues",
            "description": "require JSDoc comments",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/require-jsdoc"
          },
          "replacedBy": [],
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "require": {
                  "additionalProperties": false,
                  "default": {},
                  "properties": {
                    "ArrowFunctionExpression": {
                      "default": false,
                      "type": "boolean"
                    },
                    "ClassDeclaration": {
                      "default": false,
                      "type": "boolean"
                    },
                    "FunctionDeclaration": {
                      "default": true,
                      "type": "boolean"
                    },
                    "FunctionExpression": {
                      "default": false,
                      "type": "boolean"
                    },
                    "MethodDefinition": {
                      "default": false,
                      "type": "boolean"
                    }
                  },
                  "type": "object"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "require-unicode-regexp": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "enforce the use of `u` flag on RegExp",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/require-unicode-regexp"
          },
          "messages": {
            "requireUFlag": "Use the 'u' flag."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "require-yield": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "require generator functions to contain `yield`",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/require-yield"
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "rest-spread-spacing": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "enforce spacing between rest and spread operators and their expressions",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/rest-spread-spacing"
          },
          "fixable": "whitespace",
          "schema": [
            {
              "enum": [
                "always",
                "never"
              ]
            }
          ],
          "type": "layout"
        }
      },
      "semi": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "require or disallow semicolons instead of ASI",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/semi"
          },
          "fixable": "code",
          "schema": {
            "anyOf": [
              {
                "items": [
                  {
                    "enum": [
                      "never"
                    ]
                  },
                  {
                    "additionalProperties": false,
                    "properties": {
                      "beforeStatementContinuationChars": {
                        "enum": [
                          "always",
                          "any",
                          "never"
                        ]
                      }
                    },
                    "type": "object"
                  }
                ],
                "maxItems": 2,
                "minItems": 0,
                "type": "array"
              },
              {
                "items": [
                  {
                    "enum": [
                      "always"
                    ]
                  },
                  {
                    "additionalProperties": false,
                    "properties": {
                      "omitLastInOneLineBlock": {
                        "type": "boolean"
                      }
                    },
                    "type": "object"
                  }
                ],
                "maxItems": 2,
                "minItems": 0,
                "type": "array"
              }
            ]
          },
          "type": "layout"
        }
      },
      "semi-spacing": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce consistent spacing before and after semicolons",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/semi-spacing"
          },
          "fixable": "whitespace",
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "after": {
                  "default": true,
                  "type": "boolean"
                },
                "before": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "semi-style": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce location of semicolons",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/semi-style"
          },
          "fixable": "whitespace",
          "schema": [
            {
              "enum": [
                "last",
                "first"
              ]
            }
          ],
          "type": "layout"
        }
      },
      "sort-imports": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "enforce sorted import declarations within modules",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/sort-imports"
          },
          "fixable": "code",
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "ignoreCase": {
                  "default": false,
                  "type": "boolean"
                },
                "ignoreDeclarationSort": {
                  "default": false,
                  "type": "boolean"
                },
                "ignoreMemberSort": {
                  "default": false,
                  "type": "boolean"
                },
                "memberSyntaxSortOrder": {
                  "items": {
                    "enum": [
                      "none",
                      "all",
                      "multiple",
                      "single"
                    ]
                  },
                  "maxItems": 4,
                  "minItems": 4,
                  "type": "array",
                  "uniqueItems": true
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "sort-keys": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "require object keys to be sorted",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/sort-keys"
          },
          "schema": [
            {
              "enum": [
                "asc",
                "desc"
              ]
            },
            {
              "additionalProperties": false,
              "properties": {
                "caseSensitive": {
                  "default": true,
                  "type": "boolean"
                },
                "minKeys": {
                  "default": 2,
                  "minimum": 2,
                  "type": "integer"
                },
                "natural": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "sort-vars": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "require variables within the same declaration block to be sorted",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/sort-vars"
          },
          "fixable": "code",
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "ignoreCase": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "space-before-blocks": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce consistent spacing before blocks",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/space-before-blocks"
          },
          "fixable": "whitespace",
          "schema": [
            {
              "oneOf": [
                {
                  "enum": [
                    "always",
                    "never"
                  ]
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "classes": {
                      "enum": [
                        "always",
                        "never",
                        "off"
                      ]
                    },
                    "functions": {
                      "enum": [
                        "always",
                        "never",
                        "off"
                      ]
                    },
                    "keywords": {
                      "enum": [
                        "always",
                        "never",
                        "off"
                      ]
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "layout"
        }
      },
      "space-before-function-paren": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce consistent spacing before `function` definition opening parenthesis",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/space-before-function-paren"
          },
          "fixable": "whitespace",
          "schema": [
            {
              "oneOf": [
                {
                  "enum": [
                    "always",
                    "never"
                  ]
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "anonymous": {
                      "enum": [
                        "always",
                        "never",
                        "ignore"
                      ]
                    },
                    "asyncArrow": {
                      "enum": [
                        "always",
                        "never",
                        "ignore"
                      ]
                    },
                    "named": {
                      "enum": [
                        "always",
                        "never",
                        "ignore"
                      ]
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "layout"
        }
      },
      "space-in-parens": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce consistent spacing inside parentheses",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/space-in-parens"
          },
          "fixable": "whitespace",
          "messages": {
            "missingClosingSpace": "There must be a space before this paren.",
            "missingOpeningSpace": "There must be a space after this paren.",
            "rejectedClosingSpace": "There should be no space before this paren.",
            "rejectedOpeningSpace": "There should be no space after this paren."
          },
          "schema": [
            {
              "enum": [
                "always",
                "never"
              ]
            },
            {
              "additionalProperties": false,
              "properties": {
                "exceptions": {
                  "items": {
                    "enum": [
                      "{}",
                      "[]",
                      "()",
                      "empty"
                    ]
                  },
                  "type": "array",
                  "uniqueItems": true
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "space-infix-ops": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "require spacing around infix operators",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/space-infix-ops"
          },
          "fixable": "whitespace",
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "int32Hint": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "space-unary-ops": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce consistent spacing before or after unary operators",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/space-unary-ops"
          },
          "fixable": "whitespace",
          "messages": {
            "beforeUnaryExpressions": "Space is required before unary expressions '{{token}}'.",
            "operator": "Unary operator '{{operator}}' must be followed by whitespace.",
            "unexpectedAfter": "Unexpected space after unary operator '{{operator}}'.",
            "unexpectedAfterWord": "Unexpected space after unary word operator '{{word}}'.",
            "unexpectedBefore": "Unexpected space before unary operator '{{operator}}'.",
            "wordOperator": "Unary word operator '{{word}}' must be followed by whitespace."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "nonwords": {
                  "default": false,
                  "type": "boolean"
                },
                "overrides": {
                  "additionalProperties": {
                    "type": "boolean"
                  },
                  "type": "object"
                },
                "words": {
                  "default": true,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "spaced-comment": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce consistent spacing after the `//` or `/*` in a comment",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/spaced-comment"
          },
          "fixable": "whitespace",
          "schema": [
            {
              "enum": [
                "always",
                "never"
              ]
            },
            {
              "additionalProperties": false,
              "properties": {
                "block": {
                  "additionalProperties": false,
                  "properties": {
                    "balanced": {
                      "default": false,
                      "type": "boolean"
                    },
                    "exceptions": {
                      "items": {
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "markers": {
                      "items": {
                        "type": "string"
                      },
                      "type": "array"
                    }
                  },
                  "type": "object"
                },
                "exceptions": {
                  "items": {
                    "type": "string"
                  },
                  "type": "array"
                },
                "line": {
                  "additionalProperties": false,
                  "properties": {
                    "exceptions": {
                      "items": {
                        "type": "string"
                      },
                      "type": "array"
                    },
                    "markers": {
                      "items": {
                        "type": "string"
                      },
                      "type": "array"
                    }
                  },
                  "type": "object"
                },
                "markers": {
                  "items": {
                    "type": "string"
                  },
                  "type": "array"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "strict": {
        "meta": {
          "docs": {
            "category": "Strict Mode",
            "description": "require or disallow strict mode directives",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/strict"
          },
          "fixable": "code",
          "messages": {
            "function": "Use the function form of 'use strict'.",
            "global": "Use the global form of 'use strict'.",
            "implied": "'use strict' is unnecessary when implied strict mode is enabled.",
            "module": "'use strict' is unnecessary inside of modules.",
            "multiple": "Multiple 'use strict' directives.",
            "never": "Strict mode is not permitted.",
            "nonSimpleParameterList": "'use strict' directive inside a function with non-simple parameter list throws a syntax error since ES2016.",
            "unnecessary": "Unnecessary 'use strict' directive.",
            "unnecessaryInClasses": "'use strict' is unnecessary inside of classes.",
            "wrap": "Wrap {{name}} in a function with 'use strict' directive."
          },
          "schema": [
            {
              "enum": [
                "never",
                "global",
                "function",
                "safe"
              ]
            }
          ],
          "type": "suggestion"
        }
      },
      "switch-colon-spacing": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "enforce spacing around colons of switch statements",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/switch-colon-spacing"
          },
          "fixable": "whitespace",
          "messages": {
            "expectedAfter": "Expected space(s) after this colon.",
            "expectedBefore": "Expected space(s) before this colon.",
            "unexpectedAfter": "Unexpected space(s) after this colon.",
            "unexpectedBefore": "Unexpected space(s) before this colon."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "after": {
                  "default": true,
                  "type": "boolean"
                },
                "before": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "symbol-description": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "require symbol descriptions",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/symbol-description"
          },
          "fixable": null,
          "messages": {
            "expected": "Expected Symbol to have a description."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "template-curly-spacing": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "require or disallow spacing around embedded expressions of template strings",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/template-curly-spacing"
          },
          "fixable": "whitespace",
          "messages": {
            "expectedAfter": "Expected space(s) after '${'.",
            "expectedBefore": "Expected space(s) before '}'.",
            "unexpectedAfter": "Unexpected space(s) after '${'.",
            "unexpectedBefore": "Unexpected space(s) before '}'."
          },
          "schema": [
            {
              "enum": [
                "always",
                "never"
              ]
            }
          ],
          "type": "layout"
        }
      },
      "template-tag-spacing": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "require or disallow spacing between template tags and their literals",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/template-tag-spacing"
          },
          "fixable": "whitespace",
          "messages": {
            "missing": "Missing space between template tag and template literal.",
            "unexpected": "Unexpected space between template tag and template literal."
          },
          "schema": [
            {
              "enum": [
                "always",
                "never"
              ]
            }
          ],
          "type": "layout"
        }
      },
      "unicode-bom": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "require or disallow Unicode byte order mark (BOM)",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/unicode-bom"
          },
          "fixable": "whitespace",
          "messages": {
            "expected": "Expected Unicode BOM (Byte Order Mark).",
            "unexpected": "Unexpected Unicode BOM (Byte Order Mark)."
          },
          "schema": [
            {
              "enum": [
                "always",
                "never"
              ]
            }
          ],
          "type": "layout"
        }
      },
      "use-isnan": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "require calls to `isNaN()` when checking for `NaN`",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/use-isnan"
          },
          "messages": {
            "caseNaN": "'case NaN' can never match. Use Number.isNaN before the switch.",
            "comparisonWithNaN": "Use the isNaN function to compare with NaN.",
            "indexOfNaN": "Array prototype method '{{ methodName }}' cannot find NaN.",
            "switchNaN": "'switch(NaN)' can never match a case clause. Use Number.isNaN instead of the switch."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "enforceForIndexOf": {
                  "default": false,
                  "type": "boolean"
                },
                "enforceForSwitchCase": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "problem"
        }
      },
      "valid-jsdoc": {
        "meta": {
          "deprecated": true,
          "docs": {
            "category": "Possible Errors",
            "description": "enforce valid JSDoc comments",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/valid-jsdoc"
          },
          "fixable": "code",
          "messages": {
            "duplicateParam": "Duplicate JSDoc parameter '{{name}}'.",
            "expected": "Expected JSDoc for '{{name}}' but found '{{jsdocName}}'.",
            "missingBrace": "JSDoc type missing brace.",
            "missingParam": "Missing JSDoc for parameter '{{name}}'.",
            "missingParamDesc": "Missing JSDoc parameter description for '{{name}}'.",
            "missingParamType": "Missing JSDoc parameter type for '{{name}}'.",
            "missingReturn": "Missing JSDoc @{{returns}} for function.",
            "missingReturnDesc": "Missing JSDoc return description.",
            "missingReturnType": "Missing JSDoc return type.",
            "syntaxError": "JSDoc syntax error.",
            "unexpectedTag": "Unexpected @{{title}} tag; function has no return statement.",
            "unsatisfiedDesc": "JSDoc description does not satisfy the regex pattern.",
            "use": "Use @{{name}} instead.",
            "useType": "Use '{{expectedTypeName}}' instead of '{{currentTypeName}}'."
          },
          "replacedBy": [],
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "matchDescription": {
                  "type": "string"
                },
                "prefer": {
                  "additionalProperties": {
                    "type": "string"
                  },
                  "type": "object"
                },
                "preferType": {
                  "additionalProperties": {
                    "type": "string"
                  },
                  "type": "object"
                },
                "requireParamDescription": {
                  "default": true,
                  "type": "boolean"
                },
                "requireParamType": {
                  "default": true,
                  "type": "boolean"
                },
                "requireReturn": {
                  "default": true,
                  "type": "boolean"
                },
                "requireReturnDescription": {
                  "default": true,
                  "type": "boolean"
                },
                "requireReturnType": {
                  "default": true,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      },
      "valid-typeof": {
        "meta": {
          "docs": {
            "category": "Possible Errors",
            "description": "enforce comparing `typeof` expressions against valid strings",
            "recommended": true,
            "url": "https://eslint.org/docs/rules/valid-typeof"
          },
          "messages": {
            "invalidValue": "Invalid typeof comparison value.",
            "notString": "Typeof comparisons should be to string literals."
          },
          "schema": [
            {
              "additionalProperties": false,
              "properties": {
                "requireStringLiterals": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "problem"
        }
      },
      "vars-on-top": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "require `var` declarations be placed at the top of their containing scope",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/vars-on-top"
          },
          "messages": {
            "top": "All 'var' declarations must be at the top of the function scope."
          },
          "schema": [],
          "type": "suggestion"
        }
      },
      "wrap-iife": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "require parentheses around immediate `function` invocations",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/wrap-iife"
          },
          "fixable": "code",
          "messages": {
            "moveInvocation": "Move the invocation into the parens that contain the function.",
            "wrapExpression": "Wrap only the function expression in parens.",
            "wrapInvocation": "Wrap an immediate function invocation in parentheses."
          },
          "schema": [
            {
              "enum": [
                "outside",
                "inside",
                "any"
              ]
            },
            {
              "additionalProperties": false,
              "properties": {
                "functionPrototypeMethods": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "layout"
        }
      },
      "wrap-regex": {
        "meta": {
          "docs": {
            "category": "Stylistic Issues",
            "description": "require parenthesis around regex literals",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/wrap-regex"
          },
          "fixable": "code",
          "messages": {
            "requireParens": "Wrap the regexp literal in parens to disambiguate the slash."
          },
          "schema": [],
          "type": "layout"
        }
      },
      "yield-star-spacing": {
        "meta": {
          "docs": {
            "category": "ECMAScript 6",
            "description": "require or disallow spacing around the `*` in `yield*` expressions",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/yield-star-spacing"
          },
          "fixable": "whitespace",
          "messages": {
            "missingAfter": "Missing space after *.",
            "missingBefore": "Missing space before *.",
            "unexpectedAfter": "Unexpected space after *.",
            "unexpectedBefore": "Unexpected space before *."
          },
          "schema": [
            {
              "oneOf": [
                {
                  "enum": [
                    "before",
                    "after",
                    "both",
                    "neither"
                  ]
                },
                {
                  "additionalProperties": false,
                  "properties": {
                    "after": {
                      "type": "boolean"
                    },
                    "before": {
                      "type": "boolean"
                    }
                  },
                  "type": "object"
                }
              ]
            }
          ],
          "type": "layout"
        }
      },
      "yoda": {
        "meta": {
          "docs": {
            "category": "Best Practices",
            "description": "require or disallow \"Yoda\" conditions",
            "recommended": false,
            "url": "https://eslint.org/docs/rules/yoda"
          },
          "fixable": "code",
          "messages": {
            "expected": "Expected literal to be on the {{expectedSide}} side of {{operator}}."
          },
          "schema": [
            {
              "enum": [
                "always",
                "never"
              ]
            },
            {
              "additionalProperties": false,
              "properties": {
                "exceptRange": {
                  "default": false,
                  "type": "boolean"
                },
                "onlyEquality": {
                  "default": false,
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          ],
          "type": "suggestion"
        }
      }
    }
  },
  "version": "6.8.0"
}

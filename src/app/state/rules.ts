import { DataAction } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { Utils } from '../services/utils';

// NOTE: rules content is provided statically in index.html
declare const eslintRules: RulesStateModel;

export interface GUIElement {
  default?: any;
  elements?: GUIElement[];
  max?: number;
  min?: number;
  name?: string;
  options?: string[];
  step?: number;
  subType?: 'boolean' | 'number' | 'string';
  type: 'checkbox' |
        'key-value' | 
        'multiselect' | 
        'number-array'  |
        'number-input'  |
        'object' |
        'select-array' |
        'singleselect' | 
        'string-array' | 
        'string-input';
  uniqueItems?: boolean;
}

export type Level = 'error' | 'warn' | 'off';

export interface Lintel {
  inherits: Record<string, Record<string, 'truthy' | 'falsy'>>;
  version: string;
}

export interface Rule {
  meta: {
    deprecated: boolean;
    docs: {
      category: string;
      description: string;
      extendsBasicRule?: boolean;
      recommended: Level | boolean;
      requiresTypeChecking?: boolean;
      url: string;
    };
    replacedBy: string[];
    schema: Schema;
    type: 'problem' | 'suggestion' | 'layout';
  };
}

export interface Rules {
  lintel: Lintel;
  rules: Record<string, Rule>;
}

export type RulesStateModel = Record<string, Rules>;

// NOTE: schema can be any of the following:
// - scheme                    <--- eg: id-blacklist, consistent-this
// - scheme[]                  <--- most common
// - { anyOf: scheme[] }
// - { oneOf: scheme[] }
// - { items: { anyOf: scheme[] } }
// - { items: { oneOf: scheme[] } }
// - { definitions: { ... }, items: scheme[] }     <--- eg: func-names

export type Schema = Scheme[] | SchemaWithDiscriminants | SchemaWith$refs | Scheme;

export interface SchemaDigest {
  canGUI?: boolean;
  elements?: GUIElement[];
}

export interface SchemaWithDiscriminants {
  anyOf?: Scheme[];
  items?: SchemaWithDiscriminants;
  oneOf?: Scheme[];
}

export interface SchemaWith$refs {
  definitions: Record<string, any>;
  // @see padding-line-between-statements for oddball case
  items: Scheme[] | Scheme;
}

export type Scheme = Record<string, any>;

@Injectable({ providedIn: 'root' })
@StateRepository()
@State<RulesStateModel>({
  name: 'rules',
  defaults: { }
}) 

export class RulesState extends NgxsDataRepository<RulesStateModel> {

  /** ctor */
  constructor(private utils: Utils) {
    super();
  }

  // actions

  @DataAction({ insideZone: true }) 
  initialize(): void {
    this.ctx.setState(this.prepare(eslintRules));
  }

  // public methods

  makeSchemaDigest(ruleName: string, rule: Rule): SchemaDigest {
    const digest: SchemaDigest = { 
      canGUI: false,
      elements: []
    };
    if (rule?.meta?.schema) {
      // TODO: currently ignoring anything with anyOf or oneOf
      // so we don't worry ATM about SchemaWithDiscriminants
      const schema = rule.meta.schema as SchemaWith$refs;
      let schemes = rule.meta.schema as Scheme[];
      if (!Array.isArray(schemes)) {
        if (schema.definitions && schema.items)
          schemes = Array.isArray(schema.items) ? schema.items : [schema.items];
        // NOTE: worried as this is the hardest to tell
        // @see id-blacklist, consistent-this
        else schemes = [schemes];
      }
      // now that schemes are normalized, analyze each one
      digest.elements = schemes
        .map(scheme => this.makeSchemaDigestElement(scheme))
        .filter(element => !!element); 
      // only good if ALL elements can be represented
      digest.canGUI = (digest.elements.length === schemes.length);
    }
    return digest;
  }

  makeSchemaDigestElement(scheme: any, name = null): GUIElement {
    const element =
      this.makeCheckbox(scheme) ||
      this.makeKeyValue(scheme) ||
      this.makeMultiselect(scheme) ||
      this.makeNumberArray(scheme) ||
      this.makeNumberInput(scheme) ||
      this.makeSelectArray(scheme) ||
      this.makeSingleselect(scheme) ||
      this.makeStringArray(scheme) ||
      this.makeStringInput(scheme) ||
      // NOTE Object is last because its definition is the most expansive
      this.makeObject(scheme);
    if (element) {
      element.default = scheme.default;
      element.name = name;
    }
    return element;
  }

  // private methods

  private makeCheckbox(scheme: any): GUIElement {
    if (scheme.type === 'boolean') {
      return {
        type: 'checkbox'
      };
    } else return null;
  }

  private makeKeyValue(scheme: any): GUIElement {
    if ((scheme.type === 'object') 
      && (scheme.additionalProperties || scheme.patternProperties)) {
      // TODO: hack for no-multi-spaces
      const rawType = scheme.additionalProperties?.type ?? 'boolean';
      let subType = rawType;
      if (rawType === 'boolean')
        subType = 'checkbox';
      else if (rawType === 'string')
        subType = 'text';
      return {
        subType: subType,
        type: 'key-value'
      };
    } else return null;
  }

  private makeMultiselect(scheme: any): GUIElement {
    if ((scheme.type === 'object') && scheme.properties
      && (Object.keys(scheme.properties).length > 1)
      && Object.values(scheme.properties).every((value: any) => value.type === 'boolean')) {
      return {
        options: Object.keys(scheme.properties),
        type: 'multiselect'
      };
    } else return null;
  }

  private makeNumberArray(scheme: any): GUIElement {
    if ((scheme.type === 'array')
      && (['integer', 'number'].includes(scheme.items?.type) 
      || ['integer', 'number'].includes(scheme.items?.[0]?.type))) {
      return {
        type: 'number-array',
        uniqueItems: !!scheme.uniqueItems
      };
    } else return null;
  }

  private makeNumberInput(scheme: any): GUIElement {
    if (['integer', 'number'].includes(scheme.type)) {
      return {
        max: scheme.maximum,
        min: scheme.minimum,
        type: 'number-input'
      };
    } else return null;
  }

  private makeObject(scheme: any): GUIElement {
    // NOTE: type: "object" can be assumed
    // @see nonblock-statement-body-position
    if (/* (scheme.type === 'object') && */ scheme.properties) {
      const entries = Object.entries(scheme.properties);
      const element: GUIElement = {
        elements: entries
          .map(([name, property]) => this.makeSchemaDigestElement(property, name))
          .filter(element => !!element),
        type: 'object'
      };
      // only good if ALL elements can be represented
      return (element.elements.length === entries.length) ? element : null;
    } else return null;
  }

  private makeSelectArray(scheme: any): GUIElement {
    if ((scheme.type === 'array') && scheme.items?.enum) {
      return {
        options: scheme.items.enum,
        type: 'select-array',
        uniqueItems: !!scheme.uniqueItems
      };
    } else return null;
  }

  private makeSingleselect(scheme: any): GUIElement {
    if (scheme.enum) {
      return {
        options: scheme.enum,
        type: 'singleselect'
      };
    } else return null;
  }

  private makeStringArray(scheme: any): GUIElement {
    if ((scheme.type === 'array') 
      && ((scheme.items?.type === 'string') || (scheme.items?.[0]?.type === 'string'))) {
      return {
        type: 'string-array',
        uniqueItems: !!scheme.uniqueItems
      };
    } else return null;
  }

  private makeStringInput(scheme: any): GUIElement {
    if (scheme.type === 'string') {
      return {
        type: 'string-input'
      };
    } else return null;
  }

  private normalizeDescriptions(model: RulesStateModel): void {
    this.utils.deepSearch(model, 'description', (container, description: string) => {
      let tweaked = description.substring(0, 1).toUpperCase() + description.substring(1);
      if (!tweaked.endsWith('.'))
        tweaked += '.';
      container.description = tweaked;
    });
  }

  private prepare(eslintRules: RulesStateModel): RulesStateModel {
    const model = this.utils.deepCopy(eslintRules);
    // NOTE: each rule has its own schema
    Object.entries(model)
      .forEach(([_, rules]: [string, Rules]) => {
        Object.entries(rules.rules)
          // NOTE: take care of obvious data noise case
          .map(([_, rule]: [string, Rule]) => {
            if (this.utils.isEmptyObject(rule.meta.schema))
              rule.meta.schema = [];
            return rule;
          })
          .map(rule => rule.meta.schema)
          .filter((schema: SchemaWith$refs) => schema.definitions)
          .forEach((schema: SchemaWith$refs) => {
            // resolve $ref with definitions within rule schema
            this.utils.deepSearch(schema, '$ref', (container, value: string) => {
              const path = value.replace(/#/g, 'schema').replace(/\//g, '.');
              const resolved = eval(path);
              delete container['$ref'];
              Object.assign(container, resolved);
            });
          });
      });
    // NOTE: while we're at it, more cleanup tasks
    this.normalizeDescriptions(model);
    return model;

  }

}

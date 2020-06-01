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
  type: 'checkbox' |
        'multiselect' | 
        'number-input'  |
        'object' |
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
    schema: any;
    type: 'problem' | 'suggestion' | 'layout';
  };
}

export interface Rules {
  lintel: Lintel;
  rules: Record<string, Rule>;
}

export type RulesStateModel = Record<string, Rules>;

export interface SchemaDigest {
  canGUI?: boolean;
  elements?: GUIElement[];
}

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
    if (rule?.meta?.schema /* TODO */ && ruleName !== 'keyword-spacing') {
      // try to construct a GUI for each element in the schema
      digest.elements = rule.meta.schema
        .map(scheme => this.makeSchemaDigestElement(scheme))
        .filter(element => !!element); 
      // only good if ALL elements can be represented
      digest.canGUI = (digest.elements.length === rule.meta.schema.length);
    }
    return digest;
  }

  makeSchemaDigestElement(scheme: any, name = null): GUIElement {
    const element =
      // NOTE: multiselect MUST come before object
      this.makeCheckbox(scheme) ||
      this.makeMultiselect(scheme) ||
      this.makeNumberInput(scheme) ||
      this.makeObject(scheme) ||
      this.makeSingleselect(scheme) ||
      this.makeStringArray(scheme) ||
      this.makeStringInput(scheme); 
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

  private makeNumberInput(scheme: any): GUIElement {
    if (scheme.type === 'integer') {
      return {
        max: scheme.maximum,
        min: scheme.minimum,
        type: 'number-input'
      };
    } else return null;
  }

  private makeObject(scheme: any): GUIElement {
    if ((scheme.type === 'object') && scheme.properties) {
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

  private normalizeRule(rule: Rule): any {
    if (this.utils.isObjectEmpty(rule.meta.schema))
      rule.meta.schema = [];
    if (!Array.isArray(rule.meta.schema))
      rule.meta.schema = [rule.meta.schema];
    return rule.meta.schema;
  }

  private prepare(eslintRules: RulesStateModel): RulesStateModel {
    const model = this.utils.deepCopy(eslintRules);
    // NOTE: each rule has its own schema
    Object.entries(model)
      .forEach(([_, rules]: [string, Rules]) => {
        Object.entries(rules.rules)
          .map(([_, rule]: [string, Rule]) => rule)
          .map(rule => this.normalizeRule(rule))
          .filter(schema => schema.definitions)
          .forEach(schema => {
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

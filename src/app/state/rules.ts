import { DataAction } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { Utils } from '../services/utils';

// NOTE: rules content is provided statically in index.html
declare const eslintRules: RulesStateModel;

export interface GUIElement {
  options?: string[];
  type: 'multiselect' | 'singleselect' | 'string-array' | 'string-input';
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
    this.ctx.setState(this.resolve$refs(eslintRules));
  }

  // public methods

  makeSchemaDigest(rule: Rule): SchemaDigest {
    const digest: SchemaDigest = { 
      canGUI: false,
      elements: []
    };
    let schema = rule?.meta?.schema;
    // NOTE: sometimes the schema is an object, but most often an array
    if (schema && !Array.isArray(schema))
      schema = [schema];
    // try to construct a GUI for each element in the schema
    schema.forEach(scheme => {
      const element = 
        this.makeMultiselect(scheme) ||
        this.makeSingleselect(scheme) || 
        this.makeStringArray(scheme) || 
        this.makeStringInput(scheme); 
      if (element)
        digest.elements.push(element);
    });
    // only good if ALL elements can be represented
    digest.canGUI = (digest.elements.length === schema.length);
    return digest;
  }

  // private methods

  private makeMultiselect(scheme: any): GUIElement {
    if ((scheme.type === 'object')
      && Object.values(scheme.properties).every((value: any) => value.type === 'boolean')) {
      return {
        options: Object.keys(scheme.properties),
        type: 'multiselect'
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
    if ((scheme.type === 'array') && (scheme.items?.type === 'string')) {
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

  private resolve$refs(eslintRules: RulesStateModel): RulesStateModel {
    const model = this.utils.deepCopy(eslintRules);
    // NOTE: each rule has its own schema
    Object.entries(model)
      .forEach(([_, rules]: [string, Rules]) => {
        Object.entries(rules.rules)
          .map(([_, rule]: [string, Rule]) => rule.meta.schema)
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
    // NOTE: while we're at it, descriptions can be sloppy
    this.utils.deepSearch(model, 'description', (container, description: string) => {
      let tweaked = description.substring(0, 1).toUpperCase() + description.substring(1);
      if (!tweaked.endsWith('.'))
        tweaked += '.';
      container.description = tweaked;
    });
    return model;

  }

}

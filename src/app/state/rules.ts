import { DataAction } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { Utils } from '../services/utils';

// NOTE: rules content is provided statically in index.html
declare const eslintRules: RulesStateModel;

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

export interface GUIElement {
  options?: string[];
  type: 'multiselect' | 'singleselect';
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
    if (Array.isArray(rule?.meta?.schema)) {
      rule.meta.schema
        .forEach(scheme => {
          const element = this.makeSingleselect(scheme) || this.makeMultiselect(scheme);
          if (element)
            digest.elements.push(element);
        });
      digest.canGUI = (digest.elements.length === rule.meta.schema.length);
    }
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

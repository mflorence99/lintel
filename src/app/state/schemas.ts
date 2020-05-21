import { DataAction } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';

// NOTE: schema content is provided statically in index.html
declare const eslintSchema: SchemasStateModel;

export type Level = 'error' | 'warn' | 'off';

export interface Lintel {
  inherits: Record<string, Record<string, 'truthy' | 'falsey'>>;
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
    schema: RuleOption | RuleOption[] | RuleOptions;
    type: 'problem' | 'suggestion' | 'layout';
  };
}

export type RuleOption = RuleOptionEnum | RuleOptionItems | RuleOptionObject;

export interface RuleOptionEnum {
  enum: string[];
}

export interface RuleOptionItems {
  // TODO: more analysis
}

export interface RuleOptionObject {
  // TODO: more analysis
}

export interface RuleOptions {
  anyOf?: RuleOption[];
  oneOf?: RuleOption[];
}

export interface Schema {
  lintel: Lintel;
  rules: Record<string, Rule>;
}

export type SchemasStateModel = Record<string, Schema>;

@Injectable({ providedIn: 'root' })
@StateRepository()
@State<SchemasStateModel>({
  name: 'schemas',
  defaults: { }
}) 

export class SchemasState extends NgxsDataRepository<SchemasStateModel> {

  // actions

  @DataAction({ insideZone: true }) 
  initialize(): void {
    this.ctx.setState(eslintSchema);
  }

}

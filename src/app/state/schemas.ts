import { DataAction } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';

// NOTE: schema content is provided statically in index.html
declare const eslintSchema: SchemasStateModel;

export interface Rule {
  meta: {
    deprecated: boolean;
    docs: {
      category: string;
      description: string;
      extendsBasicRule: boolean;
      recommended: 'error' | 'warn' | 'off' | boolean;
      requiresTypeChecking: boolean;
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
  rules: Record<string, Rule>;
  version: string;
}

export type SchemasStateModel = Record<string, Schema>;

@Injectable({ providedIn: 'root' })
@StateRepository()
@State<SchemasStateModel>({
  name: 'schemas',
  defaults: { }
}) 

export class SchemasState extends NgxsImmutableDataRepository<SchemasStateModel> {

  @DataAction({ insideZone: true }) 
  initialize(): void {
    this.ctx.setState(eslintSchema);
  }

}

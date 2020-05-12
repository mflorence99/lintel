import { Computed } from '@ngxs-labs/data/decorators';
import { DataAction } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { SelectionState } from './selection';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';

// NOTE: schema content is provided statically in index.html
declare const eslintSchema: SchemasStateModel;

export type CategoryView = Record<string, Record<string, Rule>>;

export interface Rule {
  meta: {
    deprecated: boolean;
    docs: {
      category: string;
      descripotion: string;
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

  constructor(private selection: SelectionState) {
    super();
  }

  @DataAction() initialize(): void {
    this.ctx.setState(eslintSchema);
  }

  @Computed() get categories(): string[] {
    return Object.keys(this.categoryView)
      .sort();
  }

  @Computed() get categoryView(): CategoryView {
    const rules = this.snapshot[this.selection.pluginName]?.rules || { };
    return Object.keys(rules)
      .reduce((acc, ruleName) => {
        const category = rules[ruleName].meta?.docs?.category || 'Unknown';
        if (!acc[category])
          acc[category] = {};
        acc[category][ruleName] = rules[ruleName];
        return acc;
      }, { });
  }

}

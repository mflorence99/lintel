import { ConfigsState } from './configs';
import { ConfigsStateModel } from './configs';
import { FilterState } from './filter';
import { FilterStateModel } from './filter';
import { RulesState } from './rules';
import { RulesStateModel } from './rules';
import { SchemaState } from './schema';
import { SchemaStateModel } from './schema';
import { SelectionState } from './selection';
import { SelectionStateModel } from './selection';

export interface AppState {
  configs: ConfigsStateModel;
  filter: FilterStateModel;
  rules: RulesStateModel;
  schema: SchemaStateModel;
  selection: SelectionStateModel;
}

export const states = [
  ConfigsState,
  FilterState,
  RulesState,
  SchemaState,
  SelectionState
];

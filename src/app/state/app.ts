import { ConfigsState } from './configs';
import { ConfigsStateModel } from './configs';
import { FilesState } from './files';
import { FilesStateModel } from './files';
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
  files: FilesStateModel;
  filter: FilterStateModel;
  rules: RulesStateModel;
  schema: SchemaStateModel;
  selection: SelectionStateModel;
}

export const states = [
  ConfigsState,
  FilesState,
  FilterState,
  RulesState,
  SchemaState,
  SelectionState
];

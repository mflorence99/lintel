import { ConfigsState } from './configs';
import { ConfigsStateModel } from './configs';
import { ExtensionsState } from './extensions';
import { ExtensionsStateModel } from './extensions';
import { FilesState } from './files';
import { FilesStateModel } from './files';
import { FilterState } from './filter';
import { FilterStateModel } from './filter';
import { LintelState } from './lintel';
import { LintelStateModel } from './lintel';
import { RulesState } from './rules';
import { RulesStateModel } from './rules';
import { SchemaState } from './schema';
import { SchemaStateModel } from './schema';
import { SelectionState } from './selection';
import { SelectionStateModel } from './selection';

export interface AppState {
  configs: ConfigsStateModel;
  extensions: ExtensionsStateModel;
  files: FilesStateModel;
  filter: FilterStateModel;
  lintel: LintelStateModel;
  rules: RulesStateModel;
  schema: SchemaStateModel;
  selection: SelectionStateModel;
}

export const states = [
  ConfigsState,
  ExtensionsState,
  FilesState,
  FilterState,
  LintelState,
  RulesState,
  SchemaState,
  SelectionState
];

import { ConfigsState } from './configs';
import { ConfigsStateModel } from './configs';
import { FilterState } from './filter';
import { FilterStateModel } from './filter';
import { SchemasState } from './schemas';
import { SchemasStateModel } from './schemas';
import { SelectionState } from './selection';
import { SelectionStateModel } from './selection';

export interface AppState {
  configs: ConfigsStateModel;
  filter: FilterStateModel;
  schemas: SchemasStateModel;
  selection: SelectionStateModel;
}

export const states = [
  ConfigsState,
  FilterState,
  SchemasState,
  SelectionState
];

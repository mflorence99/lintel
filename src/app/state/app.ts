import { ConfigsState } from './configs';
import { ConfigsStateModel } from './configs';
import { SchemasState } from './schemas';
import { SchemasStateModel } from './schemas';
import { SelectionState } from './selection';
import { SelectionStateModel } from './selection';

export interface AppState {
  configs: ConfigsStateModel;
  schemas: SchemasStateModel;
  selection: SelectionStateModel;
}

export const states = [
  ConfigsState,
  SchemasState,
  SelectionState
];

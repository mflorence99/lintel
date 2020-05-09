import { ConfigsState } from './configs';
import { ConfigsStateModel } from './configs';
import { SchemasState } from './schemas';
import { SchemasStateModel } from './schemas';

export interface AppState {
  configs: ConfigsStateModel;
  schemas: SchemasStateModel;
}

export const states = [
  ConfigsState,
  SchemasState
];

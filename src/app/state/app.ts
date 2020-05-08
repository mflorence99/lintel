import { SchemasState } from './schemas';
import { SchemasStateModel } from './schemas';

export interface AppState {
  schemas: SchemasStateModel;
}

export const states = [
  SchemasState
];

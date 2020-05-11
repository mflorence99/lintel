import '../../assets/eslint-schema.js';

import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule } from '@ngxs/store';
import { SelectionState } from '../state/selection';
import { TestBed } from '@angular/core/testing';

import { states } from '../state/app';

describe('SelectionState', () => {

  let selection: SelectionState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot(states),
        NgxsDataPluginModule.forRoot(),
      ]
    });
    selection = TestBed.inject(SelectionState);
  });

  test('Selections can be made', () => {
    selection.select({ category: 'x', fileName: 'y', pluginName: 'z' });
    expect(selection.category).toEqual('x');
    expect(selection.fileName).toEqual('y');
    expect(selection.pluginName).toEqual('z');
  });

});

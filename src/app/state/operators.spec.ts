import { patch } from '@ngxs/store/operators';
import { updateItems } from './operators';

describe('updateItems', () => {

  test('updates simple rule', () => {
    const rules: any = { r: ['warn', 42, true] };
    const updated = patch({ r: updateItems(['off']) })(rules);
    expect(updated.r).toEqual(['off', 42, true]);
  });

  test('updates only parts supplied', () => {
    const rules: any = { r: ['warn', 42, true] };
    const updated = patch({ r: updateItems(['error', 43]) })(rules);
    expect(updated.r).toEqual(['error', 43, true]);
  });

  test('creates a rule that did not already exist', () => {
    const rules: any = { s: ['warn', 42, true] };
    const updated = patch({ r: updateItems(['off', false]) })(rules);
    expect(updated.r).toEqual(['off', false]);
  });

});

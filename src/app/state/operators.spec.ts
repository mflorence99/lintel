import { patch } from '@ngxs/store/operators';
import { scratch } from './operators';
import { updateItems } from './operators';

describe('Custom operators', () => {

  test('update simple rule', () => {
    const rules: any = { r: ['warn', 42, true] };
    const updated = patch({ r: updateItems(['off']) })(rules);
    expect(updated.r).toEqual(['off', 42, true]);
  });

  test('update only parts supplied', () => {
    const rules: any = { r: ['warn', 42, true] };
    const updated = patch({ r: updateItems(['error', 43]) })(rules);
    expect(updated.r).toEqual(['error', 43, true]);
  });

  test('create a rule that did not already exist', () => {
    const rules: any = { s: ['warn', 42, true] };
    const updated = patch({ r: updateItems(['off', false]) })(rules);
    expect(updated.r).toEqual(['off', false]);
  });

  test('delete a rule', () => {
    const rules: any = { p: ['warn', 42, true], q: ['off'] };
    const updated = scratch('q')(rules);
    expect(updated.p).toBeTruthy();
    expect(updated.q).toBeFalsy();
  });

});

import { StorageService } from './storage';

describe('StorageService', () => {

  let state: any;

  let storage: StorageService;

  window['lintelVSCodeAPI'] = {
    getState: (): any => state,
    setState: (st: any): void => state = st
  };

  beforeEach(() => {
    state = { };
    storage = new StorageService();
  });

  test('setItem/getItem', () => {
    storage.setItem('x', 'y');
    expect(storage.getItem('x')).toBe('y');
  });

  test('removeItem', () => {
    storage.setItem('x', 'y');
    expect(storage.getItem('x')).toBe('y');
    storage.removeItem('x');
    expect(storage.getItem('x')).toBeUndefined();
  });

  test('clear', () => {
    storage.setItem('x', 'y');
    expect(storage.getItem('x')).toBe('y');
    storage.clear();
    expect(storage.getItem('x')).toBeUndefined();
  });

  test('key', () => {
    storage.setItem('a', 'b');
    storage.setItem('x', 'y');
    expect(storage.key(0)).toBe('a');
    expect(storage.key(1)).toBe('x');
    expect(storage.key(2)).toBeUndefined();
  });

  test('all methods operate on an empty state', () => {
    state = null;
    storage.setItem('x', 'y');
    expect(storage.getItem('x')).toBe('y');
    state = null;
    expect(storage.getItem('x')).toBeUndefined();
    state = null;
    expect(storage.key(0)).toBeUndefined();
    state = null;
    storage.removeItem('x');
    expect(storage.getItem('x')).toBeUndefined();
  });

});

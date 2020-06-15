import { StorageService } from './storage';

import { prepare } from './service.spec';

describe('StorageService', () => {

  let services;

  beforeEach(() => services = prepare([StorageService]));

  test('setItem/getItem', () => {
    const storage: StorageService = services[0];
    expect(storage.getItem('x')).toBeUndefined();
    storage.setItem('x', 'y');
    expect(storage.getItem('x')).toBe('y');
  });

  test('removeItem', () => {
    const storage: StorageService = services[0];
    storage.removeItem('x');
    storage.setItem('x', 'y');
    expect(storage.getItem('x')).toBe('y');
    storage.removeItem('x');
    expect(storage.getItem('x')).toBeUndefined();
  });

  test('clear', () => {
    const storage: StorageService = services[0];
    storage.setItem('x', 'y');
    expect(storage.getItem('x')).toBe('y');
    storage.clear();
    expect(storage.getItem('x')).toBeUndefined();
  });

  test('key', () => {
    const storage: StorageService = services[0];
    expect(storage.key(0)).toBeUndefined();
    storage.setItem('a', 'b');
    storage.setItem('x', 'y');
    expect(storage.key(0)).toBe('a');
    expect(storage.key(1)).toBe('x');
    expect(storage.key(2)).toBeUndefined();
  });

});

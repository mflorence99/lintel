import { Params } from './params';

import { prepare } from './service.spec';

import 'jest-extended';

import { TestBed } from '@angular/core/testing';

describe('Params', () => {
  beforeEach(() => prepare());

  test('Params are set as expected', () => {
    const params: Params = TestBed.inject(Params);
    expect(params.basePluginName).toEqual('eslint');
  });

  test('searchParams are initialized correctly', () => {
    const params: Params = TestBed.inject(Params);
    expect(params.searchParams['freshStart']).toBe(true);
  });
});

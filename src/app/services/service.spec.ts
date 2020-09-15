import '../../assets/vscode-scripts.js';
import '../../assets/vscode-startup.js';

import { TestBed } from '@angular/core/testing';

declare let lintelSearchParams;
declare let lintelVSCodeAPI;

export function prepare(services: any[]): any[] {
  let state: any;

  lintelSearchParams = '?freshStart=true';

  lintelVSCodeAPI = {
    getState: jest.fn(() => state),
    postMessage: jest.fn((message) => message),
    setState: jest.fn((st) => (state = st))
  };

  return services.map((service) => TestBed.inject(service));
}

describe('Service tests helpers', () => {
  test('Dummy test', () => {
    expect(true).toBeTruthy();
  });
});

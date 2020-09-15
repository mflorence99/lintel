import '../../assets/vscode-scripts.js';
import '../../assets/vscode-startup.js';

declare let lintelSearchParams;
declare let lintelVSCodeAPI;

export function prepare(): void {
  let state: any;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lintelSearchParams = '?freshStart=true';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lintelVSCodeAPI = {
    getState: jest.fn(() => state),
    postMessage: jest.fn((message) => message),
    setState: jest.fn((st) => (state = st))
  };
}

describe('Service tests helpers', () => {
  test('Dummy test', () => {
    expect(true).toBeTruthy();
  });
});

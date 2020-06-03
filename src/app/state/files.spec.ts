import { Bundle } from './state.spec';

import { prepare } from './state.spec';

describe('FilesState', () => {

  let bundle: Bundle;

  beforeEach(() => bundle = prepare());

  test('FilesState is initialized', () => {
    expect(bundle.files.fileNames[0]).toEqual('package.json');
  });

  test('package.json is properly parsed', () => {
    const config = bundle.files.parse('package.json');
    expect(config.parser).toEqual('@typescript-eslint/parser');
  });

});

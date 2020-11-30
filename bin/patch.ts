import * as fs from 'fs';

interface Patch {
  from: RegExp;
  to: string;
}

interface Patches {
  [fileName: string]: Patch[];
}

// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
const toRegExp = (str: string, flags = 'g'): RegExp => {
  return new RegExp(str.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'), flags);
};

/* eslint-disable @typescript-eslint/naming-convention */
const patches: Patches = {
  'node_modules/@ngxs-labs/data/bundles/ngxs-labs-data-decorators.umd.js': [
    // @see https://github.com/ngxs-labs/data/issues/622
    {
      from: toRegExp('var _this = _super.apply(this, __spread(args)) || this;'),
      to: 'var _this = this;'
    }
  ]
};

Object.keys(patches).forEach((fileName) => {
  let code = fs.readFileSync(fileName, 'utf8');
  patches[fileName].forEach((patch) => {
    code = code.replace(patch.from, patch.to);
  });
  fs.writeFileSync(fileName, code);
});

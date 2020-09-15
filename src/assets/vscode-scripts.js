/**
  Emulate VSCode scripting when testing as straight Angular app

  NOTE:  deleted from index.html when running as extension
*/

// eslint-disable-next-line no-undef
lintelSearchParams = location.search;

// eslint-disable-next-line no-undef
lintelVSCodeAPI = {
  getState: () => {
    const state = {};
    let ix = 0;
    let key;
    while ((key = localStorage.key(ix++)))
      state[key] = localStorage.getItem(key);
    // console.log(`%cgetState()`, 'lintelVSCodeAPI._style('#aa00ff'), state);
    return state;
  },

  postMessage: (message) => {
    switch (message.command) {
      case 'bootFail':
        console.log('%cbootFail:', lintelVSCodeAPI._style('red'), message.text);
        break;

      case 'clipboardCopy':
        console.log(
          '%cclipboardCopy:',
          lintelVSCodeAPI._style('#00796b'),
          message.text
        );
        break;

      case 'deleteOverride':
        console.log(
          '%cdeleteOverride:',
          lintelVSCodeAPI._style('#ad1457'),
          message.text,
          message.override
        );
        if (confirm(message.text)) {
          const reply = new Event('message');
          reply.data = {
            command: 'deleteOverride',
            override: message.override
          };
          window.dispatchEvent(reply);
        }
        break;

      case 'editFile':
        console.log(
          '%ceditFile:',
          lintelVSCodeAPI._style('#3367d6'),
          message.fileName
        );
        break;

      case 'getExtensions':
        console.log(
          '%cgetExtensions:',
          lintelVSCodeAPI._style('#4a148c'),
          message.fileName,
          `[${message.extensions.join(',')}]`
        );
        break;

      case 'getRules':
        console.log(
          '%cgetRules:',
          lintelVSCodeAPI._style('#795548'),
          message.fileName,
          `[${message.plugins.join(',')}]`
        );
        break;

      case 'openFile':
        window.open(message.url, 'Lintel');
        break;

      case 'parseFail':
        console.log(
          '%cparseFail:',
          lintelVSCodeAPI._style('#bf360c'),
          message.fileName
        );
        break;

      case 'saveFile':
        console.log(
          '%csaveFile:',
          lintelVSCodeAPI._style('#f09300'),
          message.fileName,
          { message }
        );
        break;
    }
  },

  setState: (state) => {
    // console.log(`%csetState()`, lintelVSCodeAPI._style('#311b92'), state);
    Object.keys(state).forEach((key) => localStorage.setItem(key, state[key]));
  },

  _style: (color) => {
    return `background-color: ${color}; color: white; font-weight: bold; padding: 4px`;
  }
};

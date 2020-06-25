/**
  Emulate VSCode scripting when testing as straight Angular app

  NOTE:  deleted from index.html when running as extension
*/

// eslint-disable-next-line no-undef
lintelSearchParams = location.search;

// eslint-disable-next-line no-undef
lintelVSCodeAPI = {

  getState: () => {
    const state = { };
    let ix = 0;
    let key;
    while ((key = localStorage.key(ix++)))
      state[key] = localStorage.getItem(key);
    // console.log(`%cgetState()`, 'color: #aa00ff', state);
    return state;
  },

  postMessage: message => {
    switch (message.command) {

      case 'bootFail':
        console.log('%cbootFail:', 'color: red', message.text);
        break;

      case 'editFile':
        console.log('%ceditFile:', 'color: #3367d6', message.fileName);
        break;

      case 'clipboardCopy':
        console.log('%cclipboardCopy:', 'color: #1b5e20', message.text);
        break;

      case 'getExtensions':
        console.log('%cgetExtensions:', 'color: #4a148c', message.fileName, `[${message.extensions.join(',')}]`);
        break;

      case 'getRules':
        console.log('%cgetRules:', 'color: #3e2723', message.fileName, `[${message.plugins.join(',')}]`);
        break;

      case 'openFile':
        window.open(message.url, 'Lintel');
        break;

      case 'saveFile':
        console.log('%csaveFile:', 'color: #f09300', message.fileName, { message });
        break;

    }
  },

  setState: state => {
    // console.log(`%csetState()`, 'color: #311b92', state);
    Object.keys(state).forEach(key => localStorage.setItem(key, state[key]));
  }

};

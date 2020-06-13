/**
  Emulate VSCode scripting when testing as straight Angular app

  NOTE:  deleted from index.html when running as extension
*/

lintelSearchParams = location.search;

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
        console.log(`%cbootFail: ${message.text}`, 'color: red');
        break;

      case 'editFile':
        console.log(`%ceditFile: ${message.fileName}`, 'color: #3367d6');
        break;

      case 'openFile':
        window.open(message.url, 'Lintel');
        break;

      case 'saveFile':
        console.log(`%csaveFile: ${message.fileName}`, 'color: #f09300', { message });
        break;

    }
  },

  setState: state => {
    // console.log(`%csetState()`, 'color: #311b92', state);
    Object.keys(state).forEach(key => localStorage.setItem(key, state[key]));
  }

}

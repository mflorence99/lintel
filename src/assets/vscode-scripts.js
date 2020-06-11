/**
  Emulate VSCode scripting when testing as straight Angular app

  NOTE:  deleted from index.html when running as extension
*/

/**  Emulate callbacks into the extension proper */
const lintelVSCodeAPI = {
  postMessage: message => {
    console.log('%cpostMessage()', 'color: green', { message });
    switch (message.command) {
      case 'open':
        window.open(message.url, 'Lintel');
        break;
    }
  }
}

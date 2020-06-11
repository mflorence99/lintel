
/** 
 * We have to load the script containing the ESLint files.
 * Normally, the extension does this and adds the script to index.html. 
 * We want to do it dynamically, so we can test load a variety of configurations.
 */

const lintelIsReady = (function() {

  // grab the search params
  let params = { };
  if (location.search.length > 1) {
    const raw = location.search.substring(1).split('&');
    params = raw.reduce((acc, pair) => {
      const [k, v] = pair.split('=');
      acc[k] = v;
      return acc;
    }, { });
  }

  // find which script to load
  const whichFiles = `assets/eslint-files/${params['eslintFiles'] || 'unit-tests'}.js`;

  return new Promise((resolve, _) => {

    // dynamically load the script
    let script = document.createElement('script');
    script.onload = function () {
      console.log(`%cLoaded test files from ${whichFiles}`, 'color: red');
      resolve();
    };
    script.src = whichFiles;
    document.head.appendChild(script);

  });
})();

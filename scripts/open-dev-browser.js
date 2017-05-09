const path = require('path');
const chokidar = require('chokidar');
const webdriver = require('webdriverio');

const SERVER_URL = 'http://localhost:8080';
const PUBLIC_PATH = path.join(__dirname, '../dist');
const INIT_URL = 'http://www.google.ca';

const options = {
  desiredCapabilities: {
    browserName: 'chrome',
    applicationCacheEnabled: false,
    chromeOptions: {
      args: [
        'start-maximized',
        'disable-web-security',
        'allow-running-insecure-content',
        'auto-open-devtools-for-tabs',
      ]
    }
  }
};

const browser = webdriver
  .remote(options)
  .init()
  .url(INIT_URL);

let isReady = false;

const watcher = chokidar.watch(PUBLIC_PATH, {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

watcher.on('add', reloadBrowser);
watcher.on('change', reloadBrowser);

function reloadBrowser(path) {
  const filename = path.split("/").pop();
  browser
    .refresh()
    .execute(appendScript(filename));
}

function appendScript(filename) {
  return `
    const script = document.createElement('script');
    script.src = '${SERVER_URL}/${filename}';
    script.type = 'text/javascript';
    document.body.appendChild(script);
  `;
};
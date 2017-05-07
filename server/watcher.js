const path = require('path');
const chokidar = require('chokidar');

const PUBLIC_PATH = path.join(__dirname, '..', 'public');
let isReady = false;

const watcher = chokidar.watch(PUBLIC_PATH, {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

watcher.on('add', path => {
  if (isReady) {
    console.log(path)
  }
});
watcher.on('ready', () => {
  isReady = true;
});

module.exports = watcher;
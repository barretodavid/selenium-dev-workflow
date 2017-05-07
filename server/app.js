const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const chokidar = require('chokidar');

const PORT = 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PUBLIC_PATH = path.join(__dirname, '..', 'public');

app.use(express.static(PUBLIC_PATH));

io.on('connection', (socket) => {

  let isReady = false;

  const watcher = chokidar.watch(PUBLIC_PATH, {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });

  watcher.on('add', filename => {
    if (isReady) {
      socket.emit('filename', filename);
    }
  });
  watcher.on('ready', () => {
    isReady = true;
  });

  // console.log('hey!');
  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });
});

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});




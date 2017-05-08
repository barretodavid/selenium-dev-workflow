import * as path from 'path';
import * as express from 'express';
import * as http from 'http';
import * as socketIO from 'socket.io';
import * as chokidar from 'chokidar';

const PORT = 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PUBLIC_PATH = path.join(__dirname, '../../dist/app');

app.use(express.static(PUBLIC_PATH));

io.on('connection', (socket) => {

  let isReady = false;

  const watcher = chokidar.watch(PUBLIC_PATH, {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });

  watcher.on('add', (path: string) => {
    if (isReady) {
      const filename = path.split("/").pop();
      socket.emit('filename', filename);
    }
  });
  watcher.on('ready', () => {
    isReady = true;
  });
});

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});




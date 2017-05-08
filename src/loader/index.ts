import { connect } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';

const socket = connect(SERVER_URL);
let script: HTMLScriptElement;

const createScript = (filename: string): void => {
  console.log(filename);
  if(script) {
    document.body.removeChild(script);
  }
  script = document.createElement('script');
  script.src = `${SERVER_URL}/${filename}`;
  script.type = 'text/javascript';
  document.body.appendChild(script);
};

socket.on('filename', createScript);
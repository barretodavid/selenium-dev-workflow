const path = require('path');
const express = require('express');

const PORT = 8080;
const PUBLIC_PATH = path.join(__dirname, '../dist');

const app = express();

app.use(express.static(PUBLIC_PATH));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

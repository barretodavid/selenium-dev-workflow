const path = require('path');

module.exports = {
  entry: './src/app/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist', 'app'),
    filename: 'app.[hash].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
};
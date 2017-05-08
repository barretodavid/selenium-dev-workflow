const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/loader/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist', 'loader'),
    filename: 'loader.[hash].js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  plugins: [new HtmlWebpackPlugin()]
};
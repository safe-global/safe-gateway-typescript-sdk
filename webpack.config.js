/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'index.min.js',
    sourceMapFilename: '[file].map',
    path: path.join(__dirname, '/dist'),
    libraryTarget: 'umd',
    library: JSON.stringify(require('./package.json').name),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: [/node_modules/],
      },
    ],
  },
};

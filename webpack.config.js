/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const dist = path.join(__dirname, '/dist');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'index.min.js',
    sourceMapFilename: '[file].map',
    path: dist,
    libraryTarget: 'umd',
    library: JSON.stringify(require('./package.json').name),
  },
  resolve: {
    extensions: ['.ts'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'awesome-typescript-loader',
        exclude: [/node_modules/],
      },
    ],
  },
  plugins: [new CopyPlugin({ patterns: [{ from: 'src/types', to: path.join(dist, 'types') }] })],
};

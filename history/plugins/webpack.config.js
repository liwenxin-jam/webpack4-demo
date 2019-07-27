const path = require('path');
const DonePlugin = require('./plugins/DonePlugin');
const AsyncPlugin = require('./plugins/AsyncPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileListPlugin = require('./plugins/FileListPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InlineSourcePlugin = require('./plugins/InlineSourcePlugin');
const UploadPlugin = require('./plugins/UploadPlugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new FileListPlugin({
      filename: 'list.md'
    }),
    // new InlineSourcePlugin({
    //   match: /\.(js|css)/
    // })
    new UploadPlugin({
      bucket: '',
      domain: '',
      accessKey: '',
      secretKey: ''
    })
    // new DonePlugin(),
    // new AsyncPlugin()
  ]
}
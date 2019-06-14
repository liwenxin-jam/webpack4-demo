const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// npx webpack --config webpack.mul.config.js

module.exports = {
  mode: 'development',
  // 多入口
  entry: {
    home: './multiple-src/index.js',
    other: './multiple-src/other.js'
  },
  output: {
    // [name] home, other
    filename: '[name].js',
    path: Path.resolve(__dirname, 'mul-dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './multiple-src/index.html',
      filename: 'home.html',  // 默认index.html
      chunks: ['home']  // 指定依赖入口文件,可以依赖多个
    }),
    new HtmlWebpackPlugin({
      template: './multiple-src/index.html',
      filename: 'other.html', 
      chunks: ['other']
    })
  ]
}
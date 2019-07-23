const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    // noParse: (content) => /jquery|lodash/.test(content), // 不去解析jquery中的依赖，相对提高打包速度
    noParse: /jquery|lodash/, // 等价于前者
    rules: [{
      test: /\.js$/, // normal 普通的loader
      use: {
        loader: 'babel-loader', // 用babel-loader 需要把es6转成es5
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        }
      },
      include: path.resolve(__dirname, 'src'), // 指定查找某个文件夹
      exclude: /node_modules/ // 排除某个文件夹
    }]
  },
  plugins: [
    new Webpack.IgnorePlugin(/\.\/locale/, /moment/), // 引入moment忽略加载locale文件
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}
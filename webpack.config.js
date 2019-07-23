const path = require('path');
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
    noParse: /jquery|lodash/,  // 等价于前者
    rules: [{
      test: /\.js$/, // normal 普通的loader
      use: {
        loader: 'babel-loader', // 用babel-loader 需要把es6转成es5
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        }
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}
const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 模块 happypack 可以实现多线程来打包 资源小没有必要，反而会增加打包时间
const Happypack = require('happypack');

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
      // use: 'Happypack/loader?id=js', // 多线程loader，指定id
      include: path.resolve(__dirname, 'src'), // 指定查找某个文件夹
      exclude: /node_modules/ // 排除某个文件夹
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
      // use: 'Happypack/loader?id=css', // 多线程loader，指定id
    }]
  },
  plugins: [
    // new Happypack({
    //   id: 'js',
    //   use: [{
    //     loader: 'babel-loader', // 用babel-loader 需要把es6转成es5
    //     options: {
    //       presets: ['@babel/preset-env', '@babel/preset-react'],
    //     }
    //   }]
    // }),
    // new Happypack({
    //   id: 'css',
    //   use: ['style-loader', 'css-loader']
    // }),
    // new Webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname, 'dist', 'manifest.json')
    // }),
    new Webpack.IgnorePlugin(/\.\/locale/, /moment/), // 引入moment忽略加载locale文件
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  devServer: { // 开发服务器的配置
    port: 8090,
    progress: true, // 查看打包进度
    contentBase: './dist', // 非 webpack 的内容的服务路径是
    open: true // 默认打开浏览器
  }
}
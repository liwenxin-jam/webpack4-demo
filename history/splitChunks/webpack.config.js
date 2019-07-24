const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production', // development production 
  entry: {
    index: './src/index.js',
    other: './src/other.js'
  },
  output: {
    filename: '[name].js',
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
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  plugins: [
    new Webpack.IgnorePlugin(/\.\/locale/, /moment/), // 引入moment忽略加载locale文件
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  optimization: { // 以前用commonChunkPlugins
    splitChunks: { // 分割代码块
      cacheGroups: { // 缓存组，从上到下
        common: { // 公共模块
          chunks: 'initial', // 初始化就抽离，可以异步抽离
          minSize: 0, // 大于0字节抽离
          minChunks: 2 // 被引用大于2次就抽离，包括2次，建议最少设2次以上
        },
        vendor: { // 第三方库
          priority: 1, // 权重设为1，优先抽离，避免common打包在一起
          test: /node_modules/, // 匹配文件夹把它抽离
          chunks: 'initial',
          minSize: 0,
          minChunks: 2
        }
      }
    }
  },
  devServer: { // 开发服务器的配置
    port: 8090,
    progress: true, // 查看打包进度
    contentBase: './dist', // 非 webpack 的内容的服务路径是
    open: true // 默认打开浏览器
  }
}
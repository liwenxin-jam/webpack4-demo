let { smart } = require('webpack-merge')
let base = require('./webpack.base')

// 用来压缩js的插件 
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 用来压缩css的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = smart(base, {
  mode: 'production', // 模式 默认两种 production development
  // 优化项，当mode为development时，这里不会生效
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true, // 是否用缓存 
        parallel: true, // 是否压缩多个
        sourceMap: true // 源码映射
      }),
      new OptimizeCssAssetsPlugin()
    ]
  },
})
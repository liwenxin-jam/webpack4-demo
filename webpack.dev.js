let { smart } = require('webpack-merge')
let base = require('./webpack.base')

module.exports = smart(base, {
  mode: 'development', // 模式 默认两种 production development
  // 1) source-map源码映射，会单独生成一个sourcemap文件，出错了，会标识当前报错的列和行
  devtool: 'source-map', // 增加映射文件，方便调试源代码
  // 2) eval-source-map 不会单独产生sourcemap文件，出错了，会标识当前报错的列和行
  // devtool: 'eval-source-map', 
  // 3) cheap-module-source-map 不会产生列，但是会生成sourcemap文件
  // devtool: 'cheap-module-source-map', // 产生后可以保留起来
  // 4) cheap-module-eval-source-map 不会生成map, 集成在打包的文件中，不会产生列
  // devtool: 'cheap-module-eval-source-map', 
  devServer: { // 开发服务器的配置
    port: 8090,
    progress: true, // 查看打包进度
    contentBase: './dist', // 非 webpack 的内容的服务路径是
    open: true, // 默认打开浏览器
    compress: true, // 是否开启Gzip压缩
  }
})
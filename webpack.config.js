// 传参写法 npm run build (webpack)  , 利用--把脚本和传参配置隔开 cmd: npm run build -- --config webpack.config.js
// webpack 是node写出来的 node的写法
const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 抽离css的插件，如果需要根据后缀抽离样式，可以多引用几个不同名字的MiniCssExtractPlugin，然后定义抽离的filename，最后在rules里引用MiniCssExtractPlugin.loader
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 用来压缩css的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 用来压缩js的插件 
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
console.log(path.resolve(__dirname, 'dist'))

module.exports = {
  mode: 'development', // 模式 默认两种 production development
  entry: './src/index.js', // 入口
  output: {
    filename: 'bundle.js',
    // filename: 'bundle.[hash:8].js', // 打包后的文件名，指定8位哈希，默认20位
    path: path.resolve(__dirname, 'dist') // 路径必须是一个绝对路径
  },
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
  plugins: [ // 数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      // minify: {
      //   removeAttributeQuotes: true, // 删除属性的双引号
      //   collapseWhitespace: true // 折叠空行
      // },
      // hash: true  // 防止浏览器缓存，增加哈希后缀，类似时间戳效果 bundle.js?sdfgsdfgsdf
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    // new Webpack.ProvidePlugin({ // 在每个模块中都注入$
    //   $: 'jquery'
    // })
  ],
  externals: { // 打包不引以下模块
    jquery: '$'
  },
  module: { // 模块
    // loader规则，loader的特点，希望单一，字符串只用一个loader，多个loader需要 []，loader的顺序默认是use从右向左执行，rules从下到上
    rules: [{
        test: /\.html$/,
        use: 'html-withimg-loader'
      }, {
        test: /\.(png|jpg|gif)$/,
        // use: 'file-loader'
        // 做一个限制，当我们的图片小于多少KB，用base64来转化，注意转base64原文件会大3分之1
        // 否则用file-loader产出真实图片
        use: {
          loader: 'url-loader',
          options: {
            limit: 1
          }
        }
      },
      // {
      //   test: require.resolve('jquery'),  // 当模块有使用require.resolve('jquery')，全局暴露window.$
      //   use: 'expose-loader?$'
      // },
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'eslint-loader', // 依赖eslint eslint-loader
      //     options: {
      //       enforce: 'pre' // previous 前置loader，提前加载，不然需要把当前匹配规则放置后面
      //     }
      //   }
      // }, 
      {
        test: /\.js$/, // normal 普通的loader
        use: {
          loader: 'babel-loader',
          options: { // 用babel-loader 需要把es6转成es5
            presets: ['@babel/preset-env'],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
              "@babel/plugin-transform-runtime"
            ]
          }
        },
        include: path.resolve(__dirname, 'src'), // 指定查找某个文件夹
        exclude: /node_modules/ // 排除某个文件夹
      },
      // css-loader 接受@import这种语法，style-loader它是把css插到head的标签中
      // loader可以是一个对象，然后传参options，例如{loader: 'style-loader', options:{} }
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] }
      {
        test: /\.css$/,
        use: [
          // {
          //   loader: 'style-loader',
          //   options: {
          //     insertAt: 'top'  // 指定在哪个位置去放生成出来的style
          //   }
          // },
          MiniCssExtractPlugin.loader, // 抽离出来css单独引入link，区别直接放style，针对样式多的时候需要抽离，避免index.html过大
          'css-loader',
          'postcss-loader' // 先处理postcss-loader，再处理css-loader，增加autoprefixer
        ]
      },
      {
        // 可以处理less文件，需要less less-loader
        // 可以处理scss sass文件，需要node-sass sass-loader
        // 可以处理stylus文件，需要stylus stylus-loader
        test: /\.less$/,
        use: [
          // {
          //   loader: 'style-loader',
          //   options: {
          //     insertAt: 'top'
          //   }
          // }, 
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  devServer: { // 开发服务器的配置
    port: 3000,
    progress: true, // 查看打包进度
    contentBase: './dist', // 非 webpack 的内容的服务路径是
    open: true, // 默认打开浏览器
    compress: true // 是否压缩
  }
}
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
// 用来清除dist文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 复制文件夹
const CopyWebpackPlugin = require('copy-webpack-plugin');

// 推荐插件
// 1) cleanWebpackPlugin
// 2) copyWebpackPlugin
// 3) bannerPlugin // 内置
module.exports = {
  mode: 'production', // 模式 默认两种 production development
  entry: './src/index.js', // 入口
  // watch: true, // 是否开启打包dist文件夹实时监听
  // watchOptions: { // 监控的选项
  //   poll: 1000, // 每秒监听一千次文件夹
  //   aggregateTimeout: 500,  // 防抖，用户一直输入, 500毫秒只打包一次
  //   ignored: /node_modules/ // 不监听node_modules
  // },
  output: {
    filename: 'bundle.js',
    // filename: 'bundle.[hash:8].js', // 打包后的文件名，指定8位哈希，默认20位
    path: path.resolve(__dirname, 'dist'), // 路径必须是一个绝对路径
    // publicPath: 'https://xx.cn'  // 提供cdn域名给文件baseUrl加载，注意是所有引入文件都会添加，可以单独在module的rule加
  },
  // 1) source-map源码映射，会单独生成一个sourcemap文件，出错了，会标识当前报错的列和行
  // devtool: 'source-map', // 增加映射文件，方便调试源代码
  // 2) eval-source-map 不会单独产生sourcemap文件，出错了，会标识当前报错的列和行
  // devtool: 'eval-source-map', 
  // 3) cheap-module-source-map 不会产生列，但是会生成sourcemap文件
  // devtool: 'cheap-module-source-map', // 产生后可以保留起来
  // 4) cheap-module-eval-source-map 不会生成map, 集成在打包的文件中，不会产生列
  // devtool: 'cheap-module-eval-source-map', 
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
  // 数组 放着所有的webpack插件
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: './doc', to: './doc' } // 默认直接在dist根目录下复制，可以通过to来相对dist创建文件夹存放
    ]),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      // minify: {
      //   removeAttributeQuotes: true, // 删除属性的双引号
      //   collapseWhitespace: true // 折叠空行
      // },
      // hash: true  // 防止浏览器缓存，增加哈希后缀，类似时间戳效果 bundle.js?sdfgsdfgsdf
    }),
    new Webpack.DefinePlugin({
      DEV: JSON.stringify('dev'), // 相当于是变量dev，需要转成字符串 "'dev'"
      FLAG: 'true', // 不需要转字符串
      EXPRESSION: '1+1'
    })
    // new Webpack.BannerPlugin('made 2019 by jam'), // 打包出来的js css文件顶部增加banner描述 /*! made 2019 by jam */
    // new Webpack.ProvidePlugin({ // 在每个模块中都注入$
    //   $: 'jquery'
    // })
  ],
  externals: { // 打包不引以下模块
    jquery: '$'
  },
  module: { // 模块
    // loader规则，loader的特点，希望单一，字符串只用一个loader，多个loader需要 []，loader的顺序默认是use从右向左执行，rules从下到上
    rules: [
      // html文件规则
      {
        test: /\.html$/,
        use: 'html-withimg-loader'
      },
      // 图片文件规则
      {
        test: /\.(png|jpg|gif)$/,
        // use: 'file-loader'
        // limit做一个限制，当我们的图片小于多少KB，用base64来转化，注意转base64原文件会大3分之1
        // 否则用file-loader产出真实图片
        use: {
          loader: 'url-loader',
          options: {
            limit: 1,
            // 注意开发模式需要同步，就是输出增加前缀，本地也应该是根目录下这个baseUrl
            // outputPath: '/img/', // 指定图片输出到哪个目录,默认是直接在dist根目录下./ 
            // publicPath: 'https://xx.cn' // 单独给图片加baseUrl，其它不加
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
      // js文件规则
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
      // css文件规则
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
      // less文件规则
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
  resolve: { // 解析 第三方包 common
    modules: [path.resolve('node_modules')], // 指定查找模块默认入口，可以多个
    // alias: { // 别名 vue vue.runtime
    //   '@bootstrap': 'bootstrap/dist/css/bootstrap.css'
    // }
    mainFields: ['style', 'main', 'index'], // 指定查找入口文件名字的顺序，默认index.js
    extensions: ['.js', '.css', '.json', '.vue']
  },
  devServer: { // 开发服务器的配置
    port: 8090,
    progress: true, // 查看打包进度
    contentBase: './dist', // 非 webpack 的内容的服务路径是
    open: true, // 默认打开浏览器
    compress: true, // 是否开启Gzip压缩
    // 建议第一种或者第二种方式，支持热更新。第三种方式需要自己手动刷新浏览器
    // 1) 配置代理
    // proxy: { // 重写的方式，把请求代理到express服务器上
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     // changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
    // 2) 前端只想单纯模拟数据
    before(app) {
      app.get('/user', (req, res) => {
        res.json({ name: 'xxlai-jam-before' });
      })
    }
    // 3) 有服务端 不用用代理来处理 服务端用webpack 端口用服务端端口
    // 借助中间件webpack-dev-middleware实件，参考server.js，在服务端通过读取webpack.config一起渲染前端文件
  }
}
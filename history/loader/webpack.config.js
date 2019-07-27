const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  // watch: true,
  resolveLoader: {
    // 别名
    // alias: {
    //   loader1: path.resolve(__dirname, 'loaders', 'loader1.js')
    // }
    // modules: ['node_modules', path.resolve(__dirname, 'loaders')]  // 优先查找node_modules
    modules: [path.resolve(__dirname, 'loaders'), 'node_modules']
  },
  module: {
    // loader的分类 pre 在前面的 post 在后面 normal
    // loader的顺序 pre -> normal -> inline -> post
    rules: [  // loader的顺序问题  从右向左 从下到上
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        // 目的就是根据图片生成一个md5 ，产生到dist目录，file-loader还会返回目录中的图片路径
        // use: 'file-loader'
        // url-loader 1) file-loader会处理路径
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024 // 小于10KB生成base64的图片，大于直接生成图片加载 
          }
        }
      },
      {
        test: /\.js$/,
        use: { // jam
          loader: 'banner-loader',
          options: {
            text: 'jam',
            filename: path.resolve(__dirname, 'banner.js')
          }
        }
      }

      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env']
      //     }
      //   }
      // }

      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'loader1'
      //   },
      //   enforce: 'pre'
      // },
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'loader2'
      //   }
      // },
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'loader3'
      //   },
      //   enforce: 'post'
      // }

      // {
      //   test: /\.js$/,
      //   // use: 'loader1' // 默认只会查找node_modules下
      //   use: ['loader3', 'loader2', 'loader1'] // 从右向左
      // }
    ]
  }
}
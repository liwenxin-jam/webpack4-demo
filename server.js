// 内置express
const express = require('express');
const webpack = require('webpack');

let app = express();

// 中间件
let middle = require('webpack-dev-middleware');
// 读取前端配置文件，包括入口
let config = require('./webpack.config');
// 编译
let compiler = webpack(config);
app.use(middle(compiler));

app.get('/user', (req, res) => {
  res.json({ name: 'xxlai-jam' });
})

app.listen(3000);
// let str = require('./a.js');

// console.log(str);

// require('./index.css');
// require('./index.less');

// let fn = () => {
//   console.log('log');
// }
// fn();

// // 装饰器，可以在类，方法，属性上添加
// @log
// class A { // new A()
//   a = 1;
// }
// let a = new A();
// console.log(a.a);

// // 装饰器其实就是一个方法，target就是装饰的对象
// function log(target) {
//   console.log(target, '23');
// }

// // import $ from 'expose-loader?$!jquery'; // 暴露$出去，也可以在webpack暴露
// import $ from 'jquery';  // 局部引入$，也可以全局注入$对象
// // expose-loader 暴露 全局的loader 内联的loader
// // pre 前面执行的loader normal 普通的loader 内联loader 后置
// console.log($);
// console.log(window.$);

// 总结
// 1) expose-loader 暴露到window上
// 2) Webpack.ProvidePlugin 给每个模块暴露$
// 3) 引入相关模块不打包，但需要借助cdn引入

// webpack 打包我们的图片
// 1) 在js中创建图片来引入
// file-loader 默认会在内部生成一张图片 到build目录下
// 
// import logo from './logo.png'; // 把图片引入，返回的结果是一个新的图片地址
// let image = new Image();
// // image.src = './logo.png'; // 打包的时候认为这就是一个普通的字符串
// image.src = logo;
// document.body.appendChild(image);
// // 2) 在css引入 background('url')
// require('./index.css');
// // 3) <img src="" alt="" />

// class Log {
//   constructor() {
//     console.log('出错了');
//   }
// }

// let log = new Log()

// 默认访问当前端口号，localhost:8080, webpack-dev-server －> 3000
// http-proxy
// let xhr = new XMLHttpRequest();
// xhr.open('GET', '/user', true); // ture是否是异步请求

// xhr.onload = function() {
//   console.log(xhr.response);
// }

// xhr.send();

// import 'bootstrap' // 引的是js，需要依赖相关项popper.js jquery.js 除非指定查找入口文件
// import 'bootstrap/dist/css/bootstrap.css'; // 指定只引入css文件
// import '@bootstrap'; // 引入别名

// import './style' // 默认查找的是.js文件

let url = '';
if (DEV === 'dev') {
  url = 'http://localhost:3000'
} else {
  url = 'http://test.cn'
}
console.log(url)
console.log(typeof FLAG)
console.log(EXPRESSION)
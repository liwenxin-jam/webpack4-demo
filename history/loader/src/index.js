// console.log('hello');

// // -! 不会让文件 再去通过pre + normal loader来处理了 , 有post
// // ! 没有normal , 有pre 和 post
// // !! 什么都不要
// // let str = require('-!inline-loader!./a.js');
// // let str = require('!inline-loader!./a.js');
// let str = require('!!inline-loader!./a.js');
// console.log(str);

// // loader默认由两部分执行，pitch normal

// class Test {
// 	constructor() {
// 		this.name = 'jam';
// 	}
// 	getName() {
// 		return this.name;
// 	}
// }

// let xx = new Test();
// console.log(xx.getName());

// import logo from './logo.png';

// let img = document.createElement('img');
// img.src = logo;
// document.body.append(img);

import "./index.less";
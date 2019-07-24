// 1、import 在生产环境下 会自动去除掉没用的代码
// tree-shaking 把没用到的代码 自动删除掉
import calc from './test';
// console.log(calc.sum(1, 2));

// es6 模块会把结果放在default上 require会默认把所以依赖和方法打包进来
// let calc = require('./test');
console.log(calc.default.sum(1, 2));

// 2、scope hosting 作用域提升
let a = 1;
let b = 2;
let c = 3;
let d = a + b + c; // 在生产环境下webpack会自动省略一些可以简化的代码
console.log(d, '----------');
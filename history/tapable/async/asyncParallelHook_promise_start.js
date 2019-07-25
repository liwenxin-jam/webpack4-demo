let { AsyncParallelHook } = require('tapable');
// 异步的钩子（串行） 并行 需要等待所有并发的异步事件执行后再执行回调事件
// 同时发送多次请求
// 注册方法 分为3种 同步注册tap 异步注册 tagAsync(cb) tagPromise(注册是promise) 
// 触发回调 分为3种 call callAsync promise 分别对应上边的注册方式
// AsyncParallelBailHook 带保险的异步并发钩子
class Lesson {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new AsyncParallelHook(['data'])
    }
  }
  tap() { // 注册监听函数
    this.hooks.arch.tapPromise('node', (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('node', name);
          resolve();
        }, 1000)
      })
    })
    this.hooks.arch.tapPromise('react', (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('react', name);
          resolve();
        }, 1000)
      })
    })
  }
  start() {
    this.hooks.arch.promise('jam').then(function() {
      console.log('end');
    });
  }
}

let l = new Lesson();
l.tap(); // 注册这两个事件
l.start(); // 启动钩子
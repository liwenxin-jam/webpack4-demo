let { AsyncParallelHook } = require('tapable');
// 异步的钩子（串行） 并行 需要等待所有并发的异步事件执行后再执行回调事件
// 同时发送多次请求
// 注册方法 分为 同步注册tap 异步注册tagAsync
class Lesson {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new AsyncParallelHook(['data'])
    }
  }
  tap() { // 注册监听函数
    this.hooks.arch.tapAsync('node', (name, cb) => {
      setTimeout(() => {
        console.log('node', name);
        cb();
      }, 1000)
    })
    this.hooks.arch.tapAsync('react', (name, cb) => {
      setTimeout(() => {
        console.log('react', name);
        cb();
      }, 1000)
    })
  }
  start() {
    this.hooks.arch.callAsync('jam', function() {
      console.log('end');
    });
  }
}

let l = new Lesson();
l.tap(); // 注册这两个事件
l.start(); // 启动钩子
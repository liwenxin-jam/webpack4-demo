let { AsyncSeriesWaterfallHook } = require('tapable');
// AsyncSeriesHook 异步串行的钩子
class Lesson {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new AsyncSeriesWaterfallHook(['data'])
    }
  }
  tap() { // 注册监听函数
    this.hooks.arch.tapAsync('node', (name, cb) => {
      setTimeout(() => {
        console.log('node', name);
        // cb(null, 'result'); // 将结果传给下一个钩子
        cb('error', 'result'); // 报错，跳过下一个钩子
      }, 1000)
    })
    this.hooks.arch.tapAsync('react', (data, cb) => {
      setTimeout(() => {
        console.log('react', data);
        cb();
      }, 1000)
    })
  }
  start() {
    this.hooks.arch.callAsync('jam', function () {
      console.log('end');
    });
  }
}

let l = new Lesson();
l.tap(); // 注册这两个事件
l.start(); // 启动钩子
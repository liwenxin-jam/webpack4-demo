let { SyncWaterfallHook } = require('tapable');
// SyncWaterfallHook 瀑布 类似promise.then，可以把结果带到下一个任务
class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncWaterfallHook(['data'])
    }
  }
  tap() { // 注册监听函数
    this.hooks.arch.tap('node', function (name) {
      console.log('node', name);
      return 'node学的还不错';
    })
    this.hooks.arch.tap('react', function (data) {
      console.log('react', data);
    })
  }
  start() {
    this.hooks.arch.call('jam');
  }
}

let l = new Lesson();
l.tap(); // 注册这两个事件
l.start(); // 启动钩子
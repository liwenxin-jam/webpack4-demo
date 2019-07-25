let { SyncLoopHook } = require('tapable');
// SyncLoopHook 事件流 同步遇到某个不返回 undefined 的函数会多次执行
class Lesson {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new SyncLoopHook(['data'])
    }
  }
  tap() { // 注册监听函数
    this.hooks.arch.tap('node', name => {
      console.log('node', name);
      return ++this.index === 3 ? undefined : '继续学';
    })
    this.hooks.arch.tap('react', data => {
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
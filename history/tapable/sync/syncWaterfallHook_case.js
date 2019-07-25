class SyncWaterfallHook { // 钩子是同步的
  constructor(args) { // args => ['name']
    this.tasks = [];
  }
  tap(name, task) { // 注册task监听
    this.tasks.push(task);
  }
  call(...args) { // 触发task
    let [first, ...others] = this.tasks;
    let ret = first(...args);
    others.reduce((a, b) => {
      return b(a);
    }, ret)
  }
}

let hook = new SyncWaterfallHook(['name']);
hook.tap('react', function(name) {
  console.log('react', name);
  return 'react ok';
})
hook.tap('node', function(data) {
  console.log('node', data);
  return 'node ok';
})
hook.tap('webpack', function(data) {
  console.log('webpack', data);
})
hook.call('jam');
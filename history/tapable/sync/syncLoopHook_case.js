class SyncLoopHook { // 钩子是同步的
  constructor(args) { // args => ['name']
    this.tasks = [];
  }
  tap(name, task) { // 注册task监听
    this.tasks.push(task);
  }
  call(...args) { // 触发task
    this.tasks.forEach(task => {
      let ret;
      do {
        ret = task(...args);
      } while (ret != undefined);
    })
  }
}

let hook = new SyncLoopHook(['name']);
let total = 0;
hook.tap('react', function(name) {
  console.log('react', name);
  return ++total === 3 ? undefined : '继续学';
})
hook.tap('node', function(data) {
  console.log('node', data);
})
hook.tap('webpack', function(data) {
  console.log('webpack', data);
})
hook.call('jam');
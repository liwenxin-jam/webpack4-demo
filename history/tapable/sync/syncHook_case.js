class SyncHook { // 钩子是同步的
  constructor(args) { // args => ['name']
    this.tasks = [];
  }
  tap(name, task) { // 注册task监听
    this.tasks.push(task);
  }
  call(...args) { // 触发task
    this.tasks.forEach(task => task(...args));
  }
}

let hook = new SyncHook(['name']);
hook.tap('react', function (name) {
  console.log('react', name)
})
hook.call('jam');
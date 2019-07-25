class AsyncSeriesHook { // 钩子是同步的
  constructor(args) { // args => ['name']
    this.tasks = [];
  }
  tapAsync(name, task) { // 注册task监听
    this.tasks.push(task);
  }
  callAsync(...args) { // 触发task
    let finalCallback = args.pop(),
      index = 0,
      next = () => {
        if (this.tasks.length === index) return finalCallback();
        let task = this.tasks[index++];
        task(...args, next);
      };

    next();
  }
}

let hook = new AsyncSeriesHook(['name']);
let total = 0;
hook.tapAsync('react', function(name, cb) {
  setTimeout(() => {
    console.log('react', name);
    cb();
  }, 1000)
})
hook.tapAsync('node', function(name, cb) {
  setTimeout(() => {
    console.log('node', name);
    cb();
  })
})
hook.callAsync('jam', function() {
  console.log('end');
});
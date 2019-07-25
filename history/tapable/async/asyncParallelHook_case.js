class AsyncParallelHook { // 钩子是同步的
  constructor(args) { // args => ['name']
    this.tasks = [];
  }
  tapAsync(name, task) { // 注册task监听
    this.tasks.push(task);
  }
  callAsync(...args) { // 触发task
    let finalCallback = args.pop(); // 拿出最终的函数
    let index = 0;

    let done = () => { // Promise.all
      index++;
      if (index === this.tasks.length) {
        finalCallback();
      }
    }
    this.tasks.forEach(task => {
      task(...args, done);
    })
  }
}

let hook = new AsyncParallelHook(['name']);
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
  }, 1000)
})
hook.callAsync('jam', function() {
  console.log('end');
});
class AsyncParallelHook { // 钩子是同步的
  constructor(args) { // args => ['name']
    this.tasks = [];
  }
  tapPromise(name, task) { // 注册task监听
    this.tasks.push(task);
  }
  promise(...args) { // 触发task
    let tasks = this.tasks.map(task => task(...args));
    return Promise.all(tasks);
  }
}

let hook = new AsyncParallelHook(['name']);
let total = 0;
hook.tapPromise('react', function(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('react', name);
      resolve();
    }, 1000)
  })
})
hook.tapPromise('node', function(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('node', name);
      resolve();
    }, 1000)
  })
})
hook.promise('jam').then(function() {
  console.log('end');
});
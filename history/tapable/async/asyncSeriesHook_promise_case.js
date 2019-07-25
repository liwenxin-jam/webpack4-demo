class AsyncSeriesHook { // 钩子是同步的
  constructor(args) { // args => ['name']
    this.tasks = [];
  }
  tapPromise(name, task) { // 注册task监听
    this.tasks.push(task);
  }
  promise(...args) { // 触发task
    let [first, ...others] = this.tasks;
    return others.reduce((p, n) => { // redux 源码
      return p.then(() => n(...args));
    }, first(...args));
  }
}

let hook = new AsyncSeriesHook(['name']);
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
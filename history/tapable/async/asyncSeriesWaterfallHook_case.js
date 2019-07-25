class AsyncSeriesWaterfallHook { // 钩子是同步的
  constructor(args) { // args => ['name']
    this.tasks = [];
  }
  tapAsync(name, task) { // 注册task监听
    this.tasks.push(task);
  }
  callAsync(...args) { // 触发task tapPromise + promise
    let finalCallback = args.pop();
    let index = 0;
    let next = (err, data) => {
      let task = this.tasks[index];
      if (!task) return finalCallback();
      if (index === 0) { // 执行的是第一个
        task(...args, next);
      } else {
        task(data, next);
      }
      index++;
    }
    next();
  }
}

let hook = new AsyncSeriesWaterfallHook(['name']);
hook.tapAsync('react', function (name, cb) {
  setTimeout(() => {
    console.log('react', name);
    cb(null, '结果');
  }, 1000)
})
hook.tapAsync('node', function (data, cb) {
  setTimeout(() => {
    console.log('node', data);
    cb(null);
  }, 1000)
})
hook.callAsync('jam', function () {
  console.log('end');
});
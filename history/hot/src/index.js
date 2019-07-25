import str from './source';

// console.log(str);

if(module.hot) {
  module.hot.accept('./source', () => {
    // console.log('文件更新了');
    let str = require('./source')
    console.log(str);
  })
}
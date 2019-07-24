let button = document.createElement('button');
button.innerHTML = 'button';
// vue的懒加载 react的懒加载
button.addEventListener('click', function () {
  console.log('click');
  // es6 草案中的语法 jsonp实现动态加载文件
  import('./source.js').then(data => {
    console.log(data);
  });
})
document.body.appendChild(button);
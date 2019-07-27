function loader(source) {
	let reg = /url\((.+?)\)/g,
		pos = 0,
		current,
		arr = ['let list = []'];
	while (current = reg.exec(source)) { // [matchUrl, g] 
		let [matchUrl, g] = current; // matchUrl 匹配的字符串
		// console.log(matchUrl, g) // url('./logo.png') './logo.png'
		let last = reg.lastIndex - matchUrl.length;
		// arr.push(`list.push(${source.slice(pos, last)})`); // 有换行回车
		arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`);

		pos = reg.lastIndex;
		// 把 g 替换成 require 的写法 => url(require('xxx.png'))
		arr.push(`list.push('url('+require(${g})+')')`);
	}
	arr.push(`list.push(${JSON.stringify(source.slice(pos))})`);
	arr.push(`module.exports = list.join('')`);
	// 输出文本
	// // let list = []
	// // list.push("body {\n  background: red;\n  background: ")
	// // list.push('url(' + require('./logo.png') + ')')
	// // list.push(";\n}\n")
	// // module.exports = list.join('')
	// console.log(arr.join('\r\n'));
	return arr.join('\r\n');
}

module.exports = loader;
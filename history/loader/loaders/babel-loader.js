const babel = require('@babel/core');
const loaderUtils = require('loader-utils');

function loader(source) { // this loaderContext
	// console.log(Object.keys(this));
	let options = loaderUtils.getOptions(this);
	// console.log(options);
	let cb = this.async(); // 同步的话直接执行，异步的话等结果出来再帮你执行
	babel.transform(source, {
		// presets: options.presets
		...options,
		sourceMap: true,
		filename: this.resourcePath.split('/').pop() // 绝对路径的文件名，取出最后一个 index.js
	}, function (error, result) {
		cb(error, result.code, result.map); // 异步
	})
	return source;
}

module.exports = loader;
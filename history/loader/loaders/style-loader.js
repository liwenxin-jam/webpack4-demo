let loaderUtils = require('loader-utils');

function loader(source) {
	// 我们可以在style-loader中导出一个脚本
	// style.innerHTML = "body {\n  background: red;\n}\n";
	let str = `
		let style = document.createElement('style');
		style.innerHTML = ${JSON.stringify(source)};
		document.head.addpendChild(style);
	`;
	return str;
}

// 在style-loader上写了pitch，
// style-loader less-loader css-loader
loader.pitch = function (remainingRequest) {  // 剩余的请求
	// console.log(remainingRequest) // less-loader!css-loader/./index.less
	// 让style-loader 去处理 less-loader!css-loader/./index.less
	// require路径 返回的就是css-loader处理好的结果 require('!!css-loader!less-loader!index.less')
	let str = `
	let style = document.createElement('style');
	style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)});
	document.head.addpendChild(style);
`;
}

module.exports = loader;
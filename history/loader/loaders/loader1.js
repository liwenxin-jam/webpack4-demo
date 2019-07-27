function loader(source) { //  loader的参数 就是源代码
	console.log('loader1~~~');
	return source;
}

loader.pitch = function () {
	console.log('loader1.pitch');
	// return 'loader1' // 有返回数据会阻断当前loader继续执行下去
}

module.exports = loader
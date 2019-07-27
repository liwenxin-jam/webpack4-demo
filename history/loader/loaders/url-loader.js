let loaderUtils = require('loader-utils');
let mime = require('mime');

function loader(source) {
	// let options = loaderUtils.getOptions(this);
	// 解构赋值
	let { limit } = loaderUtils.getOptions(this);
	if (limit && limit > source.length) {
		return `module.exports="data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`
	} else {
		return require('./file-loader').call(this, source);
	}
}
loader.raw = true;
module.exports = loader;
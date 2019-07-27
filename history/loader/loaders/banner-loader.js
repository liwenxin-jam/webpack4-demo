let loaderUtils = require('loader-utils');
let validateOptions = require('schema-utils');
let fs = require('fs');

function loader(source) {
	// this.cacheable(false);  // webpack每次打包会调用缓存，如果设成false，就是不缓存，每次重新打包
	// this.cacheable && this.cacheable(); // 有缓存直接调用缓存，不写也可以，默认就是这样
	let options = loaderUtils.getOptions(this);
	let cb = this.async();
	let schema = {
		type: 'object',
		properties: {
			text: {
				type: 'string'
			},
			filename: {
				type: 'string'
			}
		}
	}
	validateOptions(schema, options, 'banner-loader');
	if (options.filename) {
		this.addDependency(options.filename); // 自动的添加文件依赖，让webpack的watch:true对这依赖监听生效
		fs.readFile(options.filename, 'utf8', function (err, data) {
			cb(err, `/**${data}**/${source}`);
		});
	} else {
		cb(null, `/**${options.text}**/${source}`);
	}
}

module.exports = loader;
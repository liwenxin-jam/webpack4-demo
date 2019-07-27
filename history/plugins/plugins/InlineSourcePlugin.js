const HtmlWebpackPlugin = require('html-webpack-plugin');

// 把外链的标签 变成内联的标签
class InlineSourcePlugin {
	constructor({ match }) {
		this.reg = match; // 正则
	}
	// 处理某一个标签
	proceeTag(tag, compilation) {
		// console.log(tag);
		let newTag,
			url;
		if (tag.tagName === 'link' && this.reg.test(tag.attributes.href)) {
			newTag = {
				tagName: 'style',
				attributes: { type: 'text/css' }
			};
			url = tag.attributes.href;
		}
		if (tag.tagName === 'script' && this.reg.test(tag.attributes.src)) {
			newTag = {
				tagName: 'script',
				attributes: { type: 'application/javascript' }
			};
			url = tag.attributes.src;
		}
		if (url) {
			newTag.innerHTML = compilation.assets[url].source(); // 文件的内容放到innerHTML属性上
			delete compilation.assets[url]; // 删除掉 原有应该生成的资源
			return newTag;
		}
		return tag;
	}
	// 处理引入标签的数据
	proceeTags(data, compilation) {
		let headTags = [];
		let bodyTags = [];
		data.headTags.forEach(headTag => {
			headTags.push(this.proceeTag(headTag, compilation));
		});
		data.bodyTags.forEach(bodyTag => {
			bodyTags.push(this.proceeTag(bodyTag, compilation));
		});
		return { ...data, headTags, bodyTags };
	}
	apply(compiler) {
		// 要通过webpackPlugin来实现这个功能
		compiler.hooks.compilation.tap('HtmlWebpackPlugin', (compilation) => {
			HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('alterPlugin', (data, cb) => {
				// console.log(data);
				data = this.proceeTags(data, compilation); // compilation.assets
				cb(null, data);
			})
		})
	}
}

module.exports = InlineSourcePlugin;
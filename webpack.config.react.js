const path = require('path');
const Webpack = require('webpack');

module.exports = {
	mode: 'development',
	entry: {
		react: ['react', 'react-dom']
	},
	output: {
		filename: '_dll_[name].js',  // 产生的文件名
		path: path.resolve(__dirname, 'dist'),
		library: '_dll_[name]',  // _dll_react
		// libraryTarget: 'var' // 统一资源模块 commonjs umd var this ...
	},
	plugins: [
		new Webpack.DllPlugin({
			name: '_dll_[name]',  // name == library
			path: path.resolve(__dirname, 'dist', 'manifest.json')  // 任务清单
		})
	]
}
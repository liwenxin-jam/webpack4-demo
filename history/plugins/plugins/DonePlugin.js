class DonePlugin {
	apply(compiler) { // compiler.hooks
		console.log(1);
		compiler.hooks.done.tap('DonePlugin', (status) => {
			console.log('编译完成~~~');
		})
	}
}

module.exports = DonePlugin;
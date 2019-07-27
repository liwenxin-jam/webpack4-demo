let less = require('less');

function loader(source) {
	let css;
	less.render(source, function(err, r) { // r.css
		css = r.css // 渲染后的css
	});
	return css;
}

module.exports = loader;
var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname, 'ui-src');
var BUILD_DIR = path.resolve(__dirname, 'public/javascripts');

var config = {
	entry: {
		'index':  APP_DIR + '/index/app.jsx'
	},
	output: {
		path: BUILD_DIR
	},
	module : {
		rules : [
			{
				test : /\.jsx?/,
				include : APP_DIR,
				loader : 'babel-loader'
			},
			{ test: /\.css$/, loader: "style-loader!css-loader" }
		]
	}
};

module.exports = config;
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: './index.js',
	output: {
		filename: 'index.es5.js',
		path: './',
		libraryTarget: 'commonjs2',
	},
	resolve: {
		modulesDirectories: [
			'node_modules',
		],
		extensions: ['.js', ''],
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel',
			exclude: /node_modules/,
		}],
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
	],
	target: 'node',
	externals: [nodeExternals()],
};

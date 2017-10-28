const webpack = require('webpack');
const path = require('path');

module.exports = {
	resolve: {
		extensions: ['.ts', '.js']
	},
	entry: path.resolve(__dirname, '../src/bundle.ts'),
	output: {
		// in the case of a "plain global browser library", this
		// will be used as the reference to our module that is
		// hung off of the window object.
		library: 'SengDeviceStateTracker'
	},
	module: {
		noParse: function(content) {
			return /lodash/.test(content);
		},
		rules: [
			{
				test: /\.ts$/,
				use: {
					loader: 'awesome-typescript-loader',
					options: {
						configFileName: path.resolve(__dirname, './tsconfig.webpack.json'),
					}
				},
				exclude: /node_modules/,
			}
		]
	},
	plugins: [],
	stats: {
		colors: true,
	},
};

const path = require('path')

module.exports = {
	target: 'node',
	entry: {
		index: './src/index.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['stage-3'],
						plugins: ['transform-async-to-generator']
					}
				}
			}
		]
	},
	devtool: 'inline-source-map'
}

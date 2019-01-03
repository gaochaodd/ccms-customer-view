const webpack = require('webpack');
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const { version } = require('./package.json');

const srcDir = path.join(__dirname, './src');
const buildOutputDir = path.join(__dirname, './dist/');
const webpackCommon = require('./webpack-common.config.js');


const production = () => ({
	context: srcDir,
	entry: {
		app: './index.js'
	},
	output: {
		path: buildOutputDir,
		filename: 'ccms-customer-view.js'
	},
    externals: {
        'angular': 'angular',
        'angular-resource': 'ngResource',
        'angular-ui-router': 'ui.router'
    },
	plugins: [
		new CleanPlugin([buildOutputDir]),
        new webpack.DefinePlugin({
            __DEVELOPMENT__: false
        }),
		// 配置环境变量
		new webpack.DefinePlugin({
			'process.env': {
				VERSION: JSON.stringify(version)
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			minimize: true
		})
	]
});

module.exports = () => {
	return merge(production(), webpackCommon);
};

const webpack = require('webpack');
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const { version } = require('./package.json');

const srcDir = path.join(__dirname, './src');
const buildOutputDir = path.join(__dirname, './dist/');
const webpackCommon = require('./webpack-common.config.js');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');


const production = () => ({
	context: srcDir,
	entry: {
		app: './index.js'
	},
	output: {
		path: buildOutputDir,
		filename: 'ccms-customer-view.js',
		libraryTarget: "umd"
	},
    externals: ['angular', 'angular-resource', 'angular-ui-router', 'ccms-components'],
	plugins: [
		new CleanPlugin([buildOutputDir]),

		// 将样式文件 抽取至独立文件内
		new ExtractTextWebpackPlugin({
			// 生成文件的文件名
			filename: 'ccms-customer-view.css',

			// 是否禁用插件
			disable: false,

			// 是否向所有额外的 chunk 提取（默认只提取初始加载模块）
			allChunks: true
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

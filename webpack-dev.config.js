const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const { version } = require('./package.json');

const CleanPlugin = require('clean-webpack-plugin');

const srcDir = path.join(__dirname, './src');
const buildOutputDir = path.join(__dirname, '/');
const webpackCommon = require('./webpack-common.config.js');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const development = {
	devtool: 'cheap-eval-source-map',
	context: srcDir,
    entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&reload=true', 'src/index.js'],

	output: {
		path: buildOutputDir,
		filename: 'index.js',
		publicPath: '/'
	},

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

        new webpack.DefinePlugin({
            __DEVELOPMENT__: true
        }),
		// 配置环境变量
		new webpack.DefinePlugin({
			'process.env': {
				VERSION: JSON.stringify(version)
			}
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};

module.exports = merge(development, webpackCommon);

const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const CleanPlugin = require('clean-webpack-plugin');

const srcDir = path.join(__dirname, './src');
const buildOutputDir = path.join(__dirname, '/');
const webpackCommon = require('./webpack-common.config.js');
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

        new webpack.DefinePlugin({
            __DEVELOPMENT__: true
        }),
		new webpack.HotModuleReplacementPlugin()
	]
};

module.exports = merge(development, webpackCommon);

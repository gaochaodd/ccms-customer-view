const webpack = require('webpack');
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');

const srcDir = path.join(__dirname, './src');
const buildOutputDir = path.join(__dirname, './dist');
const webpackCommon = require('./webpack-common.config.js');


const production = () => ({
	devtool: 'source-map',
	context: srcDir,
	entry: {
		app: './index.js'
	},
	output: {
		path: buildOutputDir,
		filename: 'index.js',
		publicPath: './'
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
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			minimize: true
		})
	]
});

module.exports = () => {
	return merge(production(), webpackCommon);
};

const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const srcDir = path.join(__dirname, './src');
module.exports = {
	resolve: {
		extensions: ['.js', '.json', '.less', '.html'],
		enforceExtension: false,
		modules: ['node_modules', './']
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.less/,
			include: srcDir,
			use: ExtractTextWebpackPlugin.extract({
				use: [{
					loader: 'css-loader',
					options: {
						url: true, // 启用/禁用 url() 处理
						minimize: true, // 启用/禁用 压缩
						sourceMap: false // 启用/禁用 Sourcemaps
					}
				},
					{
						loader: 'resolve-url-loader'
					},
					{
						loader: 'less-loader',
						options: {
							sourceMap: false // 启用/禁用 Sourcemaps
						}
					}]
			})
		}, {
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: true,
                    removeComments: false,
                    collapseWhitespace: false
                }
            }],
            exclude: /(node_modules|bower_components)/
		}, {
            test: /\.json$/,
            loaders: ['json-loader']
        }, {
			test: /\.(jpe?g|png|gif|svg)$/i,
			use: [{
				loader: 'file-loader?name=[path][name]-[hash:5].[ext]'
			}]
		}]
	}
};

const path = require('path');

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
            loader: "style-loader!css-loader!less-loader",
			include: srcDir
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
			loaders: [
				'url-loader'
			]
		}]
	}
};

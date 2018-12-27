const path = require('path');
const jsonServer = require('json-mock-kuitos');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfigration = require('./webpack-dev.config');

const compiler = webpack(webpackConfigration);

const app = jsonServer.create();

// 配置开发环境及热启动
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfigration.output.publicPath
}));
app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));

app.use(jsonServer.defaults({ static: path.resolve(__dirname) }));

app.use('/data-manage-x/1.0/', jsonServer.proxy('127.0.0.1', 3334));


app.listen(3333, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('started at http://localhost:3333/demo/index.html');
});

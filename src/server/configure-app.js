'use strict';

let path = require('path');
let koaLogger = require('koa-logger');
let bodyParser = require('koa-bodyparser');
//let { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');
var devMiddleware = require("koa-webpack-dev-middleware");
var hotMiddleware = require("koa-webpack-hot-middleware");
let serveStatic = require('koa-static');
let webpack = require('webpack');
let webpackConfig = require('src/client/webpack.config');

let compiledConfig = webpack(webpackConfig);

module.exports = function(app) {
    let clientPath = path.resolve(__dirname, '../client/');

    app.use(koaLogger());
    app.use(bodyParser());

    app.use(devMiddleware(compiledConfig, {
        noInfo: false,
        quiet: false,
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true,
        }
    }));

    app.use(hotMiddleware(compiledConfig, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    }));

    app.use(serveStatic(clientPath));
}

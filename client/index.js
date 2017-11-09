'use strict';

let Koa = require('koa');
let path = require('path');
let devMiddleware = require("koa-webpack-dev-middleware");
let hotMiddleware = require("koa-webpack-hot-middleware");
let serveStatic = require('koa-static');
let webpack = require('webpack');
let webpackConfig = require('./webpack.config');
let meta = require('./package.json');

let app = new Koa();
let compiledConfig = webpack(webpackConfig);
const PORT = 3001;

// webpack dev server middleware
app.use(devMiddleware(compiledConfig, {
    noInfo: false,
    quiet: false,
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
    }
}));

// webpack hot reload middleware
app.use(hotMiddleware(compiledConfig, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));

app.use(serveStatic(__dirname + '/src'));

let server = app.listen(PORT, () => {
    console.log('*****************************************************');
    console.log(`         Starting ${meta.name} app`);
    console.log(`         Listening ${PORT} port`)
    console.log(`         Time is ${(new Date()).toLocaleString()}`);
    console.log('*****************************************************');
    //
    // to prevent webpack net::ERR_INCOMPLETE_CHUNKED_ENCODING error
    server.keepAliveTimeout = 0;
});

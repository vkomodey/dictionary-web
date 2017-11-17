'use strict';

let Koa = require('koa');
let path = require('path');
let devMiddleware = require("koa-webpack-dev-middleware");
let hotMiddleware = require("koa-webpack-hot-middleware");
let send = require('koa-send');
let webpack = require('webpack');
let webpackConfig = require('./webpack.config');
let meta = require('./package.json');

let app = new Koa();
let compiledConfig = webpack(webpackConfig);
const PORT = 3001;

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

app.use(async (ctx) => {
    await send(ctx, './src/index.html');
});

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

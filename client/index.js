'use strict';

let Koa = require('koa');
let render = require('koa-ejs');
let path = require('path');
let send = require('koa-send');
let webpack = require('webpack');
let webpackConfig = require('./webpack.config');
let meta = require('./package.json');

let config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001,
    apiUrl: process.env.API_URL || 'http://localhost:3000',
}
let app = new Koa();
let compiledConfig = webpack(webpackConfig);

if ( config.env === 'development') {
    webpackConfig.entry.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');
    app.use(require('koa-webpack-dev-middleware')(compiledConfig, {
        noInfo: false,
        quiet: false,
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true,
        }
    }));

    app.use(require('koa-webpack-hot-middleware')(compiledConfig, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    }));
}

render(app, {
    root: path.join(__dirname, 'src'),
    layout: 'index',
    viewExt: 'html'
});

app.use(async (ctx) => {
    if ( ctx.path.startsWith('/assets') ) {
        let assetPath = ctx.path.slice(8, ctx.path.length);

        return await send(ctx, `./dist/${assetPath}`);
    }
    
    return await ctx.render('index', {
        apiUrl: config.apiUrl,
    });
});

let server = app.listen(config.port, () => {
    console.log('*****************************************************');
    console.log(`         Starting ${meta.name} app`);
    console.log(`         Listening ${config.port} port`)
    console.log(`         Time is ${(new Date()).toLocaleString()}`);
    console.log('*****************************************************');
    if ( config.env === 'development' ) {
        // to prevent webpack net::ERR_INCOMPLETE_CHUNKED_ENCODING error
        server.keepAliveTimeout = 0;
    }
});

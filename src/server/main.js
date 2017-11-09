'use strict';

let path = require('path');
require('app-module-path').addPath(path.resolve(__dirname, '../../'));
let Koa = require('koa');
let meta = require('package.json');
let envConfig = require('./env');

let app = new Koa();

require('./setup/koa')(app);
require('./setup/routes')(app);

app.use(ctx => {
    ctx.body = ctx.request.body;
});

let server = app.listen(envConfig.port, () => {
    let currentTime = new Date();
    console.log('*************************************');
    console.log(`**** Starting ${meta.name} app listening ${envConfig.port} port ****`);
    console.log(`**** Time is ${currentTime.toLocaleString()}  ****`);
    console.log('*************************************');
    
    // to prevent webpack net::ERR_INCOMPLETE_CHUNKED_ENCODING error
    server.keepAliveTimeout = 0;
});

'use strict';

let path = require('path');

require('app-module-path').addPath(path.resolve(__dirname, '../'));
let Koa = require('koa');
let meta = require('package.json');
let envConfig = require('./env');

let app = new Koa();

require('./setup/koa')(app);
require('./setup/routes')(app);

app.listen(envConfig.port, () => {
    /* eslint-disable */
    console.log('*****************************************************');
    console.log(`         Starting ${meta.name} app`);
    console.log(`         Listening ${envConfig.port} port`);
    console.log(`         Time is ${(new Date()).toLocaleString()}`);
    console.log('*****************************************************');
    /* eslint-enable */
});

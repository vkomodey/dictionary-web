'use strict';

let path = require('path');

require('app-module-path').addPath(path.resolve(__dirname, '../'));
require('./setup/patch');
let Koa = require('koa');
let mongoose = require('mongoose');
let meta = require('package.json');
let envConfig = require('./env');

let app = new Koa();

mongoose.connect(envConfig.mongodb, () => {
    /* eslint-disable */
    console.log(`        MongoDB connected to ${envConfig.mongodb}`);
    console.log('*******************************************************');
    /* eslint-enable */
});

require('./setup/koa')(app);
require('./setup/routes')(app);

app.listen(envConfig.port, () => {
    /* eslint-disable */
    console.log('*******************************************************');
    console.log(`        Starting ${meta.name} app`);
    console.log(`        Listening ${envConfig.port} port`);
    console.log(`        Time is ${(new Date()).toLocaleString()}`);
    /* eslint-enable */
});

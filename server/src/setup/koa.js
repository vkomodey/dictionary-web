'use strict';

let koaLogger = require('koa-logger');
let bodyParser = require('koa-bodyparser');

module.exports = (app) => {
    app.use(koaLogger());
    app.use(bodyParser());
};

'use strict';

let path = require('path');
let koaLogger = require('koa-logger');
let bodyParser = require('koa-bodyparser');

module.exports = function(app) {
    let clientPath = path.resolve(__dirname, '../client/');

    app.use(koaLogger());
    app.use(bodyParser());
}

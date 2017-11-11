'use strict';

let koaLogger = require('koa-logger');
let bodyParser = require('koa-bodyparser');
let httpStatuses = require('src/constants/http');

module.exports = (app) => {
    app.use(koaLogger());
    app.use(bodyParser());

    app.use(async (ctx, next) => {
        ctx.respondSuccess = (response) => {
            ctx.status = httpStatuses.success;
            ctx.body = response;
        };

        ctx.internalError = (err) => {
            ctx.status = httpStatuses.internalError;
            ctx.body = {
                message: err ? err.toString() : 'Internal error',
            };
        };

        await next();
    });
};

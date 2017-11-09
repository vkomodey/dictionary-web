'use strict';

let Router = require('koa-router');
let pairRouter = require('src/modules/pair');
let { apiPrefix } = require('src/env');

module.exports = (app) => {
    let mainRouter = new Router();
    let url = u => `${apiPrefix}/${u}`;
    
    mainRouter.use(url('pairs'), pairRouter.routes());
    app.use(pairRouter.routes());
}

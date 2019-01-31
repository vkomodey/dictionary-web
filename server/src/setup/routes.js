'use strict';

let Router = require('koa-router');
let pairRouter = require('src/modules/pair');
let categoryRouter = require('src/modules/category');
let { apiPrefix } = require('src/env');

module.exports = (app) => {
    let mainRouter = new Router();

    addRoute(mainRouter, pairRouter, app, 'pairs');
    addRoute(mainRouter, categoryRouter, app, 'categories');

    app.use(ctx => ctx.notFound('Page not found'));
};

function addRoute(mainRouter, childRouter, app, path) {
    let url = u => `${apiPrefix}/${u}`;

    mainRouter.use(url(path), childRouter.routes());
    app.use(childRouter.routes());
}

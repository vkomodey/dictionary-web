'use strict';

let Router = require('koa-router');

let router = new Router();

router.get('/:id', getById);
router.get('/', getAll);

function getById(ctx) {
    let { id } = ctx.params;

    ctx.body = { id };
}

function getAll(ctx) {
    ctx.body = 'Get All is not implemented';
}

module.exports = router;

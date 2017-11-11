'use strict';

let Router = require('koa-router');
let Pair = require('./model');

let router = new Router();

router.get('/:id', findById);
router.get('/', findAll);
router.post('/', create);

async function findById(ctx) {
    let { id } = ctx.params;

    try {
        ctx.body = await Pair.findById(id);
    } catch (err) {
        ctx.internalError(err);
    }
}

async function findAll(ctx) {
    try {
        ctx.respondSuccess(await Pair.find());
    } catch (err) {
        ctx.internalError(err);
    }
}

async function create(ctx) {
    try {
        ctx.respondSuccess(await Pair.create(ctx.request.body));
    } catch (err) {
        ctx.internalError(err);
    }
}

module.exports = router;

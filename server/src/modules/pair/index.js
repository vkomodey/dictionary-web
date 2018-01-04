'use strict';

let Router = require('koa-router');
let Pair = require('./model');

let router = new Router();

router.get('/:id', findById);
router.get('/', findAll);
router.post('/', create);
router.delete('/:id', remove);

async function findById(ctx) {
    try {
        ctx.body = await Pair.findById(ctx.params.id);
    } catch (err) {
        ctx.internalError(err);
    }
}

async function findAll(ctx) {
    let query = ctx.query || {};

    try {
        ctx.respondSuccess(await Pair.find(query));
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

async function remove(ctx) {
    try {
        ctx.respondSuccess(await Pair.remove({ _id: ctx.params.id }));
    } catch (err) {
        ctx.internalError(err);
    }
}

module.exports = router;

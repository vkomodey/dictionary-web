'use strict';

let Router = require('koa-router');
let Category = require('./model');
let Pair = require('./../pair/model');

let router = new Router();

router.get('/:id', findById);
router.get('/', findAll);
router.post('/', create);
router.delete('/:id', remove);

async function findById(ctx) {
    try {
        ctx.body = await Category.findById(ctx.params.id);
    } catch (err) {
        ctx.internalError(err);
    }
}

async function findAll(ctx) {
    try {
        ctx.respondSuccess(await Category.find());
    } catch (err) {
        ctx.internalError(err);
    }
}

async function create(ctx) {
    try {
        ctx.respondSuccess(await Category.create(ctx.request.body));
    } catch (err) {
        ctx.internalError(err);
    }
}

async function remove(ctx) {
    try {
        await Category.remove({ _id: ctx.params.id });
        await Pair.remove({ categoryId: ctx.params.id });
        ctx.respondSuccess({ categoryId: ctx.params.id });
    } catch (err) {
        ctx.internalError(err);
    }
}

module.exports = router;

'use strict';

let Router = require('koa-router');
let Category = require('src/modules/category/model');
let Pair = require('./model');

let router = new Router();

router.get('/:id', findById);
router.get('/', findAll);
router.post('/', create);
router.delete('/multiple', removeMultiple);
router.delete('/:id', remove);
router.post('/move', move);

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

async function removeMultiple(ctx) {
    try {
        let ids = ctx.query.ids.split(',');

        await Pair.remove({ _id: { $in: ids } });
        ctx.respondSuccess({ ids });
    } catch (err) {
        ctx.internalError(err);
    }
}

async function move(ctx) {
    try {
        let { newCategoryId } = ctx.query;
        let ids = ctx.query.ids.split(',');
        let isNewCategoryExists = await Category.findById(newCategoryId);

        if (isNewCategoryExists) {
            let result = await Pair.update(
                { _id: { $in: ids } },
                { $set: { categoryId: newCategoryId } },
                { multi: true }
            );

            ctx.respondSuccess({ result });
        }
    } catch (err) {
        ctx.internalError(err);
    }
}

module.exports = router;

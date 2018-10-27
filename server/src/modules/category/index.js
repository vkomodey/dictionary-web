'use strict';

let _ = require('lodash');
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
        let categories = await Category.find().lean().exec();

        let pairStatistics = await Pair.aggregate([
            {
                $group: {
                    _id: '$categoryId',
                    count: { $sum: 1 },
                },
            },
        ]);

        for (let category of categories) {
            let pairStats = pairStatistics.find(s => s._id.toString() === category._id.toString());

            category.pairAmount = _.get(pairStats, 'count', 0);
        }

        ctx.respondSuccess(categories);
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

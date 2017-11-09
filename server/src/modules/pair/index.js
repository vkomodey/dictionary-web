'use strict';

let Router = require('koa-router');
let Pair = require('./model');

let router = new Router();

router.get('/:id', findById);
router.get('/', findAll);
router.post('/', create);

async function findById(ctx) {
    let { id } = ctx.params;

    ctx.body = await Pair.findById(id);
}

async function findAll(ctx) {
    ctx.body = await Pair.find();
}

async function create(ctx) {
    try {
        ctx.body = await Pair.create(ctx.request.body);
    } catch (err) {
        ctx.status = 500;
        ctx.body = 'Internaal';
    }
}

module.exports = router;

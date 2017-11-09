'use strict';

let mongoose = require('mongoose');
let shortid = require('shortid');

let pairSchema = new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    ruText: { type: String, requried: true },
    enText: { type: String, required: true },
});

module.exports = mongoose.model('pair', pairSchema);

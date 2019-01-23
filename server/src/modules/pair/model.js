'use strict';

let mongoose = require('mongoose');
let languages = require('src/utils/langs');
let { defaultOptions } = require('src/utils/db.schema');

let langCodes = Object.keys(languages);

let pairSchema = new mongoose.Schema({
    categoryId: { type: String, required: true },
    firstLangExpression: { type: String, requried: true },
    secondLangExpression: { type: String, required: true },
    firstLang: { type: String, required: true, enum: langCodes },
    secondLang: { type: String, required: true, enum: langCodes },
}, defaultOptions);

module.exports = mongoose.model('pair', pairSchema);

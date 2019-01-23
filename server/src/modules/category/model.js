'use strict';

let mongoose = require('mongoose');
let languages = require('src/utils/langs');
let { defaultOptions } = require('src/utils/db.schema');

let langCodes = Object.keys(languages);

let categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    firstLang: { type: String, required: true, enum: langCodes },
    secondLang: { type: String, required: true, enum: langCodes },
}, defaultOptions);

module.exports = mongoose.model('category', categorySchema);

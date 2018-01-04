'use strict';

let mongoose = require('mongoose');
let shortid = require('shortid');
let languages = require('src/utils/langs');

let langCodes = Object.keys(languages);

let categorySchema = new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    name: { type: String, required: true, unique: true },
    firstLang: { type: String, required: true, enum: langCodes },
    secondLang: { type: String, required: true, enum: langCodes },
});

module.exports = mongoose.model('category', categorySchema);

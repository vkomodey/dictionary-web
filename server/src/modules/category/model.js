'use strict';

let mongoose = require('mongoose');
let _ = require('lodash');
let shortid = require('shortid');
let languages = require('src/utils/langs');

let langCodes = Object.keys(languages);

function omitPrivate(doc, obj) {
    return _.omit(obj, ['__v']);
}

let options = {
    toObject: { virtuals: true, transform: omitPrivate },
};
let categorySchema = new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    name: { type: String, required: true, unique: true },
    firstLang: { type: String, required: true, enum: langCodes },
    secondLang: { type: String, required: true, enum: langCodes },
}, options);

module.exports = mongoose.model('category', categorySchema);

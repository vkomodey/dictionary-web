'use strict';

let mongoose = require('mongoose');
let shortid = require('shortid');

mongoose.plugin((schema) => {
    schema.add({ _id: String });
    schema.pre('save', function generateId(next) {
        if (!this._id) {
            this._id = shortid.generate();
        }

        next();
    });
    schema.pre('insertMany', (next, documents) => {
        documents.forEach((doc) => {
            let newDoc = doc;

            if (!newDoc._id) {
                newDoc._id = shortid.generate();
            }

            return newDoc;
        });

        next();
    });
});

mongoose.Promise = global.Promise;

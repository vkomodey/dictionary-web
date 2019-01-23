'use strict';

module.exports = {
    defaultOptions: {
        versionKey: false,
        toObject: {
            virtuals: true,
            transform: (doc, ret) => {
                /* eslint-disable  no-param-reassign */
                ret.id = ret._id;

                delete ret._id;
                /* eslint-enable no-param-reassign */
            },
        },
        toJSON: {
            transform: (doc, ret) => {
                /* eslint-disable  no-param-reassign */
                ret.id = ret._id;

                delete ret._id;
                /* eslint-enable no-param-reassign */
            },
        },
    },
};

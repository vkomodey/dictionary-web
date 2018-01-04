'use strict';

let Category = require('./modules/category/model');
let Pair = require('./modules/pair/model');
let { defaultCategory } = require('./constants/seeds');

module.exports = async function startupTasks() {
    let existingCategory = await Category.findOne({ name: defaultCategory.name });

    if (!existingCategory) {
        let category = {
            name: defaultCategory.name,
            firstLang: 'en',
            secondLang: 'ru',
        };

        await Category.create(category);
    }

    await Pair.update({
        categoryId: { $exists: false },
    }, {
        categoryId: existingCategory._id,
    }, {
        multi: true,
    });
};

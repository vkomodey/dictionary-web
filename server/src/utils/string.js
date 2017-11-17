'use strict';

module.exports = {
    toUpperSnakeCase,
};

function toUpperSnakeCase(str) {
    // eslint-disable-next-line
    let snakeCased = str.replace(/([A-Z])/g, '_\$&');

    return snakeCased.toUpperCase();
}

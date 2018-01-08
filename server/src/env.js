'use strict';

let stringUtils = require('src/utils/string');

let config = {
    nodeEnv: 'development',
    port: 3000,
    host: 'localhost',
    schema: 'http',
    apiPrefix: '/v1',
    mongodbUrl: 'mongodb://localhost:27017/dictionary',
};

let proxiedConfig = new Proxy(config, {
    get(target, key) {
        let configValue = config[key];
        let envKey = stringUtils.toUpperSnakeCase(key);
        let envValue = getEnv(envKey);

        return envValue || configValue;
    },
});

function getEnv(key) {
    return process.env[key] || '';
}

module.exports = proxiedConfig;

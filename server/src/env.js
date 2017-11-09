'use strict';

module.exports = {
    env: 'development',
    port: '3000',
    host: 'localhost',
    schema: 'http',
    apiPrefix: '/v1',
    combineUrl() {
        return `${this.schema}://${this.host}:${this.port}`;
    },
    mongodb: 'mongodb://localhost:27017',
};

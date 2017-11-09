'use strict';

module.exports = {
    env: 'development',
    port: '3000',
    host: 'localhost',
    schema: 'http',
    apiPrefix: '/v1',
    combineUrl: function() {
        return `${this.schema}://${this.host}:${this.port}`;
    }
}

'use strict';

module.exports = {
    env: 'development',
    port: '3000',
    host: 'localhost',
    schema: 'http',
    combineUrl: function() {
        return `${this.schema}://${this.host}:${this.port}`;
    }
}

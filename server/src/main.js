'use strict';

let path = require('path');

require('app-module-path').addPath(path.resolve(__dirname, '../'));
require('./setup/patch');
let Koa = require('koa');
let cors = require('koa2-cors');
let mongoose = require('mongoose');
let meta = require('package.json');
let envConfig = require('./env');
let startupTasks = require('./startup');

let app = new Koa();

app.use(cors());

mongoose.connect(envConfig.mongodbUrl, {
    useMongoClient: true,
}).then(() => {
    /* eslint-disable */
    console.log(`MongoDB connected to ${envConfig.mongodbUrl}`);
    console.log('*******************************************************');
    /* eslint-enable */
});

require('./setup/koa')(app);
require('./setup/routes')(app);

app.listen(envConfig.port, () => {
    startupTasks();
    /* eslint-disable */
    console.log('*******************************************************');
    console.log(`Starting ${meta.name} app`);
    console.log(`Listening ${envConfig.port} port`);
    console.log(`Time is ${(new Date()).toLocaleString()}`);
    /* eslint-enable */
});

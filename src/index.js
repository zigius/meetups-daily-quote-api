'use strict';

const Koa        = require('koa');
const Router     = require('koa-router');
const config     = require('config');
const bodyParser = require('koa-bodyparser');
const sqs        = require('./clients/sqs');

const app    = new Koa();
const router = new Router();

router.post('/send', async (ctx, next) => {
    await sqs.sendMessage('SEND_DAILY_QUOTE', {
        to        : ctx.request.body.to,
        dailyQuote: ctx.request.body.dailyQuote
    });
});

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(config.server.port);
console.log(`running on port: ${config.server.port}`);
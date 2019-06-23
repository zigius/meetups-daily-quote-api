'use strict';

const Koa              = require('koa');
const Router           = require('koa-router');
const config           = require('config');
const bodyParser       = require('koa-bodyparser');
const sqs              = require('./clients/sqs');
const dailyQuoteClient = require('./clients/dailyQuoteClient');

const app    = new Koa();
const router = new Router();

router.post('/send', async (ctx) => {

    const to         = ctx.request.body.to;
    const dailyQuote = await dailyQuoteClient.getDailyQuote();
    await sqs.sendMessage('SEND_DAILY_QUOTE', {
        to,
        dailyQuote
    });
    console.log(`sent quote to queue. to: ${to}`);
    ctx.body   = { message: 'OK' };
    ctx.status = 200;
});

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(config.server.port);
console.log(`running on port: ${config.server.port}`);

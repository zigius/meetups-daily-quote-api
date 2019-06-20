'use strict';

const config  = require('config');
const request = require('superagent');


const defaultQuote = 'A man must pay to get a daily quote or else he will be throttled. Zigius';

exports.getDailyQuote = async () => {
    try {
        const response = await request.get(`${config.quotesRest.url}/qod`);
        return `${response.body.contents.quotes[0].quote}. ${response.body.contents.quotes[0].author}`;
    } catch (err) {
        console.error(err);
        return defaultQuote;
    }
};

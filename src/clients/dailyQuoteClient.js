'use strict';

const request = require('superagent');

exports.getDailyQuote = async () => {
    try {
        const response = await request.get('https://quotes.rest/qod');
        return `${response.body.contents.quotes[0].quote}. ${response.body.contents.quotes[0].author}`;
    } catch (err) {
        console.error(err);
        return 'A man must pay to get a daily quote or else he will be throttled. Zigius';
    }
};

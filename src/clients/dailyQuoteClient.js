'use strict';

const request     = require('superagent');

exports.getDailyQuote = async () => {

    const response = await request.get('https://quotes.rest/qod');
    return response.body.contents.quotes[0].quote;
};

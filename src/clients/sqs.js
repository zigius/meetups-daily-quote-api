'use strict';

const config = require('config');
const AWS    = require('aws-sdk');

const sqs = new AWS.SQS(config.sqs.options);

exports.sendMessage = async (type, content) => {
    const params = {
        MessageBody: JSON.stringify({
            type,
            content
        }),
        QueueUrl   : config.sqs.url
    };

    try {
        await sqs.sendMessage(params).promise();
    } catch (error) {
        console.error(error);
    }
};

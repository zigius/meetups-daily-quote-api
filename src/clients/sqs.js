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
          console.log('message sent to queue', params);
    } catch (error) {
        console.error(error);
    }
};

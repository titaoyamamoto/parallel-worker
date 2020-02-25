var amqp = require('amqplib/callback_api');
//const cache = require('./services/cache/redisdb');
const uuidv1 = require('uuid/v1');
const axios = require('axios');

const { rabbitMQConfig, logstashConfig } = require('./application.config');

const Net = require('net');
const client = new Net.Socket();

let start = setInterval(async () => {

    try {
        console.log('Check RabbitMQ and Logstash to start server...');
        const healthCheckRabbitMQ = await axios.get(rabbitMQConfig.healthCheckUrl());
        const healthCheckLogstash = await axios.get(logstashConfig.healthCheckUrl());

        if (healthCheckRabbitMQ && healthCheckLogstash) {
            startServer();
            clearInterval(start);
        }
    } catch (ex) {

    }

}, rabbitMQConfig.healthCheckTime);

let startServer = async () => {
    await client.connect({ host: logstashConfig.host, port: logstashConfig.port }, function () {
        console.log('[*] Connected with TCP logstash.');
    });

    amqp.connect(rabbitMQConfig.connectionString(), function (err, conn) {

        conn.createChannel(function (err, ch) {

            ch.assertQueue(rabbitMQConfig.queueName, { durable: false });
            ch.prefetch(rabbitMQConfig.prefetch);
            console.log(`[*] Waiting for messages in RabbitMQ for ${rabbitMQConfig.queueName}.`);

            ch.consume(rabbitMQConfig.queueName, async function (msg) {

                let clientId = msg.content.toString();
                let eventLogId = uuidv1();

                let eventLog = {
                    id: eventLogId,
                    clientId: clientId,
                    startTime: new Date(),
                };

                try {
                    console.log(` [x] Received clientId:${clientId} | eventLogId ${eventLogId}`);

                    //mock
                    let justExample = [
                        { id: '1-1abc1', name: 'name1', description: 'desc1', category: 'cate1', subcategory: 'sub1' },
                        { id: '1-1abc2', name: 'name2', description: 'desc2', category: 'cate2', subcategory: 'sub2' },
                        { id: '1-1abc3', name: 'name3', description: 'desc3', category: 'cate3', subcategory: 'sub3' }
                    ];

                    await cache.setByKey(clientId, justExample);

                    eventLog.endTime = new Date();
                    client.write(JSON.stringify(eventLog) + '\n');
                    ch.ack(msg); //confirm message

                } catch (error) {

                    console.log(`Error - clientId:${clientId} | eventLog:${eventLogId} | ${JSON.stringify(eventLog)}`)
                    eventLog.errorTime = new Date();
                    eventLog.error = error.stack;
                    client.write(JSON.stringify(eventLog) + '\n');

                    ch.nack(msg); //reject message
                }

            }, { noAck: rabbitMQConfig.noAck });
        });
    });

}





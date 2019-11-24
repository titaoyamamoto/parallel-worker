var amqp = require('amqplib');
const { rabbitMQConfig } = require('../../../application.config');

var conn = {};
var channel = {};

const openConnection = async () => {
    conn = await amqp.connect(rabbitMQConfig.connectionString());
    channel = await conn.createChannel();
    await channel.assertQueue(rabbitMQConfig.queueName, { durable: false });
}

const push = async (clientId) => {
    await channel.sendToQueue(rabbitMQConfig.queueName, Buffer.from(clientId));
}

const closeConnection = async () => {
    await channel.close();
    await conn.close();
}

const getCount = async () => {
    const conn = await amqp.connect(rabbitMQConfig.connectionString());
    const channel = await conn.createChannel();
    let assert = await channel.assertQueue(rabbitMQConfig.queueName, { durable: false });

    return assert.messageCount;
}

module.exports = {
    openConnection,
    closeConnection,
    push,
    getCount
}
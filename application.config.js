const redisDBConfig = {
    host: 'redisdb',
    port: 6379,
    destroy: 28800 //in seconds
}

const rabbitMQConfig = {
    host: 'rabbitmq',
    port: 5672,
    username: 'rabbitmq',
    password: 'rabbitmq',
    queueName: 'clientIdList',
    connectionString (){
        return `amqp://${this.username}:${this.password}@${this.host}:${this.port}`;
    }
}

module.exports = {
    redisDBConfig,
    rabbitMQConfig
}
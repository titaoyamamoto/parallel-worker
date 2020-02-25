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
    prefetch: 5,
    healthCheckTime: 5000,
    apiPort: 15672,
    noAck: false, //manual acknowledgment mode
    urlRabbitMq(){
        return `${this.username}:${this.password}@${this.host}`;
    },
    connectionString (){
        return `amqp://${this.urlRabbitMq()}:${this.port}`;
    },
    healthCheckUrl(){
        return `http://${this.urlRabbitMq()}:${this.apiPort}/api/overview`;
    }
}

const logstashConfig ={
    host: 'logstash',
    port: 5400,
    apiPort: 9600,
    healthCheckUrl(){
        return `http://${this.host}:${this.apiPort}/?pretty`;
    }
}

module.exports = {
    redisDBConfig,
    rabbitMQConfig,
    logstashConfig
}
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
    noAck: false, //manual acknowledgment mode
    connectionString (){
        return `amqp://${this.username}:${this.password}@${this.host}:${this.port}`;
    }
}

const logstashConfig ={
    host: 'logstash',
    port: 5400,
    urlPost(){
        return `http://${this.host}:${this.port}/`;
    }
}

module.exports = {
    redisDBConfig,
    rabbitMQConfig,
    logstashConfig
}
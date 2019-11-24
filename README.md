# parallel-worker  

parallel-worker is a way to improve efficiency and reduce time. Created to support a main project, finding eligible and compatible offers to users. These code, in the repository, is just to understand the problem and a way to follow.

![parallel-worker architecture](https://miro.medium.com/max/4068/1*cegj7YPpi7ot-3whG0VGOg.png)

You can find more about this project in these links:

- portuguese: [https://medium.com/@titaoyamamoto/parallel-worker-27c4d30916d1](https://medium.com/@titaoyamamoto/parallel-worker-27c4d30916d1)

Technologies:

[Docker](https://www.docker.com) - To up all infrastructure and scale the "workers";

[HapiJS](https://hapijs.com) - To create the API and endpoints;

[Swagger](https://github.com/glennjones/hapi-swagger) - HapiJS's plugin to create the documentation using the input and output configurations;

[RabbitMQ](https://www.rabbitmq.com/) - A message broker to manager the parallel job;

[NodeJS](https://nodejs.org/en/) - The "worker", used to find the eligible and compatible offers to users, save in cache (Redisdb) and save the log informations;

[RedisDB](https://redis.io) - Used to store the users and offers informations;

[ELKStack](https://www.elastic.co/) - Used to store the informations and to create a dashboard with the performance informations.

## Configurations

Accessing the **application.config.js** file, you can change the file with your informations. In a root and the "woker" folder.

## Running  

To run the API is possible to use the makefile or do specific code separate.

**Using Makefile** - You can check commands in makefile

Up all infrastructure

```bash
make up
```

Down all infrastructure

```bash
make down
```

**Up specific service** - Is possible to create and start specific services to teste separate


Up just the RedisDB

```bash
make redisdb
```

Up just the RabbitMQ

```bash
make rabbitmq
```

Up just the Worker

```bash
make worker
```

## Endpoints

You can check and test the endpoint accessing the swagger:

API - [http://localhost:3000/documentation](http://localhost:3000/documentation)

RedisDB (using client) - [http://localhost:6379](http://localhost:6379)

RabbitMQ - [http://localhost:15672](http://localhost:15672)

Kibana - [http://localhost:5601](http://localhost:5601)
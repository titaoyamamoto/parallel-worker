const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

let Routes = require('./src/routes');

(async () => {
    const server = await new Hapi.Server({
        host: '0.0.0.0',
        port: 3000
    });

    const swaggerOptions = {
        info: {
            title: 'Parallel Worker - API Documentation',
            version: Pack.version,
        },
        documentationPage: process.env.NODE_ENV !== 'production'
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch (err) {
        console.log(err);
    }

    server.route(Routes);
})();
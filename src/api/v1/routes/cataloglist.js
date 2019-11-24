const Joi = require('@hapi/joi');
var controller = require('../controllers/cataloglist');

module.exports = [
    {
        method: 'POST',
        path: '/cataloglist/clientsAvailables',
        config: {
            handler: controller.clientsAvailables,
            description: 'Result',
            notes: ['Endpoint to communication with watson assistant.'],
            validate: {
                payload: {
                    offersIds: Joi.array().items(Joi.array().items(Joi.string())),
                }
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            description: 'Success',
                            schema: Joi.object({
                                statusCode: Joi.number(),
                                message: Joi.string()
                            }).label('Result')
                        },
                        '500': {
                            description: 'Internal Server Error',
                            schema: Joi.object({
                                statusCode: Joi.number(),
                                message: Joi.string()
                            }).label('Result')
                        }
                    }
                }
            },
            tags: ['api', 'querycatalog', 'querycataloglist'],
        }
    }
];
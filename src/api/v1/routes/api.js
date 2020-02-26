const Joi = require('@hapi/joi');
var api = require('../controllers/api');

module.exports = [
    {
        method: 'POST',
        path: '/api/offersAvailableToClient',
        config: {
            handler: api.offersAvailableToClient,
            description: 'Result',
            notes: ['Endpoint to find the offers available to client.'],
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
            tags: ['api', 'offers', 'client'],
        }
    }
];
const { clientIdList } = require('../../../resource/mockLists');

const cache = require('../../../service/cache/redisdb');
const queue = require('../../../service/queue/rabbitmq');

require("../../../resource/polyfill");

const offersAvailableToClient = async (request, reply) => {

    let { offersIds } = request.payload;

    try {

        let clients = await cache.getAllKeys();

        //register queues
        if (clients.length == 0) {
            await queue.openConnection();

            await clientIdList.syncForEach(async (clientId) => {
                console.log(clientId);
                await queue.push(clientId);
            });

            await queue.closeConnection();

            return reply.response(
                {
                    statusCode: 200,
                    message: 'Creating the database, please, try again..',
                }).code(200);
        }

        let offersUsersAvailableList = [];
        await offersIds.syncForEach(async (offers) => {
            await clients.syncForEach(async (client) => {
                let clientId = client.key;

                let clientOffers = client.value.map(x => x.id);
                let intersectionList = await offers.intersection(clientOffers);

                let offerName = offers.join(',');

                if (offers.length == intersectionList.length) {

                    let hasInList = offersUsersAvailableList.find(x => x.offer == offerName);
                    if (hasInList) {
                        hasInList.count++;
                        hasInList.users.push(clientId);
                    } else {
                        let newObj = {
                            offer: offerName,
                            count: 1,
                            users: [clientId]
                        }
                        offersUsersAvailableList.push(newObj);
                    }
                } else {
                    let hasInList = offersUsersAvailableList.find(x => x.offer == offerName);
                    if (!hasInList) {
                        let newObj = {
                            offer: offerName,
                            count: 0,
                            users: []
                        }

                        offersUsersAvailableList.push(newObj);
                    }
                }
            });
        });

        return reply.response(
            {
                statusCode: 200,
                message: 'Success',
                availables: offersUsersAvailableList,
            }).code(200);

    } catch (error) {
        console.error('error: ', error);
    }
}

module.exports = {
    offersAvailableToClient,
}
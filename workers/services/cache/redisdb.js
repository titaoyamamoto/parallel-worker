const redis = require("redis");
const { redisDBConfig } = require('../../application.config');

const client = redis.createClient(redisDBConfig.port, redisDBConfig.host);

const setByKey = async (user, context) => {
    await client.set(user, JSON.stringify(context), 'EX', redisDBConfig.destroy); //EX = number in seconds, to destroy object
}

const getByKey = async (user) => {
    return await (new Promise(async (resolve, reject) => {
        await client.get(user,
            (err, response) => {
                if (err) reject(err);
                else resolve(response);
            })
    }));
}
const getAllKeys = async () => {
    return await (new Promise(async (resolve, reject) => {
        await client.keys('*',
            (err, response) => {
                if (err) reject(err);
                else resolve(response);
            })
    }));
}

const delByKey = async (user) => {
    await client.del(user);
}

module.exports = {
    setByKey,
    getByKey,
    getAllKeys,
    delByKey
}

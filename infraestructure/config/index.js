const env = process.env.NODE_ENV;

const development = {
    database: {
        connection_uri: process.env.MONGO_URI,
        name: 'voicemod'
    }
};

const test = {
    database: {
        connection_uri: process.env.MONGO_URI,
        name: 'test'
    }
};

const config = {
    development,
    test
};

module.exports = config[env];
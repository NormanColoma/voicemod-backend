const env = process.env.NODE_ENV;

const development = {
    database: {
        connection_uri: process.env.MONGO_URI,
        name: 'voicemod'
    },
    server: {
        port: 3000
    }
};

const test = {
    database: {
        connection_uri: process.env.MONGO_URI,
        name: 'test'
    },
    server: {
        port: 3333
    }
};

const config = {
    development,
    test
};

module.exports = config[env];
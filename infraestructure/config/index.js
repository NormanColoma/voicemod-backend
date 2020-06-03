const env = process.env.NODE_ENV;

const development = {
    database: {
        connection_uri: process.env.MONGO_URI,
        name: 'voicemod'
    },
    server: {
        port: 3000
    },
    security: {
        jwtSecretKey: process.env.JWT_SECRET
    }
};

const test = {
    database: {
        connection_uri: process.env.MONGO_URI,
        name: 'test'
    },
    server: {
        port: 3333
    },
    security: {
        jwtSecretKey: 'secret'
    }
};

const config = {
    development,
    test
};

module.exports = config[env];
const { MongoClient: mongo } = require('mongodb');
const { connection_uri, name } = require('../../config').database;

class MongoDbHandler {
    async connect() {
        const client = await mongo.connect(connection_uri, {useNewUrlParser: true, useUnifiedTopology: true});
        this._db = client.db(name);
        return this._db;
    }
}

module.exports = MongoDbHandler;
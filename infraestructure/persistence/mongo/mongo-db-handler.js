const { MongoClient: mongo } = require('mongodb');
const { connection_uri, name } = require('../../config').database;

class MongoDbHandler {
    async getInstance() {
        if(!this._db) {
            await this._connect();
        }
        return Promise.resolve(this._db);
    }

    async _connect() {
        const client = await mongo.connect(connection_uri, {useNewUrlParser: true, useUnifiedTopology: true});
        this._db = client.db(name);
    }
}

module.exports = MongoDbHandler;
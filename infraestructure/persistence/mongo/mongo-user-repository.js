const { ObjectID } = require('mongodb');
const { toDomain } = require('./parser');

class MongoUserRepository {
    constructor({ db }) {
        this._db = db;
    }

    async find(id) {
        const conn = await this._db.connect();

        const document = await conn.collection('users').findOne({ '_id': new ObjectID(id) });
        return toDomain(document);

        conn.close();
    }

    async save(user) {
        const conn = await this._db.connect();

        const userDocument = { _id: new ObjectID(user.id), name: user.name, info: user.info, password: user.password };
        await conn.collection('users').insertOne(userDocument);

        conn.close();
    }
}

module.exports = MongoUserRepository;
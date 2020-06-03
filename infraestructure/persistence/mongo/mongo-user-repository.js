const { ObjectID } = require('mongodb');
const { toDomain } = require('./parser');

class MongoUserRepository {
    constructor({ db }) {
        this._db = db;
    }

    async find(id) {
        const conn = await this._db.connect();

        const document = await conn.collection('users').findOne({ '_id': new ObjectID(id) });

        this._db.disconnect();

        return toDomain(document);
    }

    async findByEmail(email) {
        const conn = await this._db.connect();
        const document = await conn.collection('users').findOne({ email });

        this._db.disconnect();

        return document ? toDomain(document) : null;
    }

    async save(user) {
        const conn = await this._db.connect();

        const userDocument = { _id: new ObjectID(user.id), name: user.name, info: user.info, password: user.password };
        await conn.collection('users').insertOne(userDocument);

        this._db.disconnect();
    }

    async delete(id) {
        const conn = await this._db.connect();
        await conn.collection('users').remove({ _id: new ObjectID(id) });

        this._db.disconnect();
    }
}

module.exports = MongoUserRepository;
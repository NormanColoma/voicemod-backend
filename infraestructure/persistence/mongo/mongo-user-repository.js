const { ObjectID } = require('mongodb');
const { toDomain, toDocument } = require('./parser');

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

        const userDocument = toDocument(user);
        await conn.collection('users').replaceOne({_id: userDocument._id }, userDocument, { upsert: true });

        this._db.disconnect();
    }

    async delete(id) {
        const conn = await this._db.connect();
        await conn.collection('users').remove({ _id: new ObjectID(id) });

        this._db.disconnect();
    }
}

module.exports = MongoUserRepository;

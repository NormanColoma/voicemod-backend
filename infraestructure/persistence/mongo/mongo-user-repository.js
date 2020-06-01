const { ObjectID } = require('mongodb');
const User = require('../../../domain/user/user');

class MongoUserRepository {
    constructor({ db }) {
        (async () => {
            this._db = await db.getInstance();
        })();
    }

    async find(id) {
        const document = await this._db.collection('users').findOne({ '_id': new ObjectID(id) });
        return new User(document._id, document.name);
    }

    async save(user) {
        const userDocument = { '_id': new ObjectID(user.id), name: user.name };
        await this._db.collection('users').insertOne(userDocument);
    }
}

module.exports = MongoUserRepository;
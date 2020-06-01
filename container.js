const awilix = require('awilix');
const userRepository = require('./domain/user/user-repository')
const MongoUserRepository = require('./infraestructure/persistence/mongo/mongo-user-repository');
const MongoDbHandler = require('./infraestructure/persistence/mongo/mongo-db-handler');
const CreateUser = require('./application/create-user');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

container.register({
    db: awilix.asClass(MongoDbHandler),
    mongoUserRepository: awilix.asClass(MongoUserRepository),
    userRepository: awilix.asFunction(userRepository),
    createUser: awilix.asClass(CreateUser)
});

module.exports = container;
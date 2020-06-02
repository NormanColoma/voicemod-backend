const awilix = require('awilix');
const userRepository = require('./domain/user/user-repository')
const MongoUserRepository = require('./infraestructure/persistence/mongo/mongo-user-repository');
const MongoDbHandler = require('./infraestructure/persistence/mongo/mongo-db-handler');
const RegisterUser = require('./application/register-user');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

container.register({
    db: awilix.asClass(MongoDbHandler),
    mongoUserRepository: awilix.asClass(MongoUserRepository),
    userRepository: awilix.asFunction(userRepository),
    registerUser: awilix.asClass(RegisterUser)
});

module.exports = container;
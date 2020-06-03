const awilix = require('awilix');
const userRepository = require('./domain/user/user-repository')
const MongoUserRepository = require('./infraestructure/persistence/mongo/mongo-user-repository');
const MongoDbHandler = require('./infraestructure/persistence/mongo/mongo-db-handler');
const RegisterUser = require('./application/register-user');
const userHasher = require('./domain/user/service/user-hasher');
const bcryptHasher = require('./infraestructure/security/bcrypt-hasher');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

container.register({
    db: awilix.asClass(MongoDbHandler),
    mongoUserRepository: awilix.asClass(MongoUserRepository),
    userRepository: awilix.asFunction(userRepository),
    registerUser: awilix.asClass(RegisterUser),
    userHasher: awilix.asFunction(userHasher),
    bcryptHasher: awilix.asClass(bcryptHasher)
});

module.exports = container;
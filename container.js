const awilix = require('awilix');
const userRepository = require('./domain/user/user-repository')
const MongoUserRepository = require('./infraestructure/persistence/mongo/mongo-user-repository');
const MongoDbHandler = require('./infraestructure/persistence/mongo/mongo-db-handler');
const RegisterUser = require('./application/register-user');
const LoginUser = require('./application/login-user');
const DeleteUser = require('./application/delete-user');
const userHasher = require('./domain/user/service/user-hasher');
const tokenIssuer = require('./domain/token/service/token-issuer');
const JwtTokenIssuer = require('./infraestructure/security/jwt-token-issuer');
const bcryptHasher = require('./infraestructure/security/bcrypt-hasher');
const AuthenticationService = require('./domain/user/service/authentication-service');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

container.register({
    db: awilix.asClass(MongoDbHandler),
    mongoUserRepository: awilix.asClass(MongoUserRepository),
    userRepository: awilix.asFunction(userRepository),
    registerUser: awilix.asClass(RegisterUser),
    loginUser: awilix.asClass(LoginUser),
    deleteUser: awilix.asClass(DeleteUser),
    userHasher: awilix.asFunction(userHasher),
    bcryptHasher: awilix.asClass(bcryptHasher),
    tokenIssuer: awilix.asFunction(tokenIssuer),
    jwtTokenIssuer: awilix.asClass(JwtTokenIssuer),
    authenticationService: awilix.asClass(AuthenticationService)
});

module.exports = container;
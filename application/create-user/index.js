const User = require('../../domain/user/user');

class CreateUser {
    constructor({ userRepository }) {
        this._userRepository = userRepository;
    }

    async create(userRequest) {
        const user = new User(userRequest.id, userRequest.name);
        await this._userRepository.save(user);
    }

}

module.exports = CreateUser;
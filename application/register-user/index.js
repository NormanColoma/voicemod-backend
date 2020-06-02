const User = require('../../domain/user/user');

class RegisterUser {
    constructor({ userRepository }) {
        this._userRepository = userRepository;
    }

    async register({ id, name, info, password }) {
        const user = new User({ id, name, info, password });

        const userFound = await this._userRepository.findByEmail(user.info.email);

        if (userFound) {
            throw new Error(`Already exists user with given email: ${user.info.email}`);
        }

        await this._userRepository.save(user);
    }
}

module.exports = RegisterUser;
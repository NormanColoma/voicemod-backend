const User = require('../../domain/user/user');

class RegisterUser {
    constructor({ userRepository, userHasher }) {
        this._userRepository = userRepository;
        this._userHasher = userHasher;
    }

    async register({ id, name, info, password }) {
        const userFound = await this._userRepository.findByEmail(info.email);

        if (userFound) {
            throw new Error(`Already exists user with given email: ${info.email}`);
        }

        const hashedPassword = await this._userHasher.hashPassword(password);
        const user = new User({ id, name, info, password: hashedPassword });

        await this._userRepository.save(user);
    }
}

module.exports = RegisterUser;
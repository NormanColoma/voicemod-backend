const User = require('../../domain/user/user');

class UpdateUser {
    constructor({ userRepository, userHasher }) {
        this._userRepository = userRepository;
        this._userHasher = userHasher;
    }

    async update({ id, name, info, password, newPassword }) {
        const currentUser = await this._userRepository.findByEmail(info.email);

        if (!currentUser) {
            throw new Error(`There is no user with email: ${info.email}`);
        }

        if (currentUser.id !== id) {
            throw new Error(`There is another registered user with email: ${info.email}`);
        }

        const passwordMatch = await this._userHasher.isSamePassword(password, currentUser.password);

        if (!passwordMatch) {
            throw new Error(`Incorrect password provided`);
        }

        const newHashedPass = await this._userHasher.hashPassword(newPassword);
        const updatedUser = new User({ id, name, info, password: newHashedPass });
        await this._userRepository.save(updatedUser);
    }
}

module.exports = UpdateUser;
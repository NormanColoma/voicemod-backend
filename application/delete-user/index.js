class DeleteUser {
    constructor({ userRepository }) {
        this._userRepository = userRepository;
    }

    async delete({ id }) {
        this._userRepository.delete(id);
    }
}

module.exports = DeleteUser;
const userRepository = ({ mongoUserRepository }) => {
    return {
        find: async (id) => await mongoUserRepository.find(id),
        findByEmail: async (email) => mongoUserRepository.findByEmail(email),
        save: async (user) => await mongoUserRepository.save(user),
        delete: async (id) => await mongoUserRepository.delete(id)
    }
};

module.exports = userRepository;
const userRepository = ({ mongoUserRepository }) => {
    return {
        find: async (id) => await mongoUserRepository.find(id),
        save: async (user) => await mongoUserRepository.save(user)
    }
};

module.exports = userRepository;
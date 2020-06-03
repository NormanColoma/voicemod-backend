const UserHasher = ({ bcryptHasher }) => {
    return {
        hashPassword: (password) => bcryptHasher.hashPassword(password),
        isSamePassword: async (password, hashedPassword) => await bcryptHasher.isSamePassword(password, hashedPassword)
    }
};

module.exports = UserHasher;
const UserHasher = ({ bcryptHasher }) => {
    return {
        hashPassword: (password) => bcryptHasher.hashPassword(password)
    }
};

module.exports = UserHasher;
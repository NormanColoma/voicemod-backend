const bcrypt = require('bcrypt');
const saltRounds = 10;

class BcryptHasher {
    async hashPassword(password) {
        return await bcrypt.hash(password, saltRounds);
    }
}

module.exports = BcryptHasher;
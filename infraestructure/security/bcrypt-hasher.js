const bcrypt = require('bcrypt');
const saltRounds = 10;

class BcryptHasher {
    async hashPassword(password) {
        return await bcrypt.hash(password, saltRounds);
    }

    async isSamePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
}

module.exports = BcryptHasher;
const jwt = require('jsonwebtoken');
const { security: { jwtSecretKey }} = require('../config');

class JwtTokenIssuer {
    issueToken(payload) {
        return jwt.sign(payload, jwtSecretKey);
    }

    decode(token) {
        return jwt.verify(token, jwtSecretKey);
    }
}

module.exports = JwtTokenIssuer;
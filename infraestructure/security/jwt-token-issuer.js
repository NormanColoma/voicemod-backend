const jwt = require('jsonwebtoken');
const { security: { jwtSecretKey }} = require('../config');

class JwtTokenIssuer {
    issueToken(payload) {
        return jwt.sign(payload, jwtSecretKey);
    }
}

module.exports = JwtTokenIssuer;
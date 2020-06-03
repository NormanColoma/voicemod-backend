const Token = require('../../token/token');

class AuthenticationService {
    constructor({ userRepository, userHasher, tokenIssuer }) {
        this._userRepository = userRepository;
        this._userHasher = userHasher;
        this.tokenIssuer = tokenIssuer;
    }

    async authenticate({ email, password }) {
        const userFound = await this._userRepository.findByEmail(email);

        if (!userFound) {
            throw new Error(`Does not exist a user with email: ${email}`);
        }

        const passwordMatch = await this._userHasher.isSamePassword(password, userFound.password)
        if (!passwordMatch) {
            throw new Error(`Incorrect password provided`);
        }

        const { name: { fullName: name }, info: { email: userEmail }} = userFound;

        const userToken = {
            name,
            email: userEmail
        };

        const oneHourExpiration = Math.floor(Date.now() / 1000) + (60 * 60);
        const token = new Token({ user: userToken, expiration: oneHourExpiration });

        return this.tokenIssuer.issueToken(token.payload);
    }

    isAuthenticated(encodedToken) {
        let user, expiration;
        try {
          const decodedToken = this.tokenIssuer.decodeToken(encodedToken);
          user = decodedToken.user;
          expiration = decodedToken.expiration;
        } catch (ex) {
            throw new Error('invalid token');
        }

        const token = new Token({ user, expiration });

        if (token.isExpired) {
            throw new Error('token has expired');
        }
    }
}

module.exports = AuthenticationService;
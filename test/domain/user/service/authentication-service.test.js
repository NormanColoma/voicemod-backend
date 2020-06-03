const AuthenticationService = require('../../../../domain/user/service/authentication-service');
const JwtTokenIssuer = require('../../../../infraestructure/security/jwt-token-issuer');
const User = require('../../../../domain/user/user');
const Token = require('../../../../domain/token/token');

describe('should authenticate user', () => {
    let userRepositoryMock;
    let userHasherMock;
    let tokenIssuerMock;
    let loginRequest;
    let authenticationService;
    const date = Date.now();
    const jwtTokenIssuer = new JwtTokenIssuer();

    beforeEach(() => {
        userRepositoryMock = {
            findByEmail: jest.fn(),
        };
        userHasherMock = {
            isSamePassword: jest.fn()
        };
        tokenIssuerMock = {
            issueToken: jest.fn()
        }

        authenticationService = new AuthenticationService({ userRepository: userRepositoryMock,
            userHasher: userHasherMock, tokenIssuer: jwtTokenIssuer });

        loginRequest = {
            email: 'email',
            password:'password'
        };
        global.Date.now = jest.fn(() => date);
    });

    it('should throw exception if user does not exists', async () => {
        userRepositoryMock.findByEmail.mockReturnValue(null);

        try {
            await authenticationService.authenticate(loginRequest);
        } catch ({ message }) {
            expect(message).toBe('Does not exist a user with email: email');
        }

        expect(userRepositoryMock.findByEmail.mock.calls.length).toBe(1);
        expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toEqual(loginRequest.email);
        expect(userHasherMock.isSamePassword.mock.calls.length).toBe(0);
    });

    it('should throw exception if passwords do not match', async () => {
        const password = 'differentPassword';
        const user = new User({
            id: 'id',
            name: { firstName: 'firstName' },
            info: { email: 'email' },
            password
        })

        userRepositoryMock.findByEmail.mockReturnValue(user);
        userHasherMock.isSamePassword.mockReturnValue(false);

        try {
            await authenticationService.authenticate(loginRequest);
        } catch ({ message }) {
            expect(message).toBe('Incorrect password provided');
        }

        expect(userRepositoryMock.findByEmail.mock.calls.length).toBe(1);
        expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toEqual(loginRequest.email);
        expect(userHasherMock.isSamePassword.mock.calls.length).toBe(1);
        expect(userHasherMock.isSamePassword.mock.calls[0][0]).toBe(loginRequest.password);
        expect(userHasherMock.isSamePassword.mock.calls[0][1]).toBe(password);
    });

    it('should return token', async () => {
        const password = 'password';
        const user = new User({
            id: 'id',
            name: { firstName: 'firstName' },
            info: { email: 'email' },
            password
        })

        userRepositoryMock.findByEmail.mockReturnValue(user);
        userHasherMock.isSamePassword.mockReturnValue(true);


        const token = await authenticationService.authenticate(loginRequest);

        const expectedToken = new Token({
            user: {
                name: user.name.fullName,
                email: user.info.email
            },
            expiration: Math.floor(date / 1000) + (60 * 60)
        });

        const expectedIssuedToken = jwtTokenIssuer.issueToken(expectedToken.payload);

        expect(token).toEqual(expectedIssuedToken);

        expect(userRepositoryMock.findByEmail.mock.calls.length).toBe(1);
        expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toEqual(loginRequest.email);
        expect(userHasherMock.isSamePassword.mock.calls.length).toBe(1);
        expect(userHasherMock.isSamePassword.mock.calls[0][0]).toBe(loginRequest.password);
        expect(userHasherMock.isSamePassword.mock.calls[0][1]).toBe(password);
    });
});
const LoginUser = require('../../../application/login-user');

describe('login user use case', () => {
    let authenticationServiceMock;
    let loginUser;
    let loginRequest;

    beforeEach(() => {
        authenticationServiceMock = {
            authenticate: jest.fn(),
        };
        loginUser = new LoginUser({ authenticationService: authenticationServiceMock });

        loginRequest = {
            email: 'email',
            password:'password'
        };
    });

    it('should login user and return token', async () => {
        authenticationServiceMock.authenticate.mockReturnValue({ token: 'token' });

        await loginUser.login(loginRequest);

        expect(authenticationServiceMock.authenticate.mock.calls.length).toBe(1);
        expect(authenticationServiceMock.authenticate.mock.calls[0][0]).toEqual(loginRequest);
    });
});
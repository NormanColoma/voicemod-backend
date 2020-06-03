class LoginUser {
    constructor({ authenticationService }) {
        this._authenticationService = authenticationService;
    }

    async login(loginRequest) {
        return await this._authenticationService.authenticate(loginRequest);
    }
}

module.exports = LoginUser;
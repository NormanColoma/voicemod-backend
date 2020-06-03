class Token {
    constructor({ user, expiration }) {
        this._user = user;
        this.expiresAt = expiration;
        this.payload = { user: this.user, expiration: this.expiration };
    }

    set expiresAt(expiration) {
        this._expiration = expiration;
    }

    set payload(payload) {
        this._payload = payload;
    }

    get user() {
        return this._user;
    }

    get expiration() {
        return this._expiration;
    }

    get payload() {
        return this._payload;
    }
}

module.exports = Token;
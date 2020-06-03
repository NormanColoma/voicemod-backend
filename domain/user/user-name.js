class UserName {
    constructor({ firstName }) {
        this.firstName = firstName;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(firstName) {
        if (!firstName) {
            throw new Error('User name must not be null');
        }
        this._firstName = firstName;
    }
}

module.exports = UserName;
class UserName {
    constructor({ firstName, surnames }) {
        this.firstName = firstName;
        this._surnames = surnames;
    }

    get firstName() {
        return this._firstName;
    }

    get surnames() {
        return this._surnames;
    }

    get fullName() {
        return `${this.firstName}  ${this.surnames}`;
    }

    set firstName(firstName) {
        if (!firstName) {
            throw new Error('User name must not be null');
        }
        this._firstName = firstName;
    }
}

module.exports = UserName;
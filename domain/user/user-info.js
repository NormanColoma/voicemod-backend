class UserInfo {
    constructor({ email, country, phone, postalCode}) {
        this.email = email;
        this._country = country;
        this._phone = phone;
        this._postalCode = postalCode;
    }

    set email(email) {
        if(!email) {
            throw new Error('Email must not be null')
        }
        this._email = email;
    }

    get email() {
        return this._email;
    }

    get country() {
        return this._country;
    }

    get phone() {
        return this._phone;
    }

    get postalCode() {
        return this._postalCode;
    }
}

module.exports = UserInfo;
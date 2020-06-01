const UserInfo = require('./user-info');
const UserName = require('./user-name');

class User {
    constructor({ id, name = {}, info = {}, password}) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.info = info;
    }

    get id() {
        return this._id;
    }

    get password() {
        return this._password;
    }

    get info() {
        return this._info;
    }

    get name() {
        return this._name;
    }

    set id(id) {
        if (!id) {
            throw new Error('Id must not be null');
        }
        this._id = id;
    }
    set password(password) {
        if (!password) {
            throw new Error('Password must not be null');
        }
        if(password.length < 7) {
            throw new Error('Password must contain at least 7 characters');
        }
        this._password = password;
    }

    set info(userInfo) {
        this._info = new UserInfo(userInfo);
    }

    set name(userName) {
        this._name= new UserName(userName);
    }
}

module.exports = User;
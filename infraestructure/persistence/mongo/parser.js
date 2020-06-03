const User = require('../../../domain/user/user');
const { ObjectID } = require('mongodb');

const toDocument = (user) => {
    return {
        _id: new ObjectID(user.id),
        name: user.name.firstName,
        surnames: user.name.surnames,
        email: user.info.email,
        phone: user.info.phone,
        country: user.info.country,
        postalCode: user.info.postalCode,
        password: user.password
    };
};

const toDomain = (userDocument) => {
    const { _id, name, surnames, email, country, postalCode, phone, password } = userDocument;

    const info = { email, postalCode, country, phone };
    const userName = { firstName: name, surnames };
    return new User({id: _id, info, name: userName, password });
};


module.exports = {
    toDocument,
    toDomain
};
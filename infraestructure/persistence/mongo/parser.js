const User = require('../../../domain/user/user');

const toDocument = (user) => {
    const { id, ...restOfFields } = user;
    return Object.assign({}, { _id: id}, restOfFields);
};

const toDomain = (userDocument) => {
    const { info, _id, name, password } = userDocument;
    return new User({id: _id, info, name, password });
};


module.exports = {
    toDocument,
    toDomain
};
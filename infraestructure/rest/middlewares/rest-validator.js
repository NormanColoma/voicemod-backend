const { validationResult } = require('express-validator');

const isBodyValid = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: formatErrors(errors.array()) });
    }
    next();
};

const formatErrors = (errors) => {
    return errors.map(({ value, param }) => {
        if (value) {
            return { message: 'Provided value has no correct format for field', field: param };
        }
        return { message: 'Field cannot be blank', field: param };
    })
}

module.exports = { isBodyValid };
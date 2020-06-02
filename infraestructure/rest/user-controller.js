const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const container = require('../../container');
const userRepository = container.resolve('userRepository');
const registerUser = container.resolve('registerUser');
const isBodyValid = require('./middlewares/body-validator');

router.get('/', async (req, res) => {
    const result = await userRepository.find("5ed4e0fd385b75ad664e66d2");
    return res.send(result);
});

router.post('/users', [
    check('id').notEmpty(),
    check('name').notEmpty(),
    check('password')
        .notEmpty()
        .bail()
        .isLength({ min: 7 }),
    check('email')
        .notEmpty()
        .bail()
        .isEmail()
], isBodyValid, async (req, res, next) => {

    const { id, name, surnames, postalCode, country, email, phone, password } = req.body;
    const userRequest = {
        id,
        name: { firstName: name, surnames },
        info: { email, postalCode, country, phone },
        password
    };

    try {
        await registerUser.register(userRequest);
        return res.status(201).send();
    } catch (ex) {
        next(ex);
    }
});

module.exports = router;
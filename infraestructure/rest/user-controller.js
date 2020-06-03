const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const container = require('../../container');
const registerUser = container.resolve('registerUser');
const deleteUser = container.resolve('deleteUser');
const  { isBodyValid } = require('./middlewares/rest-validator');


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

    const { id, name, postalCode, country, email, phone, password } = req.body;
    const userRequest = {
        id,
        name: { firstName: name },
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

router.delete('/users/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteUser.delete({ id });

        return res.status(204).send();
    } catch (ex) {
        next(ex);
    }
});

module.exports = router;
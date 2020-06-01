const express = require('express');
const router = express.Router();
const container = require('../../container');
const userRepository = container.resolve('userRepository');
const createUser = container.resolve('createUser');


router.get('/', async (req, res) => {
    const result = await userRepository.find("5ed4e0fd385b75ad664e66d2");
    return res.send(result);
});

router.post('/users', async (req, res) => {
    const { id, name } = req.body;
    const user = { id, name };

    await createUser.create(user);

    return res.status(201).send();
});

module.exports = router;
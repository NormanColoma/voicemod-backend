require('dotenv').config();

const { server: { port } } = require('./infraestructure/config');
const express = require('express');
const app = express();
const userRoutes = require('./infraestructure/rest/user-controller');
const bodyParser = require('body-parser');
const jsonContentType = require('./infraestructure/rest/middlewares/json-content-type');
const STATUS_SERVER_ERROR = 500;

app.use(bodyParser.json());
app.use(jsonContentType);
app.use(userRoutes);

app.use((err, req, res, next) => {
    if (process.env.NODE_ENV !== 'test') {
        console.error(err.stack);
    }
    res.status(STATUS_SERVER_ERROR).send({ error: err.message });
});

const server = app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

module.exports = { app, server };
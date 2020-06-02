require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require('./infraestructure/rest/user-controller');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(userRoutes);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
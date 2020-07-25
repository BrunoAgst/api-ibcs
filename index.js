require('dotenv').config();

const express = require('express');
const app = express();

const formController = require('./controller/form');
const authController = require('./controller/auth');
const usersController = require('./controller/users');

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(formController);
app.use(authController);
app.use(usersController);

app.listen(3000, () => {
    console.log("server running");
});
const express = require('express');
const authsController = require('../controllers/auths');
const usersMiddleware = require('../middlewares/users');

const usersRouter = express.Router();

usersRouter.post('/register', usersMiddleware.validateUser, authsController.register);
usersRouter.post('/login', usersMiddleware.validateLogin, authsController.login);

module.exports = usersRouter;

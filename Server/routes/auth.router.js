var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var { login, register } = require('../controllers/auth.controller')
const authRouter = router;

authRouter.post('/login', [
    expressValidator.check('email', 'Check your email').exists().isEmail().notEmpty(),
    expressValidator.check('password', 'Check your password').exists().notEmpty()
], login);

authRouter.post('/register', [
    expressValidator.check('first_name', 'Check first_name').exists().isString(),
], register);

module.exports = authRouter;
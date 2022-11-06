var express = require('express');
var expressValidator = require('express-validator');
var { register, login } = require('../controllers/auth.controller')
var authRouter = express.Router();

authRouter.post('/register', register)
authRouter.post('/login', login)

module.exports = authRouter
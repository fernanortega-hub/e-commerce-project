require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
var usersRouter = require('./routes/users.router');
var authRouter = require('./routes/auth.router')
require('./database/config')
require('./middlewares/passport')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routers
app.use('/identity', authRouter)
app.use(passport.authenticate('jwt', { session: false }))
app.use('/users', usersRouter)

module.exports = app;
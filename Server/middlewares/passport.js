const passport = require('passport');
const UserModel = require('../models/user.model');
const passportJWT = require('passport-jwt')

passport.use(
    new passportJWT.Strategy({
        secretOrKey: process.env.JWT_TOKEN,
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
        async (token, done) => {
            try {
                const user = UserModel.findOne({ _id:  token._id }, "-password")
                return done(null, user)
            } catch (error) {
                done(error)
            }
        },
    )
)
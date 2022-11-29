const jwt = require('jsonwebtoken')
const express = require('express')

const validateUser = (req = express.request, res = express.response, next) => {
    const auth = req.headers.authorization;

    const [bearer, token] = auth.split(' ');

    if (bearer !== "Bearer" || token === "")
        return res.status(403).send({ message: 'Invalid auth' })
    // throw { status: 400, message: 'Invalid token' }

    const payload = jwt.verify(token, process.env.JWT_TOKEN)

    const isValidUser = payload.role

    if (isValidUser !== 'admin') {
        return res.status(401).send({ message: 'You need authorization' })
    }

    next();
}

module.exports = validateUser


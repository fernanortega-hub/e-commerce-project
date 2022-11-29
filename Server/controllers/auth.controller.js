const UserModel = require('../models/user.model')
const express = require('express')
const expressValidator = require('express-validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.login = async (req = express.request, res = express.response, next) => {
    try {
        const errors = expressValidator.validationResult(req)

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user)
            return res.status(404).send({ message: 'User not found' });

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).send({ message: 'Wrong credentials' });
        }
        
        const payload = { id: user._id, role: user.role };

        const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: '24h' })
        return res.status(200).json({ token });

    } catch (error) {
        return res
        .status(error.status ?? 400)
        .json({ message: error.message ?? JSON.stringify(error)})
    }
}

exports.register = async (req = express.request, res = express.response) => {
    try {
        const errors = expressValidator.validationResult(req)

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        const { first_name, last_name, email, password, role } = req.body;

        const existingUser = await UserModel.findOne({ email: email });

        if(existingUser) 
            return res.status(409).send({ message: 'User already exists' });

            
        const salt = bcrypt.genSaltSync();
        const newUser = new UserModel({ first_name: first_name, last_name: last_name, email: email, password: password, role: role})

        newUser.password = bcrypt.hashSync(password, salt);
        
        await newUser.save()
            .then((newUser) => {
                res.status(201).send({ message: newUser })
            })
            .catch((err) => {
                res.status(400)
                .send({ 
                    message: 'Could not register user',
                    err
                })
            })

    } catch (error) {
        return res
        .status(error.status ?? 400)
        .json({ message: error.message ?? JSON.stringify(error)})
    }
}
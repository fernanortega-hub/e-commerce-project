const UserModel = require('../models/user.model')
const express = require('express')
const validateUser = require('../middlewares/validateUser')
const expressValidator = require('express-validator');

exports.getUsers = async (req = express.request, res = express.response) => {
    try {
        const errors = expressValidator.validationResult(req);

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        const { limit = 6 } = req.query;
        const query = { state: true } // Objeto necesario, es para filtrar elementos, como edades, etc
        const [total, users] = await Promise.all([
            UserModel.countDocuments(query),
            UserModel.find(query)
                .limit(limit)
        ]);

        return res.status(200).json({ total, users })

    } catch (error) {
        return res
            .status(error.status ?? 400)
            .json({ message: error.message ?? JSON.stringify(error) })
    }
}

exports.getUser = async (req = express.request, res = express.response) => {
    try {
        const errors = expressValidator.validationResult(req);

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        const { id } = req.params;

        const user = await UserModel.findById(id);

        if(!user)
            return res.status(404).send({ message: 'User not found' })
        
        return res.status(200).send(user)


    } catch (error) {
        return res
            .status(error.status ?? 400)
            .json({ message: error.message ?? JSON.stringify(error) })
    }
}
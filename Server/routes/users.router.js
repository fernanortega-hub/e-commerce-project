var express = require('express');
var expressValidator = require('express-validator');
var router = express.Router();
const validateUser  = require('../middlewares/validateUser')
const { getUsers, getUser } = require('../controllers/user.controller');

router.get('/', [ 
    validateUser,
], getUsers);
router.get('/get-one/:id', [
    expressValidator.check('id', 'Isn\'t a valid id').isMongoId().notEmpty().exists()
], getUser)

module.exports = router;

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var userController = require('../controller/user');



router.post('/',userController.createUser);


router.get('/:id', userController.getUser);

router.get('/', userController.getAllUser);

router.put('/:id', userController.updateUser);


router.delete('/:id', userController.deleteUser);

module.exports = router;

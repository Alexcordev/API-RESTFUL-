'use strict'

var express = require('express');
var UserController = require('../controllers/User');

var router = express.Router();

router.get('/user', UserController.user);
router.post('/test', UserController.test);

module.exports = router;
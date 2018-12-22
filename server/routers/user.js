'use strict'

var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');


//var multipart = require('connect-multiparty');
router.get('/probando-controlador',userController.prueba);

module.exports = router;

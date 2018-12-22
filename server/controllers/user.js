'use strict'

var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');
const UserController = {};

UserController.prueba = (req,res) => {
  res.status(200).send({
    message:"Probando una accion del controlador de usuario de ApiRest"
  });
}

module.exports = UserController;

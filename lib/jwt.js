'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = function createToken(user){
    var payload ={
        id: user.id,
        name: user.firstName,
        surname: user.userName,
        email: user.email,
        role: user.roleId
     }
} 

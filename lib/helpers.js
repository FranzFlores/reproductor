//modulo para encriptacion y verificacion de contraseña en inicio de sesion y creacion de una cuenta
const bcrypt = require('bcrypt-nodejs');
const helpers = {};
//mètodo que sirve para encriptar contraseña
helpers.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
//mètodo para verificacion de contraseña
helpers.matchPassword = function(userPassword,password){
    return bcrypt.compareSync(userPassword,password);
};

module.exports = helpers;

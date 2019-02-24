//modulo para el registro e inisio de sesion
'use strict'
const helpers = require('./helpers');


module.exports = function (passport, user, role) {
    var LocalStrategy = require('passport-local').Strategy;
    var User = user;
    var Role = role;
//mètodo para requeridos para funcionamiento del passport
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
//mètodo para requeridos para funcionamiento del passport
    passport.deserializeUser((id, done) => {
        User.findOne({ where: { id: id }, include: [{ model: Role }] })
            .then((user) => {
                if (user) {
                    var userInfo = {
                        id: user.id,
                        external_id: user.external_id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userName: user.userName,
                        email: user.email,
                        image: user.image,
                        name: user.firstName + " " + user.lastName,
                        role: user.role.name
                    };
                    done(null, userInfo);
                } else {
                    done(user.errors, null);
                }
            });
    });

    //Registro de Usuario
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {

        var rolesNames = [
            { name: 'Administrador' },
            { name: 'Usuario' }
        ];

        Role.findOne({ where: { name: 'Administrador' } })
            .then((role) => {
                if (!role) {
                    Role.bulkCreate(rolesNames);
                }
            });

        User.findOne({ where: { email: email } })
            .then((user) => {
                if (user) {
                    return done(null, false, req.flash('message', 'El usuario ya existe'));
                } else {
                    //Crear un usuario
                    var hash = helpers.generateHash(password);
                    Role.findOne({ where: { name: "Administrador" } })
                        .then((role) => {
                            if (role) {
                                var modelUser = {
                                    firstName: req.body.firstName,
                                    lastName: req.body.lastName,
                                    userName: req.body.user,
                                    email: req.body.email,
                                    image: 'AyLjYZwe-HzZ08Yh0Vsiq7An.png',
                                    password: hash,
                                    roleId: role.id
                                }
                                User.create(modelUser)
                                    .then((newUser, created) => {
                                        if (!newUser) {
                                            done(null, false, req.flash('message', 'No se ha podido crear el usuario'));
                                        } else {
                                            done(null, newUser, req.flash('success', 'El usuario se ha creado satisfactoriamente'));
                                        }
                                    });
                            } else {
                                return done(null, false, req.flash('message', 'Ha ocurrido un error al crear el usuario'));
                            }
                        });
                }
            });
    }));

    //Inicio Sesion
    passport.use('local-singin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        User.findOne({ where: { email: email } })
            .then((user) => {
                if (!user) {
                    return done(null, false, req.flash('message', 'Correo o Contraseña Invalidos'));
                }
                if (helpers.matchPassword(password, user.password)) {
                    done(null, user, req.flash('success', 'Bienvenido ' + user.firstName + " " + user.lastName));//req.flash('success','Bienvenido '+ user.firstName + " " + user.lastName)
                }
                else {
                    done(null, false, req.flash('message', 'Contraseña Incorrecta'));
                }
            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, req.flash('message', 'Ha ocurrido un error'));
            });
    }));
};

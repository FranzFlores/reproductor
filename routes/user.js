'use strict'

var express = require('express');
var router = express.Router();
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');
var userController = require('../controllers/user');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users' });

//Registro de usuario
router.get('/signup',userController.viewSignUp);

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

// Inicio y Cerrar Sesion
router.get('/signin',userController.viewSingIn);
router.get('/profile',isLoggedIn,userController.viewProfile);

router.post('/signin', (req,res,next)=>{
    passport.authenticate('local-singin',{
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req,res,next);
});
router.get('/logout', userController.logout);

router.get('/',userController.viewIndex);
router.post('/updateUser/:external',isLoggedIn,userController.updateUser);
router.post('/updatePassword/:external_id',isLoggedIn,userController.updatePassword);
router.post('/upload-image-user/:external', [md_upload,isLoggedIn],userController.uploadImage);
router.get('/get-image-user/:imageFile', userController.getImageFile);
router.get('/logout',isLoggedIn,userController.logout);

//Para la aplicacion movil
router.post('/login',userController.login);

module.exports = router;


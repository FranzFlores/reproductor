'use strict'
const {User,Artist} = require('../database');
var fs = require('fs');
var path = require('path');
const helpers = require('../lib/helpers');
const UserController = {};

UserController.viewIndex = (req,res)=>{
  res.render('index');
};

//Creacion de Cuenta
UserController.viewSignUp = (req,res)=>{
  res.render('auth/signup');
};

//Login 
UserController.viewSingIn = (req,res)=>{
   
    res.render('auth/signin');
};
//mètodo para presentar el perfil del user(usuario)
UserController.viewProfile = (req,res)=>{
  Artist.findAll({
    where: { status: true }
  }).then((list) => {
    res.render('sidebar', { list });
  }).catch((err) => {
    res.status(500).send({ message: 'Error en la peticion' });
  });
    
};

UserController.logout = (req,res)=>{
      req.logOut();
      res.redirect('/');
};
//mètodo que actualiza la contraseña en la base de datos, requiere el external id por parametro 
UserController.updatePassword = (req,res)=>{
   var external_id = req.params.external_id;
   var newPassword = req.body.newPassword;
   var oldPassword = req.body.oldPassword;
   User.findOne({where:{external_id:external_id}})
    .then((user)=>{
      if (helpers.matchPassword(oldPassword,user.password)){
      var hash = helpers.generateHash(newPassword);
       User.update({password:hash},{where:{external_id:external_id}})
        .then((result)=>{
          if(result==0){
            req.flash('message','No se pudo actualizar la contraseña');
            res.redirect('/profile#');
          }else{
            req.flash('success','Se ha actualizado correctamente la contraseña');
            res.redirect('/signin');
          }
        }).catch((err) => {
          console.log(err);
          res.status(500).send({message:'Error en la peticion'});
      });
      }else{
        req.flash('message','Ha ingresado incorrectamente su actual contraseña');
        res.redirect('/profile');
      }
    }).catch((err) => {
      console.log(err);
      res.status(500).send({message:'Error en la peticion'});
  });
};
//mètodo que actualiza al usurio en la base de datos

UserController.updateUser = (req,res)=>{
    User.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      user_name: req.body.user,
      email: req.body.email,
    },
    {where: {external_id:req.params.external}
  }).then((user)=>{
      if (user==0) {
        req.flash('message',"No se ha podido actualizar el usuario");
      }else {
        req.flash('success',"Se ha actualizado correctamente el usuario");
      }
      res.redirect('/profile');
    }).catch((err) => {
        console.log(err); 
        res.status(500).send({message:'Error en la peticion'});
    });
};
//mètodo que actualiza la foto del user(usuario) en la base de datos
UserController.uploadImage = (req,res)=>{
    var file_name = "Imagen no encontrada";
    if (req.files) {
      var file_path = req.files.image.path;
      var file_split = file_path.split('\/');
      var file_name = file_split[2];
    
      var ext_split = file_name.split('\.');
      var file_ext = ext_split[1];

      if (file_ext =='png' || file_ext =='jpg' || file_ext =='gif' || file_ext =='jpeg'){
        User.update({image:file_name},{where:{external_id:req.params.external}
        }).then((user)=>{
          if (user==0) {
            req.flash('message',"No se pudo actualizar la foto de perfil del usuario");
          }else {
            req.flash('success',"Se actualizado de manera correcta el usuario");
          }
          res.redirect('/profile');
        }).catch((err) => {
            res.status(500).send({message:'Error en la peticion'});
        });
      }else {
        req.flash('message',"La extension del archivo no es correcta");
      }
      res.redirect('/profile');
    }else {
      res.status(200).send({message:"No se ha podido subir ninguna imagen"});
    }
};
//mètodo para presentar la imagen del user(usuario) con una ruta
UserController.getImageFile = (req,res)=>{
  var imageFile = req.params.imageFile;
  var path_file = './uploads/users/'+ imageFile

  fs.exists(path_file,function(exists) {
    if (exists) {
      res.sendFile(path.resolve(path_file));
    }else {
      res.status(200).send({message:"No existe la imagen"});
    }
  });
};

module.exports = UserController;

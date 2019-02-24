//controlador de la tabla artist(artista) en la base de datos 
'use strict'
const { Artist, Album, Song } = require('../database');
var fs = require('fs');
var path = require('path');
const ArtistController = {};

 //mètodo para obtener un solo registro de la tabla artist(artista) en la base de datos, requiere el external id por parametro
ArtistController.getArtist = (req, res) => {
  Artist.findOne({
    where: { external_id: req.params.external },
    include: [{ model: Album, include: { model: Song } }]
  }).then((artist) => {
    res.status(200).send(artist);
  }).catch((err) => {
    res.status(500).send({ message: 'Error en la peticion' });
  });
};
// mètodo que sirve para guardar artist(artista)
ArtistController.saveArtist = (req, res) => {
  Artist.create({
    name: req.body.name,
    description: req.body.description,
    image: 'Zl_cki2bQYdlMjycBCZKlmkB.jpg',
    status: true
  }).then((artistStored) => {
    if (artistStored) {
      req.flash('success', 'Se ha guardado correctamente el artista');
    } else {
      req.flash('message', 'No se pudo guardar el artista');
    }
    res.redirect('/profile');
  }).catch((err) => {
    res.status(500).send({ message: 'Error en la peticion' });
  });
};
// mètodo que en lista todos los artist(artista) registrados
ArtistController.getArtists = (req, res) => {
  Artist.findAll({
    where: { status: true },
    order: [
      ['name', 'ASC']
    ]
  }).then((list) => {
    res.status(200).send(list);
  }).catch((err) => {
    res.status(500).send({ message: 'Error en la peticion' });
  });
};
//mètodo que actualiza los artist(artista) en la base de datos, requiere el external id por parametro
ArtistController.updateArtist = (req, res) => {
  Artist.update({
    name: req.body.name,
    description: req.body.description
  }, {where: { external_id: req.params.external }
    }).then((result) => {
      if (result == 0) {
        req.flash('message', "No se ha podido actualizar el artista");
      } else {
        req.flash('success', "Se ha actualizado el artista correctamente");
      }
      res.redirect('/profile');
    }).catch((err) => {
      res.status(500).send({ message: 'Error en la peticion' });
    });
};


//mètodo para dar de baja los artist(artista) en la base de datos, requiere el external id por parametro 
ArtistController.deleteArtist = (req, res) => {
//Actualizar artist(artista)
  Artist.update({ status: false }, { where: { external_id: req.params.external } })
    .then((result) => {
      if (result == 0) {
        req.flash('message', 'No se pudo eliminar el artista');
      } else {
        Album.findAll({ where: { artistId: req.body.artist } }).then((list) => {
          var ids = [];
          list.forEach(element => {
            ids.push(element.id);
          });
          
          Album.update({ status: false }, { where: { id: ids } })
            .then((result) => {
              if (result == 0) {
                req.flash('message', 'No se pudo eliminar el artista');
              } else {
                console.log(ids);
                for (var i = 0; i < ids.length; i++) {

                  Song.findAll({ where: { albumId: ids[i] } })
                  .then((list) => {
                    var idsongs = [];
                    list.forEach(song => {
                      idsongs.push(song.id);
                    });
                    Song.update({ status: false }, { where: { id: idsongs } });
                  })

                  if (i == (ids.length-1)) {
                    Song.findAll({ where: { albumId: ids[i] } })
                    .then((list) => {
                      var idsongs = [];
                      list.forEach(song => {
                        idsongs.push(song.id);
                      });
                      Song.update({ status: false }, { where: { id: idsongs } });
                    })
                    req.flash('success', 'Se ha elimanado correctamente el artista');
                    res.redirect('/profile');
                  }
                  console.log(i);
                }
              }
            });
        }).catch((err) => {
          res.status(500).send({ message: 'Error en la peticion' });
        });
      }
    }).catch((err) => {
      res.status(500).send({ message: 'Error en la peticion' });
    });
};
//mètodo para subir fotos en la tabla artist(artista)

ArtistController.uploadImage = (req, res) => {

  var file_name = "Imagen no encontrada";

  if (req.files) {
    var file_path = req.files.image.path;
    var file_split = file_path.split('\/');
    var file_name = file_split[2];

    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];

    if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
      Artist.update({ image: file_name }, {
        where: { external_id: req.body.external }
      }).then((result) => {
        if (result == 0) {
          req.flash('message', "No se ha podido actualizar el artista");
        } else {
          req.flash('success', "Se ha subido la Imagen del Artista con éxito");
        }
        res.redirect('/profile');
      }).catch((err) => {
        res.status(500).send({ message: 'Error en la peticion' });
      });
    } else {
      req.flash('message', "La extension del archivo no es correcta");
      res.redirect('/profile');
    }
  } else {
    req.flash('message', "Ocurrio un error al intentar subir la imagen");
    res.redirect('/profile');
  }

};
//mètodo para presentar la imagen de artist(artista) con una ruta
ArtistController.getImageFile = (req, res) => {
  var path_file = './uploads/artists/' + req.params.imageFile;

  fs.exists(path_file, function (exists) {
    if (exists) {
      res.sendFile(path.resolve(path_file));
    } else {
      res.status(200).send({ message: "No existe la imagen" });
    }
  });
};

module.exports = ArtistController;

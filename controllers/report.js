//controlador de la tabla report en la base de datos 
'use strict'
var pdf = require('html-pdf');
const { PlayList } = require('../database');
var fs = require('fs');
var path = require('path');


const ReportController = {};
//mètodo para generar un archivo pdf
ReportController.generatePdf = (req, res) => {
    PlayList.findOne({
        where: { title: 'Las 25 Canciones más escuchadas' }
    }).then((playlist) => {
        playlist.getSongs()
            .then((list) => {
                //var aux = [];
                list.sort(function (a, b) {
                    return (b.listeners - a.listeners)
                });
                var content = `<h1>Las 25 canciones más escuchadas</h1>
                <ol class="list-group list-group-flush listSong">`;

                list.forEach(element => {
                    
                    content += `
                    <li class="list-group-item text-dark">
                    <h3>`+ element.dataValues.title + `<h3>
                    </li>`;
                });
                content += '</ol>';
                var options = {
                    format: 'A4',
                    header: {
                        height: "60px"
                    },
                    footer: {
                        height: "22mm"
                    },
                    base: "/Users/franzandresflores/Desktop/reproductor/public"
                };
                pdf.create(content, options).toFile('./report.pdf', (err, resp) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(resp);
                        res.send({message:'OK'});
                    }
                });
            }).catch(err => {
                console.log(err);
            });
    }).catch(err => {
        console.log(err);
    });
};
//mètodo para presentar el archivo pdf con una ruta
ReportController.getPdfFile = (req, res) => {
    var path_file = '/Users/franzandresflores/Desktop/reproductor/report.pdf';
    fs.exists(path_file, function (exists) {
      if (exists) {
        res.sendFile(path.resolve(path_file));
      } else {
        res.status(200).send({ message: "No existe el reporte" });
      }
    });
  };
  

module.exports = ReportController;
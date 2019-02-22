'use strict'
var express = require('express');
var bodyParser = require('body-parser');
const {db} = require('./database');
var app = express();

/*Configuraciones*/
//Puerto de la base de datos
app.set('port',process.env.PORT||3000);


//Cargar Rutas
var user_router = require('./server/routers/user');

//Sirve para convertir las peticiones q nos vienen a JSON
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//configurar cabeceras HTTP


//rutas base
app.use('/api',user_router);

app.listen(app.get('port'), () => {
    console.log('Servidor corriendo en el puerto', app.get('port'));
});

module.exports = app; //Se puede usar express en otras ficheros q incluyan app

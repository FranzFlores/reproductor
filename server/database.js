'use strict'
const Sequelize = require('sequelize');

const sequelize = new Sequelize('reproductor', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  operatorsAliases: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log('La Conexion se ha realizado con exito.' );
  })
  .catch(err => {
    console.error('No se ha podido establecer la conexion. Error:', err);
  });

module.exports = sequelize;

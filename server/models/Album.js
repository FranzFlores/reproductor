'use strict'
const Sequelize = require('sequelize');
const db = require('../database');
const Artist = require('./Artist');

const Album = db.define('Album',{
  idAlbum:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  title:Sequelize.STRING,
  description: Sequelize.STRING,
  year: Sequelize.INTEGER,
  image: Sequelize.STRING,
  external_id: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV4 }
  }
},{
  createdAt:'date_create',
  updatedAt:'date_update'
});

Album.belongsTo(Artist,{foreignKey: 'idArtist'});
Album.sync();

module.exports = Album;

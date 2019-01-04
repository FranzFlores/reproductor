'use strict'
const Sequelize = require('sequelize');
const db = require('../database');
const Album = require('./Album');

const Song = db.define('Song',{
  idSong:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  number:Sequelize.INTEGER,
  title: Sequelize.STRING,
  file: Sequelize.STRING,
  status: Sequelize.STRING,
  listeners: Sequelize.INTEGER,
  external_id: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV4 }
},{
  createdAt:'date_create',
  updatedAt:'date_update'
});
PlayList.hasMany(Song, {foreignKey: 'idPlayList'});
Album.hasMany(Song, {foreignKey: 'idAlbum'});

Song.sync();

module.exports = Song;

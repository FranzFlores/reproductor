'use strict'
const Sequelize = require('sequelize');
const db = require('../database');

const Artist = db.define('Artist',{
  idArtist:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  firstName:Sequelize.STRING,
  description: Sequelize.STRING,
  image: Sequelize.STRING,
  external_id: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV4 }
  },{
    createdAt:'date_create',
    updatedAt:'date_update'
});

Artist.sync();

module.exports = Artist;

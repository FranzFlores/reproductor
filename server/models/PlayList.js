'use strict'
const Sequelize = require('sequelize');
const db = require('../database');
const User = require('./User');

const PlayList = db.define('PlayList',{
  idPlayList:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  title: Sequelize.STRING,
  image: Sequelize.STRING,
  description: Sequelize.STRING,
  external_id: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV4 }
  },{
  createdAt:'date_create',
  updatedAt:'date_update'
});

PlayList.belongsTo(User, { foreignKey: 'idUser' });
PlayList.sync();

module.exports = PlayList;

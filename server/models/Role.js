'use strict'
const Sequelize = require('sequelize');
const db = require('../database');

var Role = db.define('Role',{
  idRole:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  name:Sequelize.STRING,
  external_id: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV4 }
  },{
    timestamps: false
});

Role.sync();
module.exports = Role;

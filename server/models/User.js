'use strict'
const Sequelize = require('sequelize');
const db = require('../database');
const Role = require('./Role');

const User = db.define('User',{
  idUser:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  firstName:Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  birthdate: Sequelize.DATEONLY,
  external_id: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV4 }
  },{
    createdAt:'date_create',
    updatedAt:'date_update'
});

User.belongsTo(Role, { foreignKey: 'idRole' });
User.sync();

module.exports = User;

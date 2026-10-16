const sequelize = require('../config/db');
const Item = require('./Item');
const Perfil = require('./Perfil');
const Proveedor = require('./Proveedor');

module.exports = { sequelize, Item, Perfil, Proveedor };
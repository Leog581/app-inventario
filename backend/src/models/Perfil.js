const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Perfil = sequelize.define('Perfil', {
    nombre_comercial: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    propietario: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    web: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
    }, {
    tableName: 'perfil'
    });

module.exports = Perfil;
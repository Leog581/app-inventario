const { Sequelize } = require('sequelize');
const pg = require('pg');   // ← Importamos pg explícitamente

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectModule: pg,       // ← Le decimos a Sequelize que use esta instancia
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

module.exports = sequelize;
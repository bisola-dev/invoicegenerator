const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('invoicegenerator_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
    // Other options, if any
});

module.exports = sequelize;

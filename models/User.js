// models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Invoice model
const Invoice = sequelize.define('Invoice', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    invoiceData: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, {
    tableName: 'invoices', // Name of the table in the database
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Synchronize the model with the database (optional step)
// Invoice.sync();

module.exports = Invoice;

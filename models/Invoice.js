const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Invoice = sequelize.define('Invoice', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    invoiceData: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
            isValidInvoiceData(value) {
                if (!value.invoiceNumber || !value.amount || !value.items) {
                    throw new Error('Invalid invoiceData format');
                }
                if (typeof value.amount !== 'number' || value.amount <= 0) {
                    throw new Error('Amount must be a positive number');
                }
                if (!Array.isArray(value.items) || value.items.length === 0) {
                    throw new Error('Items must be a non-empty array');
                }
                for (const item of value.items) {
                    if (typeof item.name !== 'string' || item.name.trim().length === 0) {
                        throw new Error('Each item must have a non-empty name');
                    }
                    if (typeof item.quantity !== 'number' || item.quantity <= 0) {
                        throw new Error('Each item must have a positive quantity');
                    }
                    if (typeof item.price !== 'number' || item.price <= 0) {
                        throw new Error('Each item must have a positive price');
                    }
                }
            },
        },
    },
}, {
    // Other model options go here
});

module.exports = Invoice;

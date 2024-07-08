const express = require('express');
const router = express.Router();
const {
    postInvoice,
    getInvoices,
    getInvoice,
    updateInvoice
} = require('../Controllers/Invoice.js');

// Route to create a new invoice
router.post('/postInvoice', postInvoice);

// Route to get all invoices for a specific email
router.get('/getInvoices/:email', getInvoices);

// Route to get a specific invoice by ID for a specific email
router.get('/getInvoice/:invoiceId/:email', getInvoice);

// Update all entries
//router.put('/updateInvoice/:invoiceId/:email', updateInvoice);

// Update specific entries
router.patch('/updateInvoice/:invoiceId/:email', updateInvoice);

module.exports = router;

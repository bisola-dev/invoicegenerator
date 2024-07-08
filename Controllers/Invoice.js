const Invoice = require('../models/Invoice.js');
const { invoiceSchema } = require('../validations/Invoice');
const { handleYupError, handleServerError } = require('../error/error');

const postInvoice = async (req, res) => {
    const { email, invoiceData } = req.body;

    try {
        // Validate inputs using invoiceSchema
        await invoiceSchema.validate({ email, invoiceData }, { abortEarly: false });

        // Check if an invoice with the same invoiceNumber exists for the email
        const existingInvoice = await Invoice.findOne({ where: { email, 'invoiceData.invoiceNumber': invoiceData.invoiceNumber } });
        if (existingInvoice) {
            return res.status(400).json({ msg: 'Invoice with the same number already exists for this email' });
        }

        // Insert the new invoice into the database
        const newInvoice = await Invoice.create({
            email,
            invoiceData,
        });

        res.status(201).json({ msg: 'Invoice created successfully', invoice: newInvoice });
    } catch (err) {
        if (err.name === 'ValidationError') {
            // Handle Yup validation errors
            return handleYupError(err, res);
        } else if (err.name === 'SequelizeUniqueConstraintError') {
            // Handle Sequelize unique constraint errors more explicitly
            return res.status(400).json({ msg: 'Invoice with the same number already exists for this email' });
        } else {
            // Handle other server errors and log them
            console.error('Error creating invoice:', err);
            res.status(500).send('Server Error');
        }
    }
};

const getInvoices = async (req, res) => {
    const { email } = req.params;

    try {
        // No need to validate email in this case as it's part of the URL params

        const invoices = await Invoice.findAll({ where: { email } });
        res.status(200).json({ invoices });
    } catch (err) {
        handleServerError(err, res);
    }
};

// Controller function to get a specific invoice by invoiceId and email
const getInvoice = async (req, res) => {
    const { invoiceId, email } = req.params;

    try {
        // No need to validate invoiceId and email as they're part of the URL params

        const invoice = await Invoice.findOne({ where: { id: invoiceId, email } });
        if (!invoice) {
            return res.status(404).json({ msg: 'Invoice not found' });
        }
        res.status(200).json({ invoice });
    } catch (err) {
        handleServerError(err, res);
    }
};

// Controller function to update a specific invoice by invoiceId and email
const updateInvoice = async (req, res) => {
    const { invoiceId, email } = req.params;
    const { invoiceData } = req.body;

    console.log('Params:', req.params);
    console.log('Body:', req.body);

    try {
        // Validate required fields
        if (!invoiceData || !invoiceData.invoiceNumber || !invoiceData.amount || !invoiceData.items || invoiceData.items.length === 0 || !invoiceData.items[0].quantity) {
            return res.status(400).json({ msg: 'Missing required fields in invoiceData' });
        }

        // Fetch existing invoice data based on invoiceId and email
        let existingInvoice = await Invoice.findOne({
            where: { id: invoiceId, email }
        });

        if (!existingInvoice) {
            return res.status(404).json({ msg: 'Invoice not found' });
        }

        // Merge updated invoiceData with existing data
        const updatedInvoiceData = {
            ...existingInvoice.invoiceData,  // retain existing fields
            invoiceNumber: invoiceData.invoiceNumber,
            amount: invoiceData.amount,
            items: invoiceData.items  // overwrite items with new data
        };

        // Update the invoice data with the merged fields
        const updatedInvoice = await existingInvoice.update({
            invoiceData: updatedInvoiceData
        });

        res.status(200).json({ msg: 'Invoice updated successfully', invoice: updatedInvoice });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};
module.exports = {
    postInvoice,
    getInvoices,
    getInvoice,
    updateInvoice
};



const yup = require('yup');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const invoiceSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),

    invoiceData: yup.object().shape({
        invoiceNumber: yup
            .string()
            .required('Invoice number is required'),

        amount: yup
            .number()
            .positive('Amount must be a positive number')
            .required('Amount is required'),

        items: yup
            .array()
            .of(
                yup.object().shape({
                    name: yup
                        .string()
                        .required('Item name is required'),

                    quantity: yup
                        .number()
                        .positive('Quantity must be a positive number')
                        .required('Quantity is required'),

                    price: yup
                        .number()
                        .positive('Price must be a positive number')
                        .required('Price is required')
                })
            )
            .min(1, 'At least one item is required')
    })
});
module.exports = {
    emailRegex,
    invoiceSchema
};
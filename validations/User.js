const yup = require('yup');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const registerSchema = yup.object().shape({
    fullName: yup
        .string()
        .min(2, 'Full name must be at least 2 characters')
        .max(50, 'Full name must not exceed 50 characters')
        .required('Full name is required'),
    
    email: yup
        .string()
        .matches(emailRegex, 'Invalid email format')
        .required('Email is required'),

    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(8, 'Password cannot exceed 8 characters')
        .required()
});

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email format')
        .required(),

    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(8, 'Password cannot exceed 8 characters')
        .required()
});

module.exports = {
    emailRegex,
    registerSchema,
    loginSchema
};

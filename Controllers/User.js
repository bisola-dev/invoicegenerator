const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const { handleYupError, handleServerError } = require('../error/error');
const { registerSchema,loginSchema } = require('../validations/User');

// Controller for user registration
const registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        // Validate inputs
        await registerSchema.validate({ fullName, email, password }, { abortEarly: false });

        // Check if user already exists
        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash password
        const salt = 'invoiz111'; // Note: Consider using a more secure method to generate salts
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = await User.create({
            fullName,
            email,
            password: hashedPassword
        });

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        if (err.name === 'ValidationError') {
            // Handle Yup validation errors
            return handleYupError(err, res);
        } else {
            // Handle other server errors
            return handleServerError(err, res);
        }
    }
};

// Controller for user login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate inputs
        await loginSchema.validate({ email, password }, { abortEarly: false });

        // Check if user exists
        let user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Create and return JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, 'jwtSecret', { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ msg: 'Login successful', token });
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            // Handle Yup validation errors
            return handleYupError(err, res);
        } else {
            // Handle other server errors
            return handleServerError(err, res);
        }
    }
};

module.exports = {
    registerUser,
    loginUser
};
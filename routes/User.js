const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/User.js');

// Register route
router.post('/register', UserController.registerUser);

// Login route
router.post('/login', UserController.loginUser);

module.exports = router;

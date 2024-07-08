// index.js

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database'); // Your Sequelize instance
const userRoutes = require('./routes/User.js'); 
const invoiceRoutes = require('./routes/Invoice.js');
const { Invoice } = require('./models/Invoice');


const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// Routes
app.use('/invoicegenerator/user', userRoutes); // Use user routes
app.use('/invoicegenerator/invoice', invoiceRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('API is running');
});

// Database connection and server start
sequelize.authenticate()
    .then(() => {
        console.log('MySQL database connected');
        return sequelize.sync({ force: false }); // Sync Sequelize with Database
    })
    .then(() => {
        console.log('Database synced');
        app.listen(3000, () => console.log('Server running on port 3000'));
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

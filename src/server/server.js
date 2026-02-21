// ==============================
// Imports
// ==============================
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const userdata = require('./models/register');
require('dotenv').config();

// ==============================
// App Config
// ==============================
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = 'mongodb://localhost:27017/Users';

// ==============================
// Middlewares
// ==============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(express.static(path.join(__dirname, '../client')));
app.use('/static', express.static(path.join(__dirname, '../client')));

// ==============================
// Routes
// ==============================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/pages/welcome.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/pages/login.html'));
});

app.post('/validate', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await userdata.findOne({ email: email, password: password });
    if (user) {
        res.status(200).json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/pages/register.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/pages/dashboard.html'));
});

app.post('/submitudata', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // TODO: Save to database here
        console.log({ name, email });
        const newUser = new userdata({ name, email, password });
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: 'User data received successfully'
        });

    } catch (error) {
        next(error);
    }
});

// ==============================
// Global Error Handler
// ==============================
app.use((err, req, res, next) => {
    console.error('🔥 Server Error:', err.message);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    });
});

// ==============================
// Database Connection
// ==============================
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        process.exit(1); // Stop app if DB fails
    }
}

// ==============================
// Start Server
// ==============================
async function startServer() {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}

startServer();
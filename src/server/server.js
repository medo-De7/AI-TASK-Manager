const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
// Serve client static files (styles, images, pages) if referenced relatively
// Serve client files so page-relative asset paths work (styles, pages, images)
app.use(express.static(path.join(__dirname, '../client')));
// also provide under /static for explicit asset linking if desired
app.use('/static', express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/pages/welcome.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/pages/login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/pages/register.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/pages/dashboard.html'));
});

// Simple 404 for other routes
app.use((req, res) => {
    res.status(404).send('Not found. Available pages: /, /login, /register, /dashboard');
});

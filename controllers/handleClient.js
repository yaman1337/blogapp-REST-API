const express = require('express');
const router = express.Router();



// homepage route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client' + '/index.html'));
});

// signup route
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../client' + '/signup.html'));
});

// login route
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../client' + '/login.html'));
});

// createblog route
router.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, '../client' + '/createblog.html'));
});

// profile route
router.get('/me', (req, res) => {
    res.sendFile(path.join(__dirname, '../client' + '/profile.html'));
});


module.exports = router;

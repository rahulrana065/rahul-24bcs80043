const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Hardcoded user
const USER = { username: 'testuser', password: 'password123', id: 1 };

// JWT Secret Key
const JWT_SECRET = 'your-secret-key';

// Issue JWT on login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === USER.username && password === USER.password) {
        // Make payload minimal (never put password)
        const token = jwt.sign({ id: USER.id, username: USER.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, token });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// JWT Verification Middleware
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ success: false, message: 'Missing Authorization header' });

    const token = authHeader.split(' ')[1]; // Expect 'Bearer TOKEN'
    if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ success: false, message: 'Token is invalid or expired' });
        req.user = user;
        next();
    });
}

// Protected Route Example
app.get('/protected', verifyToken, (req, res) => {
    res.json({ success: true, message: 'You accessed protected data!', user: req.user });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

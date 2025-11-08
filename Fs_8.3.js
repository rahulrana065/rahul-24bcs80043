// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = 'mysecretkey';

const users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'moderator', password: 'mod123', role: 'moderator' },
    { username: 'user', password: 'user123', role: 'user' }
];

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Token required' });
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = decoded;
        next();
    });
}

function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: insufficient role' });
        }
        next();
    };
}

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

app.get('/admin-dashboard', verifyToken, authorizeRoles('admin'), (req, res) => {
    res.json({ message: 'Welcome to Admin Dashboard' });
});

app.get('/moderator-panel', verifyToken, authorizeRoles('moderator', 'admin'), (req, res) => {
    res.json({ message: 'Welcome to Moderator Panel' });
});

app.get('/user-profile', verifyToken, authorizeRoles('user', 'moderator', 'admin'), (req, res) => {
    res.json({ message: `Welcome ${req.user.username} to your profile` });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

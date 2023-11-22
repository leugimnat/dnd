const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/users');

router.post('/', async(req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password});

        if (user) {
            const token = generateToken(user.username);

            res.json({success: true, message: 'Login successful', token});
        } else {
            res.status(401).json({success: false, message: 'Invalid credentials'});
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: 'Internal server error'});
    }
});

const generateToken = (username) => {
    const secretKey = 'yourSecretKey'; 
    const token = jwt.sign({username}, secretKey, {expiresIn: '24h'});

    return token;
};

module.exports = router;
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const app = express();

const Users = require('../models/users');

router.post('/login', async(req, res, next) => {
    const {username, password } = req.body;

    try {
        const user = await Users.findOne({username, password});

        if (user) {
            res.json({ success: true, message: 'Login successful'});
        } else {
            res.status(401).json({ success: false, message: "Invalid username or password"});
        }
    } catch (error){
        console.error(error);
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
});

router.post('/register'), async (req, res, next) => {
    const {username, password} = req.body;

    try {
        const existingUser = await Users.findOne({username});

        if (existingUser) {
            return res.status(400).json({success: false, message:" Username is already taken"});
        }

        const newUser = new Users({ username, password});
        const savedUser = await newUser.save();

        res.status(201).json({ success: true, message:"User registered", user:savedUser});
    } catch (error) {
        console.error(error)
        restart.status(500).json({success: false, message:"Internal server error"});
    }
}

module.exports = router;
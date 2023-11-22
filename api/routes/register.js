const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/users');

router.post('/', async(req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({username});

        if (existingUser) {
            return res.status(400).json({ success: false, message: "Username is already taken"});
        }

        const newUser = new User({_id: new mongoose.Types.ObjectId(), username, password});
        const savedUser = await newUser.save();

        res.status(201).json({ success:true, message:"User registered!", user:savedUser});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Internal server error'});
    }
});

module.exports = router;
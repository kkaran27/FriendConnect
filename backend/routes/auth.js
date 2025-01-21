// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
    try {
      const { email, password, name } = req.body;
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: 'User already exists' });
  
      // Create new user
      user = new User({ email, password, name });
      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      await user.save();
  
      const payload = { userId: user._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Return both token and userId
      res.status(201).json({ token, userId: user._id });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });

// Login endpoint
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      // Find the user in the database
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
      
      // Validate password (bcrypt comparison)
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
      
      // Create a JWT payload
      const payload = { userId: user._id };
      
      // Sign token (expires in 1 hour for example)
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      
      // Return token and userId (you might choose to return additional data)
      res.json({ token, userId: user._id });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;

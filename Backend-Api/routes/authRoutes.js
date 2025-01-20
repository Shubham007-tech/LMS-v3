const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'my_jwt_secret';

//The JWT_SECRET is used to sign the JWT and ensure its integrity. 
// When you generate a JWT, the secret is used in the process of creating the signature for the token


// Sign up (POST)
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'User created successfully',
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error signing up user', error: err.message });
  }
});







// Login (POST)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Check if the password is correct
      const isPasswordValid = await user.matchPassword(password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({
        message: 'Login successful',
        token,
      });
    } catch (err) {
      res.status(500).json({ message: 'Error logging in', error: err.message });
    }
  });





module.exports = router;

// routes/profile.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
// Import your auth middleware if you're protecting this route
// const auth = require('../middleware/auth');

// Update profile endpoint
router.put('/update', /* auth, */ async (req, res) => {
  try {
    // Expect the request body to include userId and profile details (bio, interests, location, questionnaire, etc.)
    const { userId, name, bio, interests, location, profilePictureUrl, questionnaire } = req.body;
    
    // Update the user data. You can add validations as needed.
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, bio, interests, location, profilePictureUrl, questionnaire },
      { new: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json({ msg: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

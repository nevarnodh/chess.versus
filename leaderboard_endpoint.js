const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find().sort({ wins: -1 }).limit(10);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


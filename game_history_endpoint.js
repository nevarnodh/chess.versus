const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

router.get('/history/:userId', async (req, res) => {
  try {
    const games = await Game.find({ $or: [{ player1: req.params.userId }, { player2: req.params.userId }] });
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


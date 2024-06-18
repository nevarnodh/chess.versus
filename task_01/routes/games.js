// routes/games.js
const express = require('express');
const Game = require('../models/Game');
const router = express.Router();

// Start a new game
router.post('/start', async (req, res) => {
  try {
    const { player1, player2 } = req.body;
    const newGame = new Game({ players: [player1, player2] });
    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get game details
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id).populate('players');
    res.json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;


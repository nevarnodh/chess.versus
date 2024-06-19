const express = require('express');
const Game = require('../models/Game');
const router = express.Router();
const { getBestMove } = require('../ai/ai');

// Make a move
router.post('/move', async (req, res) => {
  try {
    const { gameId, move, playerId } = req.body;
    const game = await Game.findById(gameId);

    // Validate and make the move
    if (game && game.makeMove(move)) {
      const aiMove = getBestMove(game.board); // Get AI move
      game.makeMove(aiMove); // Make AI move
      await game.save();
      res.json({ game, aiMove });
    } else {
      res.status(400).json({ error: 'Invalid move' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


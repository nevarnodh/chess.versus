const express = require('express');
const Game = require('../models/Game');
const router = express.Router();
const { getBestMove } = require('../ai/ai');

// Make a move and get AI response
router.post('/move', async (req, res) => {
  try {
    const { gameId, move, playerId } = req.body;
    const game = await Game.findById(gameId);

    if (game && game.makeMove(move)) {
      // Get AI move
      const aiMove = getBestMove(game.board);
      game.makeMove(aiMove);
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


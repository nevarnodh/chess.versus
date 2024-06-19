const { minimax } = require('./minimax');
const Chess = require('chess.js').Chess;

function getBestMove(board, depth = 3) {
  let bestMove = null;
  let bestValue = -Infinity;
  const chess = new Chess(board);
  const possibleMoves = chess.ugly_moves();

  possibleMoves.forEach(move => {
    chess.ugly_move(move);
    const boardValue = minimax(chess.fen(), depth, false, -Infinity, Infinity);
    chess.undo();

    if (boardValue > bestValue) {
      bestValue = boardValue;
      bestMove = move;
    }
  });

  return bestMove;
}

module.exports = { getBestMove };


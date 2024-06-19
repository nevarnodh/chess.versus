// ai/ai.js
const { minimax } = require('./minimax');
const { generateMoves, makeMove, evaluateBoard } = require('./helpers');

function getBestMove(board) {
  let bestMove = null;
  let bestValue = -Infinity;
  const possibleMoves = generateMoves(board, 'AI');

  possibleMoves.forEach(move => {
    const newBoard = makeMove(board, move);
    const boardValue = minimax(newBoard, 3, false, -Infinity, Infinity);

    if (boardValue > bestValue) {
      bestValue = boardValue;
      bestMove = move;
    }
  });

  return bestMove;
}

module.exports = { getBestMove };


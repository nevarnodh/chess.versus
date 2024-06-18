// ai/ai.js
const { minimax } = require('./minimax');

function getBestMove(board) {
  let bestMove = null;
  let bestValue = -Infinity;
  const possibleMoves = generateMoves(board, 'AI');
  for (const move of possibleMoves) {
    const newBoard = makeMove(board, move);
    const boardValue = minimax(newBoard, 3, false, -Infinity, Infinity);
    if (boardValue > bestValue) {
      bestValue = boardValue;
      bestMove = move;
    }
  }
  return bestMove;
}


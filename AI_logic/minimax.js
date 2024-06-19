const Chess = require('chess.js').Chess;
const { evaluateBoard } = require('./evaluateBoard');

function minimax(board, depth, isMaximizingPlayer, alpha, beta) {
  const chess = new Chess(board);

  if (depth === 0 || chess.game_over()) {
    return evaluateBoard(chess.board());
  }

  const moves = chess.ugly_moves();

  if (isMaximizingPlayer) {
    let maxEval = -Infinity;
    for (let move of moves) {
      chess.ugly_move(move);
      const eval = minimax(chess.fen(), depth - 1, false, alpha, beta);
      chess.undo();
      maxEval = Math.max(maxEval, eval);
      alpha = Math.max(alpha, eval);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let move of moves) {
      chess.ugly_move(move);
      const eval = minimax(chess.fen(), depth - 1, true, alpha, beta);
      chess.undo();
      minEval = Math.min(minEval, eval);
      beta = Math.min(beta, eval);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

module.exports = { minimax };


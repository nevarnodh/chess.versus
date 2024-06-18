// ai/minimax.js
function minimax(board, depth, isMaximizingPlayer, alpha, beta) {
  // Base case: evaluate the board if the game is over or max depth is reached
  if (depth === 0 || isGameOver(board)) {
    return evaluateBoard(board);
  }

  if (isMaximizingPlayer) {
    let maxEval = -Infinity;
    const possibleMoves = generateMoves(board, 'AI');
    for (const move of possibleMoves) {
      const newBoard = makeMove(board, move);
      const eval = minimax(newBoard, depth - 1, false, alpha, beta);
      maxEval = Math.max(maxEval, eval);
      alpha = Math.max(alpha, eval);
      if (beta <= alpha) {
        break;
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    const possibleMoves = generateMoves(board, 'Player');
    for (const move of possibleMoves) {
      const newBoard = makeMove(board, move);
      const eval = minimax(newBoard, depth - 1, true, alpha, beta);
      minEval = Math.min(minEval, eval);
      beta = Math.min(beta, eval);
      if (beta <= alpha) {
        break;
      }
    }
    return minEval;
  }
}


function evaluateBoard(board) {
  const chess = new Chess(board);
  let score = 0;

  const pieceValue = {
    p: 1,
    r: 5,
    n: 3,
    b: 3,
    q: 9,
    k: 0
  };

  chess.board().forEach(row => {
    row.forEach(piece => {
      if (piece) {
        const value = pieceValue[piece.type];
        score += piece.color === 'w' ? value : -value;
      }
    });
  });

  return score;
}

module.exports = { evaluateBoard };


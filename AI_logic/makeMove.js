function makeMove(board, move) {
  const chess = new Chess(board);
  chess.move(move);
  return chess.fen();
}

module.exports = { makeMove };


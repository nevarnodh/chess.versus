function generateMoves(board, player) {
  const moves = [];
  const chess = new Chess(board);

  chess.moves().forEach(move => {
    chess.move(move);
    moves.push(chess.fen());
    chess.undo();
  });

  return moves;
}

module.exports = { generateMoves };


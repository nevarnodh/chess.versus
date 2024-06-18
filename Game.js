import React, { useState } from 'react';
import Chessboard from 'chessboardjsx';
import Chess from 'chess.js'; // A library for chess logic

const Game = () => {
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState('start');

  const handleMove = (move) => {
    if (chess.move(move)) {
      setFen(chess.fen());
      // If against AI, make AI move here
    }
  };

  return (
    <div>
      <Chessboard
        position={fen}
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            promotion: 'q', // Always promote to queen for simplicity
          })
        }
      />
      <button onClick={() => chess.reset() && setFen('start')}>Restart</button>
      <button onClick={() => alert('Draw Offered')}>Offer Draw</button>
      <button onClick={() => alert('Game Resigned')}>Resign</button>
    </div>
  );
};

export default Game;


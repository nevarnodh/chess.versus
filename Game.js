import React, { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import Chess from 'chess.js';
import axios from 'axios';

const Game = ({ gameId, playerId }) => {
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState('start');
  const [playerTurn, setPlayerTurn] = useState('w');

  useEffect(() => {
    // Load game state from backend if needed
    const fetchGameState = async () => {
      try {
        const response = await axios.get(`/api/games/${gameId}`);
        setFen(response.data.board);
        setPlayerTurn(response.data.turn);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGameState();
  }, [gameId]);

  const handleMove = async (move) => {
    const newMove = {
      from: move.sourceSquare,
      to: move.targetSquare,
      promotion: 'q', // Always promote to queen for simplicity
    };

    if (chess.move(newMove)) {
      setFen(chess.fen());
      setPlayerTurn(chess.turn() === 'w' ? 'b' : 'w');

      try {
        const response = await axios.post('/api/games/move', {
          gameId,
          move: newMove,
          playerId,
        });

        if (response.data && response.data.aiMove) {
          chess.move(response.data.aiMove);
          setFen(chess.fen());
          setPlayerTurn(chess.turn() === 'w' ? 'b' : 'w');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <Chessboard
        position={fen}
        onDrop={(move) => handleMove(move)}
        orientation={playerId === 'player1' ? 'white' : 'black'}
      />
      <button onClick={() => { chess.reset(); setFen('start'); }}>Restart</button>
      <button onClick={() => alert('Draw Offered')}>Offer Draw</button>
      <button onClick={() => alert('Game Resigned')}>Resign</button>
    </div>
  );
};

export default Game;


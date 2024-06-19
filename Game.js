import React, { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import Chess from 'chess.js';
import io from 'socket.io-client';
import './styles.css';

const socket = io('http://localhost:3000');

const Game = ({ gameId, playerId }) => {
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState('start');
  const [playerTurn, setPlayerTurn] = useState('w');

  useEffect(() => {
    socket.emit('joinGame', gameId);

    socket.on('moveMade', (move) => {
      chess.move(move);
      setFen(chess.fen());
      setPlayerTurn(chess.turn() === 'w' ? 'b' : 'w');
    });

    return () => {
      socket.off('moveMade');
    };
  }, [gameId, chess]);

  const handleMove = (move) => {
    const newMove = {
      from: move.sourceSquare,
      to: move.targetSquare,
      promotion: 'q',
    };

    if (chess.move(newMove)) {
      setFen(chess.fen());
      setPlayerTurn(chess.turn() === 'w' ? 'b' : 'w');
      socket.emit('makeMove', { gameId, move: newMove });
    }
  };

  return (
    <div className="game-container">
      <Chessboard
        position={fen}
        onDrop={(move) => handleMove(move)}
        orientation={playerId === 'player1' ? 'white' : 'black'}
        className="chessboard"
      />
      <div className="button-group">
        <button onClick={() => { chess.reset(); setFen('start'); }}>Restart</button>
        <button onClick={() => alert('Draw Offered')}>Offer Draw</button>
        <button onClick={() => alert('Game Resigned')}>Resign</button>
      </div>
    </div>
  );
};

export default Game;


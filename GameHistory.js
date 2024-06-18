import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GameHistory() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('/api/games/history'); // Replace with actual API
        setGames(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGames();
  }, []);

  return (
    <div>
      <h1>Game History</h1>
      <ul>
        {games.map((game, index) => (
          <li key={index}>
            Game {index + 1}: {game.result} against {game.opponent}
            <button onClick={() => alert('Replay not implemented')}>Replay</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameHistory;


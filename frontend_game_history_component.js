import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GameHistory = ({ userId }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`/api/games/history/${userId}`);
        setGames(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGames();
  }, [userId]);

  return (
    <div>
      <h2>Game History</h2>
      <ul>
        {games.map((game) => (
          <li key={game._id}>{game.result} - {new Date(game.createdAt).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameHistory;


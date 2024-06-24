import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SpectatorComponent = () => {
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);

    useEffect(() => {
        axios.get('/api/games/active')
            .then(response => {
                setGames(response.data);
            })
            .catch(error => {
                console.error('Error fetching active games:', error);
            });
    }, []);

    const viewGame = (gameId) => {
        axios.get(`/api/games/${gameId}`)
            .then(response => {
                setSelectedGame(response.data);
            })
            .catch(error => {
                console.error('Error fetching game details:', error);
            });
    };

    return (
        <div>
            <h1>Active Games</h1>
            <ul>
                {games.map(game => (
                    <li key={game.id}>
                        {game.player1} vs {game.player2} 
                        <button onClick={() => viewGame(game.id)}>View</button>
                    </li>
                ))}
            </ul>
            {selectedGame && (
                <div>
                    <h2>Game Details</h2>
                    <div>{JSON.stringify(selectedGame)}</div>
                </div>
            )}
        </div>
    );
};

export default SpectatorComponent;


// history.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/games')
        .then(response => response.json())
        .then(games => {
            const historyList = document.getElementById('history');
            games.forEach(game => {
                const listItem = document.createElement('li');
                listItem.textContent = `${game.date_played}: ${game.result}`;
                listItem.addEventListener('click', () => replayGame(game.moves));
                historyList.appendChild(listItem);
            });
        });
});

function replayGame(moves) {
    const game = new Chess();
    const board = Chessboard('board', 'start');
    
    const moveList = moves.split(' ');
    let i = 0;

    function playNextMove() {
        if (i < moveList.length) {
            game.move(moveList[i]);
            board.position(game.fen());
            i++;
            setTimeout(playNextMove, 1000);
        }
    }

    playNextMove();
}


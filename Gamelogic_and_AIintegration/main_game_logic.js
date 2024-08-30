// chessboard.js
document.addEventListener('DOMContentLoaded', function() {
    const board = Chessboard('board', 'start');
    const game = new Chess();
    
    function onDrop(source, target) {
        const move = game.move({
            from: source,
            to: target,
            promotion: 'q'
        });

        if (move === null) return 'snapback';

        if (game.game_over()) {
            alert('Game over');
        } else {
            window.setTimeout(makeBestMove, 250);
        }
    }

    function makeBestMove() {
        const bestMove = getBestMove(game);
        game.move(bestMove);
        board.position(game.fen());
        if (game.game_over()) {
            alert('Game over');
        }
    }

    function getBestMove(game) {
        // Call AI function here
        return 'e2e4';  // Simplified
    }

    board.position(game.fen());
});


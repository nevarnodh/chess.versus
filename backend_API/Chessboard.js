<!-- Include chessboard.js and chess.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/chessboard-js/1.0.0/chessboard.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/chessboard-js/1.0.0/chessboard.min.css" />

<div id="board" style="width: 400px"></div>
<script>
    var board = Chessboard('board', {
        draggable: true,
        dropOffBoard: 'trash',
        sparePieces: true
    });
</script>


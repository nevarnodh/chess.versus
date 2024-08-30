def alphabeta(board, depth, alpha, beta, is_maximizing):
    if depth == 0 or game_over(board):
        return evaluate_board(board)
    
    if is_maximizing:
        max_eval = float('-inf')
        for move in get_all_moves(board):
            eval = alphabeta(make_move(board, move), depth - 1, alpha, beta, False)
            max_eval = max(max_eval, eval)
            alpha = max(alpha, eval)
            if beta <= alpha:
                break
        return max_eval
    else:
        min_eval = float('inf')
        for move in get_all_moves(board):
            eval = alphabeta(make_move(board, move), depth - 1, alpha, beta, True)
            min_eval = min(min_eval, eval)
            beta = min(beta, eval)
            if beta <= alpha:
                break
        return min_eval


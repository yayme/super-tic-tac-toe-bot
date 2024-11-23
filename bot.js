
function best_move() {
    // bot turn
    let bestScore = -Infinity;
    let movei=0;
  let movej=0;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        // Is the spot empty?
        if (board[i][j] == ' ' && bigboard[floor(i/3)][floor(j/3)]==' ') {
         
          board[i][j] = bot;
          small_checkwinner(floor(i/3),floor(j/3));
          let score = minimax(board, 0,-Infinity,Infinity, false);
          // checking the score after putting a move here
          board[i][j] = ' ';
          small_checkwinner(floor(i/3),floor(j/3));
          if (score > bestScore) {
            bestScore = score;
            movei=i;
            movej=j;
          }

        }
      }
    }
    board[movei][movej] = bot;
  small_checkwinner(floor(movei/3),floor(movej/3));
    current_player = human;
    
  }
  
  let scores = {
    X: 10,
    O: -10,
    tie: 0
  };
  
  function minimax(board, depth,alpha,beta, is_maximizing) {
    
   
    let result = big_checkwinner();
    if (result !== null) {
      return scores[result];
    }
    if(depth==1){
  return cnt;
    }
  
    if (is_maximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          // is the spot empty?
          if (board[i][j] == ' ' && bigboard[floor(i/3)][floor(j/3)]==' ' ) {
            board[i][j] = bot;
            small_checkwinner(floor(i/3),floor(j/3));
            let score = minimax(board, depth + 1,alpha,beta, false);
             bestScore = min(score, bestScore);
            alpha=max(alpha,score);
            board[i][j] = ' ';
            small_checkwinner(floor(i/3),floor(j/3));
             bestScore = min(score, bestScore);
            if(alpha>=beta)
{
  break;
}
              
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          // Is the spot empty?
          if (board[i][j] == ' ' && bigboard[floor(i/3)][floor(j/3)]==' ') {
            board[i][j] = human;
            small_checkwinner(floor(i/3),floor(j/3));
            let score = minimax(board, depth + 1,alpha,beta, true);
             bestScore = min(score, bestScore);
            beta=min(beta,score);
            board[i][j] = ' ';
            small_checkwinner(floor(i/3),floor(j/3));
           
                    if(alpha>=beta)
{
  break;
}
          }
        }
      }
      return bestScore;
    }
  }

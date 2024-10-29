
let w;
let h;
let bigw;
let bigh;
let board = Array.from({ length: 9 }, () => Array(9).fill(' ')); // 9x9 2D array
let bigboard = Array.from({ length: 3 }, () => Array(3).fill(' ')); // 3x3 2D array
let human='O';
let bot='X';
let current_player=human;
let cnt=0;

function setup() {
  createCanvas(600, 600);
  w=width/9;
  h=height/9;
  bigw=width/3;
  bigh=height/3;
   // best_move();
}

function mousePressed() {
 if (current_player == human  ) {

    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    //If the turn is valid
    if (board[i][j] == ' ') {
      board[i][j] = current_player;
      
      small_checkwinner(floor(i/3),floor(j/3));
      if(current_player==human)
        {
          current_player=bot;
        }
      else
        {
          current_player=human;
        }
       best_move();
    }
 }
}


function equals(a,b,c)
{ 
  return a==b && b==c && a !=' ';
}

function big_checkwinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals(bigboard[i][0], bigboard[i][1], bigboard[i][2])) {
      winner = bigboard[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals(bigboard[0][i], bigboard[1][i], bigboard[2][i])) {
      winner = bigboard[0][i];
    }
  }

  // Diagonal
  if (equals(bigboard[0][0], bigboard[1][1], bigboard[2][2])) {
    winner = bigboard[0][0];
  }
  if (equals(bigboard[2][0], bigboard[1][1], bigboard[0][2])) {
    winner = bigboard[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      
      if (bigboard[i][j] == ' ') {
        openSpots++;
      }
    }
  }
  

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else if(winner==bot || winner==human) {
    return winner;
  }
  else{
    return null;
  }
}
function small_checkwinner(a,b) {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals(board[i+3*a][0+3*b], board[i+3*a][1+3*b], board[i+3*a][2+3*b])) {
      winner = board[i+3*a][0+3*b];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals(board[0+3*a][i+3*b], board[1+3*a][i+3*b], board[2+3*a][i+3*b])) {
      winner = board[0+3*a][i+3*b];
    }
  }

  // Diagonal
  if (equals(board[0+3*a][0+3*b], board[1+3*a][1+3*b], board[2+3*a][2+3*b])) {
    winner = board[0+3*a][0+3*b];
  }
  if (equals(board[2+3*a][0+3*b], board[1+3*a][1+3*b], board[0+3*a][2+3*b])) {
    winner = board[2+3*a][0+3*b];
  }

  let open_spots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i+3*a][j+3*b] == ' ') {
        open_spots++;
      }
    }
  }

  if (winner == null && open_spots==0 ) {
    bigboard[a][b]='=';
  } else if(winner==human) {
    bigboard[a][b]=human;
    cnt++;
  }
  else if(winner==bot){
    bigboard[a][b]=bot;
    cnt--;
  }
  else
    {
      bigboard[a][b]=' ';
    }
 
}

function draw() {
  background(240);
 strokeWeight(1);
  stroke(0);
 
  for(let i=1;i<9;i++)
    {
      line(i*w,0,i*w,height);
      line(0,i*h,width,i*h);
    }
  strokeWeight(5);
  stroke(255, 0, 0);
  for(let i=1;i<3;i++)
    {
       line(i*bigw,0,i*bigw,height);
      line(0,i*bigh,width,i*bigh);
    }
  
   for (let j = 0; j < 9; j++) {
    for (let i = 0; i < 9; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(10);
      strokeWeight(1);
      let r = w / 4;
      if (spot == human) {
        noFill();
        ellipse(x, y, r * 2);
      } else if (spot == bot) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }
    for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = bigw * i + bigw / 2;
      let y = bigh * j + bigh / 2;
      let spot = bigboard[i][j];
      textSize(32);
      strokeWeight(5);
      let r = bigw / 4;
      if (spot == human) {
        noFill();
        ellipse(x, y, r * 2);
      } else if (spot == bot) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
      else if(spot=='=')
        {
          square(i*bigw,j*bigh,bigw);
        }
    }
  }
    let result = big_checkwinner();
  
  if (result != null) {
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    if (result == 'tie') {
      resultP.html('Tie!');
    } else {
      resultP.html(`${result} wins!`);
    }
  }


}
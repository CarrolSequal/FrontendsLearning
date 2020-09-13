// For portable device
documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

function getPosTop(i, j){
  return cellSpace + i*(cellSpace + cellSideLength);
}

function getPosLeft(i, j){
  return cellSpace + j*(cellSpace + cellSideLength);
}

function getNumBackgroundColor(num){
  switch(num){
    case 2:
      return "#eee4da";break;
    case 4:
      return "#ede0c8";break;
    case 8:
      return "#f26179";break;
    case 16:
      return "#f2b179";break;
    case 32:
      return "#f59563";break;
    case 64:
      return "#f65e3b";break;
    case 128:
      return "#edcf72";break;
    case 256:
      return "#edcc61";break;
    case 512:
      return "#9c0";break;
    case 1024:
      return "#33b5e5";break;
    case 2048:
      return "#09c";break;
    case 4096:
      return "#a6c";break;
    case 8192:
      return "#93c";break;
  }
  return "black";
}

function getNumColor(num){
  if(num <= 4){
    return "#776e65";
  }
  return "#ffffff";
}

function noSpace(board){
  for(var i = 0; i < 4; i ++){
    for(var j = 0; j < 4; j ++){
      if(board[i][j] == 0)
        return false;
    }
  }
  return true;
}

function noMove(board){
  if(isMoveDown(board) || isMoveLeft(board) || isMoveLeft(board) || isMoveRight(board))
    return false;
  return true;
}

function isMoveLeft(board){
  for(var i = 0; i < 4; i ++){
    for(var j = 1; j < 4; j ++){
      if(board[i][j] != 0){
        if(board[i][j-1] == 0 || board[i][j-1] == board[i][j])
          return true;
      }
    }
  }
  return false;
}

function isMoveRight(board){
  for(var i = 0; i < 4; i ++ )
    for(var j = 2; j >= 0; j --)
      if(board[i][j] != 0){
        if(board[i][j+1] == 0 || board[i][j+1] == board[i][j])
          return true;
      }
  return false;
}

function isMoveUp(board){
  for(var i = 1; i < 4; i ++)
    for(var j = 0; j < 4; j ++)
      if(board[i][j] != 0){
        if(board[i-1][j] == 0 || board[i][j] == board[i-1][j])
        return true;
      }
  return false;
}

function isMoveDown(board){
  for(var i = 2; i >= 0; i --)
    for(var j = 0; j < 4; j ++)
      if(board[i][j] != 0){
        if(board[i+1][j] == 0 || board[i][j] == board[i+1][j])
          return true;
      }
  return false;
}

function noBlockHorizontal(row, col1 , col2, board){
  for(var i = col1 + 1; i < col2; i ++)
    if(board[row][i] != 0)
      return false;
  return true;
}

function noBlockVertical(row1, row2 ,col, board){
  for(var i = row2 + 1; i < row1; i++)
    if(board[i][col] != 0)
      return false;
  return true;
}

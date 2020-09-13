var board = new Array();
var check = new Array();
var score = 0;

var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

$(document).ready(function(){
  prepareForMobile();
  newgame();
});

function prepareForMobile(){

  if( documentWidth > 500) {
    gridContainerWidth = 500;
    cellSpace = 20;
    cellSideLength = 100;
  }

  $('#grid-container').css('width', gridContainerWidth - 2*cellSpace);
  $('#grid-container').css('height', gridContainerWidth - 2*cellSpace);
  $('#grid-container').css('padding', cellSpace);
  $('#grid-container').css('border-radius', 0.02*gridContainerWidth);

  $('.grid-cell').css('width', cellSideLength);
  $('.grid-cell').css('height', cellSideLength);
  $('.grid-cell').css('border-radius', 0.02*cellSideLength);
}

function newgame(){
  // 初始化
  init();
  //在随机两个格子里生成数字
  generateOneNum();
  generateOneNum();
}

function init(){
  for(var i = 0; i < 4 ; i ++)
    for(var j = 0; j < 4 ; j ++){
      var gridCell = $("#grid-cell-" + i + "-" + j);
      gridCell.css('top', getPosTop(i, j));
      gridCell.css('left', getPosLeft(i, j));
    }

  for(var i = 0; i < 4; i ++){
    board[i] = new Array();
    check[i] = new Array();
    for(var j = 0; j < 4; j ++){
      board[i][j] = 0;
      check[i][j] = false;
    }
  }
  updateBoardView();
  score = 0;
}

function updateBoardView(){
  $(".num-cell").remove();
  for(var i = 0; i < 4; i ++){
    for(var j = 0; j < 4; j ++){
      $("#grid-container").append('<div class="num-cell" id="num-cell-' + i + '-' + j + '"></div>');
      var theNumCell = $('#num-cell-' + i + '-' + j);
      if(board[i][j] == 0){
        theNumCell.css('width', '0px');
        theNumCell.css('height', '0px');
        theNumCell.css('top', getPosTop(i, j) + cellSideLength/2);
        theNumCell.css('left', getPosLeft(i, j) + cellSideLength/2);
      }
      else{
        theNumCell.css('width', cellSideLength);
        theNumCell.css('height', cellSideLength);
        theNumCell.css('top', getPosTop(i, j));
        theNumCell.css('left', getPosLeft(i, j));
        theNumCell.css('background-color', getNumBackgroundColor(board[i][j]));
        theNumCell.css('color', getNumColor(board[i][j]));
        theNumCell.text(board[i][j]);
      }
      check[i][j] = false;
    }
  }
  $('.num-cell').css('line-height', cellSideLength + 'px');
  $('.num-cell').css('font-size', 0.6*cellSideLength + 'px');
}

function generateOneNum(){

  if(noSpace(board))
    return false;
  
  var randX = parseInt(Math.floor(Math.random() * 4));
  var randY = parseInt(Math.floor(Math.random() * 4));

  var times = 0;
  while(times < 50){
    if(board[randX][randY] == 0)
      break;
    
    var randX = parseInt(Math.floor(Math.random() * 4));
    var randY = parseInt(Math.floor(Math.random() * 4));

    times ++;
  }

  if(times >= 50){
    for(var i = 0; i < 4; i ++)
      for(var j = 0; j < 4; j ++){
        if(board[i][j] == 0){
          randX = i;
          randY = j;
        }
      }
  }

  var ranNum = Math.random() < 0.5 ? 2 : 4;
  board[randX][randY] = ranNum;
  numDisplayAnimation(randX, randY, ranNum);
  return true;
}

$(document).keydown(function(event){
  switch(event.keyCode){
    case 37:
      event.preventDefault();//控制键不会影响到页面下滑
      if(moveLeft()){
        setTimeout("generateOneNum()", 210);
        setTimeout("isGameOver()", 300);
      }
      break;
    case 38:
      event.preventDefault();
      if(moveUp()){
        setTimeout("generateOneNum()", 210);
        setTimeout("isGameOver()", 300);
      }
      break;
    case 39:
      event.preventDefault();
      if(moveRight()){
        setTimeout("generateOneNum()", 210);
        setTimeout("isGameOver()", 300);
      }
      break;
    case 40:
      event.preventDefault();
      if(moveDown()){
        setTimeout("generateOneNum()", 210);
        setTimeout("isGameOver()", 300);
      }
      break;
    default:
      break;
  }
});

document.addEventListener('touchstart', function(event){
  startX = event.touches[0].pageX;
  startY = event.touches[0].pageY;
});

document.addEventListener('touchmove', function(event){
  event.preventDefault();//解决Issue19827
});

document.addEventListener('touchend', function(event){
  endX = event.changedTouches[0].pageX;
  endY = event.changedTouches[0].pageY;

  var deltaX = endX - startY;
  var deltaY = endY - startY;
  
  //判断是不是仅点击而无滑动
  if(Math.abs(deltaX) < 0.3*documentWidth && Math.abs(deltaY) < 0.3*documentWidth)
    return;

  //x
  if( Math.abs(deltaX) >= Math.abs(deltaY)){
    if(deltaX > 0){
       //move right
       if(moveRight()){
        setTimeout("generateOneNum()", 210);
        setTimeout("isGameOver()", 300);
      }
    }
    else{
      //move left
      if(moveLeft()){
        setTimeout("generateOneNum()", 210);
        setTimeout("isGameOver()", 300);
      }
    }
  }
  else{
    if(deltaY > 0){
      //move down
     if(moveDown()){
      setTimeout("generateOneNum()", 210);
      setTimeout("isGameOver()", 300);
   }
   else{
     //move up
     if(moveUp()){
      setTimeout("generateOneNum()", 210);
      setTimeout("isGameOver()", 300);
    }
    }
   }
  }
}); 

function isGameOver(){
  if(noSpace(board) && noMove(board))
    gameOver();
}

function gameOver(){
  alert("GameOver!");
}

function moveLeft(){
  if(!isMoveLeft(board))
    return false;

  for(var i = 0; i < 4; i ++){
    for(var j = 1; j < 4; j ++){
      if(board[i][j] != 0){
        for(var k = 0; k < j; k ++){
          if(board[i][k] == 0 && noBlockHorizontal(i, k , j, board)){
            //move
            numUpdateDisplayAnimation(i, j, i, k);
            board[i][k] = board[i][j];
            board[i][j] = 0;
            continue;
          }
          else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k , j, board) && !check[i][k]){
            //move
            numUpdateDisplayAnimation(i, j, i, k);
            //updateNum
            board[i][k] += board[i][j];
            board[i][j] = 0;
            score += board[i][k];
            updateScore(score);
            check[i][k] = true;
            continue;
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()", 200);
  return true;
}

function moveUp(){
  if(!isMoveUp(board))
    return false;

  for(var i = 1; i < 4; i ++){
    for(var j = 0; j < 4; j ++){
      if(board[i][j] != 0){
        for(var k = 0; k < i; k ++){
          if(board[k][j] == 0 && noBlockVertical(i, k, j, board)){
            numUpdateDisplayAnimation(i, j, k, j);
            board[k][j] = board[i][j];
            board[i][j] = 0;
            continue;
          }
          else if(board[i][j] == board[k][j] && noBlockVertical(i, k ,j, board) && !check[k][j]){
            numUpdateDisplayAnimation(i, j, k, j);
            board[k][j] += board[i][j];
            board[i][j] = 0;
            score += board[k][j];
            updateScore(score);
            check[k][j] = true;
            continue;
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()", 200);
  return true;
}

function moveDown(){
  if(!isMoveDown(board))
    return false;
  
  for(var i = 2; i >= 0; i --){
    for(var j = 0; j < 4; j ++){
      if(board[i][j] != 0){
        for(var k = 3; k > i; k --){
          if(board[k][j] == 0 && noBlockVertical(k, i, j, board)){
            numUpdateDisplayAnimation(i, j, k, j);
            board[k][j] = board[i][j];
            board[i][j] = 0;
            continue;
          }
          else if(board[i][j] == board[k][j] && noBlockVertical(k, i, j, board) && !check[k][j]){
            numUpdateDisplayAnimation(i, j, k, j);
            board[k][j] += board[i][j];
            board[i][j] = 0;
            score += board[k][j];
            updateScore(score);
            check[k][j] = true;
            continue;
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()", 200);
  return true;
}

function moveRight(){
  if(!isMoveRight(board))
    return false;
  
  for(var i = 0; i < 4; i ++){
    for(var j = 2; j >= 0; j --){
      if(board[i][j] != 0){
        for(var k = 3; k > j; k --){
          if(board[i][k] == 0 && noBlockHorizontal(i, j, k, board)){
            //move
            numUpdateDisplayAnimation(i, j, i, k);
            board[i][k] = board[i][j];
            board[i][j] = 0;
            continue;
          }
          else if(board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !check[i][k]){
            // move
            numUpdateDisplayAnimation(i, j, i, k);
            // add
            board[i][k] += board[i][j];
            board[i][j] = 0;
            score += board[i][k];
            updateScore(score);
            check[i][k] = true;
            continue;
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()", 200);
  return true;
}

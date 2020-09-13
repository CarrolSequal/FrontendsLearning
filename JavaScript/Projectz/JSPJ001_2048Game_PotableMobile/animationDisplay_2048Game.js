function numDisplayAnimation(randX, randY, ranNum){
  var numCell = $("#num-cell-" + randX + "-" + randY);
  
  numCell.css('background-color',getNumBackgroundColor(ranNum));
  numCell.css('color', getNumColor(ranNum));
  numCell.text(ranNum);

  numCell.animate({
    height: cellSideLength,
    width: cellSideLength,
    top: getPosTop(randX, randY),
    left: getPosLeft(randX, randY)
  }, 50);
}

function numUpdateDisplayAnimation(fromx, fromy , tox, toy){
    var numCell = $("#num-cell-" + fromx + "-" + fromy);
    numCell.animate({
      top: getPosTop( tox, toy),
      left: getPosLeft( tox, toy)
    },200);
}

function updateScore(score){
  $("#score").text(score);
}
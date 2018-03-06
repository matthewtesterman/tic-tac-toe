/****************
* @author Matthew Testerman <matthewtesterman83@gmail.com>
* @file tic-tac-toe.js
* @version 0.0.1
****************/

//Global Variables
var playerTurn = 0;
var activePlayer = 'x';
var grid = [['','',''],
            ['','',''],
            ['','','']
           ];
gameOn = true;
winner = null;

/*Entry Point*/
$(function() {

  //When a square is clicked, determine whos turn it is
  $('.square').click(function(){
    //if the grid has not been clicked yet and game is still going...
    if (!$(this).hasClass('clicked') && gameOn === true) {
      //Assign 'clicked' class to square preventing it from being clicked again.
      var val = $(this).attr('id');
      $(this).addClass('clicked');

      playerTurn++;
      //whos turn is it:
      if (playerTurn % 2 === 0)
      {
        activePlayer = 'o';
      }
      else if (playerTurn % 2 === 1) {
        activePlayer = 'x';
      }
      //get the active players letter and build id. Make that id style display.
      var elementID = "#" + activePlayer + val.substring(1, val.length);
      $(elementID).css('display','block');

      updateGrid(val);
      checkForWin();

    }
  });

  $('#btnRestart').click(function() {
    resetGame();
  });
});

/* Update grid data */
function updateGrid(id) {
  row = id.substring(1,2);
  col = id.substring(2,3);
  grid[row][col] = activePlayer;
}

/* Game Rules to determine if a winner has occured */
function checkForWin() {
  if (grid[0][0] == grid[0][1] && grid[0][0] === grid[0][2] && grid[0][0] !== "") {
    winner = grid[0][0];
  }
  else if (grid[0][0] == grid[1][0] && grid[0][0] === grid[2][0] && grid[0][0] !== "") {
    winner = grid[0][0];
  }
  else if (grid[0][0] == grid[1][1] && grid[0][0] === grid[2][2] && grid[0][0] !== "") {
    winner = grid[0][0];
  }
  else if (grid[0][2] === grid[1][1] && grid[0][2] === grid[2][0] && grid[0][2] !== "") {
    winner = grid[0][2];
  }
  else if (grid[0][2] === grid[1][2] && grid[0][2] === grid[2][2] && grid[0][2] !== "") {
    winner = grid[0][2];
  }
  else if (grid[0][1] === grid[1][1] && grid[0][1] === grid[2][1] && grid[0][1] !== "") {
    winner = grid[0][1];
  }
  else if (grid[1][0] == grid[1][1] && grid[1][0] === grid[1][2] && grid[1][0] !== "") {
    winner = grid[1][0];
  }
  else if (grid[2][0] == grid[2][1] && grid[2][0] === grid[2][2] && grid[2][0] !== "") {
    winner = grid[2][0];
  }
  if (winner != null) {
    gameOn = false;
    $('#winnerVal').html(activePlayer.toLocaleUpperCase() + ' <br />WINS!');
    $('#winnerModal').modal('show');
  }
  else if (playerTurn === 9) {
    $('#winnerVal').html('Draw Game! ');
    $('#winnerModal').modal('show');
  }
}

/* Restore all values to zero and null/ hide X and O images */
function resetGame(){
  for (var row = 0; row < grid.length; row++) {
    for (var col = 0; col < grid[row].length; col++) {
      grid[row][col] = "";
      $('.square').removeClass('clicked');
      $('#o' + row + '' + col).css('display', 'none');
      $('#x' + row + '' + col).css('display', 'none');
    }
  }
  winner = null;
  gameOn = true;
  playerTurn = 0;
  activePlayer = 'x';
}

/* Debugging */
function debug() {
  var t = "\n";
  for (var row = 0; row < grid.length; row++) {
    for (var col = 0; col < grid[row].length; col++) {
      t += " " + grid[row][col];
    }
    t += "\n";
  }
}

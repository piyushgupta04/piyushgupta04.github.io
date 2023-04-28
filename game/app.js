const squares = document.querySelectorAll('.square');
const turnDisplay = document.querySelector('#turn');
const resultDisplay = document.querySelector('#result');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

function handleSquareClick(event) {
  const squareIndex = event.target.id;
  if (board[squareIndex] !== '') return;
  board[squareIndex] = currentPlayer;
  event.target.textContent = currentPlayer;
  if (checkWin()) {
    resultDisplay.textContent = `Player ${currentPlayer} wins!`;
    squares.forEach(square => square.removeEventListener('click', handleSquareClick));
    return;
  }
  if (checkTie()) {
    resultDisplay.textContent = "It's a tie!";
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  turnDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combo of winningCombos) {
    if (board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]] && board[combo[0]] !== '') {
      return true;
    }
  }

  return false;
}

function checkTie() {
  return board.every(square => square !== '');
}

squares.forEach(square => square.addEventListener('click', handleSquareClick));
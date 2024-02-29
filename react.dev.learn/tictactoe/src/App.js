import { useState } from 'react';

const IN_PROGRESS = "game in progress";
const WINNER = "game won";
const DRAW = "game drawn";
let game_state = IN_PROGRESS;

function Square({ value, onSquareClick, winning }) {
  let squareClass = "square"

  if(game_state == WINNER && winning) {
    squareClass = "square background-green"
  }
  return (
    <button className={squareClass} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if([WINNER,DRAW].includes(game_state) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    let char = 'O'
    if(xIsNext) {
      char = 'X'
    }
    nextSquares[i] = char;
    onPlay(nextSquares, squareCoordinates(i));
  }

  const winner = calculateGameState(squares);
  let status;
  if (game_state == WINNER) {
    status = 'Winner: ' + winner.winner;
  } else if(game_state == DRAW) {
    status = 'Game is a draw'
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const squareCoordinates = (index) => {
    const row = Math.floor(index / 3) + 1;
    let column = 3;
    if([0,3,6].includes(index)) {
      column = 1;
    } else if([1,4,7].includes(index)) {
      column = 2;
    }
    return { row:row, column:column }
  }

  const getRows = (start, winner) => {
    let row = [];
    let winningSquares = [];
    if(game_state == WINNER) {
      winningSquares = winner.winningSquares
    }
    for(let i = start; i < start+3; i++) {
      row.push(<Square key={"square"+i} winning={winningSquares.includes(i)} value={squares[i]} onSquareClick={() => handleClick(i)} />)
    }
    return row;
  }

  const getSquares = (winner) => {
    let block = [];
    for(let i = 0; i<9; i+=3) {
      block.push(
        <div key={"board-row"+i} className="board-row">
          {getRows(i, winner)}
        </div>
      )
    }
    return block;
  }

  return (
    <>
      <div className="status">{status}</div>
      {getSquares(winner)}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0);
  const [squaresClicked, setSquaresClicked] = useState([Array(9).fill(null)]);
  const xIsNext = currentMove % 2 == 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares, squareClicked) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    const nextSquaresClicked = [...squaresClicked.slice(0, currentMove + 1), squareClicked]
    setSquaresClicked(nextSquaresClicked);
  }

  function jumpTo(nextMove) {
    if(nextMove == 0) {
      game_state = IN_PROGRESS;
    }
    setCurrentMove(nextMove);
  }

  const moves = history.slice(0, history.length -1).map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move + " [" + squaresClicked[move].row + ", "+ squaresClicked[move].column + "]";
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <div>On Move #: {currentMove}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateGameState(squares) {
  let result;

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      game_state = WINNER;
      result = { winner:squares[a], winningSquares:[a,b,c] };
    }
  }
  if(game_state != WINNER) {
    if(squares.includes(null)) {
      // has an empty square still
      game_state = IN_PROGRESS;
      result = null;
    } else {
      game_state = DRAW;
      result = null;
    }
  }

  return result;
}

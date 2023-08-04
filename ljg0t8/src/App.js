import { useState } from "react";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  const [isAscending, setIsAscending] = useState(true);
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    console.log(history.length)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves =history.map((squares, move) => {
    let description;
    if (isAscending) {
      if (move > 0) {
        description = "Go to move #" + move;
      } else {
        description = "Go to game start";
      }
    } else {
    if (move < history.length-1) {
      description = "Go to move #" + (history.length-move-1);
    } else {
      description = "Go to game start";
    }
  }
    return (
      <li key={move}>
        <button onClick={() => jumpTo((isAscending? move:(history.length-move-1)))}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={() => setIsAscending(!isAscending)}>Ascending/Decending</button>
        <ol>{moves}</ol>
        <ol>You are at move {currentMove}</ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    let newValue = null;
    if (xIsNext) {
      newValue = "X";
    } else {
      newValue = "O";
    }
    const nextSquares = [
      ...squares.slice(0, i),
      newValue,
      ...squares.slice(i + 1, 9),
    ];
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const draw = !(squares.some(item => item === null));
  let status;
  if (winner) {
    status = "Winner: " + (xIsNext?"O":"X");
  } else if (draw) {
    status = "It's a draw";
  } else  {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const tiles = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  return (
    <>
      <div className="status">{status}</div>
      {tiles.map((row) => (
        <div key={row} className="board-row">
          {row.map((tile) => (
            <Square
              key={tile}
              value={squares[tile]}
textColor={"blue"}
              onSquareClick={() => handleClick(tile)}
            />
          ))}
        </div>
      ))}
    </>
  );
}

function Square({ value, onSquareClick, textColor }) {
  // pass in winners as array and do logic here to check for victory box.  Then change styling
  return (
    <button className="square" onClick={onSquareClick} style={{color:textColor}}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}

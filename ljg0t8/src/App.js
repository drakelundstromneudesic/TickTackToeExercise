import { useState } from "react";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  return  (
    <>
      <div className="board-row">
        <Square value={squares[0]} />
        <Square value={squares[1]} />
        <Square value={squares[2]} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} />
        <Square value={squares[4]} />
        <Square value={squares[5]} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} />
        <Square value={squares[7]} />
        <Square value={squares[8]} />
      </div>
    </>
  );
}

function Square({value}) {
  // const [value, setValue] = useState(null);
  // function handleClick() {
  //   if (value==null) {
  //     setValue('X');
  //   } else if (value=='X') {
  //     setValue('O')
  //   } else {
  //     setValue(null)
  //   }
  // }

  return (
    <button
      className="square"
      // onClick={handleClick}
    >
      {value}
    </button>
  );
}
import React, { FC, useEffect, useState } from "react";
import Board from "../components/Board";

const Game: FC = () => {
  const [history, setHistory] = useState([Array(9).fill(0)]);
  const [stepCount, setStepCount] = useState(0);

  // check if the game is over
  const getWinner = (current: number[]) => {
    // iterate through all possible winning combinations, since search space is small
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
      if (Math.abs(current[a] + current[b] + current[c]) === 3) {
        return current[a];
      }
    }
    return 0;
  };

  // handle every moves and update the board
  const handleClick = (i: number) => {
    // make current a copy of the latest hitory
    let current = history[stepCount].slice();

    // winning & repeatition check
    if (current[i] !== 0) return;

    // update board state
    current[i] = stepCount % 2 === 0 ? 1 : -1;
    setStepCount(stepCount + 1);
    setHistory([...history, current]);
  };

  // reset game
  const reset = () => {
    setHistory([Array(9).fill(0)]);
    setStepCount(0);
  };

  // remove last move from history
  const undo = () => {
    if (stepCount > 0) {
      setStepCount(stepCount - 1);
      setHistory(history.slice(0, stepCount));
    }
  };

  // check if current board ends
  useEffect(() => {
    const winner = getWinner(history[stepCount]);
    if (winner !== 0) {
      alert(`Player ${winner > 0 ? 1 : 2} won!`);
      reset();
    } else if (stepCount === 9) {
      alert("Draw!");
      reset();
    }
  }, [history]);

  return (
    <div className="game">
      <Board squares={history[stepCount]} onClick={handleClick}></Board>
      <div className="options">
        <button className="reset" onClick={reset}>
          RESET
        </button>
        <button className="undo" onClick={undo}>
          UNDO
        </button>
      </div>
    </div>
  );
};

export default Game;

import React, {FC} from 'react'

interface ISquareProps {
    value: number;
    onClick: () => void;
}

const Square:FC<ISquareProps> = ({value, onClick}) => {
    const display = value === 1 ? 'X' : value === -1 ? 'O' : '';

  return (
      <button className={`square ${display}`} onClick={onClick}>{display}</button>
  )
}

export default Square
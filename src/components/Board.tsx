import React, {FC} from 'react'
import Square from './Square'

interface IBoardProps {
    squares: number[];
    onClick: (i: number) => void;
}

const Board:FC<IBoardProps> = ({squares, onClick}) => {
  return (
    <div className='board'>
        {
            squares.map((value, i) => {
                return (
                    <Square key={i} value={value} onClick={() => onClick(i)}/>
                )
            })
        }
    </div>
  )
}

export default Board
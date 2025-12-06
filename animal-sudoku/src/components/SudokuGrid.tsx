// src/components/SudokuGrid.tsx
import React from 'react';
import { useGame } from '../contexts/GameContext';
import Cell from './Cell';

const SudokuGrid: React.FC = () => {
  const { gameState } = useGame();

  if (!gameState) {
    return <div className="text-center text-lg">Start a game to see the board!</div>;
  }

  return (
    <div className="relative mx-auto w-max bg-gray-300 dark:bg-gray-600 p-1 sm:p-2 rounded-lg shadow-lg">
      <div className="grid grid-cols-9 grid-rows-9">
        {gameState.board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              value={cell}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SudokuGrid;

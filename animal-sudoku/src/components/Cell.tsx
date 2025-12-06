// src/components/Cell.tsx
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useGame } from '../contexts/GameContext';
import { CellValue } from '../types';

interface CellProps {
  row: number;
  col: number;
  value: CellValue | CellValue[];
}

const Cell: React.FC<CellProps> = ({ row, col, value }) => {
  const { gameState, selectCell, selectedAnimals, mistakes } = useGame();
  const [isHinted, setIsHinted] = useState(false);

  const isSelected = gameState?.selectedCell?.row === row && gameState?.selectedCell?.col === col;
  const isPeer = gameState?.selectedCell?.row === row || gameState?.selectedCell?.col === col;
  const isSameValue = gameState?.selectedCell && value && !Array.isArray(value) && value === gameState.board[gameState.selectedCell.row][gameState.selectedCell.col];
  const isMistake = mistakes.some(m => m.row === row && m.col === col);

  // A crude way to detect a hint. In a real app, this would be more robust.
  useEffect(() => {
    if (isSelected && value && !Array.isArray(value)) {
        const solutionValue = gameState?.solution[row][col];
        if (value === solutionValue) {
            setIsHinted(true);
            const timer = setTimeout(() => setIsHinted(false), 1000);
            return () => clearTimeout(timer);
        }
    }
  }, [value, isSelected, gameState, row, col]);

  const getAnimalEmoji = (id: string) => {
    const animal = selectedAnimals.find(a => a.id === id);
    return animal ? animal.emoji : '?';
  };

  const renderContent = () => {
    if (Array.isArray(value)) {
      return (
        <div className="grid grid-cols-3 grid-rows-3 w-full h-full text-xs text-gray-500 dark:text-gray-400">
          {Array.from({ length: 9 }).map((_, i) => {
            const animalId = (i + 1).toString();
            return (
              <div key={i} className="flex items-center justify-center">
                {value.includes(animalId) ? getAnimalEmoji(animalId) : ''}
              </div>
            );
          })}
        </div>
      );
    }
    if (value) {
      return <span className="text-3xl">{getAnimalEmoji(value)}</span>;
    }
    return null;
  };

  return (
    <div
      onClick={() => selectCell(row, col)}
      className={clsx(
        'w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center border-gray-300 dark:border-gray-600 transition-colors duration-150 cursor-pointer relative',
        {
          'bg-blue-200 dark:bg-blue-800 animate-pulse': isSelected,
          'bg-gray-100 dark:bg-gray-700': !isSelected && isPeer,
          'bg-blue-100 dark:bg-blue-900': isSameValue && !isSelected,
          'bg-white dark:bg-gray-800': !isSelected && !isPeer && !isSameValue,
          'border-t-2 border-gray-400 dark:border-gray-500': row % 3 === 0,
          'border-l-2 border-gray-400 dark:border-gray-500': col % 3 === 0,
          'border-r-2 border-gray-400 dark:border-gray-500': col === 8,
          'border-b-2 border-gray-400 dark:border-gray-500': row === 8,
          'animate-flash': isHinted,
        }
      )}
    >
      {renderContent()}
      {isMistake && <div className="absolute inset-0 border-2 border-red-500 rounded-sm pointer-events-none"></div>}
    </div>
  );
};

export default Cell;

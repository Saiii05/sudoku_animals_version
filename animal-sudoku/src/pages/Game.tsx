// src/pages/Game.tsx
import React from 'react';
import AnimalSelector from '../components/AnimalSelector';
import SudokuGrid from '../components/SudokuGrid';
import Toolbar from '../components/Toolbar';
import { useGame } from '../contexts/GameContext';
import AnimalPalette from '../components/AnimalPalette';
import Tutorial from '../components/Tutorial';

const Game: React.FC = () => {
  const { gameState } = useGame();

  return (
    <div className="container mx-auto p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Tutorial />
      <header className="text-center mb-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-gray-200">
          Animal Sudoku
        </h1>
      </header>

      <main className="flex flex-col items-center">
        {!gameState ? (
          <div className="w-full max-w-2xl">
            <AnimalSelector />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="w-full lg:w-auto order-2 lg:order-1">
                <Toolbar />
            </div>
            <SudokuGrid />
            <div className="w-full lg:w-auto order-3">
              <AnimalPalette />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Game;

// src/components/Toolbar.tsx
import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { useTheme } from '../contexts/ThemeContext';
import { useSound } from '../contexts/SoundContext';
import { Difficulty } from '../types';

const Toolbar: React.FC = () => {
  const { gameState, undo, redo, resetGame, getHint, solvePuzzle, checkMistakes, startGame, selectedAnimals } = useGame();
  const { theme, toggleTheme } = useTheme();
  const { isSoundEnabled, toggleSound } = useSound();
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium');

  const handleNewGame = () => {
      const difficulties = { 'Easy': 20, 'Medium': 35, 'Hard': 50, 'Expert': 60 };
      startGame(difficulties[difficulty]);
  };

  const handleShare = () => {
    if (gameState) {
      const data = {
        board: gameState.history[0], // Share the initial puzzle
        solution: gameState.solution,
        animals: selectedAnimals,
      };
      const encoded = btoa(JSON.stringify(data));
      const url = `${window.location.origin}?puzzle=${encoded}`;
      navigator.clipboard.writeText(url);
      alert('Share link copied to clipboard!');
    }
  };

  return (
    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2">
            <button onClick={handleNewGame} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">New Game</button>
            <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                className="bg-white dark:bg-gray-700 p-2 rounded border border-gray-300 dark:border-gray-600"
            >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
                <option>Expert</option>
            </select>
            <button onClick={undo} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Undo</button>
            <button onClick={redo} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Redo</button>
            <button onClick={resetGame} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">Reset</button>
            <button onClick={getHint} className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600">Hint</button>
            <button onClick={checkMistakes} className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600">Check</button>
            <button onClick={solvePuzzle} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">Solve</button>
            <button onClick={handleShare} className="bg-teal-500 text-white p-2 rounded hover:bg-teal-600">Share</button>
            <button onClick={toggleTheme} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600">
                {theme === 'light' ? '🌙' : '☀️'}
            </button>
             <button onClick={toggleSound} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600">
                {isSoundEnabled ? '🔊' : '🔇'}
            </button>
        </div>
    </div>
  );
};

export default Toolbar;

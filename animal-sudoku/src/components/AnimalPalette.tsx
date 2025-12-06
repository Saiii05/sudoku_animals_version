// src/components/AnimalPalette.tsx
import React from 'react';
import { useGame } from '../contexts/GameContext';

const AnimalPalette: React.FC = () => {
  const { selectedAnimals, placeAnimal, togglePencilMode, gameState } = useGame();

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md w-full">
        <div className="grid grid-cols-5 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {selectedAnimals.map(animal => (
                <button
                    key={animal.id}
                    onClick={() => placeAnimal(animal.id)}
                    className="text-3xl p-2 rounded-lg bg-white dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title={animal.name}
                >
                    {animal.emoji}
                </button>
            ))}
        </div>
        <div className="mt-4">
             <button
                onClick={togglePencilMode}
                className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                    gameState?.isPencilMode
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200'
                }`}
             >
                Pencil Mode: {gameState?.isPencilMode ? 'ON' : 'OFF'}
             </button>
        </div>
    </div>
  );
};

export default AnimalPalette;

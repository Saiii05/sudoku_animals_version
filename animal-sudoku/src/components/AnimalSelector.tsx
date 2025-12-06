// src/components/AnimalSelector.tsx
import React, { useState } from 'react';
import { useAnimalSelection } from '../hooks/useAnimalSelection';
import { useGame } from '../contexts/GameContext';
import { Animal } from '../types';
import { DEFAULT_ANIMALS } from '../constants/animals';

const AnimalSelector: React.FC = () => {
  const {
    selectedAnimals,
    addAnimal,
    removeAnimal,
    isSelectionValid,
    setDefaultAnimals,
  } = useAnimalSelection();
  const { gameState, startGame, clearSavedGame } = useGame();

  const [customEmoji, setCustomEmoji] = useState('');
  const [customName, setCustomName] = useState('');

  const handleAddCustomAnimal = () => {
    if (customEmoji && customName) {
      const newAnimal: Animal = { id: `custom-${Date.now()}`, name: customName, emoji: customEmoji };
      addAnimal(newAnimal);
      setCustomEmoji('');
      setCustomName('');
    }
  };

  const handleStartNewGame = () => {
      if(isSelectionValid) {
          clearSavedGame();
          startGame(30); // Hardcoded difficulty for now
      }
  }

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
        {gameState ? 'Game Paused' : 'Select Your 9 Animals'}
      </h2>

      {gameState && (
          <div className="text-center mb-4">
              <button onClick={() => startGame(0)} className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 text-lg font-bold">
                  Resume Game
              </button>
          </div>
      )}

      <div className="mb-4 p-3 bg-white dark:bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Your Team ({selectedAnimals.length}/9)</h3>
        <div className="flex flex-wrap gap-2 min-h-[40px]">
          {selectedAnimals.map(animal => (
            <button key={animal.id} onClick={() => removeAnimal(animal.id)} className="text-3xl p-1 rounded-full hover:bg-red-200 dark:hover:bg-red-800" title={`Remove ${animal.name}`}>
              {animal.emoji}
            </button>
          ))}
        </div>
        {!isSelectionValid && <p className="text-red-500 dark:text-red-400 text-sm mt-2">You must select exactly 9 animals.</p>}
      </div>

      <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Choose from Gallery</h3>
          <div className="flex flex-wrap gap-2">
              {DEFAULT_ANIMALS.map(animal => (
                  <button key={animal.id} onClick={() => addAnimal(animal)} disabled={selectedAnimals.some(a => a.id === animal.id) || selectedAnimals.length >= 9} className="text-3xl p-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-green-200 dark:hover:bg-green-800 disabled:opacity-50" title={animal.name}>
                      {animal.emoji}
                  </button>
              ))}
          </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Add a Custom Animal</h3>
        <div className="flex gap-2">
          <input type="text" placeholder="Emoji" value={customEmoji} onChange={(e) => setCustomEmoji(e.target.value)} className="w-1/4 p-2 border rounded-lg dark:bg-gray-600" maxLength={2} />
          <input type="text" placeholder="Name" value={customName} onChange={(e) => setCustomName(e.target.value)} className="w-1/2 p-2 border rounded-lg dark:bg-gray-600" />
          <button onClick={handleAddCustomAnimal} disabled={!customEmoji || !customName || selectedAnimals.length >= 9} className="w-1/4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400">Add</button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button onClick={setDefaultAnimals} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">Use Defaults</button>
        <button onClick={handleStartNewGame} disabled={!isSelectionValid} className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 text-lg font-bold">
          New Game
        </button>
      </div>
    </div>
  );
};

export default AnimalSelector;

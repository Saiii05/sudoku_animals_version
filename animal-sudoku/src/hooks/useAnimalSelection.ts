// src/hooks/useAnimalSelection.ts
import { useState, useEffect } from 'react';
import { Animal } from '../types';
import { DEFAULT_ANIMALS } from '../constants/animals';

const STORAGE_KEY = 'animal-sudoku-selected-animals';

export const useAnimalSelection = () => {
  const [selectedAnimals, setSelectedAnimals] = useState<Animal[]>(() => {
    try {
      const storedAnimals = window.localStorage.getItem(STORAGE_KEY);
      return storedAnimals ? JSON.parse(storedAnimals) : DEFAULT_ANIMALS;
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return DEFAULT_ANIMALS;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedAnimals));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [selectedAnimals]);

  const addAnimal = (animal: Animal) => {
    if (selectedAnimals.length < 9 && !selectedAnimals.find(a => a.id === animal.id || a.emoji === animal.emoji)) {
      setSelectedAnimals(prev => [...prev, animal]);
    }
  };

  const removeAnimal = (animalId: string) => {
    setSelectedAnimals(prev => prev.filter(animal => animal.id !== animalId));
  };

  const isSelectionValid = selectedAnimals.length === 9;

  const setDefaultAnimals = () => {
    setSelectedAnimals(DEFAULT_ANIMALS);
  };

  return {
    selectedAnimals,
    addAnimal,
    removeAnimal,
    isSelectionValid,
    setDefaultAnimals,
  };
};

// src/contexts/GameContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Board, GameState, Animal } from '../types';
import { generatePuzzle, solve } from '../lib/sudoku';
import { useAnimalSelection } from '../hooks/useAnimalSelection';
import { useSound } from './SoundContext';

const STORAGE_KEY = 'animal-sudoku-game-state';

interface IGameContext {
  gameState: GameState | null;
  startGame: (difficulty: number) => void;
  selectCell: (row: number, col: number) => void;
  placeAnimal: (animalId: string) => void;
  togglePencilMode: () => void;
  undo: () => void;
  redo: () => void;
  resetGame: () => void;
  getHint: () => void;
  solvePuzzle: () => void;
  checkMistakes: () => void;
  selectedAnimals: Animal[];
  mistakes: { row: number, col: number }[];
  clearSavedGame: () => void;
}

const GameContext = createContext<IGameContext | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { selectedAnimals, isSelectionValid, setSelectedAnimals } = useAnimalSelection();
  const [gameState, setGameState] = useState<GameState | null>(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const puzzleData = urlParams.get('puzzle');
      if (puzzleData) {
        const decoded = JSON.parse(atob(puzzleData));
        setSelectedAnimals(decoded.animals);
        return {
          board: decoded.board,
          solution: decoded.solution,
          selectedCell: null,
          history: [decoded.board],
          isPencilMode: false,
        };
      }
      const storedGame = window.localStorage.getItem(STORAGE_KEY);
      return storedGame ? JSON.parse(storedGame) : null;
    } catch {
      return null;
    }
  });
  const [historyIndex, setHistoryIndex] = useState(0);
  const [mistakes, setMistakes] = useState<{row: number, col: number}[]>([]);
  const { playSound } = useSound();

  useEffect(() => {
    try {
      if (gameState) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error('Error saving game state', error);
    }
  }, [gameState]);


  const startGame = (difficulty: number) => {
    if (!isSelectionValid) return;
    const [puzzle, solution] = generatePuzzle(difficulty);
    setGameState({
      board: puzzle,
      solution: solution,
      selectedCell: null,
      history: [puzzle],
      isPencilMode: false,
    });
    setHistoryIndex(0);
    setMistakes([]);
  };

  const clearSavedGame = () => setGameState(null);

  // ... (rest of the functions are the same)
  // ...
  const selectCell = (row: number, col: number) => setGameState(prev => prev ? { ...prev, selectedCell: { row, col } } : null);
  const placeAnimal = (animalId: string) => {
      setGameState(prev => {
          if (!prev || !prev.selectedCell) return prev;
          const { row, col } = prev.selectedCell;
          const newBoard = JSON.parse(JSON.stringify(prev.board));
          newBoard[row][col] = animalId;
          const newHistory = prev.history.slice(0, historyIndex + 1);
          newHistory.push(newBoard);
          setHistoryIndex(newHistory.length - 1);
          if (newBoard[row][col] !== prev.solution[row][col]) playSound('error');
          else playSound('place');
          return { ...prev, board: newBoard, history: newHistory };
      });
  };
  const togglePencilMode = () => setGameState(prev => prev ? { ...prev, isPencilMode: !prev.isPencilMode } : null);
  const undo = () => {
    if (historyIndex > 0) {
      playSound('undo');
      setHistoryIndex(prev => prev - 1);
      setGameState(prev => !prev ? null : {...prev, board: prev.history[historyIndex - 1]});
    }
  };
  const redo = () => {
    if (gameState && historyIndex < gameState.history.length - 1) {
      playSound('place');
      setHistoryIndex(prev => prev + 1);
      setGameState(prev => !prev ? null : {...prev, board: prev.history[historyIndex + 1]});
    }
  };
  const resetGame = () => {
      if (gameState) {
          playSound('undo');
          const initialBoard = gameState.history[0];
          setGameState({...gameState, board: initialBoard, history: [initialBoard]});
          setHistoryIndex(0);
          setMistakes([]);
      }
  };
  const getHint = () => {
      if (!gameState || !gameState.selectedCell) return;
      playSound('hint');
      const { row, col } = gameState.selectedCell;
      const solutionValue = gameState.solution[row][col];
      if (solutionValue) placeAnimal(solutionValue);
  };
  const solvePuzzle = () => {
    if (!gameState) return;
    playSound('hint');
    setGameState({...gameState, board: gameState.solution});
  };
  const checkMistakes = () => {
      if (!gameState) return;
      const newMistakes = [];
      for (let r = 0; r < 9; r++) {
          for (let c = 0; c < 9; c++) {
              const cellValue = gameState.board[r][c];
              if (cellValue && !Array.isArray(cellValue) && cellValue !== gameState.solution[r][c]) {
                  newMistakes.push({ row: r, col: c });
              }
          }
      }
      if (newMistakes.length > 0) playSound('error');
      setMistakes(newMistakes);
      setTimeout(() => setMistakes([]), 2000);
  };

  return (
    <GameContext.Provider value={{ gameState, startGame, selectCell, placeAnimal, togglePencilMode, undo, redo, resetGame, getHint, solvePuzzle, checkMistakes, selectedAnimals, mistakes, clearSavedGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) throw new Error('useGame must be used within a GameProvider');
  return context;
};

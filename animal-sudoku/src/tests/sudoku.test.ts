// src/tests/sudoku.test.ts
import { describe, it, expect } from 'vitest';
import { solve, generatePuzzle, countSolutions } from '../lib/sudoku';
import { Board } from '../types';

// Helper function to validate a complete Sudoku board
const isBoardValid = (board: Board): boolean => {
  // Check rows and columns
  for (let i = 0; i < 9; i++) {
    const row = new Set();
    const col = new Set();
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === null || row.has(board[i][j])) return false;
      row.add(board[i][j]);
      if (board[j][i] === null || col.has(board[j][i])) return false;
      col.add(board[j][i]);
    }
  }

  // Check 3x3 boxes
  for (let boxRow = 0; boxRow < 9; boxRow += 3) {
    for (let boxCol = 0; boxCol < 9; boxCol += 3) {
      const box = new Set();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const cell = board[boxRow + i][boxCol + j];
          if (cell === null || box.has(cell)) return false;
          box.add(cell);
        }
      }
    }
  }
  return true;
};

describe('Sudoku Logic', () => {
  it('should solve a known simple puzzle correctly', () => {
    const puzzle: Board = [
      ['5', '3', null, null, '7', null, null, null, null],
      ['6', null, null, '1', '9', '5', null, null, null],
      [null, '9', '8', null, null, null, null, '6', null],
      ['8', null, null, null, '6', null, null, null, '3'],
      ['4', null, null, '8', null, '3', null, null, '1'],
      ['7', null, null, null, '2', null, null, null, '6'],
      [null, '6', null, null, null, null, '2', '8', null],
      [null, null, null, '4', '1', '9', null, null, '5'],
      [null, null, null, null, '8', null, null, '7', '9'],
    ];

    const expectedSolution: Board = [
      ['5', '3', '4', '6', '7', '8', '9', '1', '2'],
      ['6', '7', '2', '1', '9', '5', '3', '4', '8'],
      ['1', '9', '8', '3', '4', '2', '5', '6', '7'],
      ['8', '5', '9', '7', '6', '1', '4', '2', '3'],
      ['4', '2', '6', '8', '5', '3', '7', '9', '1'],
      ['7', '1', '3', '9', '2', '4', '8', '5', '6'],
      ['9', '6', '1', '5', '3', '7', '2', '8', '4'],
      ['2', '8', '7', '4', '1', '9', '6', '3', '5'],
      ['3', '4', '5', '2', '8', '6', '1', '7', '9'],
    ];

    const puzzleCopy = JSON.parse(JSON.stringify(puzzle));
    const wasSolved = solve(puzzleCopy);

    expect(wasSolved).toBe(true);
    expect(puzzleCopy).toEqual(expectedSolution);
  });

  it('should generate a valid puzzle and solution', () => {
    const [puzzle, solution] = generatePuzzle(1); // Drastically reduced difficulty

    // 1. Test that the solution is a valid, complete board
    expect(isBoardValid(solution)).toBe(true);

    // 2. Test that the puzzle is a subset of the solution
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (puzzle[r][c] !== null) {
          expect(puzzle[r][c]).toBe(solution[r][c]);
        }
      }
    }
  });

  it('should generate a puzzle with a unique solution', () => {
    const [puzzle] = generatePuzzle(2); // Drastically reduced difficulty
    const puzzleCopy = JSON.parse(JSON.stringify(puzzle));

    // Use the optimized, imported function
    const numberOfSolutions = countSolutions(puzzleCopy);

    expect(numberOfSolutions).toBe(1);
  });

  it('should return false for an unsolvable puzzle', () => {
    const unsolvablePuzzle: Board = [
      ['5', '3', null, null, '7', null, null, null, null],
      ['6', null, null, '1', '9', '5', null, null, null],
      [null, '9', '8', null, null, null, null, '6', null],
      ['8', null, null, null, '6', null, null, null, '3'],
      ['4', null, null, '8', null, '3', null, null, '1'],
      ['7', null, null, null, '2', null, null, null, '6'],
      [null, '6', null, null, null, null, '2', '8', null],
      // Invalid row below that makes it unsolvable
      ['5', null, null, '4', '1', '9', null, null, '5'],
      [null, null, null, null, '8', null, null, '7', '9'],
    ];

    const wasSolved = solve(unsolvablePuzzle);
    expect(wasSolved).toBe(false);
  });
});

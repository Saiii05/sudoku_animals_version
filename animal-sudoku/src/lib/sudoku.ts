// src/lib/sudoku.ts
import { Board, CellValue } from '../types';

const SIZE = 9;
const EMPTY_CELL = null;

// A type guard to check if a value is a single number (not an array/pencil marks)
const isSingleValue = (cell: CellValue | CellValue[]): cell is CellValue => !Array.isArray(cell);

/**
 * Finds the next empty cell (null) in the board.
 * @param board The Sudoku board.
 * @returns [row, col] of the empty cell, or null if no empty cells are found.
 */
const findEmpty = (board: Board): [number, number] | null => {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === EMPTY_CELL) {
        return [r, c];
      }
    }
  }
  return null;
};

/**
 * Checks if placing a number at a given position is valid.
 * @param board The Sudoku board.
 * @param num The number (as a string ID '1'-'9') to check.
 * @param pos The [row, col] position to check at.
 * @returns True if the move is valid, false otherwise.
 */
const isValid = (board: Board, num: string, pos: [number, number]): boolean => {
  const [r, c] = pos;

  // Check row
  for (let i = 0; i < SIZE; i++) {
    const cell = board[r][i];
    if (isSingleValue(cell) && cell === num && i !== c) {
      return false;
    }
  }

  // Check column
  for (let i = 0; i < SIZE; i++) {
    const cell = board[i][c];
    if (isSingleValue(cell) && cell === num && i !== r) {
      return false;
    }
  }

  // Check 3x3 box
  const boxRowStart = Math.floor(r / 3) * 3;
  const boxColStart = Math.floor(c / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = board[boxRowStart + i][boxColStart + j];
      if (isSingleValue(cell) && cell === num && (boxRowStart + i !== r || boxColStart + j !== c)) {
        return false;
      }
    }
  }

  return true;
};


/**
 * Solves a Sudoku board using a backtracking algorithm.
 * Mutates the board in place.
 * @param board The Sudoku board to solve.
 * @returns True if a solution was found, false otherwise.
 */
export const solve = (board: Board): boolean => {
  const find = findEmpty(board);
  if (!find) {
    return true; // Board is solved
  }

  const [row, col] = find;
  const animalIds = Array.from({ length: 9 }, (_, i) => (i + 1).toString());

  for (const id of animalIds) {
    if (isValid(board, id, [row, col])) {
      board[row][col] = id;

      if (solve(board)) {
        return true;
      }

      board[row][col] = EMPTY_CELL; // Backtrack
    }
  }

  return false;
};

/**
 * Creates an empty Sudoku grid.
 * @returns A 9x9 grid filled with nulls.
 */
const createEmptyGrid = (): Board => {
    return Array.from({ length: SIZE }, () => Array(SIZE).fill(EMPTY_CELL));
}


/**
 * Shuffles an array in place.
 * @param array The array to shuffle.
 */
function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


/**
 * Generates a complete, valid Sudoku solution.
 * @returns A fully solved 9x9 Sudoku board.
 */
const generateSolution = (): Board => {
    const board = createEmptyGrid();
    const animalIds = shuffle(Array.from({ length: 9 }, (_, i) => (i + 1).toString()));

    const fill = (): boolean => {
        const find = findEmpty(board);
        if (!find) {
            return true;
        }
        const [row, col] = find;

        for (const id of animalIds) {
            if (isValid(board, id, [row, col])) {
                board[row][col] = id;
                if (fill()) {
                    return true;
                }
                board[row][col] = EMPTY_CELL;
            }
        }
        return false;
    }

    fill();
    return board;
}

/**
 * Counts the number of solutions for a given Sudoku board.
 * @param board The board to check.
 * @returns The number of solutions found.
 */
export const countSolutions = (board: Board): number => {
    let count = 0;
    const find = findEmpty(board);
    if (!find) {
        return 1;
    }

    const [row, col] = find;
    const animalIds = Array.from({ length: 9 }, (_, i) => (i + 1).toString());

    for (const id of animalIds) {
        if (isValid(board, id, [row, col])) {
            board[row][col] = id;
            count += countSolutions(board);
            board[row][col] = EMPTY_CELL; // Backtrack
            if (count > 1) {
                return count; // Optimization: stop if more than one solution is found
            }
        }
    }
    return count;
}


/**
 * Generates a Sudoku puzzle with a unique solution.
 * @param difficulty The number of cells to remove (higher is harder).
 * @returns A tuple containing the puzzle board and its solution.
 */
export const generatePuzzle = (difficulty: number = 40): [Board, Board] => {
    const solution = generateSolution();
    const puzzle = JSON.parse(JSON.stringify(solution)); // Deep copy

    const cells = shuffle(Array.from({ length: SIZE * SIZE }, (_, i) => [Math.floor(i / SIZE), i % SIZE]));
    let removedCount = 0;

    for (const [r, c] of cells) {
        if (removedCount >= difficulty) break;

        const temp = puzzle[r][c];
        puzzle[r][c] = EMPTY_CELL;
        removedCount++;

        const boardCopy = JSON.parse(JSON.stringify(puzzle));
        if (countSolutions(boardCopy) !== 1) {
            puzzle[r][c] = temp; // Put it back if it leads to multiple solutions
            removedCount--;
        }
    }

    return [puzzle, solution];
}

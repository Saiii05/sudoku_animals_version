// src/types/index.ts

export type Animal = {
  id: string;
  name: string;
  emoji: string;
  svg?: string;
};

export type CellValue = string | null;

export type Board = (CellValue | CellValue[])[][];

export type GameState = {
  board: Board;
  solution: Board;
  selectedCell: { row: number; col: number } | null;
  history: Board[];
  isPencilMode: boolean;
};

export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert';

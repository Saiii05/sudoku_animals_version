import { puzzleGrid, solvedGrid } from './puzzles.js';

window.puzzleGrid = puzzleGrid;
window.solvedGrid = solvedGrid;

document.addEventListener('DOMContentLoaded', () => {
    const gridElement = document.getElementById('sudoku-grid');
    const paletteElement = document.querySelector('.animal-palette');
    const startButton = document.getElementById('start-button');
    const endButton = document.getElementById('end-button');
    const resetButton = document.getElementById('reset-button');
    let animals = [];
    let gameState = 'ready'; // ready, playing, finished
    let userPuzzleGrid = [];

    // Initialize the game
    function init() {
        fetch('animals.json')
            .then(response => response.json())
            .then(data => {
                animals = data;
                createPalette();
                disableGrid();
            });
    }

    function startGame() {
        gameState = 'playing';
        userPuzzleGrid = puzzleGrid.map(row => [...row]);
        startButton.disabled = true;
        endButton.disabled = false;
        clearGrid();
        createGrid();
        enableGrid();
    }

    function endGame() {
        gameState = 'finished';
        startButton.disabled = false;
        endButton.disabled = true;
        disableGrid();
        alert('Game Over! Thanks for playing.');
    }

    function winGame() {
        gameState = 'finished';
        startButton.disabled = false;
        endButton.disabled = true;
        disableGrid();
        alert('Congratulations! You solved the puzzle!');
    }

    function createGrid() {
        for (let i = 0; i < 9; i++) {
            const row = document.createElement('div');
            row.classList.add('sudoku-row');
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement('div');
                cell.classList.add('sudoku-cell');
                cell.dataset.row = i;
                cell.dataset.col = j;

                const cellValue = userPuzzleGrid[i][j];
                if (cellValue !== 0) {
                    const animal = animals.find(a => a.id === cellValue);
                    if (animal) {
                        cell.textContent = animal.emoji;
                        if (puzzleGrid[i][j] !== 0) {
                            cell.classList.add('pre-filled');
                        }
                    }
                }
                row.appendChild(cell);
            }
            gridElement.appendChild(row);
        }
    }

    function clearGrid() {
        gridElement.innerHTML = '';
    }

    function disableGrid() {
        gridElement.style.pointerEvents = 'none';
    }

    function enableGrid() {
        gridElement.style.pointerEvents = 'auto';
    }

    function createPalette() {
        animals.forEach(animal => {
            const iconContainer = document.createElement('div');
            iconContainer.classList.add('animal-icon');
            iconContainer.textContent = animal.emoji;
            iconContainer.dataset.animalId = animal.id;
            paletteElement.appendChild(iconContainer);
        });
    }

    function isValidPlacement(grid, row, col, animalId) {
        // Check row
        for (let i = 0; i < 9; i++) {
            if (grid[row][i] === animalId) {
                return false;
            }
        }

        // Check column
        for (let i = 0; i < 9; i++) {
            if (grid[i][col] === animalId) {
                return false;
            }
        }

        // Check 3x3 subgrid
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[startRow + i][startCol + j] === animalId) {
                    return false;
                }
            }
        }

        return true;
    }

    function highlightConflicts(row, col, animalId) {
        const cells = document.querySelectorAll('.sudoku-cell');
        cells.forEach(c => c.classList.remove('invalid'));

        // Highlight row
        for (let i = 0; i < 9; i++) {
            if (userPuzzleGrid[row][i] === animalId) {
                document.querySelector(`[data-row='${row}'][data-col='${i}']`).classList.add('invalid');
            }
        }

        // Highlight column
        for (let i = 0; i < 9; i++) {
            if (userPuzzleGrid[i][col] === animalId) {
                document.querySelector(`[data-row='${i}'][data-col='${col}']`).classList.add('invalid');
            }
        }

        // Highlight 3x3 subgrid
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (userPuzzleGrid[startRow + i][startCol + j] === animalId) {
                    document.querySelector(`[data-row='${startRow + i}'][data-col='${startCol + j}']`).classList.add('invalid');
                }
            }
        }
    }

    function isBoardFull() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (userPuzzleGrid[i][j] === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    let selectedAnimalId = null;
    let selectedCell = null;

    paletteElement.addEventListener('click', (event) => {
        if (gameState !== 'playing') return;
        if (event.target.classList.contains('animal-icon')) {
            selectedAnimalId = event.target.dataset.animalId;
            document.querySelectorAll('.animal-icon').forEach(icon => icon.classList.remove('selected'));
            event.target.classList.add('selected');
        }
    });

    gridElement.addEventListener('click', (event) => {
        if (gameState !== 'playing') return;
        const cell = event.target.closest('.sudoku-cell');
        if (cell && !cell.classList.contains('pre-filled')) {
            if (selectedAnimalId) {
                const animalId = parseInt(selectedAnimalId, 10);
                const row = parseInt(cell.dataset.row, 10);
                const col = parseInt(cell.dataset.col, 10);

                if (isValidPlacement(userPuzzleGrid, row, col, animalId)) {
                    const animal = animals.find(a => a.id === animalId);
                    if (animal) {
                        cell.textContent = animal.emoji;
                        userPuzzleGrid[row][col] = animalId;
                        selectedAnimalId = null;
                        document.querySelectorAll('.animal-icon.selected').forEach(icon => icon.classList.remove('selected'));
                        document.querySelectorAll('.sudoku-cell').forEach(c => c.classList.remove('invalid'));

                        if (isBoardFull()) {
                            winGame();
                        }
                    }
                } else {
                    cell.classList.add('shake');
                    highlightConflicts(row, col, animalId);
                    setTimeout(() => {
                        cell.classList.remove('shake');
                    }, 500);
                }
            }
            if (selectedCell) {
                selectedCell.classList.remove('selected');
            }
            selectedCell = cell;
            selectedCell.classList.add('selected');
        }
    });

    startButton.addEventListener('click', startGame);
    endButton.addEventListener('click', endGame);
    resetButton.addEventListener('click', startGame);

    init();
});

import { puzzleGrid } from './puzzles.js';

document.addEventListener('DOMContentLoaded', () => {
    const gridElement = document.getElementById('sudoku-grid');
    const paletteElement = document.querySelector('.animal-palette');
    let animals = [];

    // Fetch animal data
    fetch('animals.json')
        .then(response => response.json())
        .then(data => {
            animals = data;
            createGrid();
            createPalette();
        });

    function createGrid() {
        gridElement.innerHTML = ''; // Clear previous grid
        for (let i = 0; i < 81; i++) {
            const cell = document.createElement('div');
            cell.classList.add('sudoku-cell');
            const row = Math.floor(i / 9);
            const col = i % 9;
            cell.dataset.row = row;
            cell.dataset.col = col;

            const cellValue = puzzleGrid[row][col];
            if (cellValue !== 0) {
                const animal = animals.find(a => a.id === cellValue);
                if (animal) {
                    cell.textContent = animal.emoji;
                    cell.classList.add('pre-filled');
                }
            }
            gridElement.appendChild(cell);
        }
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

    let selectedAnimalId = null;
    let selectedCell = null;

    paletteElement.addEventListener('click', (event) => {
        if (event.target.classList.contains('animal-icon')) {
            selectedAnimalId = event.target.dataset.animalId;
            document.querySelectorAll('.animal-icon').forEach(icon => icon.classList.remove('selected'));
            event.target.classList.add('selected');
        }
    });

    gridElement.addEventListener('click', (event) => {
        const cell = event.target.closest('.sudoku-cell');
        if (cell && !cell.classList.contains('pre-filled')) {
            if (selectedAnimalId) {
                const animal = animals.find(a => a.id === parseInt(selectedAnimalId, 10));
                if (animal) {
                    cell.textContent = animal.emoji;
                    selectedAnimalId = null;
                    document.querySelectorAll('.animal-icon.selected').forEach(icon => icon.classList.remove('selected'));
                }
            }
            if (selectedCell) {
                selectedCell.classList.remove('selected');
            }
            selectedCell = cell;
            selectedCell.classList.add('selected');
        }
    });

    // Reset button functionality
    const resetButton = document.querySelector('.reset-button');
    resetButton.addEventListener('click', createGrid);
});

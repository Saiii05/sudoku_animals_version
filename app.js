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
        for (let i = 0; i < 9; i++) {
            const row = document.createElement('div');
            row.classList.add('sudoku-row');
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement('div');
                cell.classList.add('sudoku-cell');
                cell.dataset.row = i;
                cell.dataset.col = j;

                const cellValue = puzzleGrid[i][j];
                if (cellValue !== 0) {
                    const animal = animals.find(a => a.id === cellValue);
                    if (animal) {
                        cell.textContent = animal.emoji;
                        cell.classList.add('pre-filled');
                    }
                }
                row.appendChild(cell);
            }
            gridElement.appendChild(row);
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
});

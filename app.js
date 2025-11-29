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
                        const img = document.createElement('img');
                        img.src = animal.icon;
                        img.alt = animal.name;
                        cell.appendChild(img);
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
            const img = document.createElement('img');
            img.src = animal.icon;
            img.alt = animal.name;
            img.dataset.animalId = animal.id;
            iconContainer.appendChild(img);
            paletteElement.appendChild(iconContainer);
        });
    }

    let selectedAnimalId = null;
    let selectedCell = null;

    paletteElement.addEventListener('click', (event) => {
        if (event.target.tagName === 'IMG') {
            selectedAnimalId = event.target.dataset.animalId;
            // Optional: Add a class to the selected animal for visual feedback
            document.querySelectorAll('.animal-icon').forEach(icon => icon.classList.remove('selected'));
            event.target.parentElement.classList.add('selected');
        }
    });

    gridElement.addEventListener('click', (event) => {
        const cell = event.target.closest('.sudoku-cell');
        if (cell && !cell.classList.contains('pre-filled')) {
            if (selectedAnimalId) {
                // Remove existing animal if any
                cell.innerHTML = '';

                const animal = animals.find(a => a.id === parseInt(selectedAnimalId, 10));
                if (animal) {
                    const img = document.createElement('img');
                    img.src = animal.icon;
                    img.alt = animal.name;
                    cell.appendChild(img);
                    selectedAnimalId = null; // Deselect animal after placing
                    document.querySelectorAll('.animal-icon.selected').forEach(icon => icon.classList.remove('selected'));
                }
            }
            // Optional: Add a class to the selected cell for visual feedback
            if (selectedCell) {
                selectedCell.classList.remove('selected');
            }
            selectedCell = cell;
            selectedCell.classList.add('selected');
        }
    });
});

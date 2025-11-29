import { test, expect } from '@playwright/test';
import { solvedGrid, puzzleGrid } from '../puzzles.js';

test('full game flow', async ({ page }) => {
    await page.goto('http://localhost:8000');

    // 1. Start the game
    await page.click('#start-button');
    await expect(page.locator('.sudoku-cell:not(:empty)')).toHaveCount(30);

    // 2. Make a valid move
    await page.click('.animal-palette .animal-icon:nth-child(4)'); // Select Panda (ID 4)
    await page.click("[data-row='0'][data-col='2']"); // Place in an empty cell
    await expect(page.locator("[data-row='0'][data-col='2']")).toHaveText('🐼');

    // 3. Make an invalid move to test validation
    await page.click('.animal-palette .animal-icon:nth-child(5)'); // Select Tiger (ID 5)
    await page.click("[data-row='0'][data-col='3']"); // Attempt to place next to another Tiger
    await expect(page.locator("[data-row='0'][data-col='3']")).toBeEmpty();

    // 4. Reset the board
    await page.click('#reset-button');
    await expect(page.locator('.sudoku-cell:not(:empty)')).toHaveCount(30);

    // 5. Fill the board with the correct solution to win
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (puzzleGrid[i][j] === 0) {
                const animalId = solvedGrid[i][j];
                await page.click(`.animal-palette .animal-icon[data-animal-id='${animalId}']`);
                await page.click(`[data-row='${i}'][data-col='${j}']`);
            }
        }
    }

    // 6. Take a screenshot of the final board
    await page.screenshot({ path: 'tests/sudoku_ui_win_state.png' });
});

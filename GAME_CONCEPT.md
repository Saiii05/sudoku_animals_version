# Animal Sudoku: Game Concept

## 1. Game Mechanics

### How Players Place Animal Symbols
- **Drag-and-Drop:** Players can drag an animal icon from a palette at the bottom of the screen and drop it onto an empty cell in the 9x9 grid.
- **Tap-and-Place:** Alternatively, players can first tap a cell on the grid to select it, and then tap the desired animal icon from the palette to place it in the selected cell.

### Difficulty Modes
- **Easy:** Puzzles with a large number of pre-filled cells. The game provides more hints and visual aids.
- **Medium:** A standard Sudoku challenge with a moderate number of pre-filled cells.
- **Hard:** Puzzles with fewer pre-filled cells, requiring more advanced techniques to solve.
- **Expert:** A significant challenge with the minimum number of pre-filled cells for a unique solution.

### Hint System
- Players have access to a hint button. When pressed, the system will reveal the correct animal for a randomly selected empty cell.
- Hints are limited (e.g., 3 per game) to encourage players to solve the puzzle themselves.

### Error-Checking Mode
- This is a toggleable setting.
- **On:** The game immediately highlights incorrectly placed animals (e.g., with a red border).
- **Off:** No immediate feedback is given, providing a more traditional Sudoku experience.

### Scoring or Timer System
- A timer starts at the beginning of each game.
- The player's score can be based on the time taken to complete the puzzle, with bonuses for not using hints.

### Daily Challenge Mode
- A new, unique puzzle is available every day.
- Players can build a "streak" for completing daily challenges consecutively.

### Achievement Badges
- Players can earn badges for various accomplishments, such as:
    - "First Puzzle Solved"
    - "Speed Solver" (completing a puzzle under a certain time)
    - "Perfect Game" (solving a puzzle without errors or hints)
    - "Daily Streak" (completing 7 daily challenges in a row)

## 2. Full App Concept

### Onboarding Tutorial Text
1.  **Welcome!** "Welcome to Animal Sudoku! A fun twist on the classic puzzle game."
2.  **The Goal:** "The goal is to fill the grid so that every row, column, and 3x3 box contains one of each animal."
3.  **How to Play:** "Simply select a cell and then tap an animal from the palette below to place it."
4.  **No Repeats:** "Remember, no animal can be repeated in the same row, column, or 3x3 box."
5.  **Have Fun!** "That's it! You're ready to play. Have fun!"

### Color Palette
- **Primary Background:** `#F0F8FF` (AliceBlue)
- **Grid Background:** `#FFFFFF`
- **Cell Borders:** `#D0E0F0`
- **Subgrid Borders:** `#A0C0E0`
- **Selected Cell:** `#E0F0FF`
- **UI Elements (Buttons):** `#FFFFFF` with `#A0C0E0` accents.

### Sound Effect Style
- **Placement:** A soft, satisfying "pop" sound when an animal is placed.
- **Correct Placement:** A gentle, positive "chime" sound if error-checking is on.
- **Incorrect Placement:** A subtle, low-pitched "boop" sound.
- **Game Win:** A cheerful, short musical jingle.

### Simple Animations
- **Cell Selection:** The selected cell smoothly scales up by 10% and then back down.
- **Correctness:** When a correct animal is placed, it might do a quick, happy bounce animation.

### Reward System
- **Stars:** Players can earn up to 3 stars per puzzle based on performance (time, hints used).
- **Coins:** Awarded for completing puzzles and earning achievements.
- **Unlockable Themes:** Coins can be used to unlock new visual themes (e.g., "Jungle," "Arctic," "Forest") that change the background and UI colors.

### Menu Layout, Settings Page, Dark Mode
- **Menu:** A simple main menu with buttons for "New Game," "Daily Challenge," "Settings," and "Achievements."
- **Settings Page:** Options to toggle sound, music, error-checking mode, and a "Dark Mode" switch.
- **Dark Mode:** A darker color palette for comfortable play in low-light conditions.

### Monetization
- **Ads:** Banner ads at the bottom of the screen and occasional full-screen ads between games.
- **Premium Themes:** Some themes can be purchased with real money.
- **Remove-Ads Option:** A one-time in-app purchase to permanently remove all ads.

## 3. Asset References

### Icon Pack Description
- See the `ICON_DESCRIPTIONS.md` file for detailed descriptions of each animal icon.

### Puzzle Background Theme Ideas
- **Default:** A clean, minimalist background with soft, abstract pastel shapes.
- **Jungle Theme:** Lush green foliage, vines, and a playful monkey peeking from the side.
- **Arctic Theme:** A snowy landscape with cute penguins and polar bears.

### Button Styles
- Rounded corners, soft shadows, and a clean, flat design.
- Icons on buttons should be simple and universally understood (e.g., a gear for settings, a trophy for achievements).

### Title Logo Concept
- **"Animal Sudoku"** in a playful, rounded, sans-serif font.
- The "o" in "Sudoku" could be replaced with one of the animal icons (e.g., the panda).
- The logo should be colorful and friendly, matching the overall game aesthetic.

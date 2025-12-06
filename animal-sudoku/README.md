# Animal Sudoku

A modern, responsive, and feature-rich Sudoku web application built with React, TypeScript, Vite, and Tailwind CSS. This game uses a customizable set of animal icons instead of numbers, offering a fun and unique twist on the classic puzzle.

## Features

- **Customizable Gameplay**: Choose from a gallery of built-in animals or add your own using emojis.
- **Full Sudoku Logic**: Includes a robust puzzle generator and solver, ensuring a unique solution for every puzzle.
- **Rich User Experience**: A beautiful, responsive UI with light and dark themes, animations, and sound effects.
- **Complete Feature Set**: All the features you'd expect from a modern Sudoku app, including:
  - Pencil notes
  - Undo/Redo
  - Hints
  - Mistake checking
  - Multiple difficulty levels (Easy, Medium, Hard, Expert)
- **Persistence & Sharing**: Your game is automatically saved to `localStorage`, so you can pick up where you left off. You can also share puzzles with friends via a unique URL.
- **First-Time User Tutorial**: A gentle introduction to the game for new players.
- **Localization Ready**: The app is built with `i18next` for easy translation into other languages.

## Tech Stack

- **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Localization**: [i18next](https://www.i18next.com/)
- **Testing**: [Vitest](https://vitest.dev/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (or your favorite package manager)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/animal-sudoku.git
   cd animal-sudoku
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Development Server

To start the development server, run the following command:

```bash
npm run dev
```

This will start the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser. The page will reload when you make changes.

### Running Tests

To run the unit tests, use the following command:

```bash
npm run test
```

This will launch the test runner in watch mode.

## Project Structure

The project is organized into the following directories:

- `src/components`: Reusable React components
- `src/contexts`: React contexts for managing global state (game, theme, sound)
- `src/hooks`: Custom React hooks for managing state and side effects
- `src/lib`: Core application logic (e.g., Sudoku solver, generator)
- `src/locales`: Translation files for localization
- `src/pages`: Main application pages
- `src/styles`: Global CSS styles
- `src/tests`: Unit and integration tests
- `src/types`: TypeScript type definitions

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

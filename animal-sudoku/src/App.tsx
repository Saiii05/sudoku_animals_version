// src/App.tsx
import React from 'react';
import Game from './pages/Game';
import { GameProvider } from './contexts/GameContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { SoundProvider } from './contexts/SoundContext';
import './index.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <SoundProvider>
        <GameProvider>
          <Game />
        </GameProvider>
      </SoundProvider>
    </ThemeProvider>
  );
};

export default App;

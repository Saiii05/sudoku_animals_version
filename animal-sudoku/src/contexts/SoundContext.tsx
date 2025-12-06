// src/contexts/SoundContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type SoundEffect = 'place' | 'error' | 'undo' | 'hint';

interface ISoundContext {
  playSound: (sound: SoundEffect) => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
}

const SoundContext = createContext<ISoundContext | undefined>(undefined);

// Dummy audio objects for now. In a real app, you'd load audio files.
const sounds = {
  place: { play: () => console.log('Play sound: place') },
  error: { play: () => console.log('Play sound: error') },
  undo: { play: () => console.log('Play sound: undo') },
  hint: { play: () => console.log('Play sound: hint') },
};

const STORAGE_KEY = 'animal-sudoku-sound-enabled';

export const SoundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(STORAGE_KEY);
      return storedValue ? JSON.parse(storedValue) : true;
    } catch {
      return true;
    }
  });

  const toggleSound = () => {
    setIsSoundEnabled(prev => {
        const newValue = !prev;
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
        } catch (error) {
            console.error('Error saving sound preference', error);
        }
        return newValue;
    });
  };

  const playSound = (sound: SoundEffect) => {
    if (isSoundEnabled) {
      sounds[sound].play();
    }
  };

  return (
    <SoundContext.Provider value={{ playSound, isSoundEnabled, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};

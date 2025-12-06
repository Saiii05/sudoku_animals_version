// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

function getValue<T>(key: string, initialValue: T | (() => T)) {
  const savedValue = JSON.parse(localStorage.getItem(key) || 'null');
  if (savedValue !== null) {
    return savedValue;
  }
  if (initialValue instanceof Function) {
    return initialValue();
  }
  return initialValue;
}

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => getValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// src/components/Tutorial.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Tutorial: React.FC = () => {
  const { t } = useTranslation();
  const [showTutorial, setShowTutorial] = useLocalStorage('animal-sudoku-tutorial-seen', true);

  if (!showTutorial) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl max-w-lg w-full text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">{t('welcome')}</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          {t('tutorial.goal')}
        </p>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          {t('tutorial.instructions')}
        </p>
        <button
          onClick={() => setShowTutorial(false)}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg text-lg font-bold hover:bg-blue-600"
        >
          {t('tutorial.gotIt')}
        </button>
      </div>
    </div>
  );
};

export default Tutorial;

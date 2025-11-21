import React, { createContext, useContext, useState } from 'react';

type PlayModeContextType = {
  isPlayMode: boolean;
  setIsPlayMode: (value: boolean) => void;
  currentGame: 'dropgame' | 'trashorsmash' | 'finished';
  setCurrentGame: (game: 'dropgame' | 'trashorsmash' | 'finished') => void;
  dropGameScore: number;
  setDropGameScore: (score: number) => void;
  trashOrSmashScore: number;
  setTrashOrSmashScore: (score: number) => void;
  resetPlayMode: () => void;
};

const PlayModeContext = createContext<PlayModeContextType | undefined>(undefined);

export const PlayModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlayMode, setIsPlayMode] = useState(false);
  const [currentGame, setCurrentGame] = useState<'dropgame' | 'trashorsmash' | 'finished'>('dropgame');
  const [dropGameScore, setDropGameScore] = useState(0);
  const [trashOrSmashScore, setTrashOrSmashScore] = useState(0);

  const resetPlayMode = () => {
    setIsPlayMode(false);
    setCurrentGame('dropgame');
    setDropGameScore(0);
    setTrashOrSmashScore(0);
  };

  return (
    <PlayModeContext.Provider
      value={{
        isPlayMode,
        setIsPlayMode,
        currentGame,
        setCurrentGame,
        dropGameScore,
        setDropGameScore,
        trashOrSmashScore,
        setTrashOrSmashScore,
        resetPlayMode,
      }}
    >
      {children}
    </PlayModeContext.Provider>
  );
};

export const usePlayMode = (): PlayModeContextType => {
  const context = useContext(PlayModeContext);
  if (!context) {
    throw new Error('usePlayMode must be used within a PlayModeProvider');
  }
  return context;
};
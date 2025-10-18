import { GameState } from "../types/recydleTypes";



const getGameKey = (language: string) => `recydle-${language}`;

const getTodayPuzzleDate = () => {
  return new Date().toISOString().split('T')[0];
};


export const getStoredGameState = (language: string): string[] => {
  const gameStateStr = localStorage.getItem(getGameKey(language));
  if (!gameStateStr) return [];

  try {
    const gameState = JSON.parse(gameStateStr) as GameState;
    const isSameDay = gameState.puzzleDate === getTodayPuzzleDate();

    if (isSameDay) {
      return gameState.guesses;
    }
  } catch {
    console.log('error')
  }

  return [];
};


export const setStoredGameState = (
  guesses: string[],
  language: string
) => {
  localStorage.setItem(
    getGameKey(language),
    JSON.stringify({
      puzzleDate: getTodayPuzzleDate(),
      guesses,
    })
  );
};


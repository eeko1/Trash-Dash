import { GameState } from "../types/recydleTypes";



const getGameKey = (language: string) => `recydle-${language}`;

const getTodayPuzzleDate = () => {
  return new Date().toISOString().split('T')[0];
};


export const getStoredGameState = (language: string): { guesses: string[], gameCompletion: 'active' | 'won' | 'lost' } => {
  const gameStateStr = localStorage.getItem(getGameKey(language));
  if (!gameStateStr) return { guesses: [], gameCompletion: 'active' };

  try {
    const gameState = JSON.parse(gameStateStr) as GameState;
    const isSameDay = gameState.puzzleDate === getTodayPuzzleDate();

    if (isSameDay) {
      return {
        guesses: gameState.guesses,
        gameCompletion: gameState.gameCompletion || 'active'
      };
    }
  } catch {
    console.log('error')
  }

  return { guesses: [], gameCompletion: 'active' };
};


export const setStoredGameState = (
  guesses: string[],
  language: string,
  gameCompletion: 'active' | 'won' | 'lost'
) => {
  localStorage.setItem(
    getGameKey(language),
    JSON.stringify({
      puzzleDate: getTodayPuzzleDate(),
      guesses,
      gameCompletion
    })
  );
};


import { GameState } from "../types/recydleTypes";

const Game_Key = 'recydle';

const getTodayPuzzleDate = () => {
  return new Date().toISOString().split('T')[0];
};

export const getStoredGameState = () => {
  const gameStateStr = localStorage.getItem(Game_Key);
  if (!gameStateStr) {
    return [];
  }

  const gameState = JSON.parse(gameStateStr) as GameState;
  if (gameState.puzzleDate !== getTodayPuzzleDate()) {
    return [];
  }

  return gameState.guesses;
};

export const setStoredGameState = (guesses: Array<string>) => {
  localStorage.setItem(
    Game_Key,
    JSON.stringify({
      puzzleDate: getTodayPuzzleDate(),
      guesses,
    })
  );
};
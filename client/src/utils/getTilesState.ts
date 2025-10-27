import { LetterState } from '../types/recydleTypes';


export const replaceCharAtIndex = (
  str: string,
  id: number,
  newChar: string
) => {
  return str.substring(0, id) + newChar + str.substring(id + 1, str.length);
};

export const getTileStates = (
  solution: string,
  guess: string | undefined,
  isSubmitted: boolean
) => {
  const
    tileStates: Array<LetterState> = Array.from<LetterState>({
      length: solution.length,
    }).fill('default');
  if (!isSubmitted || !guess) {
    return tileStates;
  }
  solution = solution.toUpperCase();
  guess = guess.toUpperCase();

  for (let i = 0; i < solution.length; i++) {
    if (guess[i] === solution[i]) {
      tileStates[i] = 'correct';
      solution = replaceCharAtIndex(solution, i, ' ');
    }
  }

  for (let i = 0; i < solution.length; i++) {
    if (tileStates[i] === 'correct') {
      continue;
    }
    if (solution.includes(guess[i])) {
      solution = replaceCharAtIndex(solution, solution.indexOf(guess[i]), ' ');
      tileStates[i] = 'wrong-place';
    } else {
      tileStates[i] = 'wrong';
    }
  }


  return tileStates;
};
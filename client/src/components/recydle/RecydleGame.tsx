import { useCallback, useEffect, useRef, useState } from 'react';
import { Backspace, Enter, Game_Rounds } from '../../data/constants'
import { KeyPad } from './Keypad'
import { RecydleRow } from './RecydleRow'
import { getTileStates } from '../../utils/getTilesState';
import { useCurrentGuessReducer } from '../../hooks/useCurrentGuess';
import {
  getStoredGameState,
  setStoredGameState,
} from '../../utils/gameStorage';
import { LetterState, solutionProps } from '../../types/recydleTypes';
import RecydleEnd from './RecydleEnd';
import { useTranslation } from 'react-i18next';




const RecydleGame = ({ solution, wordLength }: solutionProps) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [currentGuess, dispatch] = useCurrentGuessReducer(wordLength);
  const [toastText, setToastText] = useState('');
  const toastTimeout = useRef<ReturnType<typeof setTimeout>>();
  const storedState = getStoredGameState(lang);
  const [guesses, setGuesses] = useState<string[]>(storedState.guesses);
  const [gameCompletion, setGameCompletion] = useState<'active' | 'won' | 'lost'>(storedState.gameCompletion);
  
  const setGuessesCallback = useCallback(
    (guesses: string[]) => {
      setGuesses(guesses);
      setStoredGameState(guesses, lang, gameCompletion);
    },
    [lang, gameCompletion]
  );
  const showToast = useCallback(
    (text: string) => {
      clearTimeout(toastTimeout.current);
      setToastText(text);
      toastTimeout.current = setTimeout(() => {
        setToastText('')
      }, 1500);
      return () => clearTimeout(toastTimeout.current)
    }, [setToastText, toastTimeout]
  );

  const submitWord = useCallback(() => {
    if (currentGuess.length !== wordLength) {
      showToast('not enough pylons')
      return;
    }
    setGuessesCallback([...guesses, currentGuess]);
    dispatch({ type: 'clear' })
    if (currentGuess.toUpperCase() === solution.toUpperCase()) {
      setTimeout(() => {
        showToast('congatulation')
      }, 2000)
      setTimeout(() => {
        setGameCompletion('won');
        setStoredGameState([...guesses, currentGuess], lang, 'won');
      }, 4000)
      return
    }
    if (guesses.length + 1 === Game_Rounds) {
      setGameCompletion('lost');
      setStoredGameState([...guesses, currentGuess], lang, 'lost');
      setTimeout(() => {
        showToast('see you next time')
      }, 2500)
    }
  }, [
    lang,
    currentGuess,
    guesses,
    dispatch,
    setGameCompletion,
    setGuessesCallback,
    showToast,
    solution,
    wordLength
  ])

  const onKeyPress = useCallback(
    (key: string) => {
      if (gameCompletion !== 'active') {
        return;
      }
      if (key === Backspace) {
        dispatch({ type: 'Backspace' })
        return;
      }
      if (key === Enter) {
        submitWord()
        return;
      }
      if (key.length !== 1 || !/[a-zA-ZåäöÅÄÖ]/.test(key)) {
        return;
      }
      dispatch({ type: 'add', letter: key.toLocaleUpperCase() })

    }, [gameCompletion, dispatch, submitWord])

  const onKeyDownEvent = useCallback(
    (e: KeyboardEvent) => {
      onKeyPress(e.key);
    }, [onKeyPress])

  useEffect(() => {
    window.addEventListener('keydown', onKeyDownEvent)
    return () => window.removeEventListener('keydown', onKeyDownEvent)
  }, [onKeyDownEvent])

  const guessIdTotiles = Array.from({ length: Game_Rounds }).map(
    (_, id) => {
      const submitted = id < guesses.length;
      return getTileStates(solution, guesses[id], submitted)
    }
  )
  const letterToLetterStates: { [letter: string]: LetterState } = {}

  guessIdTotiles.forEach((titleSates, id) => {
    const guess = guesses[id];
    if (!guess) {
      return;
    }
    titleSates.forEach((titleSate, letterId) => {
      const letter = guess[letterId];
      if (titleSate === 'correct' || letterToLetterStates[letter] === 'correct') {
        letterToLetterStates[letter] = 'correct';
        return
      }
      if (titleSate === 'wrong-place' || letterToLetterStates[letter] === 'wrong-place') {
        letterToLetterStates[letter] = 'wrong-place';
        return
      }
      if (titleSate === 'wrong') {
        letterToLetterStates[letter] = 'wrong';
      }
    });
  });


  return (
    <div className="flex items-center justify-center w-full h-full">
      {toastText && (
        <div className="absolute mt-4 font-bold bg-slate-500 p-4 rounded-md z-10">
          {toastText}
        </div>
      )}

      {(gameCompletion === 'won' || gameCompletion === 'lost') ? (
        <RecydleEnd result={gameCompletion} />
      ) : (
        <div className="flex flex-col items-center gap-10 w-full max-w-lg py-5">
          <div className="flex flex-col gap-2">
            {Array.from({ length: Game_Rounds }).map((_, id) => {
              const isCurrentGuess = id === guesses.length;
              return (
                <RecydleRow
                  key={id}
                  guess={isCurrentGuess ? currentGuess : guesses[id]}
                  letterState={guessIdTotiles[id]}
                  jump={id === guesses.length - 1}
                  wordLength={wordLength}
                />
              );
            })}
          </div>
          <KeyPad
            onKeyPress={onKeyPress}
            letterToLetterState={letterToLetterStates}
          />
        </div>
      )}
    </div>
    
  );
}

export default RecydleGame;
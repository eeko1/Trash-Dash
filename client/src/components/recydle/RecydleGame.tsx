
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



const RecydleGame = ({ solution, wordLength }: solutionProps) => {
  const [currentGuess, dispatch] = useCurrentGuessReducer(wordLength);
  const [guesses, SetGuesses] = useState<Array<string>>(getStoredGameState())
  const [gameCompletion, setGameCompletion] = useState<'active' | 'won' | 'lost'>('active')
  const [toastText, setToastText] = useState('');
  const [shakeCurrentRow, setShakeCurrentRow] = useState(false);
  const toastTimeout = useRef<ReturnType<typeof setTimeout>>();
  const shakeTimeout = useRef<ReturnType<typeof setTimeout>>();


  const setGuessesCallback = useCallback(
    (guesses: Array<string>) => {
      SetGuesses(guesses);
      setStoredGameState(guesses);
    }, [SetGuesses])

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

  const shakeCurrentGuess = useCallback(() => {
    clearTimeout(shakeTimeout.current)
    setShakeCurrentRow(true);
    shakeTimeout.current = setTimeout(() => {
      setShakeCurrentRow(false)
    }, 650)
    return () => clearTimeout(shakeTimeout.current)
  }, [shakeTimeout])

  const submitWord = useCallback(() => {
    if (currentGuess.length !== wordLength) {
      showToast('not enough pylons')
      shakeCurrentGuess();
      return;
    }
    setGuessesCallback([...guesses, currentGuess]);
    dispatch({ type: 'clear' })
    if (currentGuess === solution) {
      setTimeout(() => {
        setGameCompletion('won');
      }, 2000)
      setTimeout(() => {
        showToast('congatulation')
      }, 4000)
      return
    }
    if (guesses.length + 1 === Game_Rounds) {
      setGameCompletion('lost');
      setTimeout(() => {
        showToast('see you next time')
      }, 2500)
    }
  }, [
    currentGuess,
    guesses,
    dispatch,
    setGameCompletion,
    setGuessesCallback,
    shakeCurrentGuess,
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
        letterToLetterStates[letter] = 'wrong-place';
      }
    });
  });


  return (
    <div className='flex justify-center w-full h-full'>
      <div className='flex flex-col items-center justify-between w-full max-w-xl max-h-[700px] py-8'>
        <div className='flex flex-col gap-2'>
          {Array.from({ length: Game_Rounds }).map((_, id) => {
            const isCurrentGuess = id === guesses.length;
            return (
              <RecydleRow
                key={id}
                guess={isCurrentGuess ? currentGuess : guesses[id]}
                letterState={guessIdTotiles[id]}
                shake={shakeCurrentRow && isCurrentGuess}
                jump={gameCompletion === 'won' && id === guesses.length - 1}
                wordLength={wordLength}
              />
            )
          })}
        </div>
        <KeyPad
          onKeyPress={onKeyPress}
          letterToLetterState={letterToLetterStates}
        />
      </div>
    </div>
  )
}

export default RecydleGame

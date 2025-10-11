import { useState } from 'react'

type FormattedType = {
    key: string;
    color: 'grey' | 'green' | 'yellow';
}

export const useRecydle = (solution: string) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState<FormattedType[][]>([])
    const [history, setHistory] = useState<string[]>([]);
    const [isCorrect, setIsCorrect] = useState(false);



    const formatGuess = () => {
        let solutionArray = [...solution];
        let formattedGuess:FormattedType[] = [...currentGuess].map((l) => {
            return { key: l, color: 'grey' };
        });

        formattedGuess.forEach((l, i) => {
            if (solution[i] === l.key) {
                formattedGuess[i].color = 'green';
                solutionArray[i] = '';

            }
        });
        formattedGuess.forEach((l, i) => {
            if (solutionArray.includes(l.key) && l.color !== 'green') {
                formattedGuess[i].color = 'yellow';
                solutionArray[solutionArray.indexOf(l.key)] = '';
            }
        });
        return formattedGuess;
    }


    const addNewGuess = (formattedGuess: FormattedType[]) => {
        if (currentGuess === solution) {
            setIsCorrect(true)
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses;
        });
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        });
        setTurn((prevTurn) => {
            return prevTurn + 1;
        })
        setCurrentGuess('')
    };

    const handleKeyUp = ({ key }: KeyboardEvent) => {
        const validLetters = /^[a-zA-ZåäöÅÄÖ]$/;
        const maxGuessLength = solution.length;


        if (key === 'enter') {
            if (turn > 5) {
                console.log('You have used all your guesses')
                return
            }
            if (history.includes(currentGuess)) {
                console.log('You have tried that already')
                return
            }
            if (currentGuess.length !== maxGuessLength) {
                console.log(`word must be ${maxGuessLength} chars`)
                return
            }
            const formatted = formatGuess();
            addNewGuess(formatted)
        }
        if (key === 'Backspace') {
            setCurrentGuess((prev) => prev.slice(0, -1));
            return;
        }

        if (validLetters.test(key) && currentGuess.length < maxGuessLength) {
            console.log(key)
            setCurrentGuess((prev) => prev + key)
        }


    };

    return { turn, currentGuess, guesses, isCorrect, handleKeyUp };
};




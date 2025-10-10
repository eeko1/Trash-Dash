import { useState } from 'react'

export const useRecydle = (solution:string) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([]);
    const [history, setHistory] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);


    const formatGuess = () => { };

    const addNewGuess = () => { };

    const handleKeyUp = ({ key }: KeyboardEvent) => {
        const validLetters = /^[a-zA-ZåäöÅÄÖ]$/;
        const maxGuessLength = solution.length;
        if (key === 'Backspace') {
            setCurrentGuess((prev) => prev.slice(0, -1));
            return;
        }

        if (validLetters.test(key) && currentGuess.length < maxGuessLength) {
            setCurrentGuess((prev) => prev + key)
        }
        console.log(key)
    };
};

import React, { useState } from 'react'

export const useRecydle = () => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([]);
    const [history, setHistory] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);


    const formatGuess = () => { };

    const addNewGuess = () => { };

    const handleKeyUp = () => { };
};

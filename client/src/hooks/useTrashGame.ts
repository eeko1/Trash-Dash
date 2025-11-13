import { useState, useEffect } from 'react';
import { Card, INITIAL_CARDS } from '../data/gameData';

export const useTrashGame = () => {
  const [gameCards, setGameCards] = useState<Card[]>(INITIAL_CARDS);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<{ name: string; image: string; correctType: string }[]>([]);
  const [feedback, setFeedback] = useState({ show: false, message: '', isCorrect: false });

  useEffect(() => {
    if (feedback.show) {
      const timer = setTimeout(() => {
        setFeedback({ show: false, message: '', isCorrect: false });
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [feedback.show]);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (gameCards.length === 0) return;
    const card = gameCards[0];
    const isCorrectSwipe =
      (direction === 'left' && card.type === 'mixwaste') ||
      (direction === 'right' && card.type === 'metalwaste');

    if (isCorrectSwipe) {
      setScore((prevScore) => prevScore + 1);
      setFeedback({ show: true, message: 'Correct!', isCorrect: true });
    } else {
      const correctBin = card.type === 'mixwaste' ? 'Mixwaste' : 'Metalwaste';
      setFeedback({ show: true, message: `Oops! That's ${correctBin}.`, isCorrect: false });
      setWrongAnswers((prev) => [...prev, { name: card.name, image: card.image, correctType: correctBin }]);
    }
  };

  const removeTopCard = () => {
    setGameCards((prev) => prev.slice(1));
  };

  const handleRestart = () => {
    setScore(0);
    setWrongAnswers([]);
    setGameCards(INITIAL_CARDS);
  };

  return {
    score,
    wrongAnswers,
    feedback,
    gameCards,
    handleSwipe,
    removeTopCard,
    handleRestart,
  };
};
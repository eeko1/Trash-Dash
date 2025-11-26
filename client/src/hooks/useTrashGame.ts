import { useState, useEffect } from 'react';
import { Card, INITIAL_CARDS } from '../data/gameData';
import { useTranslation } from 'react-i18next';

export const useTrashGame = () => {
  const [gameCards, setGameCards] = useState<Card[]>(INITIAL_CARDS);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<{ name: string; image: string; correctType: string }[]>([]);
  const [feedback, setFeedback] = useState({ show: false, message: '', isCorrect: false });
  const { t } = useTranslation();

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
      (direction === 'left' && card.type === 'mixed') ||
      (direction === 'right' && card.type === 'metal');

    if (isCorrectSwipe) {
      setScore((prevScore) => prevScore + 1);
      
      setFeedback({ 
        show: true, 
        message: t('Correct!'),
        isCorrect: true 
      });
    } else {
      const correctBinTranslationKey = card.type === 'mixed' ? 'Mixed' : 'Metal'; 
      const correctBin = t(correctBinTranslationKey); 
      
      setFeedback({ 
        show: true, 
        message: `${t("Oops! That's")} ${correctBin}.`, 
        isCorrect: false 
      });
      
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
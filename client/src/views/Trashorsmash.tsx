import { useState, useRef } from 'react';
import { useTrashGame } from '../hooks/useTrashGame';
import EndScreen from '../components/Endscreen';
import GameCard from '../components/GameCard';
import TrashBinButton from '../components/TrashBinButton';
import { useTranslation } from 'react-i18next';
import TrashorsmashTutorial from '../components/TrashorsmashTutorial'; 


const Trashorsmash = () => {
  const { score, wrongAnswers, feedback, gameCards, handleSwipe, removeTopCard, handleRestart } = useTrashGame();
  const [offsetX, setOffsetX] = useState(0);
  const [isFlying, setIsFlying] = useState(false);
  const [flyDir, setFlyDir] = useState<'left' | 'right' | null>(null);
  const touchStartX = useRef<number | null>(null);
  const { t } = useTranslation();

  const [showTutorial, setShowTutorial] = useState(true);

  const handleTutorialEnd = () => {
    setShowTutorial(false);
  };

  const triggerSwipeAnimation = (dir: 'left' | 'right') => {
    if (gameCards.length === 0 || isFlying || showTutorial) return; 
    handleSwipe(dir);
    setFlyDir(dir);
    setIsFlying(true);
    setTimeout(() => {
      removeTopCard();
      setIsFlying(false);
      setFlyDir(null);
      setOffsetX(0);
    }, 300);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isFlying || showTutorial) return; 
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || isFlying || showTutorial) return;
    const diff = e.touches[0].clientX - touchStartX.current;
    setOffsetX(diff);
  };

  const handleTouchEnd = () => {
    if (isFlying || showTutorial) return;
    if (Math.abs(offsetX) > 100) {
      const dir: 'left' | 'right' = offsetX < 0 ? 'left' : 'right';
      triggerSwipeAnimation(dir);
    } else {
      setOffsetX(0);
    }
    touchStartX.current = null;
  };

  if (gameCards.length === 0) {
    return <EndScreen score={score} wrongAnswers={wrongAnswers} onRestart={handleRestart} />;
  }

  if (showTutorial) {
    return <TrashorsmashTutorial onGotIt={handleTutorialEnd}/>;
  }

  const currentCard = gameCards[0];
  const cardStyle = {
    transform: isFlying
      ? `translateX(${flyDir === 'left' ? '-400px' : '400px'}) rotate(${flyDir === 'left' ? '-30deg' : '30deg'}) scale(0.8)`
      : `translateX(${offsetX}px) rotate(${offsetX / 20}deg) scale(1)`,
      transition: isFlying ? 'transform 0.3s ease-in-out' : 'none',
  };

  return (
    <div className="bg-white min-h-screen font-sans flex flex-col">
      <main className="bg-main_medium_turquoise flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-lg bg-main_dark_turquoise rounded-2xl shadow-2xl border-main_black flex flex-col items-center text-center p-6 relative">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Trash or Smash?</h1>
          <p className="text-white font-medium mb-6 text-lg">{t('Which bin does it go in?')}</p>
          
          <button 
            onClick={() => setShowTutorial(true)} 
            className="absolute top-4 right-4 text-white bg-main_medium_turquoise p-2 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-md hover:bg-main_dark_turquoise transition"
            aria-label={t('Show tutorial')}
          >
            ?
          </button>
          
          <div className="h-10 mb-4 flex items-center justify-center">
            {feedback.show && <p className={`text-xl font-bold ${feedback.isCorrect ? 'text-support_medium_green' : 'text-support_red'}`}>{feedback.message}</p>}
          </div>

          <div className="relative w-full flex justify-between items-center mb-4 px-4">
            <TrashBinButton
              onClick={() => triggerSwipeAnimation('left')}
              label={t('Mixedwaste Bin')}
              imageUrl="/assets/mix-waste.png" 
              altText={t('Mixedwaste Bin')}
              bgColorClasses="bg-support_red"
            />

            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {currentCard && <GameCard card={currentCard} style={cardStyle} />}
            </div>

            <TrashBinButton
              onClick={() => triggerSwipeAnimation('right')}
              label={t('Metalwaste Bin')}
              imageUrl="/assets/metal-waste.png"
              altText={t('Metalwaste Bin')}
              bgColorClasses="bg-support_medium_green"
            />
          </div>

          <div className="w-full flex justify-between items-center text-white mt-8 pt-4">
            <div className="font-bold text-lg">
              {t('Score')}: <span className="text-2xl text-support_yellow">{score}</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-main_dark_turquoise text-white text-sm p-4">
        <div className="max-w-screen-xl mx-auto text-center">{t('Copyright')}</div>
      </footer>
    </div>
  );
};

export default Trashorsmash;
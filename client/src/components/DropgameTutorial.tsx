import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface TutorialProps {
  isMobile: boolean;
  onComplete: () => void;
}

const DropGameTutorial: React.FC<TutorialProps> = ({ isMobile, onComplete }) => {
  const { t } = useTranslation();
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (showCountdown && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showCountdown && countdown === 0) {
      setFadeOut(true);
      const fadeTimer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(fadeTimer);
    }
  }, [showCountdown, countdown, onComplete]);

  const handleGotIt = () => {
    setShowCountdown(true);
  };

  if (showCountdown) {
    return (
      <div 
        className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="text-white text-9xl font-bold animate-pulse">
          {countdown > 0 ? countdown : ''}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-4 text-main_dark_turquoise">
          {t('How to Play')}
        </h2>
        
        <div className="space-y-4 mb-6">
          {/* Objective */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-blue-700 mb-2">
              {t('Objective')}
            </h3>
            <p className="text-gray-700">
              {t('Catch falling items in the correct recycling bin!')}
            </p>
          </div>

          {/* Controls */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-green-700 mb-2">
              {t('Controls')}
            </h3>
            {isMobile ? (
              <ul className="text-gray-700 space-y-2">
                <li>• {t('Touch and drag to move the bin')}</li>
                <li>• {t('Use arrow buttons to move')}</li>
                <li>• {t('Tap a bin icon to select it')}</li>
                <li>• {t('The game gets faster as you gain points, so get ready to move the bin fast by tapping quickly!')}</li>
              </ul>
            ) : (
              <ul className="text-gray-700 space-y-2">
                <li>• {t('Use ← → arrow keys or A/D to move')}</li>
                <li>• {t('Press 1, 2, 3, or 4 to select bin type')}</li>
                <li>• {t('1 is for bio, 2 is for cardboard, 3 is for glass, 4 is for metal')}</li>
                <li>• {t('The game gets faster as you gain points, so get ready to move the bin fast by tapping quickly!')}</li>
                {/* <li>• {t('Click a bin icon to select it')}</li> */}
              </ul>
            )}
          </div>

          {/* Scoring */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-yellow-700 mb-2">
              {t('Scoring')}
            </h3>
            <p className="text-gray-700">
              {t('Correct bin: +1 point')} ❤️<br />
              {t('Wrong bin or missed item: -1 heart')} 💔
            </p>
          </div>
        </div>

        <button
          onClick={handleGotIt}
          className="w-full py-3 bg-main_medium_turquoise text-white rounded-lg font-semibold hover:bg-main_dark_turquoise transition"
        >
          {t('Got it!')}
        </button>
      </div>
    </div>
  );
};

export default DropGameTutorial;
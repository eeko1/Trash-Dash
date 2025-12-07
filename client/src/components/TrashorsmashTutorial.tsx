import { useTranslation } from 'react-i18next';
import React from 'react';

interface TrashorsmashTutorialProps {
  onGotIt: () => void;
}

const TrashorsmashTutorial: React.FC<TrashorsmashTutorialProps> = ({ onGotIt }) => {
  const { t } = useTranslation();

  const handleGotIt = () => {
    onGotIt();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-4 text-main_dark_turquoise">
          {t('How to Play')}
        </h2>
        
        <div className="space-y-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
            <h3 className="font-bold text-lg text-blue-700 mb-2">
              {t('Objective')}
            </h3>
            <p className="text-gray-700">
              {t('Sort the item on the card into the correct bin: Mixedwaste or Metalwaste!')}
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
            <h3 className="font-bold text-lg text-green-700 mb-2">
              {t('Controls')}
            </h3>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>{t('Swipe Left')}: {t('Click the Mixedwaste Bin button.')}</li>
                <li>{t('Swipe Right')}: {t('Click the Metalwaste Bin button.')}</li>
              </ul>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
            <h3 className="font-bold text-lg text-yellow-700 mb-2">
              {t('Scoring')}
            </h3>
            <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>{t('Correct Answer')}: {t('+1 point is added to your score.')} <span className="text-support_medium_green">({t('Correct!')})</span></li>
                <li>{t('Wrong Answer')}: {t('You dont get or lose points.')} <span className="text-support_red">({t('Wrong!')})</span></li>
            </ul>
          </div>
        </div>

        <button
          onClick={handleGotIt}
          className="w-full py-3 bg-main_medium_turquoise text-white rounded-lg font-semibold hover:bg-main_dark_turquoise transition duration-200 ease-in-out shadow-lg"
        >
          {t('Got it! Start the Game')}
        </button>
      </div>
    </div>
  );
};

export default TrashorsmashTutorial;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayMode } from 'contexts/PlayContext';
import { useUser } from 'contexts/UserContext';
import { useTranslation } from 'react-i18next';

const PlayModeFinish: React.FC = () => {
  const navigate = useNavigate();
  const { username } = useUser();
  const { dropGameScore, trashOrSmashScore, resetPlayMode } = usePlayMode();
  const { t } = useTranslation();

  const totalScore = Math.round(dropGameScore) + trashOrSmashScore;

  const handleReturnHome = () => {
    resetPlayMode();
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-main_light_turquoise to-main_medium_turquoise p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-main_dark_turquoise mb-4">
          {t('Congratulations!')}
        </h1>
        
        <h2 className="text-2xl font-semibold mb-6">{username}</h2>
        
        <div className="space-y-4 mb-8">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600 mb-1">{t('Waste Drop Score')}</p>
            <p className="text-2xl font-bold text-support_medium_green">
              {Math.round(dropGameScore)}
            </p>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600 mb-1">{t('Trash or Smash Score')}</p>
            <p className="text-2xl font-bold text-support_medium_green">
              {trashOrSmashScore} / 10
            </p>
          </div>
          
          <div className="bg-main_medium_turquoise p-6 rounded-lg">
            <p className="text-white text-lg mb-2">{t('Total Score')}</p>
            <p className="text-4xl font-extrabold text-white">
              {totalScore}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleReturnHome}
          className="w-full py-3 bg-main_dark_turquoise text-white rounded-lg font-semibold hover:bg-main_medium_turquoise transition"
        >
          {t('Return to Main Menu')}
        </button>
      </div>
    </div>
  );
};

export default PlayModeFinish;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Mistakes from '../components/Mistakes';
import { useTranslation } from 'react-i18next';

interface MistakeData {
  missed: number;
  wrongBins: {
    Bio: number;
    Cardboard: number;
    Glass: number;
    Metal: number;
  };
}

interface DropGameEndProps {
  score: number;
  mistakeData: MistakeData;
}

const DropGameEnd: React.FC<DropGameEndProps> = ({ score, mistakeData }) => {
  const [showMistakes, setShowMistakes] = useState(false);
   const { t } = useTranslation();
  
  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-gradient-to-b from-main_light_turquoise to-main_medium_turquoise">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-2">{t('Game over!')}</h1>
        <div className="mb-8">
          <p className="text-gray-600 mb-2">{t('You made 5 mistakes')}.</p>
          <p className="text-2xl font-bold text-green-600">{t('Final Score')}: {Math.round(score)}</p>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={() => setShowMistakes(true)}
            className="bg-support_red text-white px-6 py-2 rounded-lg font-semibold hover:bg-support_dark_orange transition w-full"
          >
            {t('Show Mistakes')}
          </button>
          
          <Link to="/">
            <button className="bg-support_medium_green text-white px-6 py-2 rounded-lg font-semibold hover:bg-support_light_green transition w-full">
              {t('Return Home')}
            </button>
          </Link>
          
          <Link to="/PickTheGame">
            <button className="bg-support_dark_blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-support_light_blue transition w-full">
              {t('Play Again')}
            </button>
          </Link>
        </div>
      </div>
      
      {/* Mistakes Modal */}
      {showMistakes && (
        <Mistakes 
          mistakeData={mistakeData} 
          onClose={() => setShowMistakes(false)} 
        />
      )}
    </div>
  );
};

export default DropGameEnd;
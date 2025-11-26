import { useNavigate } from "react-router-dom";
import RecyclingInfoDialog from "./TrashorsmashMistakes";
import { useState } from "react";
import { usePlayMode } from "contexts/PlayContext";
import { useTranslation } from 'react-i18next';

interface WrongAnswerItem {
  name: string;
  image: string;
  correctType: string;
}

interface EndScreenProps {
  score: number;
  wrongAnswers: WrongAnswerItem[];
  onRestart: () => void;
}

type RecyclingType = "Metal" | "Mixed" | null;

const EndScreen = ({ score, wrongAnswers, onRestart }: EndScreenProps) => {
  const navigate = useNavigate();
  const { isPlayMode, setCurrentGame, setTrashOrSmashScore } = usePlayMode();
  const { t } = useTranslation();
  
  const [dialogContent, setDialogContent] = 
    useState<RecyclingType>(null);

  const openDialog = (type: RecyclingType) => {
    setDialogContent(type);
  };

  const closeDialog = () => {
    setDialogContent(null);
  };

  const handleFinish = () => {
    setTrashOrSmashScore(score);
    setCurrentGame('finished');
  };
  
  return (
    <div className="bg-main_medium_turquoise min-h-screen flex flex-col items-center justify-center text-white font-sans p-6">
      <div className="bg-main_dark_turquoise border border-main_black rounded-2xl shadow-2xl w-full max-w-lg p-6 text-center">
        <h1 className="text-3xl font-extrabold mb-4">{t('Game Over!')}</h1>
        <p className="text-xl font-bold mb-6">
          {t('Final Score')}: <span className="text-support_yellow">{score} / 10</span>
        </p>

        {wrongAnswers.length > 0 ? (
          <div className="space-y-3 mb-6">
            <p className="text-lg font-bold text-support_light_red">{t('Wrong Bin Selections')}</p>
            {wrongAnswers.map((item: WrongAnswerItem, i: number) => (
              <div key={i} className="flex items-center gap-3 bg-main_dark_turquoise p-3 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 object-contain rounded-md"
                />
                <div className="text-left">
                  <p className="font-bold">{t(item.name)}</p>
                  <p className="text-sm text-gray-300">
                    {t('Correct bin:')} <span className="text-support_yellow">{t(item.correctType)}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-support_medium_green font-bold text-lg mb-6">
            {t('No wrong bin selections!')}
          </p>
        )}
        
        <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => openDialog("Mixed")}
              className="bg-main_medium_turquoise text-white text-sm py-2 px-4 rounded-lg transition transform hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              {t('Recycling Mixed Waste')}
            </button>
            <button
              onClick={() => openDialog("Metal")}
              className="bg-main_medium_turquoise text-white text-sm py-2 px-4 rounded-lg transition transform hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              {t('Recycling Metal Waste')}
            </button>
        </div>

        <div className="flex flex-col items-center gap-4 mt-4">
          {isPlayMode ? (
            <button
              onClick={handleFinish}
              className="bg-support_dark_blue text-white font-bold py-2 px-6 rounded-full transition transform hover:scale-105 active:scale-95"
            >
              {t('Finish')}
            </button>
          ) : (
            <>
              <button
                onClick={onRestart}
                className="bg-support_dark_blue text-white font-bold py-2 px-6 rounded-full transition transform hover:scale-105 active:scale-95"
              >
                {t('Play again')}
              </button>

              <button
                onClick={() => navigate("/")}
                className="bg-support_red text-white font-bold py-2 px-6 rounded-full transition transform hover:scale-105 active:scale-95"
              >
                {t('Exit to Main Menu')}
              </button>
            </>
          )}
        </div>
      </div>

      {dialogContent && (
        <RecyclingInfoDialog
          title={dialogContent}
          onClose={closeDialog}
        />
      )}
    </div>
  );
};

export default EndScreen;
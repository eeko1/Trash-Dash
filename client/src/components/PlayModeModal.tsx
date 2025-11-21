import React from 'react';
import { useUser } from 'contexts/UserContext';
import { useTranslation } from 'react-i18next';

interface PlayModeModalProps {
  onClose: () => void;
  onStartPlay: () => void;
}

const PlayModeModal: React.FC<PlayModeModalProps> = ({ onClose, onStartPlay }) => {
  const { username } = useUser();
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ✕
        </button>

        {/* Content */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">{t('Welcome')}, {username}!</h2>
          <p className="text-gray-600 mt-4">
            {t('Are you ready to embark on a challenge to test your recycling skills? You will play two games in sequence. Complete both games to see your final score!')}
          </p>
        </div>

        {/* Play button */}
        <button
          onClick={onStartPlay}
          className="w-full py-3 bg-main_medium_turquoise text-white rounded-lg font-semibold hover:bg-main_light_turquoise transition"
        >
          {t('Start Game')}
        </button>
      </div>
    </div>
  );
};

export default PlayModeModal;
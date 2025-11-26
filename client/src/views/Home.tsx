import { useNavigate } from 'react-router-dom';
import { useUser } from 'contexts/UserContext';
import LanguageSelector from 'components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import PlayModeModal from 'components/PlayModeModal';
import { usePlayMode } from 'contexts/PlayContext';

const Home = () => {
  const { username, setUsername } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPlayModal, setShowPlayModal] = useState(false);
  const { setIsPlayMode, setCurrentGame, resetPlayMode } = usePlayMode();

  const handlePlayClick = () => {
    if (!username.trim()) {
      alert('Please enter a username first!');
      return;
    }
    setShowPlayModal(true);
  };

  const handleStartPlay = () => {
    resetPlayMode();
    setIsPlayMode(true);
    setCurrentGame('dropgame');
    setShowPlayModal(false);
    navigate('/PlayMode');
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='bg-white border-b border-gray-200'>
        <div className='max-w-screen-xl flex flex-wrap items-center mx-auto p-2'>
          <div className='ml-auto'>
            <LanguageSelector />
          </div>
        </div>
      </div>

      <div className='w-full h-40 sm:h-96 bg-cover bg-center flex items-center justify-center' 
      style={{ backgroundImage: "url('/assets/hsy-hero.jpg')" }}>
    <div className='text-center p-4'>
      <h1 className='text-3xl sm:text-5xl font-extrabold text-white tracking-wider drop-shadow-lg' style={{ textShadow: "4px 2px 4px rgba(0,0,0,0.15)" }}>
        Trash Dash
      </h1>
      <p className='text-lg sm:text-xl text-white mt-2 drop-shadow-lg hidden sm:block style={{ textShadow: "4px 2px 4px rgba(0,0,0,0.15)'>
        {t('hero_slogan')}
          </p>
        </div>
      </div>
      <main className='bg-main_medium_turquoise flex-grow flex flex-col items-center p-4'>
        <div className='w-full h-full rounded flex flex-col items-center'>
          <input
            type='text'
            placeholder= {t('enter_username')}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='mb-6 w-full px-4 py-2 border rounded sm:w-[45%]'
          />
          <div className='flex flex-col w-full space-y-4 sm:w-1/2'>
            <button 
              className='w-full py-3 bg-gray-800/60 text-white rounded font-sans hover:bg-gray-800/80 sm:py-4'
              onClick={handlePlayClick}
            >
              {t('play')}
            </button>
            <button className='w-full py-3 bg-gray-800/60 text-white rounded font-sans hover:bg-gray-800/80 sm:py-4'
              onClick={() => navigate('/PickTheGame')}
            >
              {t('practice')}
            </button>
             <button className='w-full py-3 bg-gray-800/60 text-white rounded font-sans hover:bg-gray-800/80 sm:py-4'
              onClick={() => navigate('/Recydle')}
            >
              {t('Daily Recydle')}
            </button>
            <button className='w-full py-3 bg-gray-800/60 text-white rounded font-sans hover:bg-gray-800/80 sm:py-4'
              onClick={() => navigate('/Leaderboard')}
            >
              {t('leaderboards')}
            </button>
            <button className='w-full py-3 bg-gray-800/60 text-white rounded font-sans hover:bg-gray-800/80 sm:py-4'
              onClick={() => navigate('/RecyclingGuide')}
            >
              {t('find')}
            </button>
          </div>
        </div>
      </main>
      <footer className='bg-main_dark_turquoise text-white text-sm p-4'>
        <div className='max-w-screen-xl mx-auto text-center'>{t('Copyright')}</div>
      </footer>

      {showPlayModal && (
        <PlayModeModal
          onClose={() => setShowPlayModal(false)}
          onStartPlay={handleStartPlay}
        />
      )}
    </div>
  );
};

export default Home;

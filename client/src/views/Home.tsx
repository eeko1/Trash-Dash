import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import LanguageSelector from '../components/LanguageSelector';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { username, setUsername } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='bg-white border-b border-gray-200'>
        <div className='max-w-screen-xl flex flex-wrap items-center mx-auto p-4'>
          <div className="ml-auto">
            <LanguageSelector />
          </div>
        </div>
      </div>

      <div className='w-full h-40 bg-gray-500 sm:h-96' />
      <main className='bg-main_medium_turquoise flex-grow flex flex-col items-center p-4'>
        <div className='w-full h-full rounded flex flex-col items-center'>
          <h2 className='text-4xl font-extrabold text-black-700 mb-4 tracking-wide'>
            Trash Dash
          </h2>
          <input
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='mb-6 w-full px-4 py-2 border rounded sm:w-[45%]'
          />
          <div className='flex flex-col w-full space-y-4 sm:w-1/2'>
            <button className='w-full py-3 bg-gray-800/60 text-white rounded font-sans hover:bg-gray-800/80 sm:py-4'>
              {t('play')}
            </button>
            <button className='w-full py-3 bg-gray-800/60 text-white rounded font-sans hover:bg-gray-800/80 sm:py-4'
              onClick={() => navigate('/PickTheGame')}
            >
              {t('practice')}
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
      <footer className="bg-main_dark_turquoise text-white text-sm p-4">
        <div className="max-w-screen-xl mx-auto text-center">&copy; 2025 HSY. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default Home;

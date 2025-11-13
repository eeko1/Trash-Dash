import { useUser } from 'contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { VscIndent } from 'react-icons/vsc';
import { useTranslation } from 'react-i18next';
import LanguageSelector from 'components/LanguageSelector';


const PickTheGame = () => {

  const navigate = useNavigate();
  const { t } = useTranslation();


  return (
    <div className='flex flex-col min-h-screen'>
      <div className='bg-white border-b border-gray-200'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <button
            className='cursor-pointer bg-transparent border-none p-0'
            onClick={() => navigate('/')}
            title='Go to Home'
          >
            <VscIndent className='rotate-180 text-5xl text-gray-800' />
          </button>
          <LanguageSelector />
        </div>
      </div>

      <div className='w-full h-40 bg-gray-500 sm:h-96' />
      <main className='bg-main_medium_turquoise flex-grow flex flex-col items-center p-2'>
        <div className='flex flex-col items-center w-full  rounded'>
          <h2 className='text-4xl font-extrabold text-black-700 font-sans mb-4 tracking-wide'>
            {t('Pick the game')}
          </h2>
          <div className='flex flex-col w-full space-y-4 sm:w-1/2'>
            <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
              <button className='w-full py-6 bg-gray-800/60 text-white font-sans rounded text-xl font-bold hover:bg-gray-800/80 sm:py-8 sm:w-1/2'
                onClick={() => navigate('/TrashOrSmash')}
              >
                Trash or Smash
              </button>
              <button className='w-full py-6 bg-gray-800/60 text-white font-sans rounded text-xl font-bold hover:bg-gray-800/80 sm:py-8 sm:w-1/2'
                onClick={() => navigate('/DropGame')}
              >
                Waste Drop
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer className='bg-main_dark_turquoise text-white text-sm p-4'>
        <div className='max-w-screen-xl mx-auto text-center'>&copy; 2025 HSY. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default PickTheGame;

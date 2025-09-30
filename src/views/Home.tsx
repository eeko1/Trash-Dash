import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Home = () => {
  const { username, setUsername } = useUser();
  const navigate = useNavigate();

  return (
    <div className='flex flex-col min-h-screen px-2 sm:px-0'>
      <div className='mb-6 w-full h-40 bg-gray-500 sm:h-96' />
      <div className='w-full h-full rounded flex flex-col items-center'>
        <h2 className='text-4xl font-extrabold text-black-700 mb-4 tracking-wide'>
          Wastes Dash
        </h2>
        <input
          type='text'
          placeholder='Enter username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='mb-6 w-full px-4 py-2 border rounded sm:w-[45%]'
        />
        <div className='flex flex-col w-full space-y-4 sm:w-1/2'>
          <button className='w-full py-3 bg-main_dark_turquise text-white font-sans sm:py-4'>
            Play
          </button>
          <button className='w-full py-3 bg-main_dark_turquise text-white font-sans sm:py-4'
            onClick={() => navigate('/PickTheGame')}
          >
            Practice
          </button>
          <button className='w-full py-3 bg-main_dark_turquise text-white font-sans sm:py-4'
            onClick={() => navigate('/Leaderboard')}
          >
            Leaderboards
          </button>
          <button className='w-full py-3 bg-main_dark_turquise text-white font-sans sm:py-4'
            onClick={() => navigate('/RecyclingGuide')}
          >
            Find where to sort
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

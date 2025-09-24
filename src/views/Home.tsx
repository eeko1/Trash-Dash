import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Home = () => {
  const {username, setUsername} = useUser();
    const navigate = useNavigate();

  return (
    <div className='flex flex-col justify-center min-h-screen bg-gray-100'>
      <div className='w-full h-full rounded flex flex-col items-center'>
        <div className='mb-6 w-full h-96 bg-gray-500 rounded' />
        <h2 className='text-4xl font-extrabold text-black-700 mb-4 drop-shadow-lg tracking-wide'>
          Wastes Dash
        </h2>
        <input
          type='text'
          placeholder='Enter username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='mb-6 w-[45%] px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
        />
        <div className='w-1/2 flex flex-col space-y-4'>
          <button className='w-full py-2 bg-teal-600 text-white rounded'
           onClick={() => navigate('/PickTheGame')}
          >
            Play
          </button>
          <button className='w-full py-2 bg-teal-600 text-white rounded'>
            Practice
          </button>
          <button className='w-full py-2 bg-teal-600 text-white rounded'
          onClick={() => navigate('/Leaderboard')}
          >
            Leaderboards
          </button>
          <button className='w-full py-2 bg-teal-600 text-white rounded'
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

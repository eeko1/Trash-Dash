import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { VscIndent } from 'react-icons/vsc';


const PickTheGame = () => {

  const navigate = useNavigate();


  return (
    <div className='flex flex-col min-h-screen space-y-4 px-2 sm:px-0'>
      <div
        className='cursor-pointer ml-8 mt-4 w-fit'
        onClick={() => navigate('/')}
        title='Go to Home'
      >
        <VscIndent className='rotate-180 text-5xl' />
      </div>
      <div className='mb-6 w-full h-40 bg-gray-500 sm:h-96' />
      <div className='flex flex-col items-center w-full  rounded'>
        <h2 className='text-4xl font-extrabold text-black-700 font-sans mb-4 tracking-wide'>
          Pick the game
        </h2>
        <div className='flex flex-col w-full space-y-4 sm:w-1/2'>
          <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
            <button className='w-full py-6 bg-teal-600 text-white font-sans rounded text-xl font-bold sm:py-8 sm:w-1/2'>
              Trash or Pass
            </button>
            <button className='w-full py-6 bg-teal-600 text-white font-sans rounded text-xl font-bold sm:py-8 sm:w-1/2'>
              Waste Drop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickTheGame;

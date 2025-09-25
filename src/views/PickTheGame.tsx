import { useUser } from '../contexts/UserContext';
import { useNavigate } from "react-router-dom";
import { VscIndent } from "react-icons/vsc";


const PickTheGame = () => {

  const navigate = useNavigate();


  return (
    <div className='flex flex-col justify-center min-h-screen bg-gray-100'>
      <div
        className="cursor-pointer ml-8 mt-4 w-fit"
        onClick={() => navigate('/')}
        title="Go to Home"
      >
        <VscIndent className="rotate-180 text-5xl" />
      </div>
      <div className='w-full h-full rounded flex flex-col items-center'>
        <div className='mb-6 w-full h-96 bg-gray-500 rounded' />
        <h2 className='text-4xl font-extrabold text-black-700 mb-4 drop-shadow-lg tracking-wide'>
          Pick the game
        </h2>
        <div className='w-1/2 flex flex-col space-y-4'>
          <div className='flex flex-row space-x-4'>
            <button className='w-1/2 py-8 bg-teal-600 text-white rounded shadow-lg text-xl font-bold'>
              Trash or Pass
            </button>
            <button className='w-1/2 py-8 bg-teal-600 text-white rounded shadow-lg text-xl font-bold'>
              Waste Drop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickTheGame;

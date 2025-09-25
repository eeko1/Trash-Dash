import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VscIndent } from "react-icons/vsc";

const leaderboardMock = [
    {
        ranking: 1,
        name: 'testi',
        points: 1337,
    },
    {
        ranking: 2,
        name: 'testi',
        points: 901,
    },
    {
        ranking: 3,
        name: 'testi',
        points: 690,
    },
    {
        ranking: 4,
        name: 'testi',
        points: 400,
    },
    {
        ranking: 5,
        name: 'testi',
        points: 10,
    },

];

type leadersboard = {
    ranking: number,
    name: string,
    points: number
}


const Leaderboards = () => {
    const [leaderboards, setLeaderboars] = useState<leadersboard[]>([]);

    useEffect(() => {
        setLeaderboars(leaderboardMock);
    }, []);

    const navigate = useNavigate();


    return (
        <div className='flex flex-col justify-center min-h-screen space-y-4'>
            <div
                className="cursor-pointer ml-8 mt-4 w-fit"
                onClick={() => navigate('/')}
                title="Go to Home"
            >
                <VscIndent className="rotate-180 text-5xl" />
            </div>
            <div className='mb-6 w-full h-96 bg-gray-500 rounded' />
            <h2 className='text-4xl font-extrabold text-black-700 mb-4 drop-shadow-lg tracking-wide text-center'>Leaderboars</h2>
            <div className='flex items-center justify-center'>
                <div className='py-1 text-l w-[40%]'>
                    <div className='flex justify-between w-full'>
                        <div className='font-bold'>ranking</div>
                        <div>Username</div>
                        <div className='text-teal-700'>Points</div>
                    </div>
                </div>
            </div>
            {leaderboards.map((item) => (
                <div key={item.ranking}>
                    <div className='flex items-center justify-center'>
                        <div className='px-6 py-5 border rounded text-l w-[40%]'>
                            <div className='flex justify-between w-full'>
                                <div className='font-bold'>#{item.ranking}</div>
                                <div>{item.name}</div>
                                <div className='text-teal-700'>{item.points} pts</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Leaderboards

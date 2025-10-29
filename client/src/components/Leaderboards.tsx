import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VscIndent } from 'react-icons/vsc';
import { useTranslation } from 'react-i18next';
import { fetchData } from '../lib/utils';
import LanguageSelector from '../components/LanguageSelector';
import { useUser } from '../contexts/UserContext';



type leadersboard = {
    ranking: number,
    name: string,
    points: number
}


const Leaderboards = () => {
    const { username } = useUser()
    const [leaderboards, setLeaderboars] = useState<leadersboard[]>([]);
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const baseUrl = process.env.REACT_APP_SERVER;
        const getLeaderboards = async () => {
            try {
                const data = await fetchData<leadersboard[]>(`${baseUrl}/leaderboards`);
                setLeaderboars(data);
            } catch (err) {
                console.error(err);
            }
        };
        getLeaderboards();
    }, []);

    const currentPlayer = leaderboards.find(placement => placement.name === username);
    const rankCheck = currentPlayer && currentPlayer.ranking <= 5;
    console.log(rankCheck)



    return (
        <div className='flex flex-col min-h-screen'>
            <div className='bg-white border-b border-gray-200'>
                <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
                    <div className='cursor-pointer' onClick={() => navigate('/')} title='Go to Home'>
                        <VscIndent className='rotate-180 text-5xl text-gray-800' />
                    </div>
                    <LanguageSelector />
                </div>
            </div>

            <div className='w-full h-40 bg-gray-500 sm:h-96' />
            <main className='bg-main_medium_turquoise flex-grow flex flex-col p-4'>
                <h2 className='text-4xl font-extrabold text-black-700 font-sans mb-4 tracking-wide text-center'>{t('leaderboards')}</h2>
                <div className='flex items-center justify-center'>
                    <div className='py-1 text-l w-full sm:w-[40%]'>
                        <div className='flex justify-between w-full'>
                            <div className='font-bold font-sans'>{t('Ranking')}</div>
                            <div className='font-bold font-sans'>{t('Username')}</div>
                            <div className='font-bold font-sans'>{t('Points')}</div>
                        </div>
                    </div>
                </div>
                <div className='h-80 overflow-y-auto space-y-4 sm:h-96'>
                    {leaderboards
                        .filter(player => player.name !== username)
                        .map((player) => (
                            <div key={player.ranking}>
                                <div className='flex flex-col items-center justify-center'>
                                    <div className='px-6 py-5 border rounded text-l w-full bg-gray-800/60 sm:py-5 sm:w-[40%]'>
                                        <div className='flex justify-between w-full'>
                                            <div className='font-bold text-white font-sans'>#{player.ranking}</div>
                                            <div className='text-white font-sans'>{player.name}</div>
                                            <div className='text-white font-sans'>{player.points} pts</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                {currentPlayer && (
                    <div className={`sticky ${rankCheck ? 'top-0' : 'bottom-0'} mt-1`}>
                        <div className='flex flex-col items-center justify-center'>
                            <div className='px-6 py-5 border rounded text-l w-full bg-gray-800/60 sm:py-5 sm:w-[40%]'>
                                <div className='flex justify-between w-full'>
                                    <div className='font-bold text-white font-sans'>#{currentPlayer.ranking}</div>
                                    <div className='text-white font-sans'>{currentPlayer.name}</div>
                                    <div className='text-white font-sans'>{currentPlayer.points} pts</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main >
        </div >
    )
}

export default Leaderboards

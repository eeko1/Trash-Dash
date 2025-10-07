import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VscIndent } from 'react-icons/vsc';
import { useTranslation } from 'react-i18next';
import { fetchData } from '../lib/utils';


type leadersboard = {
    ranking: number,
    name: string,
    points: number
}


const Leaderboards = () => {
    const [leaderboards, setLeaderboars] = useState<leadersboard[]>([]);
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const baseUrl = process.env.REACT_APP_SERVER;
        const getLeaderboards = async () => {
            try {
                const data = await fetchData<leadersboard[]>(`${baseUrl}/leaderboards`);
                console.log(data)
                setLeaderboars(data);
            } catch (err) {
                console.error(err);
            }
        };
        getLeaderboards();
    }, []);



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
                {leaderboards.map((item) => (
                    <div key={item.ranking}>
                        <div className='flex flex-col items-center justify-center'>
                            <div className='px-6 py-5 border rounded text-l w-full sm:py-5 sm:w-[40%]'>
                                <div className='flex justify-between w-full'>
                                    <div className='font-bold font-sans'>#{item.ranking}</div>
                                    <div>{item.name}</div>
                                    <div className='text-teal-700 font-sans'>{item.points} pts</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Leaderboards

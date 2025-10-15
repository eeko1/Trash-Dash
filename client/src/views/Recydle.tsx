import { useEffect, useState } from 'react'
import { wastetypes } from '../types/apiTypes';
import { fetchData } from '../lib/utils';
import { useTranslation } from 'react-i18next';
import RecydleGame from '../components/recydle/RecydleGame';

const Trashle = () => {

    const [solution, setSolution] = useState<wastetypes>();
    const { i18n } = useTranslation();
    const lang = i18n.language;

    useEffect(() => {
        const baseUrl = process.env.REACT_APP_SERVER;
        const getWastetype = async () => {
            console.log('hello')
            const today = new Date().toISOString().split('T')[0];
            const key = `daily-solution-${lang}`;
            const stored = localStorage.getItem(key);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed.date === today) {
                    setSolution(parsed.solution); 
                    return;
                }
            }
            try {
                const data = await fetchData<{ hits: wastetypes[] }>(
                    `${baseUrl}/wastetypes?lang=${lang}`
                );
                const randomSolution = data.hits[Math.floor(Math.random() * data.hits.length)];
                setSolution(randomSolution);

                localStorage.setItem(
                    key,
                    JSON.stringify({ date: today, solution: randomSolution })
                );
            } catch (err) {
                console.error(err);
            }
        };

        getWastetype();
    }, [lang]);

    return (
        <div className='flex flex-col'>
            {solution && <RecydleGame solution={solution.title} wordLength={solution.title.length} />}
        </div>
    )
}

export default Trashle

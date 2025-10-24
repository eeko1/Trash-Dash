import { useEffect, useState } from 'react'
import { recyclingmethod, wastetypes } from '../types/apiTypes';
import { fetchData } from '../lib/utils';
import { useTranslation } from 'react-i18next';
import RecydleGame from '../components/recydle/RecydleGame';

const Trashle = () => {
    const [solution, setSolution] = useState<string | undefined>();
    const { i18n } = useTranslation();
    const lang = i18n.language;

    useEffect(() => {
        const baseUrl = process.env.REACT_APP_SERVER;
        const getWastetype = async () => {
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
                 const [wasteType, recyclingMethods] = await Promise.all([
                    fetchData<{ hits: wastetypes[] }>(
                        `${baseUrl}/wastetypes?lang=${lang}`),
                        fetchData<{ hits: recyclingmethod[] }>(
                            `${baseUrl}/recyclingmethods?lang=${lang}`)
                        ]);
      
                const combineData = [...wasteType.hits, ...recyclingMethods.hits]
                const filteredSolution = combineData.filter(item => {
                    const solution = item.title;
                    return solution && solution.length < 7;
                })

                const randomSolution = filteredSolution[Math.floor(Math.random() * filteredSolution.length)]; 
                /* const data = await fetchData<{ hits: wastetypes[] }>(`${baseUrl}/wastetypes?lang=${lang}`);
                console.log(data)
                const randomSolution = data.hits[Math.flo or(Math.random() * data.hits.length)]*/
                setSolution(randomSolution.title)
                localStorage.setItem(
                    key,
                    JSON.stringify({ date: today, solution: randomSolution.title })
                );
            } catch (err) {
                console.error(err);
            }
        };

        getWastetype();
    }, [lang]);

    return (
        <div className='flex flex-col h-full bg-main_medium_turquoise'>
            {solution && <RecydleGame solution={solution} wordLength={solution.length} />}
        </div>
    )
}

export default Trashle

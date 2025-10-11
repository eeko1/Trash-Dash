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
            try {
                const data = await fetchData<{ hits: wastetypes[] }>(`${baseUrl}/wastetypes?lang=${lang}`);
                const randomSolution = data.hits[Math.floor(Math.random() * data.hits.length)]
                setSolution(randomSolution)
            } catch (err) {
                console.error(err);
            }
        };
        getWastetype();
    }, [lang]);

    console.log(solution?.title)

    return (
        <div>
            {solution && <RecydleGame solution={solution.title} />}
        </div>
    )
}

export default Trashle

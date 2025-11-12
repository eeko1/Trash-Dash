import { useEffect, useState } from 'react'
import { recyclingmethod, wastetypes } from 'types/apiTypes';
import { fetchData } from 'lib/utils';
import { useTranslation } from 'react-i18next';
import RecydleGame from 'components/recydle/RecydleGame';
import RecydleGuide from 'components/recydle/RecydleGuide';

const Trashle = () => {
    const [solution, setSolution] = useState<string | undefined>();
    const [showGuide, setShowGuide] = useState(true);
    const { t,i18n } = useTranslation();
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
    <div className="flex flex-col h-full bg-main_medium_turquoise">
      {showGuide ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-4 max-w-md w-full">
            <RecydleGuide />
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setShowGuide(false)}
            >
            {t(`Let's Play!`)}
            </button>
          </div>
        </div>
      ) : (
        solution && <RecydleGame solution={solution} wordLength={solution.length} />
      )}
    </div>
  );
};

export default Trashle

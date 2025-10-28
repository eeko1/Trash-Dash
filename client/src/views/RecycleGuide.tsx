import React, { useEffect, useState } from 'react';
import { fetchData } from '../lib/utils';
import SpecificWaste from '../components/SpecificWaste';
import { wastpage } from '../types/apiTypes'
import { useNavigate } from 'react-router-dom';
import { VscIndent } from 'react-icons/vsc';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';



/* const mockWastePages: wastpage[] = [
    {
        id: 1,
        title: 'Plastic Bottle',
        synonyms: ['PET Bottle', 'Water Bottle'],
        notes: 'Rinse before recycling.',
        additionalInfo: 'Accepted in most curbside programs.',
        wasteTypes: [],
        recyclingMethods: [
            {
                id: 101,
                title: 'Curbside Recycling',
                description: 'Place in the recycling bin after rinsing.',
                infoPageUrl: 'https://example.com/plastic-recycling',
                isFree: true
            },
            {
                id: 102,
                title: 'Curbside Recycling',
                description: 'Place in the recycling bin after rinsing.',
                infoPageUrl: 'https://example.com/plastic-recycling',
                isFree: true
            }
        ]
    },
    {
        id: 2,
        title: 'Class Bottle',
        synonyms: ['PET Bottle', 'Water Bottle'],
        notes: 'Rinse before recycling.',
        additionalInfo: 'Accepted in most curbside programs.',
        wasteTypes: [],
        recyclingMethods: [
            {
                id: 101,
                title: 'Curbside Recycling',
                description: 'Place in the recycling bin after rinsing.',
                infoPageUrl: 'https://example.com/plastic-recycling',
                isFree: true
            },
            {
                id: 102,
                title: 'Curbside Recycling',
                description: 'Place in the recycling bin after rinsing.',
                infoPageUrl: 'https://example.com/plastic-recycling',
                isFree: true
            }
        ]
    },

]; */

const WasteTypesList = () => {
    const [wasteTypes, setWastePages] = useState<wastpage[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const { i18n } = useTranslation();
    const lang = i18n.language;


    useEffect(() => {
        const baseUrl = process.env.REACT_APP_SERVER;
        const getWastePages = async () => {
            try {
                const data = await fetchData<{ hits: wastpage[] }>(`${baseUrl}/wastepages?lang=${lang}&page=${page}`);
                console.log(data.hits.length)
                if (data.hits.length === 0){
                    setIsLastPage(true)
                    if (page > 1) setPage((p) => p - 1);
                    return;
                }
                setWastePages(data.hits);
                setIsLastPage(false)
                setSelectedId(null);
            } catch (err) {
                console.error(err);
            }
        };
        getWastePages();
    }, [lang, page]);

    /* 
        useEffect(() => {
            const baseUrl = process.env.REACT_APP_SERVER || '';
            fetchData<{ hits: wastpage[] }>(`${baseUrl}/wastepages?lang=${lang}&page=${page}`)
                .then(data => {
                    console.log('Fetched wastePages:', data);
                    setWastePages(data.hits);
                    setSelectedId(null); 
                })
                .catch(err => setError(err.message));
        }, [lang, page]); */



    /*  useEffect(() => {
         setWastePages(mockWastePages);
     }, []); */


    const navigate = useNavigate();

    if (error) return <div className='text-red-600'>{error}</div>;

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

            <main className='bg-main_medium_turquoise flex-grow flex flex-col items-center p-4'>
                <div className='mb-6 w-full h-40 bg-gray-500 sm:h-96' />
                <div className='flex flex-col items-center'>
                    <div className='flex space-x-2 mb-4'>
                        <button
                            className='px-4 py-2 bg-gray-800/60 text-white rounded hover:bg-gray-800/80 disabled:opacity-50'
                            onClick={() => setPage(page => Math.max(page - 1, 1))}
                            disabled={page === 1}
                        >
                            Prev
                        </button>
                        <span className='px-4 py-2'>{page}</span>
                        <button
                            className='px-4 py-2 bg-gray-800/60 text-white rounded hover:bg-gray-800/80'
                            onClick={() => setPage(page => page + 1)}
                            disabled={isLastPage}
                        >
                            Next
                        </button>
                    </div>
                    <div className='grid grid-cols-2 gap-4 w-full max-w-xl mx-auto overflow-auto h-80 sm:grid-cols-2 sm:h-96'>
                        {wasteTypes.map(waste => (
                            <button
                                key={waste.id}
                                className='py-6 bg-gray-800/60 text-white rounded-xl border-2 border-teal-600 shadow-lg text-xl font-bold transition hover:bg-gray-800/80 sm:py-8'
                                onClick={() => setSelectedId(waste.id)}
                            >
                                {waste.title}
                            </button>
                        ))}
                    </div>
                </div>
                {selectedId !== null && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                        <div className='bg-white p-6 rounded-lg relative w-full max-h-[80vh] overflow-y-auto sm:p-8 sm:w-1/2'>
                            <button
                                className='absolute top-2 right-2 text-black-500 w-8 h-8 p-0 border rounded-md bg-red-600 items-center justify-center sm:w-10 sm:h-10'
                                onClick={() => setSelectedId(null)}
                            >
                                &times;
                            </button>
                            <SpecificWaste id={selectedId} />
                        </div>
                    </div>
                )}
            </main>
            <footer className='bg-main_dark_turquoise text-white text-sm p-4'>
                <div className='max-w-screen-xl mx-auto text-center'>&copy; 2025 HSY. All rights reserved.</div>
            </footer>
        </div>
    );
};

export default WasteTypesList;
import React, { useEffect, useState } from 'react';
import { fetchData } from '../lib/utils';
import SpecificWaste from '../componets/SpecificWaste';
import { wastpage } from '../types/apiTypes'
import { useNavigate } from 'react-router-dom';
import { VscIndent } from 'react-icons/vsc';

const mockWastePages: wastpage[] = [
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
        id: 1,
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

];

const WasteTypesList = () => {
    const [wasteTypes, setWastePages] = useState<wastpage[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);


    /*    useEffect(() => {
            const baseUrl = process.env.REACT_APP_SERVER || '';
            fetchData<{ hits: wastpage[] }>(`${baseUrl}/wastepages`)
                .then(data => {
                    console.log('Fetched wastePages:', data);
                    setWastePages(data.hits);
                })
                .catch(err => setError(err.message));
        }, []); */



    useEffect(() => {
        setWastePages(mockWastePages);
    }, []);


    const navigate = useNavigate();

    if (error) return <div className='text-red-600'>{error}</div>;

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
            <div className='flex items-center justify-center h-full rounded-xl p-4 sm:p-8'>
                <div className='grid grid-cols-2 gap-4 w-full max-w-xl mx-auto overflow-auto h-80 sm:grid-cols-2 sm:h-96'>
                    {wasteTypes.map(waste => (
                        <button
                            key={waste.id}
                            className='py-6 bg-teal-700 text-white rounded-xl border-2 border-teal-600 shadow-lg text-xl font-bold transition sm:py-8'
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
        </div>
    );
};

export default WasteTypesList;
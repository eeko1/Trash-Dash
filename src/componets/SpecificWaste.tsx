import React, { useEffect, useState } from 'react';
import { wastpage, recyclingmethod } from '../types/apiTypes';
import { fetchData } from '../lib/utils';

type SpecificWasteProps = {
    id: number;
};


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
    }
]; 

const SpecificWaste = ({ id }: SpecificWasteProps) => {
    const [wastePage, setWastePage] = useState<wastpage[]>([]);
    const [error, setError] = useState<string | null>(null);



/*    useEffect(() => {
        const baseUrl = process.env.REACT_APP_SERVER || '';
        fetchData<{ hits: wastpage[] }>(`${baseUrl}/wastepages`)
            .then(data => {
                setWastePage(data.hits);
            })
            .catch(err => setError(err.message));
    }, []);  */

    useEffect(() => {
        setWastePage(mockWastePages);
    }, []); 


    if (error) return <div className='text-red-600'>{error}</div>;

    return (
        <>
            {wastePage.filter(item => item.id === id).map((item) => (
                <div key={item.id} className='p-4 rounded'>
                    <h2 className='text-2xl font-bold font-sans mb-2'>{item.title}</h2>
                    <p className='mb-2 text-gray-700 font-sans'><strong>Additional Info:</strong> {item.additionalInfo}</p>
                    {item.synonyms && item.synonyms.length > 0 && (
                        <p className='mb-2 text-gray-700 font-sans'><strong>Synonyms:</strong> {item.synonyms.join(', ')}</p>
                    )}
                    {item.recyclingMethods && item.recyclingMethods.length > 0 && (
                        <>
                            <h3 className='text-xl font-semibold mb-2 font-sans'>Recycling Methods:</h3>
                            <div className='space-y-4'>
                                {item.recyclingMethods.map((method: recyclingmethod) => (
                                    <div key={method.id} className='border rounded p-2'>
                                        <div className='font-bold font-sans text-lg'>{method.title}</div>
                                        <div className='font-sans'>{method.description}</div>
                                        {method.infoPageUrl && (
                                            <a href={method.infoPageUrl} target='_blank' rel='noopener noreferrer'>
                                                More Info
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            ))}
        </>
    );
};

export default SpecificWaste;

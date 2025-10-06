import React, { useEffect, useState } from 'react';
import { wastpage, recyclingmethod } from '../types/apiTypes';
import { fetchData } from '../lib/utils';
import { useTranslation } from 'react-i18next';


type SpecificWasteProps = {
    id: number;
};


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
    }
];
 */
const SpecificWaste = ({ id }: SpecificWasteProps) => {
    const [wastePage, setWastePage] = useState<wastpage>();
    const [error, setError] = useState<string | null>(null);
    const { i18n, t } = useTranslation();
    const lang = i18n.language;


      useEffect(() => {
           const baseUrl = process.env.REACT_APP_SERVER || '';
           fetchData<wastpage>(`${baseUrl}/wastepages/${id}?lang=${lang}`)
                  .then(data => setWastePage(data))
        .catch(err => setError(err.message));
       }, [lang, id]); 

 /*    useEffect(() => {
        setWastePage(mockWastePages);
    }, []); */


    if (error) return <div className='text-red-600'>{error}</div>;
    if (!wastePage) return null;

    return (
        <div key={wastePage.id} className='p-4 rounded'>
            <h2 className='text-2xl font-bold font-sans mb-2'>{wastePage.title}</h2>
            <p className='mb-2 text-black-700 font-sans'><strong>Additional Info:</strong> {wastePage.additionalInfo}</p>
            {wastePage.synonyms && wastePage.synonyms.length > 0 && (
                <p className='mb-2 text-black-700 font-sans'><strong>Synonyms:</strong> {wastePage.synonyms.join(', ')}</p>
            )}
            {wastePage.recyclingMethods && wastePage.recyclingMethods.length > 0 && (
                <>
                    <h3 className='text-xl font-semibold mb-2 font-sans'>Recycling Methods:</h3>
                    <div className='space-y-4'>
                        {wastePage.recyclingMethods.map((method: recyclingmethod) => (
                            <div key={method.id} className='border rounded p-2'>
                                <div className='font-bold font-sans text-lg'>{method.title}</div>
                                <div className='font-sans'>{method.description}</div>
                                {method.infoPageUrl && (
                                    <a href={method.infoPageUrl} target='_blank' rel='noopener noreferrer'>
                                    {t('More Info')}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default SpecificWaste;

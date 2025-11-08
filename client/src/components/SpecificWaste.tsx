import React, { useEffect, useState } from 'react';
import { wastpage, recyclingmethod } from '../types/apiTypes';
import { fetchData } from '../lib/utils';
import { useTranslation } from 'react-i18next';


type SpecificWasteProps = {
    id: number;
};

const SpecificWaste = ({ id }: SpecificWasteProps) => {
    const [wastePage, setWastePage] = useState<wastpage>();
    const [error, setError] = useState<string | null>(null);
    const { i18n, t } = useTranslation();
    const lang = i18n.language;

    useEffect(() => {
        const baseUrl = process.env.REACT_APP_SERVER;
        const getSpecificWaste = async () => {
            try {
                const data = await fetchData<wastpage>(`${baseUrl}/wastepages/${id}?lang=${lang}`);
                setWastePage(data);
                setError(null)
            } catch (err) {
                if (err instanceof Error) setError(err.message);
                else setError("Failed to load waste page.");
            }
        };
        getSpecificWaste();
    }, [lang, id]);

    if (error) return <div className='text-red-600'>{error}</div>;
    if (!wastePage) return null;

    return (
        <div key={wastePage.id} className='p-4 rounded'>
            <h2 className='text-2xl font-bold font-sans mb-2'>{wastePage.title}</h2>
            <p className='mb-2 text-black-700 font-sans'><strong>{t('additional info')}:</strong> {wastePage.additionalInfo}</p>
            {wastePage.synonyms && wastePage.synonyms.length > 0 && (
                <p className='mb-2 text-black-700 font-sans'><strong>{t('synonyms')}:</strong> {wastePage.synonyms.join(', ')}</p>
            )}
            {wastePage.recyclingMethods && wastePage.recyclingMethods.length > 0 && (
                <>
                    <h3 className='text-xl font-bold mb-2 font-sans'>{t('recycling methods')}:</h3>
                    <div className='space-y-4'>
                        {wastePage.recyclingMethods.map((method: recyclingmethod) => (
                            <div key={method.id} className='border rounded p-2'>
                                <div className='font-bold font-sans text-lg'>{method.title}</div>
                                <div className='font-sans'>{method.description}</div>
                                {method.infoPageUrl && (
                                    <a href={method.infoPageUrl} target='_blank' rel='noopener noreferrer'>
                                        {t('more info')}
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

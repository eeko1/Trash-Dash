import React, { useEffect, useState } from 'react';
import { wastpage, recyclingmethod } from '../types/apiTypes';
import { fetchData } from '../lib/utils';

type SpecificWasteProps = {
    id: number;
};

const SpecificWaste = ({ id }: SpecificWasteProps) => {
    const [wastePage, setWastePage] = useState<wastpage[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const baseUrl = process.env.REACT_APP_SERVER || '';
        fetchData<{ hits: wastpage[] }>(`${baseUrl}/wastepages`)
            .then(data => {
                setWastePage(data.hits);
            })
            .catch(err => setError(err.message));
    }, []);

    if (error) return <div className="text-red-600">{error}</div>;

    return (
        <>
            {wastePage.filter(item => item.id === id).map((item) => (
                <div key={item.id} className="p-4 border rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                    <p className="mb-2 text-gray-700"><strong>Additional Info:</strong> {item.additionalInfo}</p>
                    {item.synonyms && item.synonyms.length > 0 && (
                        <p className="mb-2 text-gray-700"><strong>Synonyms:</strong> {item.synonyms.join(', ')}</p>
                    )}
                    {item.recyclingMethods && item.recyclingMethods.length > 0 && (
                        <>
                            <h3 className="text-xl font-semibold mb-2">Recycling Methods:</h3>
                            <ul className="list-disc list-inside">
                                {item.recyclingMethods.map((method: recyclingmethod) => (
                                    <li key={method.id}>
                                        <strong>{method.title}:</strong> {method.description}
                                        {method.infoPageUrl && (
                                            <a href={method.infoPageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline ml-2">
                                                More Info
                                            </a>
                                        )}
                                    </li>
                                ))}
                                
                            </ul>
                        </>
                    )}
                </div>
            ))}
        </>
    );
};

export default SpecificWaste;

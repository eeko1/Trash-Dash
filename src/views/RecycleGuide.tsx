import React, { useEffect, useState } from 'react';
import { fetchData } from '../lib/utils';
import SpecificWaste from '../componets/SpecificWaste';
import { wastpage } from '../types/apiTypes'


const WasteTypesList = () => {
    const [wasteTypes, setWastePages] = useState<wastpage[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);



    useEffect(() => {
        const baseUrl = process.env.REACT_APP_SERVER || '';
        fetchData<{ hits: wastpage[] }>(`${baseUrl}/wastepages`)
            .then(data => {
                console.log('Fetched wastePages:', data);
                setWastePages(data.hits);
            })
            .catch(err => setError(err.message));
    }, []);

    if (error) return <div className="text-red-600">{error}</div>;

    return (
        <div className="grid grid-cols-2 gap-4 w-full max-w-xl mx-auto">
            {wasteTypes.map(waste => (
                <button
                    key={waste.id}
                    className="py-8 bg-white text-teal-700 rounded-xl border-2 border-teal-600 shadow-lg text-xl font-bold hover:bg-teal-50 transition"
                    onClick={() => setSelectedId(waste.id)}
                >
                    {waste.title}
                </button>
            ))}
            {selectedId !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500"
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
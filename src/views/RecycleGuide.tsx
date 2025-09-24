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
        <div className="flex items-center justify-center min-h-screen">
            <div className="rounded-xl p-8 flex items-center justify-center h-full">
                <div className="grid grid-cols-2 gap-4 w-full max-w-xl mx-auto overflow-auto h-96">
                    {wasteTypes.map(waste => (
                        <button
                            key={waste.id}
                            className="py-8 bg-teal-700 text-white rounded-xl border-2 border-teal-600 shadow-lg text-xl font-bold transition"
                            onClick={() => setSelectedId(waste.id)}
                        >
                            {waste.title}
                        </button>
                    ))}
                </div>
            </div>
            {selectedId !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg relative w-1/2 max-h-3/4 overflow-y-auto">
                        <button
                            className="absolute top-2 right-2 text-black-500 w-10 h-10 p-0 border rounded-md bg-red-600 items-center justify-center"
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
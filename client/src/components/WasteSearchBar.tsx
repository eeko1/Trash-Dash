import React, { useState } from 'react'
import { wastpage } from '../types/apiTypes';
import { fetchData } from '../lib/utils';
import { useTranslation } from 'react-i18next';

const WasteSearchBar = () => {
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState<wastpage[]>([]);
    const { i18n } = useTranslation();
    const lang = i18n.language;

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!search.trim()) return;
        const baseUrl = process.env.REACT_APP_SERVER;
        const searchParams = new URLSearchParams();
        searchParams.append('lang', lang);
        if (type) searchParams.append('wasteType', type);
        if (method) searchParams.append('recyclingMethod', method);
        try {
            const url = `${baseUrl}/wastepages/search/${searchParams.toString()}`;
            const res = await fetchData<{ hits: wastpage[] }>(url);
            setSearchResult(res.hits);
        } catch (err) {
            console.error('Error fetching search results:', err);
        }
    };



    return (
        <div className="flex items-center justify-center h-12 w-full mx-auto p-2">
            <form onSubmit={handleSearch} className="flex items-center justify-center h-12 w-full max-w-md mx-auto">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for..."
                    className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
                <button
                    type="submit"
                    className="bg-teal-600 text-white px-4 rounded-r-lg hover:bg-teal-700 transition"
                >
                    Search
                </button>
            </form>
        </div>
    )
}

export default WasteSearchBar

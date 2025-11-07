import React, { useEffect, useState } from 'react'
import { recyclingmethod, WasteSearchBarProps, wastetypes, wastpage } from '../types/apiTypes';
import { fetchData } from '../lib/utils';
import { useTranslation } from 'react-i18next';

const WasteSearchBar = ({ onSearch }: WasteSearchBarProps) => {
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState<wastpage[]>([]);
    const [methods, setMethods] = useState<recyclingmethod[]>([]);
    const [selectedMethod, setSelectedMethod] = useState<string>('');
    const [types, setTypes] = useState<wastetypes[]>([]);
    const [selectedType, setSelectedType] = useState<string>('');
    const { i18n } = useTranslation();
    const lang = i18n.language;

    useEffect(() => {
        const fetchOptionals = async () => {
            const typeData = await fetchData<{ hits: wastetypes[] }>(
                `${process.env.REACT_APP_SERVER}/wastetypes?lang=${lang}`
            );
            const methodData = await fetchData<{ hits: recyclingmethod[] }>(
                `${process.env.REACT_APP_SERVER}/recyclingmethods?lang=${lang}`
            );
            setTypes(typeData.hits);
            setMethods(methodData.hits);
        };
        fetchOptionals();
    }, [lang]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!search.trim()) return;
        const baseUrl = process.env.REACT_APP_SERVER;
        const searchParams = new URLSearchParams();
        searchParams.append('lang', lang);
        if (selectedType) searchParams.append('wasteType', selectedType);
        if (selectedMethod) searchParams.append('recyclingMethod', selectedMethod);
        try {
            const url = `${baseUrl}/wastepages/search/${search}?${searchParams.toString()}`;
            const res = await fetchData<{ hits: wastpage[] }>(url);
            setSearchResult(res.hits);
            if (onSearch) {
                onSearch(res.hits);
            }
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
                <select
                    value={selectedMethod}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                >
                    <option value="">-- Select a type --</option>
                    {methods.map((method) => (
                        <option key={method.id} value={method.id}>
                            {method.title}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    <option value="">-- Select a type --</option>
                    {types.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.title}
                        </option>
                    ))}
                </select>
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

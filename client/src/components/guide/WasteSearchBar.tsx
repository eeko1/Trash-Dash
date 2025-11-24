import React, { useEffect, useState } from 'react'
import { recyclingmethod, WasteSearchBarProps, wastetypes, wastpage } from 'types/apiTypes';
import { fetchData } from 'lib/utils';
import { useTranslation } from 'react-i18next';

const WasteSearchBar = ({ onSearch, page = 1, onPageChange, onEmptySearch }: WasteSearchBarProps) => {
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState<wastpage[]>([]);
    const [isLastPage, setIsLastPage] = useState(false);
    const [searchPage, setSearchPage] = useState(1);
    const [methods, setMethods] = useState<recyclingmethod[]>([]);
    const [selectedMethod, setSelectedMethod] = useState<string>('');
    const [types, setTypes] = useState<wastetypes[]>([]);
    const [selectedType, setSelectedType] = useState<string>('');
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    useEffect(() => {
        if (search.trim()) {
            handleSearch(undefined, page);
        }
    }, [page]);

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

    useEffect(() => {
    if (search.trim()) {
        handleSearch(undefined, 1);
    }
}, [selectedMethod, selectedType, lang]);


    const handleSearch = async (e?: React.FormEvent, page = 1) => {
        if (e) e.preventDefault();
        if (!search.trim()) return;

        const baseUrl = process.env.REACT_APP_SERVER;
        const searchParams = new URLSearchParams();
        searchParams.append('lang', lang);
        searchParams.append('page', page.toString());
        if (selectedType) searchParams.append('wasteType', selectedType);
        if (selectedMethod) searchParams.append('recyclingMethod', selectedMethod);

        try {
            const url = `${baseUrl}/wastepages/search/${search}?${searchParams.toString()}`;
            const res = await fetchData<{ hits: wastpage[] }>(url);
            setSearchResult(res.hits);
            setSearchPage(page);
            setIsLastPage(res.hits.length === 0);

            if (onSearch) {
                onSearch(res.hits, page);
            }
        } catch (err) {
            console.error('Error fetching search results:', err);
        }
    };



    return (
        <div className="flex flex-wrap gap-2 items-center justify-center w-full mx-auto p-2">
            <form onSubmit={handleSearch} className="flex flex-wrap gap-2 items-center justify-center w-full max-w-3xl mx-auto">
                <input
                    value={search}
                    onChange={(e) => {
                        const value = e.target.value;
                        setSearch(value);

                        if (!value.trim() && onEmptySearch) {
                            onEmptySearch(); 
                        }
                    }}
                    placeholder={t('Search for')}
                    className="flex-1 min-w-[150px] border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
                <select
                    value={selectedMethod}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    className='flex-1 min-w-[150px] p-2 m-1'
                >
                    <option value="">{t('Select methond')}</option>
                    {methods.map((method) => (
                        <option key={method.id} value={method.id}>
                            {method.title}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className='flex-1 min-w-[150px] p-2 m-1'
                >
                    <option value="">{t('Select type')}</option>
                    {types.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.title}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="bg-teal-600 text-white p-2 rounded hover:bg-main_dark_turquoise transition"
                >
                    {t('Search')}
                </button>
            </form>
        </div>
    )
}

export default WasteSearchBar

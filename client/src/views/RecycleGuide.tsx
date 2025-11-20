import React, { useEffect, useState } from 'react';
import { fetchData } from 'lib/utils';
import SpecificWaste from 'components/guide/SpecificWaste';
import { wastpage } from 'types/apiTypes';
import { useNavigate } from 'react-router-dom';
import { VscIndent } from 'react-icons/vsc';
import { useTranslation } from 'react-i18next';
import LanguageSelector from 'components/LanguageSelector';
import WasteSearchBar from 'components/guide/WasteSearchBar';

const WasteTypesList = () => {
    const [isSearching, setIsSearching] = useState(false);
    const [wasteTypes, setWastePages] = useState<wastpage[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = React.useState<wastpage[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const { i18n } = useTranslation();
    const lang = i18n.language;

    const navigate = useNavigate();

    useEffect(() => {
        if (isSearching) return;
        const baseUrl = process.env.REACT_APP_SERVER;
        const getWastePages = async () => {
            try {
                const data = await fetchData<{ hits: wastpage[] }>(
                    `${baseUrl}/wastepages?lang=${lang}&page=${page}`
                );
                if (data.hits.length === 0) {
                    setIsLastPage(true);
                    if (page > 1) setPage((p) => p - 1);
                    return;
                }
                setWastePages(data.hits);
                setIsLastPage(false);
                setSelectedId(null);
                setError(null);
            } catch (err) {
                if (err instanceof Error) setError(err.message);
                else setError('Failed to load waste pages.');
            }
        };
        getWastePages();
    }, [lang, page, isSearching]);

    const handleSearchResults = (hits: wastpage[], page: number) => {
        setPage(page);
        setResults(hits);
        setIsSearching(true);
        if (hits.length === 0) {
            setIsLastPage(true);
            if (page > 1) setPage((p) => p - 1);
            return;
        }
        setIsLastPage(false);
    };

    const handleEmptySearchBar = () =>{
        setIsSearching(false);
        setResults([]);
    }

    const showWastes = results.length === 0 ? wasteTypes : results;

    if (error) return <div className='text-red-600'>{error}</div>;

    return (
        <div className='flex flex-col min-h-screen'>
            <div className='bg-white border-b border-gray-200'>
                <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2'>
                    <button
                        className='cursor-pointer bg-transparent border-none p-0'
                        onClick={() => navigate('/')}
                        title='Go to Home'
                    >
                        <VscIndent className='rotate-180 text-5xl text-gray-800' />
                    </button>
                    <LanguageSelector />
                </div>
            </div>

            <div className='w-full h-36 bg-gray-500 sm:h-72' />
            <main className='bg-main_medium_turquoise flex flex-col flex-grow  w-full items-center p-4'>
                <WasteSearchBar onSearch={handleSearchResults} onEmptySearch={handleEmptySearchBar} page={page} />
                <div className='flex flex-col max-h-[40vh] items-center pt-1'>
                    <div
                        className={
                            showWastes.length === 1
                                ? 'flex flex-col justify-center w-full mx-auto overflow-auto'
                                : 'grid grid-cols-2 gap-4 w-full mx-auto overflow-auto'
                        }
                    >
                        {showWastes.map((waste) => (
                            <button
                                key={waste.id}
                                className='p-6 bg-gray-800/60 text-white rounded-xl border-2 border-teal-600 shadow-lg text-xl font-bold transition break-words hover:bg-gray-800/80 sm:py-8'
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
                <div className='flex space-x-2 mt-3'>
                    <button
                        className='px-4 py-2 bg-gray-800/60 text-white rounded hover:bg-gray-800/80 disabled:opacity-50'
                        onClick={() => setPage((page) => Math.max(page - 1, 1))}
                        disabled={page === 1}
                    >
                        Prev
                    </button>
                    <span className='px-4 py-2'>{page}</span>
                    <button
                        className='px-4 py-2 bg-gray-800/60 text-white rounded hover:bg-gray-800/80'
                        onClick={() => setPage((page) => page + 1)}
                        disabled={isLastPage}
                    >
                        Next
                    </button>
                </div>
            </main>
            <footer className='bg-main_dark_turquoise text-white text-sm p-4'>
                <div className='max-w-screen-xl mx-auto text-center'>
                    &copy; 2025 HSY. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default WasteTypesList;

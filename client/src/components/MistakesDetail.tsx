import React, { useState, useEffect } from 'react';
import { fetchData } from '../lib/utils';
import { wastpage } from '../types/apiTypes';
import { useTranslation } from 'react-i18next';

interface MistakesDetailProps {
  category: 'Bio' | 'Cardboard' | 'Glass' | 'Metal';
}

const categoryIds: Record<MistakesDetailProps['category'], string> = {
  Bio: '774',
  Cardboard: '405',
  Glass: '253',
  Metal: '563',
};

const MistakesDetail: React.FC<MistakesDetailProps> = ({ category }) => {
  const [data, setData] = useState<wastpage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    const doFetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const baseUrl = process.env.REACT_APP_SERVER;
        const categoryId = categoryIds[category];
        const url = `${baseUrl}/wastepages/${categoryId}?lang=${lang}`;
        const result = await fetchData<wastpage>(url);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    doFetch();
  }, [category]);

  if (loading) {
    return <p className="text-sm text-gray-500 mt-2">Loading details...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500 mt-2">Error: {error}</p>;
  }

  if (!data) {
    return null;
  }

  const wasteInfo = data.wasteTypes && data.wasteTypes[0];

  return (
    <div className="mt-2 text-sm text-gray-600 space-y-2">
      {wasteInfo?.description && <p>{wasteInfo.description}</p>}
      {data.notes && (
        <div>
          <p className="font-semibold">Note:</p>
          <div 
            className="prose prose-sm max-w-none" 
            dangerouslySetInnerHTML={{ __html: data.notes }} 
          />
        </div>
      )}
      {wasteInfo?.informationPageUrl && (
        <a 
          href={wasteInfo.informationPageUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline break-all"
        >
          Learn more
        </a>
      )}
    </div>
  );
};

export default MistakesDetail;
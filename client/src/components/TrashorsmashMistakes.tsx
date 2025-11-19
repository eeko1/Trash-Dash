import React, { useEffect, useState } from "react";
import { fetchData } from "lib/utils";

interface WasteHit {
  description: string | null;
  id: string;
  informationPageUrl: string;
  title: string;
}

interface wastetypes {
    hits: WasteHit[];
    totalCount: number;
}

interface RecyclingInfoDialogProps {
  title: string;
  onClose: () => void;
}

interface DialogStructureProps {
    onClose: () => void;
    children: React.ReactNode;
}

const DialogStructure: React.FC<DialogStructureProps> = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 bg-main_black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 font-bold text-xl"
                    aria-label="Close dialog"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}

const RecyclingInfoDialog: React.FC<RecyclingInfoDialogProps> = ({ title, onClose }) => {
  const [data, setData] = useState<wastetypes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; 

    const doFetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const baseUrl = process.env.REACT_APP_SERVER;
        const url = `${baseUrl}/wastetypes/"${title}"/?lang=en`; 
        
        const response = await fetchData<wastetypes>(url);
        
        if (isMounted) {
          setData(response);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "An unknown error occurred while fetching data.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    doFetch();

    return () => {
      isMounted = false;
    };
  }, [title]); 

  if (loading) {
    return (
      <DialogStructure onClose={onClose}>
        <h2 className="text-2xl font-bold mb-4 text-main_dark_turquoise">Recycling Info</h2>
        <p>Loading recycling information for **{title}**...</p>
      </DialogStructure>
    );
  }

  if (error) {
    return (
      <DialogStructure onClose={onClose}>
        <h2 className="text-2xl font-bold mb-4 text-support_red">Error</h2>
        <p className="text-sm text-support_red mt-2">Failed to load info: {error}</p>
      </DialogStructure>
    );
  }

  const primaryHit = data?.hits?.[0];

  if (!primaryHit) {
    return (
      <DialogStructure onClose={onClose}>
        <h2 className="text-2xl font-bold mb-4 text-main_dark_turquoise">Recycling Info</h2>
        <p className="text-xl font-extrabold text-support_red">{title}</p>
        <p className="mt-4 text-gray-700">
            No specific recycling information found for **{title}**.
        </p>
      </DialogStructure>
    );
  }

  const { title: wasteTitle, description, informationPageUrl } = primaryHit;

  return (
    <DialogStructure onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4 text-main_black">Recycling Information</h2>
      
      <h3 className="text-xl font-extrabold text-main_black mb-2">
        {wasteTitle}
      </h3>
      
      <div className="mt-2 p-3 bg-gray-50 rounded-md mb-4">
        <p className="font-semibold text-gray-800">Description:</p>
        <p className="text-gray-700">
            {description || "No detailed description provided."}
        </p>
      </div>
      
      {informationPageUrl && (
       <a
        href={`https://www.hsy.fi${informationPageUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-main_dark_turquoise text-underline text-sm block **hover:no-underline**"
       >
      <button>
      Full Sorting Guide on HSY Website
    </button>
        </a>
      )}

    </DialogStructure>
  );
};

export default RecyclingInfoDialog;
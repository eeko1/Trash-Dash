import React from 'react';

interface MistakeData {
  missed: number;
  wrongBins: {
    Bio: number;
    Cardboard: number;
    Glass: number;
    Metal: number;
  };
}

interface MistakesProps {
  mistakeData: MistakeData;
  onClose: () => void;
}

const Mistakes: React.FC<MistakesProps> = ({ mistakeData, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(100, 195, 205, 0.5)', padding: '20px', borderRadius: '10px' }}>
      <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-center mb-4">Your Mistakes</h2>
        
        <div className="space-y-4">
          {/* Missed items */}
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-red-700">Missed Items</h3>
            <p className="text-gray-700">
              {mistakeData.missed > 0 
                ? `Items missed: ${Math.round(mistakeData.missed)}`
                : 'No items were missed!'
              }
            </p>
          </div>
          
          {/* Wrong bin selections */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-orange-700">Wrong Bin Selections</h3>
            <ul className="space-y-2 mt-2">
              {Object.entries(mistakeData.wrongBins).map(([category, count]) => (
                count > 0 && (
                  <li key={category} className="flex justify-between items-center">
                    <span>{category} items in wrong bin:</span>
                    <span className="font-bold">{Math.round(count)}</span>
                  </li>
                )
              ))}
              {Object.values(mistakeData.wrongBins).every(count => count === 0) && (
                <li>No wrong bin selections!</li>
              )}
            </ul>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="mt-6 bg-main_medium_turquoise text-white px-6 py-2 rounded-lg font-semibold hover:bg-main_light_turquoise transition w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Mistakes;
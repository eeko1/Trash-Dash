import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Mistakes from '../components/Mistakes';

interface MistakeData {
  missed: number;
  wrongBins: {
    Bio: number;
    Cardboard: number;
    Glass: number;
    Metal: number;
  };
}

interface DropGameEndProps {
  score: number;
  mistakeData: MistakeData;
}

const DropGameEnd: React.FC<DropGameEndProps> = ({ score, mistakeData }) => {
  const [showMistakes, setShowMistakes] = useState(false);
  
  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-gradient-to-b from-blue-100 to-green-100">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-2">Game Over!</h1>
        <div className="mb-8">
          <p className="text-gray-600 mb-2">You made 5 mistakes.</p>
          <p className="text-2xl font-bold text-green-600">Final Score: {Math.round(score)}</p>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={() => setShowMistakes(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition w-full"
          >
            Show Mistakes
          </button>
          
          <Link to="/">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition w-full">
              Return Home
            </button>
          </Link>
          
          <Link to="/game">
            <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition w-full">
              Play Again
            </button>
          </Link>
        </div>
      </div>
      
      {/* Mistakes Modal */}
      {showMistakes && (
        <Mistakes 
          mistakeData={mistakeData} 
          onClose={() => setShowMistakes(false)} 
        />
      )}
    </div>
  );
};

export default DropGameEnd;
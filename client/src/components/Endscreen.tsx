interface EndScreenProps {
  score: number;
  wrongAnswers: { name: string; image: string; correctType: string }[];
  onRestart: () => void;
}

const EndScreen = ({ score, wrongAnswers, onRestart }: EndScreenProps) => {
  return (
    <div className="bg-main_medium_tourquise min-h-screen flex flex-col items-center justify-center text-white font-sans p-6">
      <div className="bg-gray-800/60 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-lg p-6 text-center">
        <h1 className="text-3xl font-extrabold mb-4">Game Over!</h1>
        <p className="text-xl font-bold mb-6">Your Score: <span className="text-yellow-400">{score} / 5</span></p>

        {wrongAnswers.length > 0 ? (
          <div className="space-y-3 mb-6">
            <p className="text-lg font-semibold text-red-400">You got these wrong:</p>
            {wrongAnswers.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-700/40 p-3 rounded-lg">
                <img src={item.image} alt={item.name} className="w-14 h-14 object-contain rounded-md" />
                <div className="text-left">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-gray-300">
                    Correct bin: <span className="text-yellow-300">{item.correctType}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-green-400 font-bold text-lg mb-6">Perfect! You got everything right 🎉</p>
        )}

        <button
          onClick={onRestart}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition transform hover:scale-105 active:scale-95"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default EndScreen;

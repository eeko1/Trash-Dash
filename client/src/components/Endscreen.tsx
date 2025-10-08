import { useNavigate } from "react-router-dom";

interface EndScreenProps {
  score: number;
  wrongAnswers: { name: string; image: string; correctType: string }[];
  onRestart: () => void;
}

const EndScreen = ({ score, wrongAnswers, onRestart }: EndScreenProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-main_medium_turquoise min-h-screen flex flex-col items-center justify-center text-white font-sans p-6">
      <div className="bg-main_dark_turquoise border border-main_black rounded-2xl shadow-2xl w-full max-w-lg p-6 text-center">
        <h1 className="text-3xl font-extrabold mb-4">Game Over!</h1>
        <p className="text-xl font-bold mb-6">
          Your Score: <span className="text-support_yellow">{score} / 5</span>
        </p>

        {wrongAnswers.length > 0 ? (
          <div className="space-y-3 mb-6">
            <p className="text-lg font-bold text-support_light_red">You got these wrong:</p>
            {wrongAnswers.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-main_dark_turquoise p-3 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 object-contain rounded-md"
                />
                <div className="text-left">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-gray-300">
                    Correct bin: <span className="text-support_yellow">{item.correctType}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-support_medium_green font-bold text-lg mb-6">
            You got everything correct! You are a recycling pro!
          </p>
        )}

        <div className="flex flex-col items-center gap-4 mt-4">
          <button
            onClick={onRestart}
            className="bg-support_dark_blue text-white font-bold py-2 px-6 rounded-full transition transform hover:scale-105 active:scale-95"
          >
            Play Again
          </button>

          <button
            onClick={() => navigate("/")}
            className="bg-support_red text-white font-bold py-2 px-6 rounded-full transition transform hover:scale-105 active:scale-95"
          >
            Main Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndScreen;

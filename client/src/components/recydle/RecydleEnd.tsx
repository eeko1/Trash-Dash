import { useNavigate } from "react-router-dom";

type recydleEndProp = {
    result: string;
}



const RecydleEnd = ({result}: recydleEndProp) => {
    const navigate = useNavigate();

    console.log(result)

  return (
    <div className="bg-main_medium_turquoise min-h-screen flex flex-col items-center justify-center text-white font-sans p-6">
      <div className="bg-main_dark_turquoise border border-main_black rounded-2xl shadow-2xl w-full max-w-lg p-6 text-center">
        <h1 className="text-3xl font-extrabold mb-4">Daily recydle reset</h1>
        

        <div className="flex flex-col items-center gap-4 mt-4">
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

export default RecydleEnd;

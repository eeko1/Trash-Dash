import { useNavigate } from "react-router-dom";
import { recydleEndProp } from "../../types/recydleTypes";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";



const RecydleEnd = ({ result }: recydleEndProp) => {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
/*     const lang = i18n.language; */
    const [timeUntilReset, setTimeUntilReset] = useState<string>('');



    const formatTime = (ms: number) => {
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const resetCountDown = () => {
        const now = new Date();
        const resetTime = new Date();
        resetTime.setHours(24, 0, 0, 0);
        const difference = resetTime.getTime() - now.getTime();
        return formatTime(difference);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeUntilReset(resetCountDown());
        }, 1000);

        return () => clearInterval(timer);
    }, []);


return (
    <div className="bg-main_medium_turquoise min-h-screen flex flex-col items-center justify-center text-white font-sans p-6">
        <div className="bg-main_dark_turquoise border border-main_black rounded-2xl shadow-2xl w-full max-w-lg p-6 text-center">
            <h1 className="text-3xl font-extrabold mb-4">Daily recydle reset</h1>

            <div className="text-2xl font-bold mb-6">
                Next puzzle in: {timeUntilReset}
            </div>
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

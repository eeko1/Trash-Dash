import { useEffect, useState } from "react";
import { rowProps, tileProps } from "../../types/recydleTypes";


export const RecydleRow = ({ guess, letterState, shake, jump, wordLength }: rowProps) => {
    return <div className='flex gap-2'>
        {Array.from({ length: wordLength }).map((_, id) => {
            return <Tile key={id} id={id} letter={guess ? guess[id] : ''} state={letterState[id]} jump={jump} />
        })}
    </div>
}
    export const Tile = ({ letter, state, id, jump }: tileProps) => {
        const [revealColor, setRevealColor] = useState(false);
        const animationDelay = jump ? id * 80 : id * 300;
        useEffect(() => {
            let timeout: number;

            if (state !== 'default') {
                timeout = window.setTimeout(() => {
                    setRevealColor(true);
                }, animationDelay + 300);
            }

            return () => clearTimeout(timeout);
        }, [state, animationDelay]);

    const bgColor = revealColor
        ? state === 'correct' ? 'bg-green-500' :
            state === 'wrong-place' ? 'bg-yellow-500' :
                state === 'wrong' ? 'bg-gray-700' : 'bg-gray-500'
        : 'bg-gray-300'; 

    return (
        <div
            className={`
        border border-gray-500 w-16 h-16 flex items-center justify-center text-2xl font-bold
        transition-colors duration-500 ease-in-out
        ${bgColor}
        ${jump ? 'animate-jump' : ''}
      `}
            style={{ transitionDelay: `${animationDelay}ms` }}
        >
            {letter}
        </div>
    );
};
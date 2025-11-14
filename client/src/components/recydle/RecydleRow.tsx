import { useEffect, useState } from 'react';
import { rowProps, tileProps } from 'types/recydleTypes';

export const RecydleRow = ({
    guess,
    letterState,
    jump,
    wordLength,
}: rowProps) => {
    return (
        <div className='flex gap-1.5'>
            {Array.from({ length: wordLength }).map((_, id) => {
                return (
                    <Tile
                        key={id}
                        id={id}
                        letter={guess ? guess[id] : ''}
                        state={letterState[id]}
                        jump={jump}
                    />
                );
            })}
        </div>
    );
};
export const Tile = ({ letter, state, id, jump }: tileProps) => {
    const [revealColor, setRevealColor] = useState(false);
    const animationDelay = jump ? id * 300 : id * 300;

    useEffect(() => {
        if (state !== 'default') {
                setRevealColor(true);
        }
    }, [state, animationDelay]);

    const bgColor = revealColor
        ? state === 'correct'
            ? 'bg-support_light_green'
            : state === 'wrong-place'
                ? 'bg-support_yellow'
                : state === 'wrong'
                    ? 'bg-support_dark_grey'
                    : 'bg-support_gray'
        : 'bg-white';


    return (
        <div className='perspective: 500px'>
            <div
                className={`
    border border-gray-500 
    w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
    flex items-center justify-center 
    text-lg sm:text-xl md:text-2xl font-bold
    transition-colors duration-500 ease-in-out
    ${bgColor}
    ${state !== 'default' ? 'animate-flip' : ''}
    transform-gpu [transform-style:preserve-3d] [backface-visibility:hidden]
  `}
                style={{
                    animationDelay: state !== 'default' ? `${animationDelay}ms` : undefined,
                    transitionDelay: `${animationDelay + 300}ms`,
                }}
            >
                {letter}
            </div>
        </div>
    );
};

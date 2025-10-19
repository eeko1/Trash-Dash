import { keyPadProps, keyProps } from "../../types/recydleTypes";

const Rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "å"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ö", "ä"],
    ["z", "x", "c", "v", "b", "n", "m", "Backspace"], ["Enter"]
];


export const KeyPad = ({ onKeyPress, letterToLetterState }: keyPadProps) => {
    return (
        <div className='flex flex-col gap-1 w-full'>
            {Rows.map((letters, id) => {
                return (
                    <div className='flex w-full gap-1' key={id}>
                        {letters.map((letter, id) => {
                            return (
                                <Key
                                    key={id}
                                    letter={letter}
                                    onKeyPress={onKeyPress}
                                    letterState={letterToLetterState[letter.toUpperCase()] ?? 'default'}
                                />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
};

export const Key = ({ letter, onKeyPress, letterState }: keyProps) => {

    const revealColor = true;
    const bgColor = revealColor
        ? letterState === 'correct' ? 'bg-support_light_green'
        : letterState === 'wrong-place' ? 'bg-support_yellow'
        : letterState === 'wrong' ? 'bg-support_dark_grey'
        : 'bg-support_gray'
        : 'bg-support_gray';

    return (
        <button className={`flex justify-center items-center rounded-md h-14 font-bold text-lg flex-1 ${bgColor}`} onClick={() => onKeyPress(letter)}>
            {letter === 'Backspace' ? (<svg
                xmlns='http://www.w3.org/2000/svg'
                height='24'
                viewBox='0 0 24 24'
                width='24'  
                data-testid='icon-backspace'
                fill='white'
            >
                <path d='M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z'></path>
            </svg>) : (letter)}
        </button>
    )
};

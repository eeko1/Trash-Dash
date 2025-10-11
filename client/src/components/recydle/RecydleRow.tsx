type FormattedLetter = {
  key: string;
  color: 'grey' | 'green' | 'yellow';
};


type RecydleRowProps = {
  guess?: FormattedLetter[]; 
  currentGuess?: string;
};


const RecydleRow: React.FC<RecydleRowProps> = ({ guess, currentGuess }) => {
    if (guess) {
        return (
            <div className='pass'>
                {guess.map((l, i) => (
                    <div key={i} className={l.color}>
                        {l.key}
                    </div>
                ))}
            </div>
        );
    }
    if (currentGuess) {
        let letters = currentGuess.split('');

        return (
            <div className='pass'>
                {letters.map((letter, i) => (
                    <div key={i} className='filled'>
                        {letter}
                    </div>
                ))}
                {[...Array(5 - letters.length)].map((_, i) => (
                    <div key={i}></div>
                ))}
            </div>
        );
    }

return (
    <div className='flex justify-center text-center'>
        <div className='block text-center uppercase font-bold font-sans border border-l-main_black'></div>
        <div className='block text-center uppercase font-bold font-sans border border-l-main_black'></div>
        <div className='block text-center uppercase font-bold font-sans border border-l-main_black'></div>
        <div className='block text-center uppercase font-bold font-sans border border-l-main_black'></div>
        <div className='block text-center uppercase font-bold font-sans border border-l-main_black'></div>
    </div>
)
}

export default RecydleRow

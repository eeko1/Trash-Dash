import RecydleRow from './RecydleRow';

type FormattedLetter = {
  key: string;
  color: 'grey' | 'green' | 'yellow';
};

type RecydleGridProps = {
  guesses: FormattedLetter[][];
  currentGuess: string;
  turn: number;
};

const RecydleGrid: React.FC<RecydleGridProps> = ({ guesses, currentGuess, turn }) => {

  return (
    <div>
        {guesses.map((g, i) => {
            if(turn === i){
                return <RecydleRow key={i} currentGuess={currentGuess} />
            }
            return <RecydleRow key={i} guess={g} />
        })}
    </div>
  )
}

export default RecydleGrid

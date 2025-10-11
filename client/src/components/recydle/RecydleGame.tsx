import { useEffect } from "react";
import { useRecydle } from "../../hooks/useRecydle";
import RecydleGrid from "./RecydleGrid";

type SolutionProps = {
  solution: string;
}
const RecydleGame: React.FC<SolutionProps> = ({ solution }) => {
  const { currentGuess,guesses, turn, isCorrect ,handleKeyUp } = useRecydle(solution);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);


    console.log(solution)
  return (
    <div>
      <RecydleGrid guesses={guesses} currentGuess={currentGuess} turn={turn} />
    </div>
  )
}

export default RecydleGame

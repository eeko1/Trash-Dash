import { useEffect } from "react";
import { useRecydle } from "../hooks/useRecydle"

type SolutionProps = {
  solution: string;
}
const RecydleGame: React.FC<SolutionProps> = ({ solution }) => {
  const { currentGuess, handleKeyUp } = useRecydle(solution);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);


  return (
    <div>
      Current - {currentGuess}
    </div>
  )
}

export default RecydleGame

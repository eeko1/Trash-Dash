import { Card } from '../data/gameData';

interface GameCardProps {
  card: Card;
  style: React.CSSProperties;
}

const GameCard = ({ card, style }: GameCardProps) => (
  <>
    <div
      key={card.id}
      className="w-32 h-40 sm:w-36 sm:h-48 rounded-2xl overflow-hidden bg-gray-300 shadow-lg border-black/20 flex items-center justify-center transition-transform duration-300"
      style={style}
    >
      <img src={card.image} alt={card.name} className="w-full h-full object-contain" />
    </div>
    <p className="text-white font-bold text-xl mt-4">{card.name}</p>
  </>
);

export default GameCard;
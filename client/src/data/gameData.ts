export interface Card {
  id: string;
  name: string;
  image: string;
  type: 'plastic' | 'biowaste';
}

export const INITIAL_CARDS: Card[] = [
  { id: '1', name: 'Coca-Cola Bottle', image: '/assets/empty-coca-cola-plastic-bottle.png', type: 'plastic' },
  { id: '2', name: 'Egg Shells', image: '/assets/egg.png', type: 'biowaste' },
  { id: '3', name: 'Shopping Bag', image: '/assets/plastic-bag.png', type: 'plastic' },
  { id: '4', name: 'Banana Peel', image: '/assets/banana.png', type: 'biowaste' },
  { id: '5', name: 'Yogurt Cup', image: '/assets/yogurt-empty.png', type: 'plastic' },
];
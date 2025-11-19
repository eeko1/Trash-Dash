export interface Card {
  id: string;
  name: string;
  image: string;
  type: 'mixed' | 'metal';
}

export const INITIAL_CARDS: Card[] = [
  { id: '1', name: 'Tent', image: '/assets/tent.jpg', type: 'mixed' },
  { id: '2', name: 'ABS Plastic', image: '/assets/abs-plastic.jpeg', type: 'mixed' },
  { id: '3', name: 'Hole Punch', image: '/assets/hole-punch.jpg', type: 'metal' },
  { id: '4', name: 'Air Filter', image: '/assets/air-filter.jpeg', type: 'mixed' },
  { id: '5', name: 'Bike Pump', image: '/assets/bike-pump.png', type: 'metal' },
];
export interface Card {
  id: string;
  name: string;
  image: string;
  type: 'mixwaste' | 'metalwaste';
}

export const INITIAL_CARDS: Card[] = [
  { id: '1', name: 'Tent', image: '/assets/tent.jpg', type: 'mixwaste' },
  { id: '2', name: 'ABS Plastic', image: '/assets/abs-plastic.jpeg', type: 'mixwaste' },
  { id: '3', name: 'Hole Punch', image: '/assets/hole-punch.jpg', type: 'metalwaste' },
  { id: '4', name: 'Air Filter', image: '/assets/air-filter.jpeg', type: 'mixwaste' },
  { id: '5', name: 'Bike Pump', image: '/assets/bike-pump.png', type: 'metalwaste' },
];
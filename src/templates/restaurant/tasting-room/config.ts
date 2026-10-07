import type { RestaurantConfig } from '../../../types/restaurant';

export const TastingRoomConfig: RestaurantConfig = {
  id: 'tasting-room',
  name: 'The Tasting Room',
  tagline: 'An editorial journey through courses and pairings.',
  chef: 'Marcus Vance',
  address: '800 Horizon Avenue',
  hours: 'Thu-Sat: 6:00 PM - 12:00 AM',
  design: {
    theme: 'light',
    palette: {
      background: '#ffffff',
      text: '#111111',
      primary: '#111111', 
      secondary: '#f3f4f6',
      accent: '#6b7280',
    },
    typography: {
      heading: '"Inter", sans-serif',
      body: '"Inter", sans-serif',
      accent: '"Courier New", monospace',
    },
    radius: '4px',
    shadow: '0 2px 10px rgba(0,0,0,0.03)',
  },
  menu: [
    {
      id: 'tasting',
      name: 'Tasting Menu',
      description: 'Our signature 7-course experience.',
      items: [
        {
          id: 't-t1',
          name: 'The Full Experience',
          description: '7 courses reflecting the current micro-season. Allow 2.5 hours.',
          price: 12000,
          image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
          tags: ['Chef\'s Pick'],
          dietary: [],
          options: [{ name: 'Pairing', choices: [{ label: 'None' }, { label: 'Standard Wine Pairing', priceOverride: 18000 }, { label: 'Reserve Pairing', priceOverride: 24000 }] }]
        }
      ]
    }
  ]
};

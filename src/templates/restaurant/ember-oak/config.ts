import type { RestaurantConfig } from '../../../types/restaurant';

export const EmberOakConfig: RestaurantConfig = {
  id: 'ember-and-oak',
  name: 'Ember & Oak',
  tagline: 'Rustic wood-fired cooking in an amber-lit tavern.',
  chef: 'Samuel Cole',
  address: '500 Timber Road',
  hours: 'Mon-Sun: 4:00 PM - 11:00 PM',
  design: {
    theme: 'dark',
    palette: {
      background: '#1a1f2c', // Deep Teal / Charcoal
      text: '#fdf8f5',
      primary: '#d97743', // Ember Orange
      secondary: '#232a3b',
      accent: '#8b5a2b',
    },
    typography: {
      heading: '"Rye", serif',
      body: '"Inter", sans-serif',
      accent: '"Courier New", monospace',
    },
    radius: '8px',
    shadow: '0 8px 32px rgba(0,0,0,0.4)',
  },
  menu: [
    {
      id: 'from-the-pit',
      name: 'From The Pit',
      description: 'Slow smoked over oak for 14 hours.',
      items: [
        {
          id: 'e-p1',
          name: 'Smoked Brisket Platter',
          description: 'Texas-style brisket, jalapeño cornbread, house slaw.',
          price: 2800,
          image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80',
          tags: ['Signature'],
          dietary: [],
          options: [{ name: 'BBQ Sauce', choices: [{ label: 'Sweet Bourbon' }, { label: 'Spicy Habanero' }] }]
        }
      ]
    }
  ]
};

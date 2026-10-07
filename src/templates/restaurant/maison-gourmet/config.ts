import type { RestaurantConfig } from '../../../types/restaurant';

export const MaisonGourmetConfig: RestaurantConfig = {
  id: 'maison-gourmet',
  name: 'Maison Gourmet',
  tagline: 'Classic French Brasserie warmth.',
  chef: 'Julien Dubois',
  address: '10 Rue de Paris, Heritage Square',
  hours: 'Mon-Sun: 8:00 AM - 10:00 PM',
  design: {
    theme: 'light',
    palette: {
      background: '#fffdf9', // Cream
      text: '#4a1525', // Oxblood / Burgundy
      primary: '#4a1525',
      secondary: '#f2e8dc',
      accent: '#d4af37', // Gold
    },
    typography: {
      heading: '"Bodoni Moda", serif',
      body: '"Inter", sans-serif',
      accent: '"Great Vibes", cursive',
    },
    radius: '0px',
    shadow: 'none',
  },
  menu: [
    {
      id: 'classics',
      name: 'Les Classiques',
      description: 'Time-honored French bistro staples.',
      items: [
        {
          id: 'm-c1',
          name: 'Steak Frites',
          description: 'Entrecôte, sauce béarnaise, hand-cut pommes frites.',
          price: 3600,
          image: 'https://images.unsplash.com/photo-1600891964092-4316c2883c44?auto=format&fit=crop&w=800&q=80',
          tags: ['Bestseller'],
          dietary: [],
          options: [{ name: 'Cuisson', choices: [{ label: 'Saignant (Rare)' }, { label: 'À Point (Medium Rare)' }] }]
        }
      ]
    }
  ]
};

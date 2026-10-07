import type { RestaurantConfig } from '../../../types/restaurant';

export const VelvetReserveConfig: RestaurantConfig = {
  id: 'velvet-reserve',
  name: 'Velvet Reserve',
  tagline: 'Farm-to-table elegance bathed in natural light.',
  chef: 'Clara Lin',
  address: '22 Birchwood Lane, West End',
  hours: 'Wed-Sun: 11:30 AM - 10:00 PM',
  design: {
    theme: 'light',
    palette: {
      background: '#f9f8f6',
      text: '#2c3e50',
      primary: '#769282', // Sage Green
      secondary: '#ffffff',
      accent: '#d4af37',
    },
    typography: {
      heading: '"Cormorant Garamond", serif',
      body: '"Inter", sans-serif',
      accent: '"Playfair Display", serif',
    },
    radius: '16px',
    shadow: '0 4px 20px rgba(0,0,0,0.05)',
  },
  menu: [
    {
      id: 'harvest',
      name: 'The Harvest',
      description: 'Fresh, seasonal produce sourced daily.',
      items: [
        {
          id: 'v-h1',
          name: 'Heirloom Tomato Tart',
          description: 'Whipped goat cheese, basil oil, flaky pastry.',
          price: 1600,
          image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=800&q=80',
          tags: ['Seasonal', 'Vegetarian'],
          dietary: ['Vegetarian'],
        },
        {
          id: 'v-h2',
          name: 'Burrata & Stone Fruit',
          description: 'Grilled peaches, aged balsamic, micro arugula.',
          price: 1900,
          image: 'https://images.unsplash.com/photo-1606850780554-b55ea487eea9?auto=format&fit=crop&w=800&q=80',
          tags: ['Bestseller'],
          dietary: ['Vegetarian', 'Gluten-free'],
        }
      ]
    },
    {
      id: 'pastures',
      name: 'Pastures',
      description: 'Sustainably raised proteins.',
      items: [
        {
          id: 'v-p1',
          name: 'Herb-Crusted Lamb Rack',
          description: 'Spring pea purée, minted jus, roasted baby carrots.',
          price: 4500,
          image: 'https://images.unsplash.com/photo-1600891964092-4316c2883c44?auto=format&fit=crop&w=800&q=80',
          tags: ['Signature'],
          dietary: ['Gluten-free'],
          options: [{ name: 'Cooking Preference', choices: [{ label: 'Medium Rare' }, { label: 'Medium' }] }]
        }
      ]
    }
  ]
};

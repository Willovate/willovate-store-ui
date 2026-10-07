import type { RestaurantConfig } from '../../../types/restaurant';

export const NoirTableConfig: RestaurantConfig = {
  id: 'noir-table',
  name: 'Noir Table',
  tagline: 'An exploration of fire, smoke, and shadow.',
  chef: 'Elias Thorne',
  address: '144 Obsidian Way, Metro District',
  hours: 'Tue-Sun: 5:00 PM - 11:30 PM',
  design: {
    theme: 'dark',
    palette: {
      background: '#0a0a0a',
      text: '#e5e5e5',
      primary: '#b8860b', // Antique Gold / Brass
      secondary: '#2a2a2a',
      accent: '#c85a17', // Ember orange
    },
    typography: {
      heading: '"Playfair Display", serif',
      body: '"Inter", sans-serif',
      accent: '"Cormorant Garamond", serif',
    },
    radius: '0px',
    shadow: '0 10px 30px rgba(0,0,0,0.5)',
  },
  menu: [
    {
      id: 'starters',
      name: 'Prelude',
      description: 'Delicate beginnings to awaken the palate.',
      items: [
        {
          id: 'n-s1',
          name: 'Charred Bone Marrow',
          description: 'Smoked sea salt, pickled shallot, grilled sourdough.',
          price: 1800,
          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
          tags: ['Signature'],
          dietary: [],
          options: [{ name: 'Bread', choices: [{ label: 'Sourdough' }, { label: 'Gluten-Free Crostini', priceOverride: 1900 }] }]
        },
        {
          id: 'n-s2',
          name: 'Scallop Crudo',
          description: 'Black truffle ponzu, finger lime, micro-cilantro.',
          price: 2200,
          image: 'https://images.unsplash.com/photo-1599084929471-29c36195df38?auto=format&fit=crop&w=800&q=80',
          tags: ['Seasonal'],
          dietary: ['Gluten-free'],
        },
        {
          id: 'n-s3',
          name: 'Ash-Roasted Leeks',
          description: 'Whipped ricotta, hazelnut dukkah, burnt honey vinaigrette.',
          price: 1400,
          image: 'https://images.unsplash.com/photo-1628198754178-0e199d750a99?auto=format&fit=crop&w=800&q=80',
          tags: ['Chef\'s Pick', 'Vegetarian'],
          dietary: ['Vegetarian', 'Gluten-free'],
        }
      ]
    },
    {
      id: 'mains',
      name: 'The Fire',
      description: 'Central courses, cooked over open wood flames.',
      items: [
        {
          id: 'n-m1',
          name: 'Dry-Aged Tomahawk',
          description: '45-day aged beef, smoked garlic butter, ember-roasted roots.',
          price: 8500,
          image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
          tags: ['Signature', 'Bestseller'],
          dietary: ['Gluten-free'],
          options: [
            { name: 'Temperature', choices: [{ label: 'Rare' }, { label: 'Medium Rare' }, { label: 'Medium' }] },
            { name: 'Size', choices: [{ label: 'For Two' }, { label: 'For Four', priceOverride: 16000 }] }
          ]
        },
        {
          id: 'n-m2',
          name: 'Blackened Cod',
          description: 'Miso charcoal glaze, charred broccolini, squid ink reduction.',
          price: 3200,
          image: 'https://images.unsplash.com/photo-1511871926618-9710d0f4d30c?auto=format&fit=crop&w=800&q=80',
          tags: [],
          dietary: ['Gluten-free']
        },
        {
          id: 'n-m3',
          name: 'Smoked Mushroom Risotto',
          description: 'Wild foraged mushrooms, aged parmesan, truffle oil.',
          price: 2400,
          image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80',
          tags: ['Vegetarian'],
          dietary: ['Vegetarian'],
          addons: [{ name: 'Shaved Black Truffle', price: 800 }]
        }
      ]
    },
    {
      id: 'desserts',
      name: 'Curtain Call',
      description: 'Decadent conclusions.',
      items: [
        {
          id: 'n-d1',
          name: 'Dark Chocolate Nemesis',
          description: '70% cacao, smoked sea salt, blackberry coulis.',
          price: 1100,
          image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80',
          tags: ['Signature', 'Vegetarian'],
          dietary: ['Vegetarian', 'Gluten-free']
        },
        {
          id: 'n-d2',
          name: 'Burnt Vanilla Cheesecake',
          description: 'Basque style, caramelized top, espresso cream.',
          price: 900,
          image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
          tags: ['Vegetarian'],
          dietary: ['Vegetarian']
        }
      ]
    }
  ]
};

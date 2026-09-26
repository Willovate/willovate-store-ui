import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'noir-ember', name: 'Noir & Ember', tagline: 'Premium steakhouse with a dark, moody ambiance.',
  category: 'fine-dining',
  palette: { primary: '#eab308', secondary: '#000000', background: '#0a0a0a', surface: '#171717', text: '#ffffff', textLight: '#a3a3a3', heroOverlay: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.3))' },
  typography: { heading: '"Oswald", sans-serif', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1544025162-d76538a679db'), heroAlt: 'Thick cut steak sizzling on a grill',
    story: img('photo-1551185448-9bbdc257cb2d'), storyAlt: 'Dark moody interior of a luxury steakhouse',
    promo: img('photo-1582196016295-f8c8bd4b3a99'), promoAlt: 'Bartender pouring a classic cocktail',
    gallery: [
      { src: img('photo-1544025162-d76538a679db'), alt: 'Grilled Tomahawk' },
      { src: img('photo-1551185448-9bbdc257cb2d'), alt: 'Dining room' },
      { src: img('photo-1582196016295-f8c8bd4b3a99'), alt: 'Old Fashioned cocktail' },
      { src: img('photo-1558030137-a56c1b002c99'), alt: 'Dry aging room' },
      { src: img('photo-1600891964092-4316c288032e'), alt: 'Steak plating' },
      { src: img('photo-1596622527585-84e1b8bdf1b6'), alt: 'Wine decanting' },
    ],
  },
  content: {
    heroHeadline: 'Fire Meets Prime.',
    heroSub: 'Dry-aged steaks, rare whiskies, and a sultry atmosphere. Noir & Ember redefines the modern steakhouse.',
    storyTitle: 'The Art of the Sear.',
    storyBody: [
      'We believe great steak starts with great sourcing. All our beef is USDA Prime, dry-aged in-house for a minimum of 45 days to develop intense flavor and tenderness.',
      'Cooked over a custom wood-fired grill, our steaks are charred to perfection. Pair it with a classic cocktail or a vintage bottle from our extensive cellar.',
    ],
    promoTitle: 'Private Dining Available.',
    promoCTA: 'Inquire Now',
    ctaPrimary: 'Reservations', ctaSecondary: 'View Menu',
    address: '500 Ember Lane, Financial District',
    hours: 'Mon-Sun: 5PM - 12AM',
    phone: '(555) 999-4444',
  },
  menu: [
    { tab: 'Prime Cuts', items: [
      { name: '45-Day Dry Aged Ribeye', price: '$85', desc: '16oz bone-in ribeye, charred over oak, house steak sauce.', tags: ['Signature'], image: img('photo-1544025162-d76538a679db') },
      { name: 'Japanese A5 Wagyu', price: '$120', desc: '6oz strip, flown in from Kagoshima, served with smoked sea salt.', image: img('photo-1600891964092-4316c288032e') },
    ]},
    { tab: 'Sides', items: [
      { name: 'Truffle Mac & Cheese', price: '$18', desc: 'Aged cheddar, gruyere, fresh black truffle shavings.', image: img('photo-1541592106381-b31e9677c0e5') },
      { name: 'Charred Asparagus', price: '$14', desc: 'Lemon zest, parmesan, cured egg yolk.', image: img('photo-1512621776951-a57141f2eefd') },
    ]},
  ],
  testimonials: [
    { name: 'Marcus D.', quote: 'The best steak I have ever had. The dry-aging process really shines through.', rating: 5 },
    { name: 'Elena V.', quote: 'The ambiance is incredibly moody and romantic. Perfect for an anniversary dinner.', rating: 5 },
  ],
  features: ['In-House Dry Aging', 'Wood-Fired Grill', 'Rare Whisky Collection', 'Private Dining Rooms'],
};

export default function NoirEmber() { return <RestaurantPage theme={theme} />; }

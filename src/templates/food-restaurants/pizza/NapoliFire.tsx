import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'napoli-fire', name: 'Napoli Fire', tagline: 'Authentic Neapolitan pizza, wood-fired to perfection',
  category: 'pizza',
  palette: { primary: '#e63312', secondary: '#1a1008', background: '#fffbf7', surface: '#fff5ee', text: '#1a1008', textLight: '#7a5c44', heroOverlay: 'linear-gradient(to right, rgba(26,16,8,0.82) 0%, rgba(26,16,8,0.4) 60%, transparent 100%)' },
  typography: { heading: '"Playfair Display", serif', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1565299624946-b28f40a0ae38'), heroAlt: 'Wood-fired Neapolitan pizza with charred crust and fresh basil',
    story: img('photo-1513104890138-7c749659a591'), storyAlt: 'Pizza chef stretching dough in a traditional Italian pizzeria',
    promo: img('photo-1574071318508-1cdbab80d002'), promoAlt: 'Wood-fired oven with roaring flames',
    gallery: [
      { src: img('photo-1565299624946-b28f40a0ae38'), alt: 'Classic Neapolitan Margherita pizza fresh from the wood-fired oven' },
      { src: img('photo-1513104890138-7c749659a591'), alt: 'Artisan pizza dough being hand-stretched by a skilled pizzaiolo' },
      { src: img('photo-1574071318508-1cdbab80d002'), alt: 'Wood-fired oven interior glowing with orange flames and embers' },
      { src: img('photo-1604382354936-07c5d9983bd3'), alt: 'Pizza Marinara with San Marzano tomatoes and fresh oregano' },
      { src: img('photo-1628840042765-356cda07504e'), alt: 'Freshly sliced pizza with mozzarella and basil' },
      { src: img('photo-1595854341625-f33ee10dbf98'), alt: 'Pizza ingredients: fresh basil, buffalo mozzarella, olive oil' },
    ],
  },
  content: {
    heroHeadline: 'Born in Naples.\nBaked in Fire.',
    heroSub: 'Every pizza is made with imported Caputo 00 flour, San Marzano tomatoes, and baked in a 900°F wood-fired oven.',
    storyTitle: 'Three Generations of Dough.',
    storyBody: [
      'Napoli Fire was founded in 1982 when Chef Marco Esposito brought his grandmother\'s recipe from Naples. Every dough ball is fermented for 48 hours before it is stretched and fired.',
      'We use nothing but Italian-imported ingredients — Caputo 00 flour, DOP San Marzano tomatoes, and fresh fior di latte. The result is a pizza that is crisp on the outside, soft and airy inside.',
    ],
    promoTitle: 'The Oven Does the Talking.',
    promoCTA: 'Reserve a Table',
    ctaPrimary: 'Order Now', ctaSecondary: 'View Menu',
    address: '14 Via Roma, Little Italy, NY 10013',
    hours: 'Tue–Sun: 12pm – 11pm | Closed Monday',
    phone: '+1 (212) 555-0182',
  },
  menu: [
    { tab: 'Neapolitan', items: [
      { name: 'Margherita DOP', price: '$18', desc: 'San Marzano tomato, fior di latte, fresh basil, extra virgin olive oil.', tags: ['Classic', 'Vegetarian'], image: img('photo-1549007994-cb92caebd54b') },
      { name: 'Diavola', price: '$21', desc: 'Spicy Calabrian salami, tomato, smoked mozzarella, basil.', tags: ['Spicy'], image: img('photo-1588315029754-2dd089d39a1a') },
      { name: 'Tartufo Nero', price: '$26', desc: 'Black truffle cream, fior di latte, wild mushrooms, parmesan.', tags: ['Premium'], image: img('photo-1555939594-58d7cb561ad1') },
    ]},
    { tab: 'White (Bianca)', items: [
      { name: 'Quattro Formaggi', price: '$22', desc: 'Mozzarella, gorgonzola, parmesan, provolone, walnuts.', tags: ['Vegetarian'], image: img('photo-1516714435131-44d6b64dc6a2') },
      { name: 'Patata e Rosmarino', price: '$19', desc: 'Thinly sliced potato, rosemary, stracciatella, crispy guanciale.', tags: ['Seasonal'], image: img('photo-1544025162-d76538a679db') },
    ]},
    { tab: 'Calzone', items: [
      { name: 'Classico Fritto', price: '$20', desc: 'Deep-fried calzone filled with ricotta, salami, and smoked mozzarella.', image: img('photo-1604382354936-07c5d9983bd3') },
      { name: 'Vegetariano', price: '$18', desc: 'Roasted vegetables, ricotta, mozzarella, spinach.', tags: ['Vegetarian'], image: img('photo-1596797038530-2c107229654b') },
    ]},
  ],
  testimonials: [
    { name: 'Sarah M.', quote: 'The Margherita DOP is the most authentic Neapolitan pizza I have had outside of Naples. The crust is absolute perfection.', rating: 5 },
    { name: 'James K.', quote: 'Napoli Fire is our date night staple. The Tartufo Nero is extraordinary — earthy, rich, and worth every penny.', rating: 5 },
    { name: 'Lucia P.', quote: 'I grew up in Naples and this is the real thing. The dough has the perfect char and leopard spotting. Bravo!', rating: 5 },
  ],
  features: ['Wood-Fired Oven', '48-Hour Dough', 'DOP Ingredients', 'Family Recipe Since 1982'],
};

export default function NapoliFire() { return <RestaurantPage theme={theme} />; }

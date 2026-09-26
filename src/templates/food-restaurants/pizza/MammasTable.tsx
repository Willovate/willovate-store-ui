import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'mammas-table', name: "Mamma's Table", tagline: 'Southern Italian home cooking & hand-made pizza',
  category: 'pizza',
  palette: { primary: '#c0392b', secondary: '#2c1810', background: '#fdf7f2', surface: '#fff9f5', text: '#2c1810', textLight: '#8b5e52', heroOverlay: 'linear-gradient(to right, rgba(44,24,16,0.85), rgba(44,24,16,0.35))' },
  typography: { heading: '"Cormorant Garamond", serif', body: '"Lato", sans-serif' },
  images: {
    hero: img('photo-1555396273-367ea4eb4db5'), heroAlt: "Italian restaurant interior with hanging garlic, warm lights, and rustic charm",
    story: img('photo-1571115177098-24ec42ed204d'), storyAlt: 'Hands rolling pizza dough on a floured wooden board',
    promo: img('photo-1565299624946-b28f40a0ae38'), promoAlt: 'Rustic homestyle pizza on wooden serving board',
    gallery: [
      { src: img('photo-1555396273-367ea4eb4db5'), alt: 'Cozy rustic Italian restaurant interior with candlelit tables' },
      { src: img('photo-1571115177098-24ec42ed204d'), alt: 'Mamma rolling pizza dough on a rustic wooden table' },
      { src: img('photo-1565299624946-b28f40a0ae38'), alt: 'Classic margherita pizza fresh from a stone oven' },
      { src: img('photo-1498579809087-ef1e558fd1da'), alt: 'Pasta and pizza ingredients including fresh tomatoes and basil' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Italian family-style dinner spread with pizza and antipasti' },
      { src: img('photo-1438118907704-7718d357a7a9'), alt: 'Fresh bread, olive oil, and Italian antipasti on a rustic table' },
    ],
  },
  content: {
    heroHeadline: 'Cooked Like Mamma Made It.',
    heroSub: 'Every recipe comes from a well-worn notebook passed down through four generations of the Ferrara family.',
    storyTitle: 'From Calabria to Your Table.',
    storyBody: [
      'Rosa Ferrara came to America in 1965 with $40, a suitcase, and a recipe notebook. She opened a tiny kitchen on Mulberry Street serving the food she grew up with in Calabria.',
      'Today, her granddaughter Elena runs the kitchen, making the same dough, the same sauce, and serving the same warmth that made Mamma\'s Table a neighbourhood institution.',
    ],
    promoTitle: 'Sunday Supper.\nEvery Night.',
    promoCTA: 'Reserve Your Table',
    ctaPrimary: 'Book a Table', ctaSecondary: 'View Menu',
    address: '42 Mulberry St, Little Italy, NY 10013',
    hours: 'Tue–Sun: 12pm – 10pm · Sundays: Noon – 9pm',
    phone: '+1 (212) 555-0164',
  },
  menu: [
    { tab: 'Pizza', items: [
      { name: 'Capricciosa', price: '$22', desc: 'Tomato, mozzarella, ham, artichokes, olives, mushrooms.', tags: ['House Favourite'], image: img('photo-1604382354936-07c5d9983bd3') },
      { name: 'Quattro Stagioni', price: '$24', desc: 'Four sections: prosciutto, mushrooms, artichokes, olives.', tags: ['Classic'], image: img('photo-1528137871618-79d2761e3fd5') },
      { name: "Mamma's Special", price: '$26', desc: 'Rosa\'s secret recipe — ask your server for today\'s creation.', tags: ['Daily Special'] },
    ]},
    { tab: 'Pasta', items: [
      { name: 'Pasta al Ragù', price: '$19', desc: 'Slow-cooked beef ragù, hand-rolled pappardelle, parmesan.', image: img('photo-1567188040759-fb8a883dc6d8') },
      { name: 'Cacio e Pepe', price: '$17', desc: 'Tonnarelli, aged Pecorino Romano, fresh-cracked black pepper.', image: img('photo-1574071318508-1cdbab80d002') },
    ]},
    { tab: 'Antipasti', items: [
      { name: 'Bruschetta al Pomodoro', price: '$10', desc: 'Grilled sourdough, ripe tomatoes, basil, garlic, extra-virgin olive oil.', image: img('photo-1587314168485-3236d6710814') },
      { name: 'Burrata con Prosciutto', price: '$16', desc: 'Creamy burrata, San Daniele prosciutto, grilled peaches.', image: img('photo-1549007994-cb92caebd54b') },
    ]},
  ],
  testimonials: [
    { name: 'Giulia M.', quote: 'This is the closest to my grandmother\'s cooking I have ever found outside of Italy. It makes me cry (in the best way).', rating: 5 },
    { name: 'Robert T.', quote: 'The Capricciosa is a work of art. Generous toppings, incredible dough. We come here for every anniversary.', rating: 5 },
    { name: 'Sophie B.', quote: 'Warm, welcoming, and utterly delicious. Mamma\'s Table is exactly what Italian dining should feel like.', rating: 5 },
  ],
  features: ['Family Recipes Since 1965', 'Fresh Daily Pasta', 'House-Made Limoncello', 'Private Dining Room'],
};

export default function MammasTable() { return <RestaurantPage theme={theme} />; }

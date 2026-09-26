import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'masala-royale', name: 'Masala Royale', tagline: 'Royal Mughal cuisine with contemporary elegance',
  category: 'indian',
  palette: { primary: '#c2860a', secondary: '#1a0d00', background: '#fff9f0', surface: '#fdf3e3', text: '#1a0d00', textLight: '#8a6030', heroOverlay: 'linear-gradient(to right, rgba(26,13,0,0.9), rgba(194,134,10,0.2))' },
  typography: { heading: '"Cormorant Garamond", serif', body: '"Poppins", sans-serif' },
  images: {
    hero: img('photo-1585937421612-70a008356fbe'), heroAlt: 'Ornate Indian butter chicken curry served in a copper karahi',
    story: img('photo-1596797038530-2c107229654b'), storyAlt: 'Indian chef preparing dal in a traditional kitchen',
    promo: img('photo-1631515243349-e0cb75fb8d3a'), promoAlt: 'Tandoor oven glowing with naan bread baking inside',
    gallery: [
      { src: img('photo-1585937421612-70a008356fbe'), alt: 'Creamy butter chicken curry garnished with cream and cilantro' },
      { src: img('photo-1596797038530-2c107229654b'), alt: 'Freshly prepared masala ingredients: spices, onion, ginger' },
      { src: img('photo-1631515243349-e0cb75fb8d3a'), alt: 'Tandoor oven with naan being baked on the clay walls' },
      { src: img('photo-1516714435131-44d6b64dc6a2'), alt: 'Biryani rice served in a handi pot with saffron and fried onions' },
      { src: img('photo-1567188040759-fb8a883dc6d8'), alt: 'Assorted Indian bread: naan, roti, and paratha on a thali' },
      { src: img('photo-1555939594-58d7cb561ad1'), alt: 'Elegant Indian restaurant dining room with gold and velvet decor' },
    ],
  },
  content: {
    heroHeadline: 'Cuisine Fit\nFor Royalty.',
    heroSub: 'Masala Royale revives the grandeur of Mughal court cooking — rich curries, slow-cooked biryanis, and hand-baked naan from the clay tandoor.',
    storyTitle: 'The Spice Routes of Royalty.',
    storyBody: [
      'Chef Vikram Malhotra spent seven years researching Mughal era recipes — the rich, aromatic dishes once prepared for emperors. He brought that research to Masala Royale, creating menus that honor tradition without freezing it in time.',
      'Every spice blend is made in-house. Every curry is built from a fresh masala base. Every piece of naan is slapped by hand onto the walls of our clay tandoor.',
    ],
    promoTitle: 'A Royal Feast Awaits.',
    promoCTA: 'Reserve Your Table',
    ctaPrimary: 'Book a Table', ctaSecondary: 'View Menu',
    address: '12 Spice Garden Rd, Jackson Heights, NY 11372',
    hours: 'Mon–Sun: 12pm – 3pm & 6pm – 11pm',
    phone: '+1 (718) 555-0212',
  },
  menu: [
    { tab: 'Signature Curries', items: [
      { name: 'Murgh Makhani', price: '$22', desc: 'Slow-simmered butter chicken in a rich tomato and cashew cream sauce.', tags: ['Most Popular'], image: img('photo-1549007994-cb92caebd54b') },
      { name: 'Rogan Josh', price: '$24', desc: 'Braised lamb with Kashmiri spices, whole cardamom, fennel.', tags: ['Kashmiri'], image: img('photo-1585937421612-70a008356fbe') },
      { name: 'Paneer Tikka Masala', price: '$20', desc: 'Tandoor-grilled paneer in a vibrant tomato-cream masala.', tags: ['Vegetarian'], image: img('photo-1585937421612-70a008356fbe') },
    ]},
    { tab: 'Biryani & Rice', items: [
      { name: 'Dum Gosht Biryani', price: '$26', desc: 'Slow-cooked lamb biryani sealed in a dough lid (dum style), saffron, caramelized onions.', tags: ['Signature', 'Dum Style'], image: img('photo-1574071318508-1cdbab80d002') },
      { name: 'Vegetable Biryani', price: '$20', desc: 'Basmati rice, seasonal vegetables, whole spices, raisins, saffron.', tags: ['Vegetarian'], image: img('photo-1631515243349-e0cb75fb8d3a') },
    ]},
    { tab: 'Breads', items: [
      { name: 'Garlic Naan', price: '$5', desc: 'Hand-slapped, baked in the clay tandoor, brushed with garlic butter.', image: img('photo-1585937421612-70a008356fbe') },
      { name: 'Lachha Paratha', price: '$5', desc: 'Flaky, layered whole wheat flatbread, cooked on the tawa.', image: img('photo-1588315029754-2dd089d39a1a') },
      { name: 'Peshwari Naan', price: '$6', desc: 'Sweet naan stuffed with coconut, almond, and raisins.', tags: ['Sweet'], image: img('photo-1606313564200-e75d5e30476c') },
    ]},
  ],
  testimonials: [
    { name: 'Priya S.', quote: 'The Dum Gosht Biryani is the best biryani I have had in New York. The dum seal keeps every grain of rice perfectly flavored.', rating: 5 },
    { name: 'Michael C.', quote: 'I have been to India four times and Masala Royale is the real thing. The Rogan Josh is deeply, magnificently spiced.', rating: 5 },
    { name: 'Deepa V.', quote: 'The atmosphere is absolutely stunning, and the Murgh Makhani is legendary. Came for a date, left engaged.', rating: 5 },
  ],
  features: ['Clay Tandoor Oven', 'Mughal Recipes', 'In-House Spice Blends', 'Private Dining'],
};

export default function MasalaRoyale() { return <RestaurantPage theme={theme} />; }

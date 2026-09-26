import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'sweet-tooth', name: 'Sweet Tooth', tagline: 'Classic American candy shop & soda fountain',
  category: 'dessert',
  palette: { primary: '#f43f5e', secondary: '#1c0010', background: '#fff0f5', surface: '#ffe4f0', text: '#1c0010', textLight: '#9d174d', heroOverlay: 'linear-gradient(to right, rgba(28,0,16,0.85), rgba(244,63,94,0.15))' },
  typography: { heading: '"Righteous", cursive', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1567620905732-2d1ec7ab7445'), heroAlt: 'Classic American candy store with colorful candy jars and soda fountain',
    story: img('photo-1551024601-bec78aea704b'), storyAlt: 'Retro soda fountain with milkshakes and classic American desserts',
    promo: img('photo-1497034825429-c343d7c6a68f'), promoAlt: 'Ice cream sundae tower with candy, sprinkles, and whipped cream',
    gallery: [
      { src: img('photo-1567620905732-2d1ec7ab7445'), alt: 'Towering milkshake with candy, cake slices, and cotton candy on top' },
      { src: img('photo-1551024601-bec78aea704b'), alt: 'Classic banana split sundae with three toppings and whipped cream' },
      { src: img('photo-1497034825429-c343d7c6a68f'), alt: 'Colorful candy jars in a retro American candy shop' },
      { src: img('photo-1588195538326-c5b1e9f80a1b'), alt: 'Rainbow sprinkle donut and cotton candy in pastel pink setting' },
      { src: img('photo-1563805042-7684c019e1cb'), alt: 'Freshly made caramel apple coated in candy sprinkles' },
      { src: img('photo-1509440159596-0249088772ff'), alt: 'Retro diner dessert display with pies, cakes, and malted milkshakes' },
    ],
  },
  content: {
    heroHeadline: 'Pure.\nSugar.\nJoy.',
    heroSub: 'The candy shop you dreamed about as a kid. The soda fountain your grandparents remember. Welcome to Sweet Tooth.',
    storyTitle: 'Bringing the Soda Fountain Back.',
    storyBody: [
      'Sweet Tooth was opened as a love letter to a simpler era — the golden age of American soda fountains, candy counters, and desserts that were made to delight, not impress.',
      'We make our own caramel, pull our own taffy, and shake every milkshake by hand. Nothing here is premixed or machine-dispensed.',
    ],
    promoTitle: 'The Biggest Shake\nIn Town.',
    promoCTA: 'Order the Freak Shake',
    ctaPrimary: 'Order Online', ctaSecondary: 'Visit the Shop',
    address: '10 Candy Cane Lane, Columbus, OH 43215',
    hours: 'Mon–Sun: 12pm – 10pm · Extended Fri & Sat',
    phone: '+1 (614) 555-0110',
  },
  menu: [
    { tab: 'Milkshakes', items: [
      { name: 'Classic Vanilla', price: '$8', desc: 'Real vanilla bean, whole milk, hand-shaken.', image: img('photo-1592415486689-125cbbfcbee2') },
      { name: 'The Freak Shake', price: '$14', desc: 'Massive shake topped with cotton candy, cookie, cake slice, sprinkles.', tags: ['Instagram Worthy', 'Signature'], image: img('photo-1631515243349-e0cb75fb8d3a') },
      { name: 'Salted Caramel', price: '$9', desc: 'House-made caramel, sea salt, vanilla ice cream, caramel drizzle.', tags: ['Bestseller'], image: img('photo-1544025162-d76538a679db') },
    ]},
    { tab: 'Candy & Sweets', items: [
      { name: 'Pick-and-Mix (per 100g)', price: '$3.50', desc: 'Choose from 80+ candy varieties, weighed and bagged fresh.', image: img('photo-1565299624946-b28f40a0ae38') },
      { name: 'Caramel Apples', price: '$6', desc: 'House-pulled caramel, dipped in chocolate or sprinkles.', tags: ['House Made'], image: img('photo-1440516851687-7a8a3a48e2d4') },
      { name: 'Cotton Candy', price: '$4', desc: 'Spun fresh to order. Choice of 5 flavors.', image: img('photo-1555396273-367ea4eb4db5') },
    ]},
    { tab: 'Ice Cream', items: [
      { name: 'Single Scoop', price: '$4', desc: 'Choose from 20 rotating flavors. In a cone or cup.', image: img('photo-1534308983496-4fabb1a015ee') },
      { name: 'Banana Split', price: '$11', desc: 'Three scoops, banana, hot fudge, strawberry, caramel, whipped cream.', tags: ['Classic'], image: img('photo-1567188040759-fb8a883dc6d8') },
    ]},
  ],
  testimonials: [
    { name: 'Amanda K.', quote: 'The Freak Shake is outrageous in the best way. My kids lost their minds. I did too. No regrets.', rating: 5 },
    { name: 'Tom B.', quote: 'I felt like I was 8 years old again the moment I walked in. The smell alone is worth the trip.', rating: 5 },
    { name: 'Emily P.', quote: 'Pick-and-mix with 80 options is a game changer. My daughter could spend hours in here. And so could I.', rating: 5 },
  ],
  features: ['80+ Pick-and-Mix Candies', 'House-Made Caramel', 'Freak Shake Specials', 'Retro Soda Fountain'],
};

export default function SweetTooth() { return <RestaurantPage theme={theme} />; }

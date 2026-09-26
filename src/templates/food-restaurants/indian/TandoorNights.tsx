import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'tandoor-nights', name: 'Tandoor Nights', tagline: 'North Indian kebabs, naan & cocktails after dark',
  category: 'indian',
  palette: { primary: '#f59e0b', secondary: '#0d0700', background: '#0d0700', surface: '#1a1000', text: '#fff8e7', textLight: '#d4a853', heroOverlay: 'linear-gradient(to right, rgba(13,7,0,0.95), rgba(245,158,11,0.15))' },
  typography: { heading: '"Cinzel", serif', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1516714435131-44d6b64dc6a2'), heroAlt: 'Indian tandoor kebabs sizzling on skewers with flames in a dark restaurant',
    story: img('photo-1631515243349-e0cb75fb8d3a'), storyAlt: 'Glowing tandoor oven at night with meat cooking on skewers',
    promo: img('photo-1585937421612-70a008356fbe'), promoAlt: 'Tandoor kebab platter with naan and chutneys on a dark table',
    gallery: [
      { src: img('photo-1516714435131-44d6b64dc6a2'), alt: 'Sizzling kebabs on a cast iron plate with onions and peppers' },
      { src: img('photo-1631515243349-e0cb75fb8d3a'), alt: 'Tandoor oven glowing orange with naan baking inside' },
      { src: img('photo-1585937421612-70a008356fbe'), alt: 'Seekh kebabs with chutney and sliced onions on a dark slate' },
      { src: img('photo-1596797038530-2c107229654b'), alt: 'Indian spice jars and fresh herbs in the tandoor kitchen' },
      { src: img('photo-1567188040759-fb8a883dc6d8'), alt: 'Indian cocktails with rose water and cardamom beside kebabs' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Tandoor Nights moody interior with warm amber lighting' },
    ],
  },
  content: {
    heroHeadline: 'The Night Belongs\nto the Tandoor.',
    heroSub: 'After dark, the clay oven heats to 900°F. The tikkas sizzle. The cocktails pour. The night begins.',
    storyTitle: 'Where the Flame Never Dies.',
    storyBody: [
      'Tandoor Nights opened at midnight on a Friday. By 2am, there was a line around the block. We only serve from 6pm — some things can only happen after dark.',
      'Our tandoor oven never cools. It runs from 6pm until the last guest leaves. Every skewer, every naan, every tikka comes out of that single, ancient oven.',
    ],
    promoTitle: 'The Oven\nWaits for You.',
    promoCTA: 'Make a Late Reservation',
    ctaPrimary: 'Book Tonight', ctaSecondary: 'Cocktail Menu',
    address: '22 Spice Alley, Lower East Side, NY 10002',
    hours: 'Tue–Sun: 6pm – 2am | DJ Nights on Fri & Sat',
    phone: '+1 (212) 555-0362',
  },
  menu: [
    { tab: 'Tandoor Kebabs', items: [
      { name: 'Chicken Tikka', price: '$21', desc: 'Boneless chicken marinated in yogurt, turmeric, and Kashmiri chili. Charred in the tandoor.', tags: ['Classic'], image: img('photo-1534308983496-4fabb1a015ee') },
      { name: 'Seekh Kebab', price: '$22', desc: 'Spiced lamb mince on a wide skewer, finished with coal smoke.', tags: ['Smoky'], image: img('photo-1606313564200-e75d5e30476c') },
      { name: 'Paneer Tikka', price: '$19', desc: 'Fresh paneer marinated in ajwain and gram flour. Tandoor charred.', tags: ['Vegetarian'], image: img('photo-1567188040759-fb8a883dc6d8') },
    ]},
    { tab: 'Night Curries', items: [
      { name: 'Black Dal', price: '$16', desc: 'Slow-cooked black lentils with butter and cream. Served all night.', tags: ['Midnight Special'], image: img('photo-1544025162-d76538a679db') },
      { name: 'Kadai Gosht', price: '$24', desc: 'Lamb shoulder with bell peppers and whole spices in an iron karahi.', image: img('photo-1604382354936-07c5d9983bd3') },
    ]},
    { tab: 'Cocktails', items: [
      { name: 'Rose Cardamom Gimlet', price: '$14', desc: 'Gin, rose water, cardamom, lime.', image: img('photo-1631515243349-e0cb75fb8d3a') },
      { name: 'Masala Mule', price: '$13', desc: 'Vodka, ginger beer, chili, lime, mint.', tags: ['Spicy'], image: img('photo-1558030137-a56c1b002c99') },
      { name: 'Lassi Sour', price: '$12', desc: 'Whiskey, mango lassi, lemon, honey.', image: img('photo-1587314168485-3236d6710814') },
    ]},
  ],
  testimonials: [
    { name: 'Kiran T.', quote: 'Tandoor Nights is magic. The ambiance, the food, the cocktails — everything is perfectly orchestrated. We close the place every time.', rating: 5 },
    { name: 'Sophia L.', quote: 'The Seekh Kebab at midnight is a spiritual experience. I have never tasted anything like it.', rating: 5 },
    { name: 'Raj M.', quote: 'The Black Dal at 1am is their signature move. They have thought of everything. The best late-night restaurant in the city.', rating: 5 },
  ],
  features: ['Open Until 2am', 'Live Clay Tandoor', 'Craft Indian Cocktails', 'DJ Fridays & Saturdays'],
};

export default function TandoorNights() { return <RestaurantPage theme={theme} />; }

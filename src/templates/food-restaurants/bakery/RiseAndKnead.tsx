import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'rise-and-knead', name: 'Rise & Knead', tagline: 'Neighborhood bakery & coffee shop.',
  category: 'bakery',
  palette: { primary: '#f59e0b', secondary: '#1c1917', background: '#fafaf9', surface: '#ffffff', text: '#292524', textLight: '#78716c', heroOverlay: 'linear-gradient(to right, rgba(28,25,23,0.8), rgba(245,158,11,0.2))' },
  typography: { heading: '"DM Sans", sans-serif', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1509440159596-0249088772ff'), heroAlt: 'Freshly baked bread on a wooden board',
    story: img('photo-1541167760496-1628856ab772'), storyAlt: 'Barista pouring latte art next to a pastry',
    promo: img('photo-1555507036-ab1f4038808a'), promoAlt: 'Baker shaping dough',
    gallery: [
      { src: img('photo-1509440159596-0249088772ff'), alt: 'Bread' },
      { src: img('photo-1541167760496-1628856ab772'), alt: 'Coffee' },
      { src: img('photo-1555507036-ab1f4038808a'), alt: 'Baking' },
      { src: img('photo-1587314168485-3236d6710814'), alt: 'Muffins' },
      { src: img('photo-1608198093002-ad4e005484ec'), alt: 'Croissants' },
      { src: img('photo-1495147466023-ac5c588e2e94'), alt: 'Cookies' },
    ],
  },
  content: {
    heroHeadline: 'Good Morning.',
    heroSub: 'Start your day with warm muffins, fresh bread, and locally roasted coffee in a cozy neighborhood setting.',
    storyTitle: 'Your Daily Ritual.',
    storyBody: [
      'Rise & Knead is more than a bakery; it\'s the living room of our neighborhood. We bake everything in small batches throughout the day so you always get something warm.',
      'Pair our baked goods with our carefully sourced coffee, roasted just three blocks away. It\'s the perfect start to any day.',
    ],
    promoTitle: 'Morning Coffee Combo.',
    promoCTA: 'Order Ahead',
    ctaPrimary: 'Order Pickup', ctaSecondary: 'Our Menu',
    address: '10 Main Street, Suburbia',
    hours: 'Mon-Sun: 7AM - 3PM',
    phone: '(555) 111-2222',
  },
  menu: [
    { tab: 'Morning Pastries', items: [
      { name: 'Blueberry Streusel Muffin', price: '$4', desc: 'Loaded with wild blueberries and topped with buttery brown sugar streusel.', tags: ['Bestseller'], image: img('photo-1587314168485-3236d6710814') },
      { name: 'Cinnamon Roll', price: '$5', desc: 'Warm, gooey cinnamon roll topped with cream cheese icing.', image: img('photo-1608198093002-ad4e005484ec') },
    ]},
    { tab: 'Coffee & Espresso', items: [
      { name: 'Vanilla Bean Latte', price: '$5.50', desc: 'House espresso, steamed milk, real vanilla bean syrup.', image: img('photo-1541167760496-1628856ab772') },
    ]},
  ],
  testimonials: [
    { name: 'David H.', quote: 'The best muffins I have ever had. I stop by here every morning on my way to work.', rating: 5 },
    { name: 'Sarah B.', quote: 'Great coffee, friendly staff, and the cinnamon rolls are dangerously good.', rating: 5 },
  ],
  features: ['Local Coffee Roasters', 'Small Batch Baking', 'Cozy Seating', 'Free Wi-Fi'],
};

export default function RiseAndKnead() { return <RestaurantPage theme={theme} />; }

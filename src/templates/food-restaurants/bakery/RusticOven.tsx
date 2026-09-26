import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'rustic-oven', name: 'Rustic Oven', tagline: 'Wood-fired breads & rustic pies.',
  category: 'bakery',
  palette: { primary: '#b45309', secondary: '#451a03', background: '#fefce8', surface: '#ffffff', text: '#451a03', textLight: '#78350f', heroOverlay: 'linear-gradient(to right, rgba(69,26,3,0.8), rgba(180,83,9,0.2))' },
  typography: { heading: '"Rye", cursive', body: '"Lora", serif' },
  images: {
    hero: img('photo-1534620808146-d33bb39128b2'), heroAlt: 'Rustic bread cooling on a rack near a wood-fired oven',
    story: img('photo-1517433622965-0e62054fb4eb'), storyAlt: 'Baker scoring a loaf of bread before baking',
    promo: img('photo-1519915028121-7d3463d20b13'), promoAlt: 'Freshly baked fruit pie cooling on a windowsill',
    gallery: [
      { src: img('photo-1534620808146-d33bb39128b2'), alt: 'Rustic bread' },
      { src: img('photo-1517433622965-0e62054fb4eb'), alt: 'Scoring bread' },
      { src: img('photo-1519915028121-7d3463d20b13'), alt: 'Fruit pie' },
      { src: img('photo-1589367920969-ab8e050bfbc7'), alt: 'Baguette' },
      { src: img('photo-1509440159596-0249088772ff'), alt: 'Sourdough' },
      { src: img('photo-1555507036-ab1f4038808a'), alt: 'Flour dusting' },
    ],
  },
  content: {
    heroHeadline: 'Fire & Flour.',
    heroSub: 'Traditional wood-fired baking using heritage grains and slow fermentation.',
    storyTitle: 'Back to Basics.',
    storyBody: [
      'At Rustic Oven, we bake the way they did a hundred years ago. Our custom-built wood-fired oven gives our breads a dark, caramelized crust and a smoky depth of flavor that modern ovens can\'t replicate.',
      'We work directly with local farmers to mill our own heritage grains, ensuring every loaf is packed with nutrition and character.',
    ],
    promoTitle: 'Holiday Pies Available.',
    promoCTA: 'Reserve Yours',
    ctaPrimary: 'Order Loaves', ctaSecondary: 'Our Story',
    address: '55 Heritage Road, Old Town',
    hours: 'Thu-Sun: 8AM - 4PM',
    phone: '(555) 444-5555',
  },
  menu: [
    { tab: 'Wood-Fired Breads', items: [
      { name: 'Heritage Miche', price: '$12', desc: 'Large, dark-crusted country loaf made with whole wheat and rye.', tags: ['Signature'], image: img('photo-1534620808146-d33bb39128b2') },
      { name: 'Olive & Rosemary Fougasse', price: '$7', desc: 'Chewy flatbread stuffed with kalamata olives and fresh herbs.', image: img('photo-1589367920969-ab8e050bfbc7') },
    ]},
    { tab: 'Rustic Pies', items: [
      { name: 'Spiced Apple Pie', price: '$24', desc: 'Local heirloom apples, cinnamon, all-butter flaky crust.', image: img('photo-1519915028121-7d3463d20b13') },
    ]},
  ],
  testimonials: [
    { name: 'Robert W.', quote: 'The miche is incredible. It stays fresh for days and has so much complex flavor.', rating: 5 },
    { name: 'Elaine C.', quote: 'The wood-fired crust makes such a huge difference. I can never eat supermarket bread again.', rating: 5 },
  ],
  features: ['Wood-Fired Oven', 'Heritage Grains', 'Naturally Leavened', 'Seasonal Pies'],
};

export default function RusticOven() { return <RestaurantPage theme={theme} />; }

import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'golden-crumb', name: 'Golden Crumb', tagline: 'Artisanal breads & morning pastries.',
  category: 'bakery',
  palette: { primary: '#d97706', secondary: '#451a03', background: '#fffbeb', surface: '#ffffff', text: '#451a03', textLight: '#78350f', heroOverlay: 'linear-gradient(to right, rgba(69,26,3,0.8), rgba(217,119,6,0.2))' },
  typography: { heading: '"Playfair Display", serif', body: '"Lora", serif' },
  images: {
    hero: img('photo-1509440159596-0249088772ff'), heroAlt: 'Freshly baked artisan sourdough bread on a wooden table',
    story: img('photo-1555507036-ab1f4038808a'), storyAlt: 'Baker kneading fresh dough on a floured surface',
    promo: img('photo-1608198093002-ad4e005484ec'), promoAlt: 'Assortment of fresh croissants and pastries',
    gallery: [
      { src: img('photo-1509440159596-0249088772ff'), alt: 'Sourdough bread' },
      { src: img('photo-1555507036-ab1f4038808a'), alt: 'Kneading dough' },
      { src: img('photo-1608198093002-ad4e005484ec'), alt: 'Croissants' },
      { src: img('photo-1589367920969-ab8e050bfbc7'), alt: 'Baguettes' },
      { src: img('photo-1578985545062-69928b1d9587'), alt: 'Chocolate cake' },
      { src: img('photo-1495147466023-ac5c588e2e94'), alt: 'Macarons' },
    ],
  },
  content: {
    heroHeadline: 'Baked With Love.\nEvery Morning.',
    heroSub: 'Handcrafted sourdough, buttery croissants, and delicate pastries baked fresh before the sun comes up.',
    storyTitle: 'The Art of Sourdough.',
    storyBody: [
      'Golden Crumb started with a 100-year-old sourdough starter and a passion for traditional baking methods. We use only organic, stone-milled flour and allow our dough to ferment for 48 hours to develop its signature flavor.',
      'Our team of bakers arrives at 2 AM every day to ensure that when we open our doors, the shelves are filled with warm, crusty bread and delicate, flaky pastries.',
    ],
    promoTitle: 'Pre-order for Weekend.',
    promoCTA: 'Order Online',
    ctaPrimary: 'Order Pickup', ctaSecondary: 'View Menu',
    address: '42 Baker Street, West End',
    hours: 'Tue-Sun: 6AM - 2PM',
    phone: '(555) 222-3333',
  },
  menu: [
    { tab: 'Breads', items: [
      { name: 'Country Sourdough', price: '$8', desc: 'Our signature loaf, fermented for 48 hours for a complex flavor and thick crust.', tags: ['Signature'], image: img('photo-1509440159596-0249088772ff') },
      { name: 'French Baguette', price: '$4', desc: 'Classic Parisian style baguette, crisp outside, airy inside.', image: img('photo-1589367920969-ab8e050bfbc7') },
    ]},
    { tab: 'Pastries', items: [
      { name: 'Butter Croissant', price: '$4', desc: 'Flaky, buttery, and baked fresh every hour.', image: img('photo-1608198093002-ad4e005484ec') },
      { name: 'Almond Pain au Chocolat', price: '$5', desc: 'Twice-baked chocolate croissant filled with almond frangipane.', image: img('photo-1608198093002-ad4e005484ec') },
    ]},
    { tab: 'Cakes & Sweets', items: [
      { name: 'Salted Caramel Macaron', price: '$3', desc: 'Delicate almond shell filled with house-made salted caramel.', image: img('photo-1495147466023-ac5c588e2e94') },
      { name: 'Dark Chocolate Tart', price: '$6', desc: 'Rich chocolate ganache in a crisp pastry shell.', image: img('photo-1578985545062-69928b1d9587') },
    ]},
  ],
  testimonials: [
    { name: 'Sophie L.', quote: 'The best sourdough in the city. The crust is perfect and the crumb is so airy.', rating: 5 },
    { name: 'James W.', quote: 'I come here every Sunday for the almond croissants. They sell out fast for a reason.', rating: 5 },
  ],
  features: ['Organic Flour', '48-Hour Fermentation', 'Baked Fresh Daily', 'Custom Cake Orders'],
};

export default function GoldenCrumb() { return <RestaurantPage theme={theme} />; }

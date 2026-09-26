import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'local-plate', name: 'Local Plate', tagline: 'Farm-to-table meals, delivered locally.',
  category: 'food-delivery',
  palette: { primary: '#16a34a', secondary: '#064e3b', background: '#f0fdf4', surface: '#ffffff', text: '#064e3b', textLight: '#15803d', heroOverlay: 'linear-gradient(to right, rgba(6,78,59,0.9), rgba(22,163,74,0.2))' },
  typography: { heading: '"Source Serif Pro", serif', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1498837167922-41cfa6f318ba'), heroAlt: 'Freshly prepared healthy meal in eco-friendly packaging',
    story: img('photo-1540420773420-3366772f4999'), storyAlt: 'Fresh produce being prepped in a kitchen',
    promo: img('photo-1627308595229-7830f5c92f70'), promoAlt: 'Stack of compostable takeout containers',
    gallery: [
      { src: img('photo-1498837167922-41cfa6f318ba'), alt: 'Healthy meal bowl with grilled chicken and veggies' },
      { src: img('photo-1540420773420-3366772f4999'), alt: 'Chef chopping fresh greens' },
      { src: img('photo-1627308595229-7830f5c92f70'), alt: 'Eco friendly packaging ready for delivery' },
      { src: img('photo-1512621776951-a57141f2eefd'), alt: 'Vegetarian buddha bowl' },
      { src: img('photo-1467003909585-2f8a72700288'), alt: 'Grilled salmon plate' },
      { src: img('photo-1581009146145-b5ef050c2e1e'), alt: 'Delivery person holding a paper bag of food' },
    ],
  },
  content: {
    heroHeadline: 'Real Food.\nReal Fast.',
    heroSub: 'We partner with local farms and chefs to bring you healthy, sustainable, and delicious meals without the wait.',
    storyTitle: 'Rooted in the Community.',
    storyBody: [
      'Local Plate was founded on the belief that delivery food shouldn\'t just be fast food. We source our ingredients from farms within a 50-mile radius and prepare everything fresh daily.',
      'Our packaging is 100% compostable, and our delivery fleet is fully electric, minimizing our footprint while maximizing flavor.',
    ],
    promoTitle: 'Eat Well, Do Good.',
    promoCTA: 'See the Menu',
    ctaPrimary: 'Order Delivery', ctaSecondary: 'Our Mission',
    address: '100 Green Way, Downtown',
    hours: 'Mon-Sun: 10AM - 9PM',
    phone: 'App Only',
  },
  menu: [
    { tab: 'Seasonal Bowls', items: [
      { name: 'Harvest Chicken Bowl', price: '$15', desc: 'Grilled local chicken, quinoa, roasted root vegetables, apple cider vinaigrette.', tags: ['Bestseller'], image: img('photo-1498837167922-41cfa6f318ba') },
      { name: 'Farmers Market Vegan Bowl', price: '$14', desc: 'Mixed greens, roasted squash, pepitas, tahini dressing.', image: img('photo-1512621776951-a57141f2eefd') },
    ]},
    { tab: 'Plates', items: [
      { name: 'Wild Caught Salmon', price: '$18', desc: 'Sustainably caught salmon, wild rice, steamed broccoli.', image: img('photo-1467003909585-2f8a72700288') },
    ]},
  ],
  testimonials: [
    { name: 'Rachel H.', quote: 'I love knowing that my lunch is supporting local farmers. The food is always so fresh and vibrant.', rating: 5 },
    { name: 'Tom D.', quote: 'The Harvest Bowl is my favorite. Fast delivery and the compostable containers are a huge plus.', rating: 5 },
  ],
  features: ['Locally Sourced', 'Compostable Packaging', 'Electric Delivery Fleet', 'Healthy Options'],
};

export default function LocalPlate() { return <RestaurantPage theme={theme} />; }

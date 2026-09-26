import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'dash-eats', name: 'Dash Eats', tagline: 'Local favorites, delivered at lightning speed',
  category: 'food-delivery',
  palette: { primary: '#f43f5e', secondary: '#111827', background: '#f9fafb', surface: '#ffffff', text: '#1f2937', textLight: '#6b7280', heroOverlay: 'linear-gradient(to right, rgba(17,24,39,0.9), rgba(244,63,94,0.15))' },
  typography: { heading: '"Montserrat", sans-serif', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1526367790999-0150786686a2'), heroAlt: 'Delivery driver handing a hot pizza box to a customer at their door',
    story: img('photo-1584308972271-2b8146747b2c'), storyAlt: 'Chef handing a packaged order to a courier',
    promo: img('photo-1513104890138-7c749659a591'), promoAlt: 'Assortment of fast food delivery items spread on a table',
    gallery: [
      { src: img('photo-1526367790999-0150786686a2'), alt: 'Food delivery driver smiling with a thermal bag' },
      { src: img('photo-1584308972271-2b8146747b2c'), alt: 'Courier picking up multiple orders from a restaurant counter' },
      { src: img('photo-1513104890138-7c749659a591'), alt: 'Hot pizza in a delivery box on a kitchen island' },
      { src: img('photo-1555396273-367ea4eb4db5'), alt: 'Restaurant packaging stacked and ready for dispatch' },
      { src: img('photo-1628840042765-356cda07504e'), alt: 'Customer tracking their food delivery on a smartphone app' },
      { src: img('photo-1585937421612-70a008356fbe'), alt: 'Electric bike courier navigating city streets at night' },
    ],
  },
  content: {
    heroHeadline: 'Your City\'s Best.\nAt Your Door.',
    heroSub: 'From the best local food trucks to five-star restaurants. We deliver the food you love, faster than anyone else.',
    storyTitle: 'Supporting Local.',
    storyBody: [
      'Dash Eats was built to help local restaurants reach more people without losing their margins. We take pride in our hyper-local logistics network that ensures food stays hot and restaurants stay profitable.',
      'Our couriers are full-time employees, provided with the best thermal equipment in the industry to guarantee your food arrives exactly as the chef intended.',
    ],
    promoTitle: 'Craving Something?\nWe Got It.',
    promoCTA: 'Download App',
    ctaPrimary: 'Order Now', ctaSecondary: 'Partner With Us',
    address: 'Citywide Coverage',
    hours: '24/7 Delivery Available',
    phone: 'Support via App',
  },
  menu: [
    { tab: 'Top Rated', items: [
      { name: 'Spicy Chicken Sandwich', price: '$12', desc: 'From Big Bird\'s Coop. Crispy fried chicken, pickles, spicy mayo.', tags: ['Trending'], image: img('photo-1626082896492-766af4eb65ed') },
      { name: 'Truffle Mushroom Burger', price: '$16', desc: 'From The Local Grind. Wagyu beef, swiss cheese, truffle aioli.', tags: ['Bestseller'], image: img('photo-1568901346375-23c9450c58cd') },
      { name: 'Pad Thai Noodles', price: '$14', desc: 'From Bangkok Street. Rice noodles, egg, peanuts, bean sprouts, tamarind sauce.', image: img('photo-1559314809-0d155014e29e') },
    ]},
    { tab: 'Fast Delivery', items: [
      { name: 'Classic Pepperoni Pizza', price: '$20', desc: 'From Slice Hub. 18" pie with cup-and-char pepperoni.', image: img('photo-1628840042765-356cda07504e') },
      { name: 'Vegan Power Bowl', price: '$15', desc: 'From Green Leaf. Quinoa, roasted sweet potato, kale, tahini.', image: img('photo-1512621776951-a57141f2eefd') },
    ]},
  ],
  testimonials: [
    { name: 'Jessica M.', quote: 'Dash Eats is way faster than the other apps. My food is always hot and the drivers are super friendly.', rating: 5 },
    { name: 'Kevin L.', quote: 'I love that they partner with the small local spots that don\'t do delivery themselves.', rating: 5 },
    { name: 'Amanda P.', quote: 'The tracking is incredibly accurate and the food always arrives exactly when they say it will.', rating: 5 },
  ],
  features: ['Under 30 Min Delivery', 'Real-time GPS Tracking', 'Hot & Cold Thermal Bags', 'Local Restaurant Partners'],
};

export default function DashEats() { return <RestaurantPage theme={theme} />; }

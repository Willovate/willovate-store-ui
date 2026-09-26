import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'hungry-hero', name: 'Hungry Hero', tagline: 'Late night cravings, delivered.',
  category: 'food-delivery',
  palette: { primary: '#f59e0b', secondary: '#1c1917', background: '#0c0a09', surface: '#292524', text: '#fafaf9', textLight: '#a8a29e', heroOverlay: 'linear-gradient(to top, rgba(12,10,9,0.95), rgba(245,158,11,0.15))' },
  typography: { heading: '"Rubik", sans-serif', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1604908176997-125f25cc6f3d'), heroAlt: 'Loaded nachos being enjoyed late at night',
    story: img('photo-1541592106381-b31e9677c0e5'), storyAlt: 'Fries and burger in takeout packaging',
    promo: img('photo-1551024601-bec78aea704b'), promoAlt: 'Milkshake in a delivery cup',
    gallery: [
      { src: img('photo-1604908176997-125f25cc6f3d'), alt: 'Cheesy loaded nachos for late night' },
      { src: img('photo-1541592106381-b31e9677c0e5'), alt: 'Crispy french fries ready for delivery' },
      { src: img('photo-1551024601-bec78aea704b'), alt: 'Chocolate milkshake with whipped cream' },
      { src: img('photo-1568901346375-23c9450c58cd'), alt: 'Double cheeseburger in foil wrapper' },
      { src: img('photo-1628840042765-356cda07504e'), alt: 'Pizza slice with pepperoni' },
      { src: img('photo-1585937421612-70a008356fbe'), alt: 'Courier on a bike at night' },
    ],
  },
  content: {
    heroHeadline: 'We Save The Night.',
    heroSub: 'When the party is winding down or the study session is going long, Hungry Hero delivers the comfort food you need.',
    storyTitle: 'Open When They Close.',
    storyBody: [
      'Finding good food after 10 PM shouldn\'t be a struggle. We partner with the best late-night kitchens in the city to bring you hot, satisfying meals when most places have turned off their grills.',
      'From loaded fries to massive burgers to sweet milkshakes, our network of ghost kitchens and late-night spots are ready to cure your midnight munchies.',
    ],
    promoTitle: 'Late Night Fees? Never.',
    promoCTA: 'Start Order',
    ctaPrimary: 'Order Delivery', ctaSecondary: 'View Menu',
    address: 'Citywide Delivery Network',
    hours: 'Mon-Sun: 9PM - 4AM',
    phone: 'App Only',
  },
  menu: [
    { tab: 'The Classics', items: [
      { name: 'The Hero Burger', price: '$14', desc: 'Double patty, bacon, cheddar, onion rings, hero sauce, brioche bun.', tags: ['Bestseller'], image: img('photo-1568901346375-23c9450c58cd') },
      { name: 'Late Night Nachos', price: '$12', desc: 'Tortilla chips, queso, pico de gallo, jalapeños, sour cream.', image: img('photo-1604908176997-125f25cc6f3d') },
    ]},
    { tab: 'Sweet Tooth', items: [
      { name: 'Cookies & Cream Shake', price: '$7', desc: 'Thick milkshake loaded with cookie pieces and whipped cream.', image: img('photo-1551024601-bec78aea704b') },
      { name: 'Warm Brownie Sundae', price: '$9', desc: 'Warm fudge brownie, vanilla bean ice cream, caramel sauce.', image: img('photo-1606313564200-e75d5e30476c') },
    ]},
  ],
  testimonials: [
    { name: 'Jake B.', quote: 'Hungry Hero is my go-to after a night out. Always fast, always hits the spot.', rating: 5 },
    { name: 'Emily S.', quote: 'The fact that I can get a decent burger at 3 AM without surge pricing is amazing.', rating: 5 },
    { name: 'Sam T.', quote: 'Drivers are always nice, even in the middle of the night. Great service.', rating: 5 },
  ],
  features: ['Late Night Delivery', 'No Surge Pricing', 'Fast ETA', 'Comfort Food Specialists'],
};

export default function HungryHero() { return <RestaurantPage theme={theme} />; }

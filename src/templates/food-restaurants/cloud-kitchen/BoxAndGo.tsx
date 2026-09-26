import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'box-and-go', name: 'Box & Go', tagline: 'Chef-crafted bentos & bowls, delivered fast',
  category: 'cloud-kitchen',
  palette: { primary: '#f97316', secondary: '#18181b', background: '#fafafa', surface: '#ffffff', text: '#18181b', textLight: '#71717a', heroOverlay: 'linear-gradient(to right, rgba(24,24,27,0.9), rgba(249,115,22,0.15))' },
  typography: { heading: '"Sora", sans-serif', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1548943487-a2e4d43b4850'), heroAlt: 'Sleek eco-friendly bento box filled with vibrant salmon and vegetables',
    story: img('photo-1583394838336-acd977736f90'), storyAlt: 'Chef packing multiple delivery boxes in a modern stainless steel kitchen',
    promo: img('photo-1627308595229-7830f5c92f70'), promoAlt: 'Stack of branded delivery boxes ready for dispatch',
    gallery: [
      { src: img('photo-1548943487-a2e4d43b4850'), alt: 'Miso glazed salmon bento with edamame and purple cabbage' },
      { src: img('photo-1583394838336-acd977736f90'), alt: 'High-speed assembly line in a modern cloud kitchen' },
      { src: img('photo-1627308595229-7830f5c92f70'), alt: 'Eco-friendly kraft paper packaging with Box & Go branding' },
      { src: img('photo-1546069901-ba9599a7e63c'), alt: 'Healthy grain bowl with avocado, egg, and roasted vegetables' },
      { src: img('photo-1512621776951-a57141f2eefd'), alt: 'Vibrant vegan salad bowl with tahini dressing' },
      { src: img('photo-1581009146145-b5ef050c2e1e'), alt: 'Delivery driver picking up orders in insulated bags' },
    ],
  },
  content: {
    heroHeadline: 'Restaurant Quality.\nCouch Location.',
    heroSub: 'No dining room. No waiters. Just award-winning chefs cooking incredible food designed specifically to travel perfectly to your door.',
    storyTitle: 'Designed for Delivery.',
    storyBody: [
      'Box & Go was built on a simple premise: most restaurant food gets ruined during delivery. We changed the paradigm by designing our menu backwards — starting with the delivery box.',
      'Every dish is temperature-tested, every sauce is packed separately, and every grain is chosen because it holds heat without getting soggy. It arrives exactly how the chef plated it.',
    ],
    promoTitle: 'Ready in 15 Min.\nHot at Your Door.',
    promoCTA: 'Order Now',
    ctaPrimary: 'Order Delivery', ctaSecondary: 'Order Pickup',
    address: 'Kitchen 4, 100 Cloud Blvd, San Francisco, CA 94103',
    hours: 'Mon–Sun: 10am – 10pm · Delivery Only',
    phone: 'Support via App',
  },
  menu: [
    { tab: 'Bento Boxes', items: [
      { name: 'Miso Salmon Bento', price: '$18', desc: 'Glazed Atlantic salmon, sushi rice, wakame salad, edamame, pickled ginger.', tags: ['Bestseller'], image: img('photo-1467003909585-2f8a72700288') },
      { name: 'Katsu Chicken Bento', price: '$16', desc: 'Crispy chicken breast, tonkatsu sauce, shredded cabbage, steamed rice.', image: img('photo-1544025162-d76538a679db') },
      { name: 'Teriyaki Tofu Bento', price: '$14', desc: 'Charred tofu, broccolini, brown rice, house teriyaki sauce.', tags: ['Vegan'], image: img('photo-1512621776951-a57141f2eefd') },
    ]},
    { tab: 'Grain Bowls', items: [
      { name: 'Spicy Tuna Poke Bowl', price: '$17', desc: 'Ahi tuna, spicy mayo, avocado, mango, crispy shallots, sushi rice.', tags: ['Cold Bowl'], image: img('photo-1546069901-ba9599a7e63c') },
      { name: 'The Harvest Bowl', price: '$15', desc: 'Quinoa, roasted sweet potato, kale, goat cheese, balsamic vinaigrette.', tags: ['Healthy'], image: img('photo-1512621776951-a57141f2eefd') },
    ]},
    { tab: 'Extras', items: [
      { name: 'Pork Gyoza (5 pcs)', price: '$7', desc: 'Pan-fried with chili soy dipping sauce.', image: img('photo-1544025162-d76538a679db') },
      { name: 'Matcha Brownie', price: '$4', desc: 'Fudgy dark chocolate and matcha swirl.', image: img('photo-1606313564200-e75d5e30476c') },
    ]},
  ],
  testimonials: [
    { name: 'Sarah J.', quote: 'I order Box & Go at least twice a week. The food is always piping hot, the packaging is brilliant, and the salmon is perfectly cooked.', rating: 5 },
    { name: 'Mike T.', quote: 'Finally a delivery option that doesn\'t arrive soggy. The way they separate the sauces and components is genius.', rating: 5 },
    { name: 'Emily L.', quote: 'The Spicy Tuna Poke is my go-to work lunch. Fast, fresh, and doesn\'t make me sleepy at 2pm.', rating: 5 },
  ],
  features: ['Temperature-Tested Packaging', '100% Compostable Boxes', '15-Minute Kitchen Prep', 'App-Only Exclusives'],
};

export default function BoxAndGo() { return <RestaurantPage theme={theme} />; }

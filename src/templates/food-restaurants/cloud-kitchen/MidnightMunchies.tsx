import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'midnight-munchies', name: 'Midnight Munchies', tagline: 'Curing late-night cravings with chaotic comfort food',
  category: 'cloud-kitchen',
  palette: { primary: '#8b5cf6', secondary: '#18181b', background: '#09090b', surface: '#27272a', text: '#fafafa', textLight: '#a1a1aa', heroOverlay: 'linear-gradient(to right, rgba(9,9,11,0.95), rgba(139,92,246,0.2))' },
  typography: { heading: '"Bangers", cursive', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1604908176997-125f25cc6f3d'), heroAlt: 'Massive loaded nachos with cheese, jalapeños, and pulled pork',
    story: img('photo-1541592106381-b31e9677c0e5'), storyAlt: 'Chef squeezing cheese sauce over loaded fries',
    promo: img('photo-1572802419224-296b0aeee0d9'), promoAlt: 'Crazy dessert loaded with brownies, ice cream, and caramel',
    gallery: [
      { src: img('photo-1604908176997-125f25cc6f3d'), alt: 'Pulled pork nachos dripping with liquid cheese' },
      { src: img('photo-1541592106381-b31e9677c0e5'), alt: 'Mac and cheese bites being fried to golden brown' },
      { src: img('photo-1572802419224-296b0aeee0d9'), alt: 'Fries loaded with bacon, ranch, and cheddar' },
      { src: img('photo-1627308595229-7830f5c92f70'), alt: 'Delivery bags packed with late night snacks' },
      { src: img('photo-1551024601-bec78aea704b'), alt: 'Milkshake loaded with an entire slice of cake on top' },
      { src: img('photo-1568901346375-23c9450c58cd'), alt: 'Grilled cheese sandwich stuffed with mac and cheese' },
    ],
  },
  content: {
    heroHeadline: 'Cravings.\nHandled.',
    heroSub: 'When it is 1 AM and you need loaded fries, deep-fried mac & cheese, and a milkshake the size of your head. We are awake.',
    storyTitle: 'We Make the Crazy Stuff.',
    storyBody: [
      'Midnight Munchies isn\'t about fine dining. It\'s about creating the exact food you daydream about when you\'re hungry at night. We took classic comfort foods and smashed them together.',
      'Mac and cheese inside a grilled cheese? Yes. Pulled pork on top of nachos on top of fries? Obviously. We judge no one. We just deliver the goods.',
    ],
    promoTitle: 'Don\'t Fight the Craving.',
    promoCTA: 'Order the Madness',
    ctaPrimary: 'Order Now', ctaSecondary: 'See the Menu',
    address: 'Dark Kitchen 9, University District',
    hours: 'Wed–Sun: 6pm – 4am',
    phone: 'App Only',
  },
  menu: [
    { tab: 'The Crazy Stuff', items: [
      { name: 'Mac & Cheese Grilled Cheese', price: '$12', desc: 'Creamy mac and cheese stuffed between two slices of buttered Texas toast, with extra cheddar.', tags: ['Carb Loaded'], image: img('photo-1568901346375-23c9450c58cd') },
      { name: 'Trash Can Nachos', price: '$15', desc: 'Tortilla chips, pulled pork, queso, jalapeños, baked beans, sour cream, BBQ sauce.', tags: ['Shareable'], image: img('photo-1604908176997-125f25cc6f3d') },
      { name: 'Pizza Fries', price: '$10', desc: 'Crinkle fries, marinara, melted mozzarella, pepperoni crisp.', image: img('photo-1572802419224-296b0aeee0d9') },
    ]},
    { tab: 'Deep Fried', items: [
      { name: 'Fried Mac Bites (6)', price: '$8', desc: 'Breaded and fried mac and cheese, served with ranch.', image: img('photo-1541592106381-b31e9677c0e5') },
      { name: 'Mozzarella Sticks (8)', price: '$9', desc: 'Thick cut, house-breaded, marinara dip.', image: img('photo-1541592106381-b31e9677c0e5') },
    ]},
    { tab: 'Sugar Coma', items: [
      { name: 'The Cake Shake', price: '$11', desc: 'Vanilla shake blended with an entire slice of funfetti cake.', tags: ['Signature'], image: img('photo-1551024601-bec78aea704b') },
      { name: 'Deep Fried Oreos', price: '$7', desc: '5 battered and fried Oreos, powdered sugar, chocolate dip.', image: img('photo-1551024601-bec78aea704b') },
    ]},
  ],
  testimonials: [
    { name: 'Tyler B.', quote: 'The Mac & Cheese Grilled Cheese healed my soul at 2 AM after a rough exam week. Absolute lifesavers.', rating: 5 },
    { name: 'Jessica M.', quote: 'The Cake Shake is ridiculous and I love it. Fast delivery and the food was still super hot.', rating: 5 },
    { name: 'Marcus D.', quote: 'Trash Can Nachos feed like three people. Perfect for game night when no one wants to cook.', rating: 5 },
  ],
  features: ['Open Until 4AM', 'App Exclusive Items', 'Discreet Packaging', 'Comfort Food Only'],
};

export default function MidnightMunchies() { return <RestaurantPage theme={theme} />; }

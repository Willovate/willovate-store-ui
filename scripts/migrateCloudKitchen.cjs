const fs = require('fs');
const files = [
  {
    path: 'src/templates/food-restaurants/cloud-kitchen/DarkKitchenPro.tsx',
    id: 'dark-kitchen-pro',
    name: 'Kitchen X',
    tagline: 'One Kitchen. Five Brands.',
    img: 'photo-1556911220-bff31c812dba',
    heroSub: 'Mix and match from any of our virtual restaurants into a single delivery.'
  },
  {
    path: 'src/templates/food-restaurants/cloud-kitchen/GhostChef.tsx',
    id: 'ghost-chef',
    name: 'Ghost Kitchen',
    tagline: 'Chef-driven delivery without the dining room.',
    img: 'photo-1556740749-887f6717d7e4',
    heroSub: 'Elevated culinary experiences delivered directly to your door.'
  },
  {
    path: 'src/templates/food-restaurants/cloud-kitchen/FreshBatch.tsx',
    id: 'fresh-batch',
    name: 'Urban Batch',
    tagline: 'Fresh meals produced daily in our urban kitchen.',
    img: 'photo-1600891964092-4316c2883c44',
    heroSub: 'We cook in small batches every hour to ensure maximum freshness.'
  },
  {
    path: 'src/templates/food-restaurants/cloud-kitchen/FlameHub.tsx',
    id: 'flame-hub',
    name: 'Fresh Dispatch',
    tagline: 'Hot food dispatched straight from the fire.',
    img: 'photo-1547592180-85f173990554',
    heroSub: 'Our dispatch system ensures your meal leaves the kitchen the second it is boxed.'
  }
];

files.forEach(f => {
  const code = `import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => \`https://images.unsplash.com/\${id}?auto=format&fit=crop&w=1600&q=85\`;

const theme: RestaurantThemeConfig = {
  id: '${f.id}', name: '${f.name}', tagline: '${f.tagline}',
  category: 'cloud-kitchen',
  palette: { primary: '#f97316', secondary: '#18181b', background: '#fafafa', surface: '#ffffff', text: '#18181b', textLight: '#71717a', heroOverlay: 'linear-gradient(to right, rgba(24,24,27,0.9), rgba(249,115,22,0.15))' },
  typography: { heading: '"Sora", sans-serif', body: '"Inter", sans-serif' },
  images: {
    hero: img('${f.img}'), heroAlt: 'Cloud kitchen setup',
    story: img('photo-1556740749-887f6717d7e4'), storyAlt: 'Chef packing delivery boxes',
    promo: img('photo-1600891964092-4316c2883c44'), promoAlt: 'Stack of delivery boxes',
    gallery: [
      { src: img('${f.img}'), alt: 'Signature meal' },
      { src: img('photo-1556740749-887f6717d7e4'), alt: 'Kitchen operations' },
      { src: img('photo-1600891964092-4316c2883c44'), alt: 'Delivery packaging' },
      { src: img('photo-1546069901-ba9599a7e63c'), alt: 'Fresh grain bowl' },
      { src: img('photo-1512621776951-a57141f2eefd'), alt: 'Healthy salad' },
      { src: img('photo-1528712306091-ed0763094c98'), alt: 'Delivery driver' },
    ],
  },
  content: {
    heroHeadline: '${f.tagline}',
    heroSub: '${f.heroSub}',
    storyTitle: 'Designed for Delivery.',
    storyBody: [
      'We built our kitchen entirely around the delivery experience. Every dish is temperature-tested and packed to travel.',
      'Our dispatch technology ensures your food goes straight from the pan to the driver, minimizing wait times.'
    ],
    promoTitle: 'Ready in 15 Min.',
    promoCTA: 'Order Now',
    ctaPrimary: 'Order Delivery', ctaSecondary: 'Order Pickup',
    address: 'Cloud Kitchen Hub, Metropolis Center',
    hours: 'Mon–Sun: 10am – 2am',
    phone: 'Support via App',
  },
  menu: [
    { tab: 'Bento Boxes', items: [
      { name: 'Miso Salmon Bento', price: '$18', desc: 'Glazed Atlantic salmon, sushi rice, wakame salad.', tags: ['Bestseller'], image: img('photo-1551183053-bf91a1d81141') },
      { name: 'Katsu Chicken Bento', price: '$16', desc: 'Crispy chicken breast, tonkatsu sauce, steamed rice.', image: img('photo-1529193591184-b1d58069ecdd') },
    ]},
    { tab: 'Grain Bowls', items: [
      { name: 'Spicy Tuna Poke Bowl', price: '$17', desc: 'Ahi tuna, spicy mayo, avocado, mango.', tags: ['Cold Bowl'], image: img('photo-1546069901-ba9599a7e63c') },
    ]},
  ],
  testimonials: [
    { name: 'Sarah J.', quote: 'The food is always piping hot and the packaging is brilliant.', rating: 5 },
    { name: 'Mike T.', quote: 'Finally a delivery option that doesn\\'t arrive soggy.', rating: 5 },
  ],
  features: ['Temperature-Tested Packaging', '15-Minute Kitchen Prep', 'App-Only Exclusives'],
};

export default function ${'${f.path.split(\'/\').pop().replace(\'.tsx\', \'\')}'}() {
  return <RestaurantPage config={theme} />;
}
`;
  fs.writeFileSync(f.path, code);
  console.log('Migrated', f.path);
});

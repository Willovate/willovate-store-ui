import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'ghost-burger', name: 'Ghost Burger', tagline: 'Smashburgers & shakes, appearing only at night',
  category: 'cloud-kitchen',
  palette: { primary: '#eab308', secondary: '#000000', background: '#0a0a0a', surface: '#171717', text: '#ffffff', textLight: '#a3a3a3', heroOverlay: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 100%)' },
  typography: { heading: '"Archivo Black", sans-serif', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1568901346375-23c9450c58cd'), heroAlt: 'Double smashburger with melting cheese in dark moody lighting',
    story: img('photo-1550547660-d9450f859349'), storyAlt: 'Chef smashing burgers on a hot flat top grill',
    promo: img('photo-1572802419224-296b0aeee0d9'), promoAlt: 'Stack of loaded cheese fries in a takeout box',
    gallery: [
      { src: img('photo-1568901346375-23c9450c58cd'), alt: 'Double smashburger with dripping American cheese and special sauce' },
      { src: img('photo-1550547660-d9450f859349'), alt: 'Stainless steel flat top grill loaded with sizzling burger patties' },
      { src: img('photo-1572802419224-296b0aeee0d9'), alt: 'Crinkle cut fries covered in cheese sauce, bacon, and scallions' },
      { src: img('photo-1586190848861-99aa4a171e90'), alt: 'Spicy chicken sandwich with pickles and ghost pepper mayo' },
      { src: img('photo-1551024601-bec78aea704b'), alt: 'Thick chocolate milkshake with whipped cream in a takeout cup' },
      { src: img('photo-1594212691516-436fecf5ef74'), alt: 'Neon Ghost Burger delivery bag handed to a courier in the dark' },
    ],
  },
  content: {
    heroHeadline: 'Here for a Good Time.\nNot a Long Time.',
    heroSub: 'The kitchen opens at 8 PM. We smash burgers until we sell out. We exist only on your phone and in your stomach.',
    storyTitle: 'No Dine-In. No Rules.',
    storyBody: [
      'Ghost Burger was created as an after-hours experiment by chefs who wanted to make the perfect late-night smashburger. No dining room overhead, no fancy plates, just premium beef and hot flat tops.',
      'We use a proprietary blend of chuck, brisket, and short rib. We smash it thin so the edges get crispy. We wrap it in foil so it steams on the way to your house.',
    ],
    promoTitle: 'Droping at 8PM.\nDon\'t Miss Out.',
    promoCTA: 'Order Delivery',
    ctaPrimary: 'Order Now', ctaSecondary: 'View Menu',
    address: 'Ghost Kitchen Hub, Downtown',
    hours: 'Mon–Sun: 8pm – 3am (Or until sold out)',
    phone: 'App Only',
  },
  menu: [
    { tab: 'Burgers', items: [
      { name: 'The OG Ghost', price: '$12', desc: 'Double smash patty, American cheese, grilled onions, pickles, ghost sauce, potato bun.', tags: ['Signature'], image: img('photo-1568901346375-23c9450c58cd') },
      { name: 'Spicy Poltergeist', price: '$14', desc: 'Crispy fried chicken breast, ghost pepper jack, jalapeño slaw, spicy mayo.', tags: ['Spicy'], image: img('photo-1586190848861-99aa4a171e90') },
      { name: 'Truffle Phantom', price: '$15', desc: 'Double smash patty, swiss, roasted mushrooms, truffle aioli, crispy onions.', image: img('photo-1568901346375-23c9450c58cd') },
    ]},
    { tab: 'Sides', items: [
      { name: 'Ectoplasm Fries', price: '$8', desc: 'Crinkle cut fries loaded with green chili cheese sauce and bacon.', tags: ['Messy'], image: img('photo-1572802419224-296b0aeee0d9') },
      { name: 'Classic Crinkle Fries', price: '$5', desc: 'Served with a side of ghost sauce.', image: img('photo-1572802419224-296b0aeee0d9') },
    ]},
    { tab: 'Shakes', items: [
      { name: 'Midnight Chocolate', price: '$7', desc: 'Dark chocolate shake, brownie chunks.', image: img('photo-1551024601-bec78aea704b') },
      { name: 'Vanilla Bean Spook', price: '$7', desc: 'Classic vanilla bean with caramel drizzle.', image: img('photo-1551024601-bec78aea704b') },
    ]},
  ],
  testimonials: [
    { name: 'Dan W.', quote: 'I order this every Friday at midnight. The crispy edges on the burgers are insane. Best late-night food period.', rating: 5 },
    { name: 'Chloe B.', quote: 'The Ectoplasm fries are a guilty pleasure I refuse to feel guilty about.', rating: 5 },
    { name: 'Ryan G.', quote: 'Fast delivery, burger was still hot, and the bun was perfectly squishy from the foil wrapper.', rating: 5 },
  ],
  features: ['Late Night Only', 'Premium Beef Blend', 'Foil Wrapped for Heat', 'Contactless Delivery'],
};

export default function GhostBurger() { return <RestaurantPage theme={theme} />; }

import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'pie-lab', name: 'Pie Lab', tagline: 'Experimental craft pizza for the adventurous palate',
  category: 'pizza',
  palette: { primary: '#7c3aed', secondary: '#0f0f1a', background: '#f8f7ff', surface: '#ffffff', text: '#0f0f1a', textLight: '#6b7280', heroOverlay: 'linear-gradient(to bottom, rgba(15,15,26,0.7) 0%, rgba(124,58,237,0.3) 100%)' },
  typography: { heading: '"Space Grotesk", sans-serif', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1476224203421-9ac39bcb3327'), heroAlt: 'Creative gourmet pizza with unconventional toppings and colorful garnishes',
    story: img('photo-1534432182912-63863115e106'), storyAlt: 'Chef carefully crafting an experimental pizza in a modern kitchen',
    promo: img('photo-1568901346375-23c9450c58cd'), promoAlt: 'Artisan pizza with creative toppings on a dark stone surface',
    gallery: [
      { src: img('photo-1476224203421-9ac39bcb3327'), alt: 'Creative gourmet pizza with colorful, unconventional toppings' },
      { src: img('photo-1594007654729-407eedc4be65'), alt: 'Chef applying finishing touches to an experimental pizza creation' },
      { src: img('photo-1571407970349-bc81e7e96d47'), alt: 'Artisanal pizza sliced on a marble cutting board' },
      { src: img('photo-1588315029754-2dd089d39a1a'), alt: 'Modern pizza dough in different stages of preparation' },
      { src: img('photo-1513104890138-7c749659a591'), alt: 'Pizza being stretched with unique technique' },
      { src: img('photo-1604382354936-07c5d9983bd3'), alt: 'Thin crust pizza with exotic mushroom toppings' },
    ],
  },
  content: {
    heroHeadline: 'Pizza is a Canvas.',
    heroSub: 'At Pie Lab, every pizza is an experiment. We challenge tradition, celebrate creativity, and bake outside the box — literally.',
    storyTitle: 'Where Science Meets the Oven.',
    storyBody: [
      'Pie Lab was founded by two food scientists who got tired of predictable menus. We treat each pizza like a lab project — testing new fermentation methods, unusual toppings, and unexpected flavor combinations.',
      'Our rotating seasonal menu ensures no two visits are the same. Come in weekly and discover something completely new.',
    ],
    promoTitle: 'New Menu.\nEvery Month.',
    promoCTA: 'See This Month\'s Lab',
    ctaPrimary: 'Join the Lab', ctaSecondary: 'See Menu',
    address: '42 Innovation Ave, SoHo, NY 10012',
    hours: 'Wed–Mon: 5pm – 12am | Closed Tuesday',
    phone: '+1 (212) 555-0388',
  },
  menu: [
    { tab: 'Lab Series', items: [
      { name: 'Miso Mushroom', price: '$24', desc: 'White miso base, wild mushroom medley, truffle oil, crispy shallots.', tags: ['Umami', 'Vegan'], image: img('photo-1578985545062-69928b1d9587') },
      { name: 'Korean BBQ', price: '$26', desc: 'Gochujang sauce, bulgogi beef, pickled daikon, sesame, scallions.', tags: ['Fusion', 'Spicy'], image: img('photo-1592415486689-125cbbfcbee2') },
      { name: 'Fig & Prosciutto', price: '$25', desc: 'Honey-whipped ricotta, fresh fig, prosciutto crudo, arugula.', tags: ['Sweet-Savory'], image: img('photo-1592415486689-125cbbfcbee2') },
    ]},
    { tab: 'Classics Remixed', items: [
      { name: 'Pepperoni Noir', price: '$22', desc: 'Squid ink dough, spicy pepperoni, smoked mozzarella, basil oil.', tags: ['Bold'], image: img('photo-1588315029754-2dd089d39a1a') },
      { name: 'The Margherita 2.0', price: '$20', desc: 'Roasted tomato gel, burrata, micro basil, balsamic reduction.', tags: ['Elevated Classic'], image: img('photo-1555396273-367ea4eb4db5') },
    ]},
    { tab: 'Dessert Pies', items: [
      { name: 'Nutella & Strawberry', price: '$14', desc: 'Sweet dough base, Nutella, fresh strawberry, powdered sugar.', tags: ['Sweet'], image: img('photo-1555396273-367ea4eb4db5') },
      { name: 'S\'mores Pizza', price: '$15', desc: 'Graham cracker base, Nutella, toasted marshmallow, chocolate drizzle.', tags: ['Indulgent'] },
    ]},
  ],
  testimonials: [
    { name: 'Priya K.', quote: 'The Korean BBQ pizza broke my brain in the best way. I never would have ordered it, but my friend made me and now it\'s my #1.', rating: 5 },
    { name: 'Daniel C.', quote: 'Every visit is a different experience. I have been coming here monthly since they opened and I have never had the same pizza twice.', rating: 5 },
    { name: 'Emma W.', quote: 'The squid ink dough on the Pepperoni Noir is stunning — visually and taste-wise. True craft.', rating: 5 },
  ],
  features: ['Monthly Rotating Menu', 'Craft Fermentation', 'Zero Artificial Ingredients', 'Pairing Nights'],
};

export default function PieLab() { return <RestaurantPage theme={theme} />; }

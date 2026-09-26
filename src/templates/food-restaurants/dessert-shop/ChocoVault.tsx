import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'choco-vault', name: 'ChocoVault', tagline: 'Artisan chocolate & dessert atelier',
  category: 'dessert',
  palette: { primary: '#92400e', secondary: '#1c0a00', background: '#fdf3e3', surface: '#fff8f0', text: '#1c0a00', textLight: '#92400e', heroOverlay: 'linear-gradient(to right, rgba(28,10,0,0.9), rgba(146,64,14,0.2))' },
  typography: { heading: '"Playfair Display", serif', body: '"Lato", sans-serif' },
  images: {
    hero: img('photo-1549007994-cb92caebd54b'), heroAlt: 'Artisan chocolate bonbons in metallic colors arranged on black slate',
    story: img('photo-1606313564200-e75d5e30476c'), storyAlt: 'Chocolatier tempering dark chocolate on a marble slab',
    promo: img('photo-1578985545062-69928b1d9587'), promoAlt: 'Layered chocolate cake with ganache drip and gold leaf',
    gallery: [
      { src: img('photo-1549007994-cb92caebd54b'), alt: 'Assorted artisan chocolate bonbons with metallic and floral finishes' },
      { src: img('photo-1606313564200-e75d5e30476c'), alt: 'Chocolatier hand-painting a chocolate truffle with edible gold' },
      { src: img('photo-1578985545062-69928b1d9587'), alt: 'Tall layered chocolate cake with dark ganache drip' },
      { src: img('photo-1587314168485-3236d6710814'), alt: 'Hot chocolate being poured into a cup with cream and cacao' },
      { src: img('photo-1568702846914-96b305d2aaeb'), alt: 'Dark chocolate bark with sea salt and dried fruits' },
      { src: img('photo-1599785209707-a456fc1337bb'), alt: 'Chocolate lava cake breaking open with molten center' },
    ],
  },
  content: {
    heroHeadline: 'Where Chocolate\nIs the Religion.',
    heroSub: 'Single-origin dark chocolate. Hand-painted bonbons. Layered cakes. Every piece crafted to be as beautiful as it is delicious.',
    storyTitle: 'The Vault Holds the Finest.',
    storyBody: [
      'ChocoVault was founded by master chocolatier Elise Dubois after 12 years at the finest patisseries in Brussels and Paris. Every chocolate she makes carries those years of perfection.',
      'We use only single-origin cacao sourced directly from farms in Ecuador, Madagascar, and Ghana. No compound chocolate. No shortcuts. Pure cocoa butter and care.',
    ],
    promoTitle: 'Gift Boxes. Made With Love.',
    promoCTA: 'Shop Chocolate Gifts',
    ctaPrimary: 'Shop Now', ctaSecondary: 'Visit the Atelier',
    address: '8 Cocoa Lane, West Village, NY 10014',
    hours: 'Tue–Sun: 10am – 8pm · Workshops on Saturdays',
    phone: '+1 (212) 555-0083',
  },
  menu: [
    { tab: 'Bonbons & Truffles', items: [
      { name: 'Classic Dark Box (12 pcs)', price: '$38', desc: 'Single-origin Ecuador 72%, hand-painted ganache fillings.', tags: ['Gift Ready'], image: img('photo-1440516851687-7a8a3a48e2d4') },
      { name: 'Seasonal Collection (6 pcs)', price: '$24', desc: 'Rotating seasonal flavors — ask the team what is in today\'s collection.' },
      { name: 'Salted Caramel Truffle', price: '$4.50', desc: 'Dark chocolate shell, Breton salted butter caramel ganache.', image: img('photo-1574071318508-1cdbab80d002') },
    ]},
    { tab: 'Cakes & Pastries', items: [
      { name: 'Death by Chocolate Cake', price: '$9/slice', desc: 'Six layers of dark chocolate sponge, ganache, and praline crunch.', tags: ['Signature'], image: img('photo-1574071318508-1cdbab80d002') },
      { name: 'Chocolate Éclair', price: '$6.50', desc: 'Choux pastry, dark chocolate crème pâtissière, dark glaze.', image: img('photo-1588315029754-2dd089d39a1a') },
      { name: 'Fondant au Chocolat', price: '$10', desc: 'Warm, individual dark chocolate lava cake. Served with crème fraîche.', tags: ['Must Try'], image: img('photo-1588315029754-2dd089d39a1a') },
    ]},
    { tab: 'Drinks', items: [
      { name: 'Dark Hot Chocolate', price: '$7', desc: 'Made with melted couverture chocolate and whole milk. Not cocoa powder.', image: img('photo-1631515243349-e0cb75fb8d3a') },
      { name: 'Iced Cacao', price: '$7', desc: 'Cold-brewed cacao, oat milk, chocolate drizzle.', tags: ['Vegan'], image: img('photo-1529193591184-b1d58069ecdd') },
    ]},
  ],
  testimonials: [
    { name: 'Marie C.', quote: 'I studied in Paris and ChocoVault makes the best chocolate I have had since leaving France. Elise is a true artist.', rating: 5 },
    { name: 'James T.', quote: 'I proposed with a custom bonbon box from ChocoVault. She said yes (obviously). Thank you, Elise.', rating: 5 },
    { name: 'Olivia P.', quote: 'The Death by Chocolate Cake is not hyperbole. It is a complete chocolate experience in each slice.', rating: 5 },
  ],
  features: ['Single-Origin Cacao', 'Hand-Painted Bonbons', 'Chocolate Workshops', 'Custom Gift Boxes'],
};

export default function ChocoVault() { return <RestaurantPage theme={theme} />; }

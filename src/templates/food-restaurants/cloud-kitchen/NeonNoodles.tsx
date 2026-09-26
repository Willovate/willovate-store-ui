import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'neon-noodles', name: 'Neon Noodles', tagline: 'Cyberpunk ramen & Asian street food delivery',
  category: 'cloud-kitchen',
  palette: { primary: '#ec4899', secondary: '#0f172a', background: '#020617', surface: '#1e293b', text: '#e2e8f0', textLight: '#94a3b8', heroOverlay: 'linear-gradient(to right, rgba(2,6,23,0.95), rgba(236,72,153,0.15))' },
  typography: { heading: '"Orbitron", sans-serif', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1552611052-33e04de081de'), heroAlt: 'Bowl of ramen illuminated by pink and blue neon lights',
    story: img('photo-1569718212165-3a8278d5f624'), storyAlt: 'Chef plating ramen in a high-tech kitchen',
    promo: img('photo-1525351484163-9e45e5111118'), promoAlt: 'Dumplings in a bamboo steamer with neon lighting',
    gallery: [
      { src: img('photo-1552611052-33e04de081de'), alt: 'Spicy miso ramen with pork chashu and soft boiled egg' },
      { src: img('photo-1569718212165-3a8278d5f624'), alt: 'Hand-pulled noodles being prepped in a commercial kitchen' },
      { src: img('photo-1525351484163-9e45e5111118'), alt: 'Pork gyoza with chili oil dipping sauce' },
      { src: img('photo-1582878826629-29b7ad1cb438'), alt: 'Bao buns with braised pork belly and pickled cucumbers' },
      { src: img('photo-1555126634-323283e090fa'), alt: 'Wok tossed Dan Dan noodles with minced pork' },
      { src: img('photo-1589302168068-964664d93cb0'), alt: 'Ramen broth simmering in a large stainless steel pot' },
    ],
  },
  content: {
    heroHeadline: 'Fuel For\nThe Grid.',
    heroSub: 'High-octane ramen, wok-fired noodles, and midnight bao buns delivered straight to your sector. Fast, hot, and electric.',
    storyTitle: 'Hacking the Delivery Game.',
    storyBody: [
      'Ramen is notoriously hard to deliver. The noodles get soggy, the broth gets cold. We hacked the system. Our noodles and toppings arrive in a sealed upper tray, with the boiling-hot broth in a thermal lower chamber.',
      'Combine them when you are ready. Perfect texture, every time. Welcome to the future of noodle delivery.',
    ],
    promoTitle: 'Separated Packaging.\nPerfect Noodles.',
    promoCTA: 'Initiate Order',
    ctaPrimary: 'Order Now', ctaSecondary: 'View Menu',
    address: 'Cloud Hub Alpha, Sector 4',
    hours: 'Mon–Sun: 11am – 2am',
    phone: 'App Only',
  },
  menu: [
    { tab: 'Ramen', items: [
      { name: 'Cyber-Miso Ramen', price: '$16', desc: 'Rich chicken and miso broth, pork chashu, ajitsuke tamago, bamboo shoots, scallion oil.', tags: ['Bestseller'], image: img('photo-1552611052-33e04de081de') },
      { name: 'Spicy Glitch Tonkotsu', price: '$17', desc: '24-hour pork bone broth, spicy chili crisp, minced pork, black garlic oil.', tags: ['Spicy'], image: img('photo-1552611052-33e04de081de') },
      { name: 'Vegan Matrix', price: '$15', desc: 'Shiitake mushroom and kombu broth, grilled tofu, bok choy, corn, truffle oil.', tags: ['Vegan'], image: img('photo-1582878826629-29b7ad1cb438') },
    ]},
    { tab: 'Bao & Dumplings', items: [
      { name: 'Pork Belly Bao (2)', price: '$9', desc: 'Steamed buns, braised pork belly, hoisin, crushed peanuts, cilantro.', image: img('photo-1582878826629-29b7ad1cb438') },
      { name: 'Pan-Seared Gyoza (6)', price: '$8', desc: 'Chicken and cabbage dumplings, crispy bottom, ponzu dip.', image: img('photo-1525351484163-9e45e5111118') },
    ]},
    { tab: 'Wok Noodles', items: [
      { name: 'Dan Dan Hack', price: '$14', desc: 'Thick noodles, spicy sesame sauce, Szechuan peppercorns, minced pork.', tags: ['Numbing'], image: img('photo-1555126634-323283e090fa') },
    ]},
  ],
  testimonials: [
    { name: 'Alex H.', quote: 'The separated packaging is genius. The ramen tasted exactly like I was sitting in a restaurant, but I was on my couch playing Cyberpunk.', rating: 5 },
    { name: 'Jamie T.', quote: 'Spicy Glitch Tonkotsu clears my sinuses and fixes my soul. Incredible depth of flavor in the broth.', rating: 5 },
    { name: 'Sam K.', quote: 'Fastest delivery in the city. The bao buns were still steaming hot when I opened the box.', rating: 5 },
  ],
  features: ['Thermal Broth Packaging', 'Separated Noodles', 'Late Night Hours', 'Eco-Friendly Bowls'],
};

export default function NeonNoodles() { return <RestaurantPage theme={theme} />; }

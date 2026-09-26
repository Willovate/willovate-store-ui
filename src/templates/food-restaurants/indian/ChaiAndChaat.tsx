import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'chai-and-chaat', name: 'Chai & Chaat', tagline: 'Mumbai-style street chaat & masala tea bar',
  category: 'indian',
  palette: { primary: '#ea580c', secondary: '#1c0a00', background: '#fff7ed', surface: '#ffedd5', text: '#1c0a00', textLight: '#9a3412', heroOverlay: 'linear-gradient(to right, rgba(28,10,0,0.9), rgba(234,88,12,0.15))' },
  typography: { heading: '"Pacifico", cursive', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1567188040759-fb8a883dc6d8'), heroAlt: 'Mumbai street chaat stall with masala chai and colorful snacks',
    story: img('photo-1596797038530-2c107229654b'), storyAlt: 'Chai being poured from a height in traditional Mumbai style',
    promo: img('photo-1585937421612-70a008356fbe'), promoAlt: 'Vibrant chaat spread: bhel puri, sev puri, vada pav',
    gallery: [
      { src: img('photo-1567188040759-fb8a883dc6d8'), alt: 'Masala chai in a cutting glass beside colorful Mumbai street food' },
      { src: img('photo-1585937421612-70a008356fbe'), alt: 'Bhel puri and sev puri chaat served on a paper plate' },
      { src: img('photo-1596797038530-2c107229654b'), alt: 'Steaming masala chai being poured from a height into a cup' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Vada pav with chutneys — Mumbai\'s favourite street burger' },
      { src: img('photo-1516714435131-44d6b64dc6a2'), alt: 'Dabeli — a Kutchi street snack with potato and spices' },
      { src: img('photo-1631515243349-e0cb75fb8d3a'), alt: 'Mumbai street stall aesthetic with colorful signboards and snacks' },
    ],
  },
  content: {
    heroHeadline: 'Mumbai.\nIn a Cup.',
    heroSub: 'Cutting chai poured from a height. Bhel puri tossed with tamarind and raw mango. This is how Mumbai eats.',
    storyTitle: 'Straight from the Sidewalk.',
    storyBody: [
      'Chai & Chaat was inspired by the legendary food stalls of Marine Drive and Juhu Beach. We brought the chaos, the flavour, and the energy of Mumbai street food to a sit-down space.',
      'Our chai is brewed in a massive brass pot with fresh ginger and cardamom. The chaat is assembled to order. The oil is fresh. Nothing waits.',
    ],
    promoTitle: 'The Sidewalk\nComes to You.',
    promoCTA: 'Order Chaat & Chai',
    ctaPrimary: 'Order Now', ctaSecondary: 'Group Catering',
    address: '199 Little Mumbai Blvd, Edison, NJ 08817',
    hours: 'Mon–Sun: 9am – 11pm',
    phone: '+1 (732) 555-0199',
  },
  menu: [
    { tab: 'Chaat', items: [
      { name: 'Pani Puri', price: '$7', desc: '10 crispy puris with spiced potato-chickpea filling and iced mint water.', tags: ['Mumbai Classic'], image: img('photo-1558030137-a56c1b002c99') },
      { name: 'Bhel Puri', price: '$8', desc: 'Puffed rice, sev, raw mango, tamarind chutney, green chutney, onion.', tags: ['Iconic'], image: img('photo-1555396273-367ea4eb4db5') },
      { name: 'Vada Pav', price: '$6', desc: 'Spiced potato fritter in a pav bun with dry garlic chutney.', tags: ['Street Legend'], image: img('photo-1606313564200-e75d5e30476c') },
      { name: 'Sev Puri', price: '$9', desc: 'Crisp puris topped with potatoes, chutneys, and layers of sev.', image: img('photo-1585937421612-70a008356fbe') },
    ]},
    { tab: 'Chai & Drinks', items: [
      { name: 'Classic Masala Chai', price: '$4', desc: 'Ginger, cardamom, black pepper, tulsi — brewed strong and sweet.', image: img('photo-1555939594-58d7cb561ad1') },
      { name: 'Adrak Chai (Ginger)', price: '$4', desc: 'Heavy on fresh ginger, light on the sugar. Medicinal and addictive.', image: img('photo-1588315029754-2dd089d39a1a') },
      { name: 'Iced Rose Lassi', price: '$6', desc: 'Chilled yogurt drink with rose water, cardamom, and saffron strands.', tags: ['Refreshing'], image: img('photo-1565299624946-b28f40a0ae38') },
    ]},
    { tab: 'Snacks', items: [
      { name: 'Dabeli', price: '$7', desc: 'Kutchi potato filling with sweet-spicy masala in a buttered pav.', tags: ['Gujarati'], image: img('photo-1606313564200-e75d5e30476c') },
      { name: 'Samosa (2 pcs)', price: '$6', desc: 'Classic potato samosa with green and tamarind chutneys.', tags: ['Crispy'], image: img('photo-1529193591184-b1d58069ecdd') },
    ]},
  ],
  testimonials: [
    { name: 'Neha S.', quote: 'The Pani Puri here is exactly like what I remember from Juhu Beach. I almost cried. The water is perfectly balanced.', rating: 5 },
    { name: 'Mark D.', quote: 'My Indian colleagues brought me here and now I understand why they were homesick. This food is extraordinary.', rating: 5 },
    { name: 'Preeti V.', quote: 'The masala chai with the bhel puri is a combination that should be mandatory. I come here every Sunday.', rating: 5 },
  ],
  features: ['Mumbai Street Food', 'Brewed-to-Order Chai', 'Fresh Oil Daily', 'Catering for Events'],
};

export default function ChaiAndChaat() { return <RestaurantPage theme={theme} />; }

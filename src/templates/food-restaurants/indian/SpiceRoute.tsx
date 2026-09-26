import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'spice-route', name: 'Spice Route', tagline: 'Pan-Indian street food & regional curries',
  category: 'indian',
  palette: { primary: '#ef4444', secondary: '#1f1109', background: '#fffbf5', surface: '#fff7ed', text: '#1f1109', textLight: '#78716c', heroOverlay: 'linear-gradient(135deg, rgba(31,17,9,0.88), rgba(239,68,68,0.15))' },
  typography: { heading: '"Kalam", cursive', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1631515243349-e0cb75fb8d3a'), heroAlt: 'Colorful Indian street food spread with chaat, samosas, and chutneys',
    story: img('photo-1585937421612-70a008356fbe'), storyAlt: 'Indian chef preparing street-style chaat at a roadside stall',
    promo: img('photo-1596797038530-2c107229654b'), promoAlt: 'Pan-Indian spice market with vibrant colors and aromas',
    gallery: [
      { src: img('photo-1631515243349-e0cb75fb8d3a'), alt: 'Pani puri being filled with spiced water at a street stall' },
      { src: img('photo-1585937421612-70a008356fbe'), alt: 'Chaat platter with sev puri, bhel puri, and coriander chutney' },
      { src: img('photo-1596797038530-2c107229654b'), alt: 'Indian spices in copper bowls: turmeric, cumin, chili, coriander' },
      { src: img('photo-1516714435131-44d6b64dc6a2'), alt: 'Biryani served in a banana leaf with raita and pickle' },
      { src: img('photo-1567188040759-fb8a883dc6d8'), alt: 'Masala dosa with sambar and three chutneys' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Thali spread with multiple curries, rice, and Indian breads' },
    ],
  },
  content: {
    heroHeadline: 'Every State.\nEvery Spice.\nOne Route.',
    heroSub: 'From Punjabi chole bhature to Tamil Nadu dosas, Spice Route is a culinary journey through every region of India.',
    storyTitle: 'The Road Was Always About Food.',
    storyBody: [
      'Spice Route was born from a seven-month road trip across India — from Amritsar\'s Golden Temple food stalls to the fish curry shacks of Kerala. Every recipe on our menu was discovered on that journey.',
      'We replicate the street stall experience with proper stainless steel plates, chutney caddies at the table, and food that arrives fast and blazing hot.',
    ],
    promoTitle: 'Street Food.\nRestaurant Quality.',
    promoCTA: 'Explore the Route',
    ctaPrimary: 'Order Now', ctaSecondary: 'Regional Menu',
    address: '301 Devon Ave, Chicago, IL 60659',
    hours: 'Mon–Sun: 11am – 11pm',
    phone: '+1 (773) 555-0301',
  },
  menu: [
    { tab: 'Chaat & Snacks', items: [
      { name: 'Pani Puri', price: '$9', desc: '8 hollow puris filled with spiced potato, chickpeas, and flavored water.', tags: ['Street Classic'], image: img('photo-1513104890138-7c749659a591') },
      { name: 'Samosa Chaat', price: '$11', desc: 'Crushed samosas, chickpea curry, yogurt, tamarind, and sev.', tags: ['Popular'], image: img('photo-1555939594-58d7cb561ad1') },
      { name: 'Dahi Bhalla', price: '$10', desc: 'Lentil fritters in yogurt, tamarind, mint chutneys, roasted cumin.', image: img('photo-1578985545062-69928b1d9587') },
    ]},
    { tab: 'Regional Mains', items: [
      { name: 'Dal Makhani', price: '$17', desc: 'Black lentils slow-cooked overnight with butter and cream.', tags: ['Punjabi', 'Vegetarian'], image: img('photo-1528137871618-79d2761e3fd5') },
      { name: 'Chettinad Chicken', price: '$21', desc: 'Fiery South Indian curry with stone-ground Chettinad masala.', tags: ['Spicy', 'Tamil Nadu'], image: img('photo-1555939594-58d7cb561ad1') },
      { name: 'Goan Fish Curry', price: '$23', desc: 'Kingfish in coconut-kokum gravy, served with steamed rice.', tags: ['Goan', 'Coastal'], image: img('photo-1595854341625-f33ee10dbf98') },
    ]},
    { tab: 'Dosas & Breads', items: [
      { name: 'Masala Dosa', price: '$14', desc: 'Crispy fermented crepe with spiced potato filling. Served with sambar and 3 chutneys.', image: img('photo-1574071318508-1cdbab80d002') },
      { name: 'Bhature', price: '$6', desc: 'Puffed fried bread, served with chole. Best in Chicago.', tags: ['Punjabi'], image: img('photo-1567188040759-fb8a883dc6d8') },
    ]},
  ],
  testimonials: [
    { name: 'Kavita N.', quote: 'The Pani Puri here is as good as in Mumbai. That is not something I say lightly. This place is extraordinary.', rating: 5 },
    { name: 'Jason L.', quote: 'I tried the Chettinad Chicken thinking I could handle spice. I could not. But it was the most delicious thing I\'ve eaten this year.', rating: 5 },
    { name: 'Meena K.', quote: 'Spice Route is the only Indian restaurant that has every regional cuisine done properly. Unreal range and quality.', rating: 5 },
  ],
  features: ['Pan-Indian Regional Menus', 'Authentic Street Chaat', 'Fresh Chutneys Daily', 'Vegetarian & Vegan Options'],
};

export default function SpiceRoute() { return <RestaurantPage theme={theme} />; }

import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'tiffin-tales', name: 'Tiffin Tales', tagline: 'Honest homestyle Indian meals, delivered in a tiffin',
  category: 'indian',
  palette: { primary: '#16a34a', secondary: '#14532d', background: '#f0fdf4', surface: '#dcfce7', text: '#14532d', textLight: '#4b7c59', heroOverlay: 'linear-gradient(to right, rgba(20,83,45,0.88), rgba(22,163,74,0.15))' },
  typography: { heading: '"Martel", serif', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1504674900247-0877df9cc836'), heroAlt: 'Indian tiffin box opened to reveal dal, sabji, rice, and roti',
    story: img('photo-1596797038530-2c107229654b'), storyAlt: 'Home cook preparing fresh Indian food in a traditional kitchen',
    promo: img('photo-1585937421612-70a008356fbe'), promoAlt: 'Full tiffin meal with homestyle Indian food and fresh chapati',
    gallery: [
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Stacked tiffin boxes with dal, rice, sabji, and pickle' },
      { src: img('photo-1596797038530-2c107229654b'), alt: 'Fresh vegetables being prepped for homestyle Indian cooking' },
      { src: img('photo-1585937421612-70a008356fbe'), alt: 'Dal tadka with ghee drizzle and fresh coriander in a steel bowl' },
      { src: img('photo-1567188040759-fb8a883dc6d8'), alt: 'Fresh roti and chapati with ghee on a traditional thali' },
      { src: img('photo-1516714435131-44d6b64dc6a2'), alt: 'Comfort meal of khichdi with papad and pickle' },
      { src: img('photo-1631515243349-e0cb75fb8d3a'), alt: 'Fresh Indian meal ready to be packed in a tiffin box' },
    ],
  },
  content: {
    heroHeadline: 'Home. Every Day.',
    heroSub: 'Fresh, nourishing, homestyle Indian meals cooked daily and packed in a tiffin the way it was always done.',
    storyTitle: 'A Recipe for Comfort.',
    storyBody: [
      'Tiffin Tales was created for everyone who misses home-cooked Indian food — the dal that simmers for hours, the roti rolled by hand, the pickle made in the summer sun.',
      'We cook limited batches every day. No reheating, no shortcuts. Seasonal vegetables, whole spices, and the same care as if it were made for our own family.',
    ],
    promoTitle: 'Subscribe to Your\nDaily Tiffin.',
    promoCTA: 'Start Subscription',
    ctaPrimary: 'Order Today\'s Menu', ctaSecondary: 'Subscribe Weekly',
    address: '55 Comfort Lane, Fremont, CA 94538',
    hours: 'Mon–Sat: Lunch 12pm–2:30pm | Dinner 6pm–8:30pm',
    phone: '+1 (510) 555-0155',
  },
  menu: [
    { tab: 'Daily Tiffin', items: [
      { name: 'Veg Tiffin', price: '$14', desc: 'Dal, 2 sabji, rice, 3 rotis, and pickle — changes daily.', tags: ['Vegetarian', 'Changes Daily'], image: img('photo-1549007994-cb92caebd54b') },
      { name: 'Non-Veg Tiffin', price: '$17', desc: 'Chicken or lamb curry, dal, rice, rotis, and pickle.', tags: ['Changes Daily'], image: img('photo-1606313564200-e75d5e30476c') },
      { name: 'Diet Tiffin', price: '$13', desc: 'Moong dal, brown rice, steamed sabji, low-fat roti.', tags: ['Healthy'], image: img('photo-1592415486689-125cbbfcbee2') },
    ]},
    { tab: 'À la Carte', items: [
      { name: 'Dal Tadka', price: '$9', desc: 'Yellow lentils, cumin ghee tadka, fresh coriander.', image: img('photo-1549007994-cb92caebd54b') },
      { name: 'Aloo Gobi', price: '$10', desc: 'Dry-spiced potatoes and cauliflower, ginger and cumin.', tags: ['Vegetarian'], image: img('photo-1595854341625-f33ee10dbf98') },
      { name: 'Chicken Curry', price: '$14', desc: 'Home-style chicken in a tomato-onion masala.', image: img('photo-1513104890138-7c749659a591') },
    ]},
    { tab: 'Extras', items: [
      { name: 'Extra Rotis (3)', price: '$3', desc: 'Hand-rolled whole wheat rotis, cooked on the tawa.', image: img('photo-1578985545062-69928b1d9587') },
      { name: 'Kheer', price: '$5', desc: 'Rice pudding with cardamom and raisins.', tags: ['Sweet'], image: img('photo-1528137871618-79d2761e3fd5') },
      { name: 'Pickle & Papad', price: '$2', desc: 'House-made mixed pickle and crispy papad.', image: img('photo-1513104890138-7c749659a591') },
    ]},
  ],
  testimonials: [
    { name: 'Anjali M.', quote: 'This tastes exactly like my mother\'s food. I subscribed to the weekly tiffin and my lunch breaks are now the highlight of my day.', rating: 5 },
    { name: 'Raj P.', quote: 'I moved from Mumbai and was desperate for proper home food. Tiffin Tales saved me. Fresh, real, exactly right.', rating: 5 },
    { name: 'Sam G.', quote: 'I am not Indian but the Veg Tiffin has made me a convert. That dal with fresh roti is pure comfort.', rating: 5 },
  ],
  features: ['Fresh Daily Menu', 'Weekly Tiffin Subscriptions', 'No Reheating, Ever', 'Home-Style Cooking Only'],
};

export default function TiffinTales() { return <RestaurantPage theme={theme} />; }

import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'virtual-vegan', name: 'Virtual Vegan', tagline: 'Plant-based bowls & wraps optimized for delivery',
  category: 'cloud-kitchen',
  palette: { primary: '#10b981', secondary: '#064e3b', background: '#ecfdf5', surface: '#ffffff', text: '#064e3b', textLight: '#059669', heroOverlay: 'linear-gradient(to right, rgba(6,78,59,0.9), rgba(16,185,129,0.2))' },
  typography: { heading: '"DM Serif Display", serif', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1512621776951-a57141f2eefd'), heroAlt: 'Bright, colorful vegan Buddha bowl with quinoa, avocado, and tahini',
    story: img('photo-1540420773420-3366772f4999'), storyAlt: 'Chef mixing fresh greens and roasted vegetables',
    promo: img('photo-1627308595229-7830f5c92f70'), promoAlt: 'Eco-friendly compostable delivery bowls packed with salads',
    gallery: [
      { src: img('photo-1512621776951-a57141f2eefd'), alt: 'Vegan Buddha bowl with roasted sweet potato, kale, and chickpeas' },
      { src: img('photo-1540420773420-3366772f4999'), alt: 'Fresh organic greens and cherry tomatoes being prepared' },
      { src: img('photo-1627308595229-7830f5c92f70'), alt: 'Compostable packaging used for all Virtual Vegan deliveries' },
      { src: img('photo-1546069901-ba9599a7e63c'), alt: 'Spicy peanut tofu bowl with edamame and brown rice' },
      { src: img('photo-1588195538326-c5b1e9f80a1b'), alt: 'Vegan acai dessert bowl with fresh fruits' },
      { src: img('photo-1581009146145-b5ef050c2e1e'), alt: 'Courier picking up a healthy vegan meal for delivery' },
    ],
  },
  content: {
    heroHeadline: 'Plants.\nDelivered.',
    heroSub: '100% plant-based, 100% compostable packaging. The easiest way to eat healthy, vibrant food without leaving your desk.',
    storyTitle: 'Earth-Friendly. Couch-Friendly.',
    storyBody: [
      'Virtual Vegan was designed to make plant-based eating accessible, fast, and completely sustainable. We operate out of shared cloud kitchens to reduce our carbon footprint, and we use zero plastic in our packaging.',
      'Our bowls are designed by nutritionists and chefs to be perfectly balanced — hitting all your macros while actually tasting incredible. No sad desk salads here.',
    ],
    promoTitle: 'Eat Good.\nFeel Good.',
    promoCTA: 'Order Your Bowl',
    ctaPrimary: 'Order Delivery', ctaSecondary: 'Nutrition Info',
    address: 'Cloud Kitchen 2, Green District',
    hours: 'Mon–Fri: 11am – 9pm',
    phone: 'App Only',
  },
  menu: [
    { tab: 'Signature Bowls', items: [
      { name: 'The Golden Buddha', price: '$14', desc: 'Turmeric quinoa, roasted sweet potato, massaged kale, crispy chickpeas, lemon-tahini dressing.', tags: ['Bestseller'], image: img('photo-1512621776951-a57141f2eefd') },
      { name: 'Spicy Peanut Tofu', price: '$15', desc: 'Brown rice, charred tofu, edamame, shredded carrots, red cabbage, spicy peanut sauce.', tags: ['High Protein'], image: img('photo-1546069901-ba9599a7e63c') },
      { name: 'Mediterranean Falafel', price: '$14', desc: 'Mixed greens, baked falafel, cucumber, cherry tomatoes, kalamata olives, vegan tzatziki.', image: img('photo-1512621776951-a57141f2eefd') },
    ]},
    { tab: 'Wraps', items: [
      { name: 'Buffalo Cauliflower Wrap', price: '$12', desc: 'Roasted buffalo cauliflower, vegan ranch, romaine, tomato, spinach wrap.', tags: ['Spicy'], image: img('photo-1546069901-ba9599a7e63c') },
      { name: 'Smoky Tempeh Wrap', price: '$13', desc: 'Smoked tempeh bacon, avocado, spinach, chipotle aioli, whole wheat wrap.', image: img('photo-1512621776951-a57141f2eefd') },
    ]},
    { tab: 'Sides & Drinks', items: [
      { name: 'Roasted Garlic Hummus', price: '$6', desc: 'Served with carrot sticks and cucumber.', image: img('photo-1540420773420-3366772f4999') },
      { name: 'Cold Pressed Green Juice', price: '$7', desc: 'Kale, apple, celery, lemon, ginger.', image: img('photo-1588195538326-c5b1e9f80a1b') },
    ]},
  ],
  testimonials: [
    { name: 'Emma K.', quote: 'The Golden Buddha bowl is my daily lunch. It is so hard to find healthy, filling vegan delivery. Virtual Vegan nails it.', rating: 5 },
    { name: 'David S.', quote: 'I am not even vegan and the Spicy Peanut Tofu bowl is my favorite thing to order. Plus the compostable packaging makes me feel less guilty about delivery.', rating: 5 },
    { name: 'Laura P.', quote: 'Fast delivery, fresh ingredients, and the sauces are incredible. The vegan ranch is indistinguishable from the real thing.', rating: 5 },
  ],
  features: ['100% Plant-Based', 'Zero Plastic Packaging', 'Macro-Balanced Bowls', 'Carbon-Neutral Delivery'],
};

export default function VirtualVegan() { return <RestaurantPage theme={theme} />; }

import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'zip-meals', name: 'ZipMeals', tagline: 'The fastest food delivery in the city.',
  category: 'food-delivery',
  palette: { primary: '#3b82f6', secondary: '#1e40af', background: '#eff6ff', surface: '#ffffff', text: '#1e3a8a', textLight: '#3b82f6', heroOverlay: 'linear-gradient(to right, rgba(30,58,138,0.9), rgba(59,130,246,0.2))' },
  typography: { heading: '"Kanit", sans-serif', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1628840042765-356cda07504e'), heroAlt: 'Customer picking up a fast food delivery order',
    story: img('photo-1585937421612-70a008356fbe'), storyAlt: 'Courier speeding through city streets on a scooter',
    promo: img('photo-1513104890138-7c749659a591'), promoAlt: 'Pizzas ready for quick delivery',
    gallery: [
      { src: img('photo-1628840042765-356cda07504e'), alt: 'Fast food delivery' },
      { src: img('photo-1585937421612-70a008356fbe'), alt: 'Scooter delivery in the city' },
      { src: img('photo-1513104890138-7c749659a591'), alt: 'Hot pizza delivery' },
      { src: img('photo-1555396273-367ea4eb4db5'), alt: 'Burger and fries to go' },
      { src: img('photo-1526367790999-0150786686a2'), alt: 'Happy delivery driver' },
      { src: img('photo-1584308972271-2b8146747b2c'), alt: 'Restaurant order pickup' },
    ],
  },
  content: {
    heroHeadline: 'Zero Wait.\nAll Taste.',
    heroSub: 'ZipMeals uses an advanced logistics network to bring you your favorite fast food and casual dining options faster than you thought possible.',
    storyTitle: 'Speed is our Specialty.',
    storyBody: [
      'We know that when you\'re hungry, every minute counts. Our proprietary routing algorithm and dedicated fleet of drivers ensure that your food spends less time in transit and more time on your plate.',
      'We partner with restaurants that prioritize quick prep times, meaning your order is cooked, packed, and zipped to you in record time.',
    ],
    promoTitle: 'Hungry Now?',
    promoCTA: 'Get the App',
    ctaPrimary: 'Order Delivery', ctaSecondary: 'Track Order',
    address: 'Serving the Metro Area',
    hours: '24/7 Fast Delivery',
    phone: 'App Only',
  },
  menu: [
    { tab: 'Quick Bites', items: [
      { name: 'The Classic Smash', price: '$10', desc: 'Double smash patty, American cheese, house sauce.', tags: ['Fastest'], image: img('photo-1568901346375-23c9450c58cd') },
      { name: 'Crispy Chicken Tenders', price: '$9', desc: '4 hand-breaded tenders with choice of sauce.', image: img('photo-1626082896492-766af4eb65ed') },
    ]},
    { tab: 'Pizzas', items: [
      { name: 'Large Cheese Pizza', price: '$15', desc: 'Classic NY style cheese slice pie.', image: img('photo-1513104890138-7c749659a591') },
    ]},
  ],
  testimonials: [
    { name: 'Mark P.', quote: 'Unbelievably fast. My burger was still steaming when it arrived.', rating: 5 },
    { name: 'Lisa W.', quote: 'The app tracking is super precise, I love ZipMeals.', rating: 5 },
  ],
  features: ['Advanced Routing', 'Fast Prep Partners', 'Live Tracking', '24/7 Service'],
};

export default function ZipMeals() { return <RestaurantPage theme={theme} />; }

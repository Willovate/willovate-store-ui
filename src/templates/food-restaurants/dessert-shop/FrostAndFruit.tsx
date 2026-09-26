import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'frost-and-fruit', name: 'Frost & Fruit', tagline: 'Probiotic frozen yogurt & fresh-fruit parfaits',
  category: 'dessert',
  palette: { primary: '#0ea5e9', secondary: '#0c4a6e', background: '#f0f9ff', surface: '#e0f2fe', text: '#0c4a6e', textLight: '#0369a1', heroOverlay: 'linear-gradient(135deg, rgba(12,74,110,0.85), rgba(14,165,233,0.2))' },
  typography: { heading: '"Fredoka One", cursive', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1488900128323-21503983a07e'), heroAlt: 'Colourful frozen yogurt cups topped with fresh tropical fruits',
    story: img('photo-1501443762994-82bd5dace89a'), storyAlt: 'Frozen yogurt swirl being dispensed into a cup',
    promo: img('photo-1565958011703-44f9829ba187'), promoAlt: 'Vibrant acai bowl with fresh berries and granola topping',
    gallery: [
      { src: img('photo-1488900128323-21503983a07e'), alt: 'Colorful frozen yogurt with mango, kiwi, and berry toppings' },
      { src: img('photo-1501443762994-82bd5dace89a'), alt: 'Self-serve frozen yogurt machine dispensing strawberry swirl' },
      { src: img('photo-1565958011703-44f9829ba187'), alt: 'Acai bowl loaded with fresh berries, granola, coconut, and honey' },
      { src: img('photo-1557308536-ee471ef2c390'), alt: 'Parfait glass layered with yogurt, granola, and fruit' },
      { src: img('photo-1562447457-579fc34967fb'), alt: 'Fresh tropical fruit toppings: mango, pineapple, passion fruit, kiwi' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Healthy dessert spread with yogurt cups and fresh smoothies' },
    ],
  },
  content: {
    heroHeadline: 'Dessert That\nLoves You Back.',
    heroSub: 'Real fruit. Probiotic yogurt. No artificial flavors. Dessert that is actually good for you tastes even better.',
    storyTitle: 'Fresh From the Farm, Into Your Cup.',
    storyBody: [
      'Frost & Fruit was started by two nutritionists who were tired of choosing between eating well and eating something delicious. They developed a frozen yogurt base with 10 live probiotic strains and zero artificial sweeteners.',
      'Our toppings are sourced from local farms and change seasonally. The result is a dessert bowl that is as nourishing as it is beautiful.',
    ],
    promoTitle: 'Seasonally Fresh.\nEvery Single Day.',
    promoCTA: 'Build Your Bowl',
    ctaPrimary: 'Build a Bowl', ctaSecondary: 'Subscriptions',
    address: '5 Blossom Court, Santa Monica, CA 90401',
    hours: 'Mon–Sun: 11am – 10pm',
    phone: '+1 (310) 555-0055',
  },
  menu: [
    { tab: 'Signature Bowls', items: [
      { name: 'Tropical Paradise', price: '$10', desc: 'Mango frozen yogurt, pineapple, kiwi, passion fruit, coconut flakes.', tags: ['Bestseller'], image: img('photo-1628840042765-356cda07504e') },
      { name: 'Berry Antioxidant', price: '$11', desc: 'Tart yogurt base, blueberries, raspberries, blackberries, chia seeds, acai drizzle.', tags: ['Superfood'], image: img('photo-1595854341625-f33ee10dbf98') },
      { name: 'The Green Bowl', price: '$11', desc: 'Matcha yogurt, sliced banana, kiwi, hemp seeds, honey, granola.', tags: ['Energy Boost'], image: img('photo-1574071318508-1cdbab80d002') },
    ]},
    { tab: 'Build Your Own', items: [
      { name: 'Small Cup (1 base)', price: '$6', desc: 'Choose a base yogurt. Add 3 toppings.', image: img('photo-1578985545062-69928b1d9587') },
      { name: 'Large Bowl (2 bases)', price: '$10', desc: 'Mix 2 bases. Up to 6 toppings.', image: img('photo-1585937421612-70a008356fbe') },
      { name: 'Extra Toppings', price: '$0.75/each', desc: '30+ toppings to choose from. Fruits, nuts, drizzles, granola.', image: img('photo-1606313564200-e75d5e30476c') },
    ]},
    { tab: 'Smoothies', items: [
      { name: 'Mango Colada Smoothie', price: '$8', desc: 'Mango, coconut milk, pineapple, frozen yogurt, lime.', image: img('photo-1528137871618-79d2761e3fd5') },
      { name: 'Berry Blast Smoothie', price: '$8', desc: 'Mixed berries, banana, almond milk, chia, honey.', tags: ['Vegan'], image: img('photo-1604382354936-07c5d9983bd3') },
    ]},
  ],
  testimonials: [
    { name: 'Claire B.', quote: 'I come here almost every day. The Tropical Paradise bowl is my everything. Fresh, not too sweet, and beautiful.', rating: 5 },
    { name: 'Liam S.', quote: 'Finally a dessert place where I can eat healthy without feeling like I\'m missing out. The Berry Antioxidant bowl is incredible.', rating: 5 },
    { name: 'Amy W.', quote: 'My kids love building their own bowls here. It is the perfect Saturday ritual for our family.', rating: 5 },
  ],
  features: ['10 Live Probiotic Strains', 'Local Farm Toppings', 'No Artificial Flavors', 'Seasonal Menu'],
};

export default function FrostAndFruit() { return <RestaurantPage theme={theme} />; }

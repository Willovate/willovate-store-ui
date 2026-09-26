import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'fork-express', name: 'Fork Express', tagline: 'Gourmet meal kits & chef-prepared dinners',
  category: 'food-delivery',
  palette: { primary: '#2563eb', secondary: '#1e3a8a', background: '#f8fafc', surface: '#ffffff', text: '#0f172a', textLight: '#475569', heroOverlay: 'linear-gradient(to right, rgba(15,23,42,0.9), rgba(37,99,235,0.2))' },
  typography: { heading: '"Playfair Display", serif', body: '"Lato", sans-serif' },
  images: {
    hero: img('photo-1540189549336-e6e99c3679fe'), heroAlt: 'Chef putting finishing touches on a gourmet plated dish before packing',
    story: img('photo-1414235077428-338988a2e8c0'), storyAlt: 'Elegant table setting with gourmet food delivered in nice packaging',
    promo: img('photo-1606787620819-8bdf0c44c293'), promoAlt: 'Chef packing a gourmet meal into a premium delivery box',
    gallery: [
      { src: img('photo-1540189549336-e6e99c3679fe'), alt: 'Healthy salmon dish with roasted vegetables' },
      { src: img('photo-1414235077428-338988a2e8c0'), alt: 'Fine dining dish plated in a premium takeout container' },
      { src: img('photo-1606787620819-8bdf0c44c293'), alt: 'Premium meal prep containers stacked neatly' },
      { src: img('photo-1515003197210-e0cd71810b5f'), alt: 'Fresh ingredients being prepared by a chef' },
      { src: img('photo-1581009146145-b5ef050c2e1e'), alt: 'Professional courier delivering a large catering order' },
      { src: img('photo-1555244162-803834f70033'), alt: 'Beautifully roasted chicken and vegetables ready for delivery' },
    ],
  },
  content: {
    heroHeadline: 'Chef-Made.\nReady to Eat.',
    heroSub: 'Elevate your evening. We deliver fully prepared, gourmet meals crafted by top chefs. Just heat and serve.',
    storyTitle: 'No Prep. No Cleanup.',
    storyBody: [
      'We believe you shouldn\'t have to spend two hours cooking to enjoy a restaurant-quality meal at home. Fork Express partners with executive chefs to prepare incredible dinners that arrive cold-packed and ready to heat.',
      'Whether it is a Tuesday night family dinner or a weekend date night at home, our meals bring the fine dining experience to your dining room table.',
    ],
    promoTitle: 'Weekly Subscriptions Available.',
    promoCTA: 'View Plans',
    ctaPrimary: 'Order Tonight', ctaSecondary: 'See the Menu',
    address: 'Central Kitchen, Westside',
    hours: 'Order by 2PM for same-day delivery',
    phone: '(555) 345-6789',
  },
  menu: [
    { tab: 'Date Night For Two', items: [
      { name: 'Braised Short Rib', price: '$45', desc: 'Slow-braised beef short rib, truffle mashed potatoes, roasted heirloom carrots, red wine jus.', tags: ['Bestseller'], image: img('photo-1544025162-d76538a679db') },
      { name: 'Pan-Seared Halibut', price: '$48', desc: 'Wild-caught halibut, lemon risotto, grilled asparagus, caper butter sauce.', image: img('photo-1519708227418-c8fd9a32b7a2') },
    ]},
    { tab: 'Family Style', items: [
      { name: 'Classic Lasagna', price: '$35', desc: 'Serves 4. Layers of fresh pasta, bolognese, ricotta, and mozzarella. Includes garlic bread.', tags: ['Family Favorite'], image: img('photo-1619895092538-128341789043') },
      { name: 'Roast Chicken Dinner', price: '$38', desc: 'Serves 4. Whole herb-roasted chicken, garlic potatoes, seasonal vegetables, gravy.', image: img('photo-1598514982205-f36b96d1e8d4') },
    ]},
    { tab: 'Desserts', items: [
      { name: 'Flourless Chocolate Cake', price: '$12', desc: 'Rich, dense chocolate cake with raspberry coulis.', image: img('photo-1606313564200-e75d5e30476c') },
    ]},
  ],
  testimonials: [
    { name: 'Sarah L.', quote: 'The short ribs are incredible. They literally fell off the bone after 20 minutes in the oven. Best date night in ever.', rating: 5 },
    { name: 'David C.', quote: 'The family meals save us during busy work weeks. High quality food, huge portions, and zero prep.', rating: 5 },
    { name: 'Maria P.', quote: 'I have tried many meal delivery services, and Fork Express is by far the most delicious and easiest to heat up.', rating: 5 },
  ],
  features: ['Chef-Prepared', 'Requires Oven Heating', 'Delivered Cold-Packed', 'Premium Ingredients'],
};

export default function ForkExpress() { return <RestaurantPage theme={theme} />; }

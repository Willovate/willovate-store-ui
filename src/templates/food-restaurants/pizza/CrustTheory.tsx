import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'crust-theory', name: 'Crust Theory', tagline: 'Detroit & Chicago deep-dish craft pizza',
  category: 'pizza',
  palette: { primary: '#f59e0b', secondary: '#1c1c1c', background: '#fafafa', surface: '#f5f5f5', text: '#1c1c1c', textLight: '#6b7280', heroOverlay: 'linear-gradient(to bottom right, rgba(28,28,28,0.9), rgba(245,158,11,0.4))' },
  typography: { heading: '"Bebas Neue", sans-serif', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1588315029754-2dd089d39a1a'), heroAlt: 'Thick Detroit-style deep-dish pizza with caramelized cheese edges',
    story: img('photo-1534308983496-4fabb1a015ee'), storyAlt: 'Baker preparing thick pizza dough in a Detroit-style rectangular pan',
    promo: img('photo-1528137871618-79d2761e3fd5'), promoAlt: 'Golden cheese pull from a thick-crust deep dish pizza',
    gallery: [
      { src: img('photo-1588315029754-2dd089d39a1a'), alt: 'Detroit-style deep dish pizza with crispy caramelized cheese edges' },
      { src: img('photo-1534308983496-4fabb1a015ee'), alt: 'Raw pizza dough pressed into a rectangular steel Detroit pizza pan' },
      { src: img('photo-1528137871618-79d2761e3fd5'), alt: 'Cheese pull from deep-dish pizza revealing thick, fluffy interior' },
      { src: img('photo-1576458088443-04a19bb13da6'), alt: 'Chicago deep dish pizza slice showing thick layers of filling' },
      { src: img('photo-1571407970349-bc81e7e96d47'), alt: 'Assorted thick-crust pizza slices with different toppings' },
      { src: img('photo-1440516851687-7a8a3a48e2d4'), alt: 'Deep-dish pizza in its signature square pan ready to serve' },
    ],
  },
  content: {
    heroHeadline: 'Where Crust Is The Point.',
    heroSub: 'Detroit-style square pizzas with fried cheese edges. Chicago-style deep dish. Two cities, one obsession — the perfect crust.',
    storyTitle: 'We Started A Crust Revolution.',
    storyBody: [
      'The founders of Crust Theory grew up arguing about which city does pizza better — Detroit or Chicago. So they decided to do both, and do both better.',
      'Our Detroit-style pans are seasoned for 3 years. Our Chicago deep dish takes 45 minutes to bake. Neither can be rushed. That is the whole point.',
    ],
    promoTitle: '45 Minutes.\nWorth Every Second.',
    promoCTA: 'Pre-Order Now',
    ctaPrimary: 'Order Deep Dish', ctaSecondary: 'Compare Styles',
    address: '770 S Wabash Ave, Chicago, IL 60605',
    hours: 'Wed–Sun: 11am – 10pm | Pre-orders accepted',
    phone: '+1 (312) 555-0299',
  },
  menu: [
    { tab: 'Detroit Square', items: [
      { name: 'Original Detroit', price: '$26', desc: 'Brick cheese to the edges, tomato sauce on top, pepperoni cups.', tags: ['Most Popular'], image: img('photo-1588315029754-2dd089d39a1a') },
      { name: 'White Detroit', price: '$25', desc: 'Garlic cream, mozzarella, provolone, fresh herbs. No tomato.', tags: ['No Sauce'], image: img('photo-1631515243349-e0cb75fb8d3a') },
      { name: 'Veggie Detroit', price: '$24', desc: 'Roasted peppers, caramelized onions, olives, mushrooms, brick cheese.', tags: ['Vegetarian'], image: img('photo-1567188040759-fb8a883dc6d8') },
    ]},
    { tab: 'Chicago Deep Dish', items: [
      { name: 'The Original Chicago', price: '$28', desc: 'Italian sausage, crushed tomato on top, thick mozzarella layer.', tags: ['45 min bake'], image: img('photo-1544025162-d76538a679db') },
      { name: 'Spinach & Mushroom', price: '$26', desc: 'Fresh spinach, cremini mushrooms, ricotta layer, tomato.', tags: ['Vegetarian', '45 min bake'], image: img('photo-1534308983496-4fabb1a015ee') },
    ]},
    { tab: 'Thin Crust', items: [
      { name: 'Chicago Thin', price: '$19', desc: 'Crispy cracker-thin crust, Italian sausage, tangy tomato sauce.', tags: ['Quick Bake'], image: img('photo-1592415486689-125cbbfcbee2') },
    ]},
  ],
  testimonials: [
    { name: 'Mike T.', quote: 'The Detroit Original is a religious experience. That caramelized cheese crust is absolutely addictive.', rating: 5 },
    { name: 'Karen L.', quote: 'The 45-minute wait for the Chicago deep dish is completely worth it. It\'s the best deep dish I\'ve had outside of Chicago.', rating: 5 },
    { name: 'David P.', quote: 'Crust Theory has ruined all other pizza for me. Once you go deep-dish square, you just can\'t go back.', rating: 5 },
  ],
  features: ['Detroit Square', 'Chicago Deep Dish', 'Pre-Orders Welcome', 'Dine-In & Carry Out'],
};

export default function CrustTheory() { return <RestaurantPage theme={theme} />; }

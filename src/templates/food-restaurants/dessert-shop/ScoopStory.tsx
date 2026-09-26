import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'scoop-story', name: 'Scoop Story', tagline: 'Small-batch artisan ice cream with unexpected flavors',
  category: 'dessert',
  palette: { primary: '#ec4899', secondary: '#1f1020', background: '#fdf2f8', surface: '#fce7f3', text: '#1f1020', textLight: '#9d174d', heroOverlay: 'linear-gradient(to right, rgba(31,16,32,0.9), rgba(236,72,153,0.15))' },
  typography: { heading: '"Boogaloo", cursive', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1497034825429-c343d7c6a68f'), heroAlt: 'Artisan ice cream scoops in a waffle cone with caramel drizzle',
    story: img('photo-1563805042-7684c019e1cb'), storyAlt: 'Ice cream maker stirring a small-batch mix in a copper bowl',
    promo: img('photo-1551024601-bec78aea704b'), promoAlt: 'Ice cream sundae with multiple toppings and sprinkles',
    gallery: [
      { src: img('photo-1497034825429-c343d7c6a68f'), alt: 'Three-scoop artisan ice cream cone with vibrant flavors' },
      { src: img('photo-1563805042-7684c019e1cb'), alt: 'Ice cream being handcrafted in a small-batch copper bowl' },
      { src: img('photo-1551024601-bec78aea704b'), alt: 'Ice cream sundae layered with caramel, fudge, and whipped cream' },
      { src: img('photo-1588195538326-c5b1e9f80a1b'), alt: 'Soft serve ice cream twist with sprinkles and rainbow cone' },
      { src: img('photo-1509440159596-0249088772ff'), alt: 'Ice cream sandwich with cookies — a Scoop Story specialty' },
      { src: img('photo-1567620905732-2d1ec7ab7445'), alt: 'Boozy ice cream floats with local craft beer and vanilla' },
    ],
  },
  content: {
    heroHeadline: 'Every Scoop\nTells a Story.',
    heroSub: 'Small batches, bold flavors, unexpected combinations. Ice cream the way the machines can not make it.',
    storyTitle: 'Made in 12-Gallon Batches.',
    storyBody: [
      'Scoop Story was born from a disagreement — do ice cream shops play it too safe? Our founders thought so, and they set out to prove that ice cream could be adventurous without being weird.',
      'We make 12-gallon batches twice a week. When it\'s gone, it\'s gone. The menu changes seasonally, with limited flavors rotating every two weeks.',
    ],
    promoTitle: 'New Flavors.\nEvery Two Weeks.',
    promoCTA: 'See Today\'s Flavors',
    ctaPrimary: 'Order Online', ctaSecondary: 'Flavor Calendar',
    address: '3 Sugar Street, Mission District, SF 94110',
    hours: 'Mon–Thu: 12pm–10pm · Fri–Sun: 12pm–11pm',
    phone: '+1 (415) 555-0303',
  },
  menu: [
    { tab: 'Current Scoops', items: [
      { name: 'Brown Butter Pecan', price: '$5.50', desc: 'Browned butter ice cream base, candied pecans, caramel swirl.', tags: ['Current Season'], image: img('photo-1631515243349-e0cb75fb8d3a') },
      { name: 'Lavender Honey', price: '$5.50', desc: 'Floral lavender with local wildflower honey, lemon zest.', tags: ['Most Popular'], image: img('photo-1578985545062-69928b1d9587') },
      { name: 'Spicy Chocolate', price: '$5.50', desc: 'Dark chocolate base, cayenne kick, ancho chile, sea salt.', tags: ['Bold'], image: img('photo-1574071318508-1cdbab80d002') },
      { name: 'Vietnamese Coffee', price: '$5.50', desc: 'Sweetened condensed milk base, Vietnamese dark roast espresso.', tags: ['Caffeine'], image: img('photo-1588315029754-2dd089d39a1a') },
    ]},
    { tab: 'Sundaes', items: [
      { name: 'The Classic', price: '$9', desc: 'Vanilla, hot fudge, whipped cream, crushed waffle cone, cherry.', image: img('photo-1596797038530-2c107229654b') },
      { name: 'Campfire Sundae', price: '$11', desc: 'Chocolate ice cream, toasted marshmallow, graham crumble, milk chocolate fudge.', tags: ['Signature'], image: img('photo-1606313564200-e75d5e30476c') },
    ]},
    { tab: 'Floats & Shakes', items: [
      { name: 'Beer Float', price: '$10', desc: 'Vanilla bean ice cream in a local craft stout.', tags: ['Adult'], image: img('photo-1592415486689-125cbbfcbee2') },
      { name: 'Classic Milkshake', price: '$8', desc: 'Any flavor, blended thick and served with whipped cream.', image: img('photo-1578985545062-69928b1d9587') },
    ]},
  ],
  testimonials: [
    { name: 'Sofia L.', quote: 'The Spicy Chocolate ice cream genuinely surprised me. The heat and the chocolate together is such a perfect combination.', rating: 5 },
    { name: 'Ethan C.', quote: 'I came for the lavender honey and stayed for everything else. Their limited rotation keeps me coming back constantly.', rating: 5 },
    { name: 'Rachel M.', quote: 'Scoop Story is the only ice cream shop that excites me. They make flavors no one else would dare try — and nail them every time.', rating: 5 },
  ],
  features: ['Small-Batch Made Twice Weekly', 'Rotating Seasonal Flavors', 'Local Dairy & Ingredients', 'Limited Quantities'],
};

export default function ScoopStory() { return <RestaurantPage theme={theme} />; }

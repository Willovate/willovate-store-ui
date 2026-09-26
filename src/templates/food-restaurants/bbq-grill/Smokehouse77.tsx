import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'smokehouse-77', name: 'Smokehouse 77', tagline: 'Low & slow Texas-style BBQ since 1977',
  category: 'bbq',
  palette: { primary: '#b45309', secondary: '#1c0d00', background: '#fdf6ee', surface: '#fff9f4', text: '#1c0d00', textLight: '#92400e', heroOverlay: 'linear-gradient(to right, rgba(28,13,0,0.92), rgba(28,13,0,0.4))' },
  typography: { heading: '"Oswald", sans-serif', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1558030137-a56c1b002c99'), heroAlt: 'Sliced BBQ brisket with deep smoke ring on butcher paper',
    story: img('photo-1555939594-58d7cb561ad1'), storyAlt: 'Pitmaster tending to large offset smoker in the early morning',
    promo: img('photo-1529193591184-b1d58069ecdd'), promoAlt: 'Rack of smoked BBQ ribs with smoke rising',
    gallery: [
      { src: img('photo-1558030137-a56c1b002c99'), alt: 'Texas brisket sliced perfectly with a deep red smoke ring' },
      { src: img('photo-1555939594-58d7cb561ad1'), alt: 'Pitmaster loading oak logs into the firebox of an offset smoker' },
      { src: img('photo-1529193591184-b1d58069ecdd'), alt: 'Full rack of pork ribs coming off the smoker' },
      { src: img('photo-1544025162-d76538a679db'), alt: 'BBQ pulled pork sandwich loaded on a brioche bun' },
      { src: img('photo-1592415486689-125cbbfcbee2'), alt: 'Smoked sausage links with blistered skin on a cutting board' },
      { src: img('photo-1555396273-367ea4eb4db5'), alt: 'Smokehouse interior with wood-paneled walls and communal tables' },
    ],
  },
  content: {
    heroHeadline: 'Smoke.\nTime.\nFlavor.',
    heroSub: 'Real Texas-style BBQ is a 14-hour commitment. We start the fire at midnight so you can eat at noon.',
    storyTitle: "Hank's Recipes. Four Generations Later.",
    storyBody: [
      'Henry "Hank" Williams started smoking meats in 1977 with a single offset smoker built from a 500-gallon propane tank. He sold plates out of his driveway every Saturday until the lines got too long.',
      'Today, his great-granddaughter Tamara runs the pits. The smoker is bigger, but the wood is still post oak, the rub is still the family recipe, and the rules are the same: low heat, slow time, and no shortcuts.',
    ],
    promoTitle: 'Ready When The Smoke Clears.',
    promoCTA: 'Get Your Plate',
    ctaPrimary: 'Order Pickup', ctaSecondary: 'View Specials',
    address: '77 Brisket Blvd, Austin, TX 78701',
    hours: 'Thu–Sun: Open at 11am until we sell out',
    phone: '+1 (512) 555-0077',
  },
  menu: [
    { tab: 'Meats by the Pound', items: [
      { name: 'Prime Brisket', price: '$28/lb', desc: '14-hour smoked USDA prime, post oak, salt & pepper crust.', tags: ['Pitmaster\'s Pride', 'Sells Out Fast'], image: img('photo-1555939594-58d7cb561ad1') },
      { name: 'Baby Back Ribs', price: '$24/rack', desc: 'Hickory-smoked, fall-off-the-bone tender, dry-rubbed.', tags: ['Bestseller'], image: img('photo-1440516851687-7a8a3a48e2d4') },
      { name: 'Pulled Pork', price: '$18/lb', desc: 'Slow-smoked pork shoulder, hand-pulled to order.', image: img('photo-1440516851687-7a8a3a48e2d4') },
      { name: 'Jalapeño-Cheddar Sausage', price: '$8/link', desc: 'House-made sausage with fresh jalapeños and sharp cheddar.', tags: ['In-House Made'], image: img('photo-1595854341625-f33ee10dbf98') },
    ]},
    { tab: 'Plates', items: [
      { name: '2-Meat Plate', price: '$22', desc: 'Choose any 2 meats. Served with 2 sides and white bread.', image: img('photo-1588315029754-2dd089d39a1a') },
      { name: '3-Meat Plate', price: '$30', desc: 'The works. Choose 3 meats with 3 sides.', image: img('photo-1513104890138-7c749659a591') },
      { name: 'Brisket Sandwich', price: '$14', desc: 'Sliced brisket on buttered Texas toast. Pickles, onions.', image: img('photo-1555396273-367ea4eb4db5') },
    ]},
    { tab: 'Sides', items: [
      { name: 'Smoked Mac & Cheese', price: '$7', desc: 'Three-cheese smoked mac. As important as the meat.', image: img('photo-1592415486689-125cbbfcbee2') },
      { name: 'Pinto Beans', price: '$5', desc: 'Cooked all day with brisket scraps.', image: img('photo-1516714435131-44d6b64dc6a2') },
      { name: 'Jalapeño Coleslaw', price: '$5', desc: 'Creamy, tangy, with a kick.', image: img('photo-1516714435131-44d6b64dc6a2') },
    ]},
  ],
  testimonials: [
    { name: 'Jake R.', quote: 'The brisket here has the deepest smoke ring I have ever seen. The fat is perfectly rendered. This is Texas BBQ done right.', rating: 5 },
    { name: 'Linda H.', quote: 'We drove 4 hours from Dallas and it was worth every mile. Best smoked ribs in the state, full stop.', rating: 5 },
    { name: 'Marcus T.', quote: 'Get there early. The line forms before they open. But the brisket makes you forget everything.', rating: 5 },
  ],
  features: ['14-Hour Smoke', 'Post Oak Only', 'USDA Prime Brisket', 'No Shortcuts, Ever'],
};

export default function Smokehouse77() { return <RestaurantPage theme={theme} />; }

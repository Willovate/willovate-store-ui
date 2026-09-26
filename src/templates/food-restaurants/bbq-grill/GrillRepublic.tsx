import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'grill-republic', name: 'Grill Republic', tagline: 'Modern steakhouse & grill with bold flavors',
  category: 'bbq',
  palette: { primary: '#0ea5e9', secondary: '#0f172a', background: '#f8fafc', surface: '#f1f5f9', text: '#0f172a', textLight: '#64748b', heroOverlay: 'linear-gradient(160deg, rgba(15,23,42,0.92) 0%, rgba(14,165,233,0.2) 100%)' },
  typography: { heading: '"Rajdhani", sans-serif', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1592415486689-125cbbfcbee2'), heroAlt: 'Premium steaks searing on a hot grill with flames',
    story: img('photo-1558030137-a56c1b002c99'), storyAlt: 'Grill chef carefully cooking steaks on a high-heat commercial grill',
    promo: img('photo-1529193591184-b1d58069ecdd'), promoAlt: 'Premium grilled meats plated in a modern restaurant setting',
    gallery: [
      { src: img('photo-1592415486689-125cbbfcbee2'), alt: 'Prime ribeye steaks searing with visible flames on a grill' },
      { src: img('photo-1558030137-a56c1b002c99'), alt: 'Perfectly sliced prime brisket on a modern slate board' },
      { src: img('photo-1529193591184-b1d58069ecdd'), alt: 'Rack of ribs plated with chimichurri and grilled vegetables' },
      { src: img('photo-1544025162-d76538a679db'), alt: 'Grilled swordfish steak with herb butter on a modern plate' },
      { src: img('photo-1555396273-367ea4eb4db5'), alt: 'Modern grill republic interior with dark marble and warm lighting' },
      { src: img('photo-1473093226555-0f20c014f19b'), alt: 'Craft cocktails and grilled appetizers on a bar counter' },
    ],
  },
  content: {
    heroHeadline: 'The Grill is the Throne.',
    heroSub: 'Premium meats, high-heat grilling, and modern plates. Grill Republic is where carnivores dine like royalty.',
    storyTitle: 'Built on Fire & Precision.',
    storyBody: [
      'Grill Republic was designed for those who believe that great meat needs nothing but heat, fire, and excellent technique. Our chefs are trained in the Josper technique — a closed charcoal oven that reaches 750°F.',
      'Our sourcing is uncompromising. Every steak is USDA Prime or Wagyu. Every fish is sustainable. Every cut is fresh, never frozen.',
    ],
    promoTitle: 'Reserve Your Throne.',
    promoCTA: 'Book a Table',
    ctaPrimary: 'Reserve Now', ctaSecondary: 'See the Menu',
    address: '1 Republic Ave, Manhattan, NY 10004',
    hours: 'Mon–Sun: 5pm – 11pm · Lunch: Fri–Sun 12pm',
    phone: '+1 (212) 555-0444',
  },
  menu: [
    { tab: 'Steaks & Grills', items: [
      { name: 'USDA Prime Ribeye', price: '$62', desc: '18oz bone-in, Josper charcoal grilled, compound butter, truffle salt.', tags: ['Prime Cut'], image: img('photo-1544025162-d76538a679db') },
      { name: 'Wagyu Flat Iron', price: '$55', desc: 'A5 Wagyu, served with chimichurri and roasted bone marrow.', tags: ['Wagyu', 'Premium'], image: img('photo-1592415486689-125cbbfcbee2') },
      { name: 'Tomahawk for Two', price: '$120', desc: '36oz bone-in tomahawk, dry-aged 30 days, shared tableside.', tags: ['Share', 'Signature'], image: img('photo-1555396273-367ea4eb4db5') },
    ]},
    { tab: 'From the Sea', items: [
      { name: 'Grilled Swordfish', price: '$42', desc: 'Lemon herb crust, caperberry butter, charred asparagus.', image: img('photo-1565299624946-b28f40a0ae38') },
      { name: 'Lobster Tail', price: '$55', desc: 'Split, brushed with garlic-herb butter, charcoal-grilled.', tags: ['Luxury'], image: img('photo-1592415486689-125cbbfcbee2') },
    ]},
    { tab: 'Starters', items: [
      { name: 'Wagyu Carpaccio', price: '$22', desc: 'Paper-thin Wagyu, truffle oil, parmesan, capers, micro arugula.', image: img('photo-1571407970349-bc81e7e96d47') },
      { name: 'Grilled Bone Marrow', price: '$18', desc: 'Charred marrow bones, herb gremolata, grilled sourdough.', image: img('photo-1516714435131-44d6b64dc6a2') },
    ]},
  ],
  testimonials: [
    { name: 'Richard M.', quote: 'The Tomahawk for Two is pure theatre. They bring it out, slice it tableside, and the room goes quiet. Absolute excellence.', rating: 5 },
    { name: 'Natalie P.', quote: 'Grill Republic is my go-to for client dinners. Impeccable food, modern atmosphere, and flawless service.', rating: 5 },
    { name: 'Alex T.', quote: 'The Wagyu flat iron was the best steak I have ever eaten. The chimichurri pairing is inspired.', rating: 5 },
  ],
  features: ['Josper Charcoal Grill', 'USDA Prime & Wagyu', 'Dry-Aged Cuts', 'Private Dining'],
};

export default function GrillRepublic() { return <RestaurantPage theme={theme} />; }

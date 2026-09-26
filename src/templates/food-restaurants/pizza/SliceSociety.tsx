import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'slice-society', name: 'Slice Society', tagline: 'NY-style by the slice, all day every day',
  category: 'pizza',
  palette: { primary: '#ff0055', secondary: '#111111', background: '#fffef0', surface: '#ffffff', text: '#111111', textLight: '#555555', heroOverlay: 'linear-gradient(135deg, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0.5) 100%)' },
  typography: { heading: '"Oswald", sans-serif', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1534308983496-4fabb1a015ee'), heroAlt: 'New York-style cheese pizza slice held in hand',
    story: img('photo-1576458088443-04a19bb13da6'), storyAlt: 'Pizza counter in a classic New York pizzeria',
    promo: img('photo-1571407970349-bc81e7e96d47'), promoAlt: 'Rows of New York pizza slices ready to serve',
    gallery: [
      { src: img('photo-1534308983496-4fabb1a015ee'), alt: 'Foldable New York-style cheese slice fresh from the oven' },
      { src: img('photo-1576458088443-04a19bb13da6'), alt: 'Classic NY pizza counter with multiple whole pies on display' },
      { src: img('photo-1571407970349-bc81e7e96d47'), alt: 'Pepperoni pizza slices lined up at the counter' },
      { src: img('photo-1528137871618-79d2761e3fd5'), alt: 'Cheese pull from a classic NY-style pizza slice' },
      { src: img('photo-1440516851687-7a8a3a48e2d4'), alt: 'Pizza in a cardboard box — a New York staple' },
      { src: img('photo-1467003909585-2f8a72700288'), alt: 'Hand tossing pizza dough high in the air' },
    ],
  },
  content: {
    heroHeadline: 'A Slice Above The Rest.',
    heroSub: 'New York-style pizza by the slice, the way it was meant to be — big, foldable, and absolutely delicious.',
    storyTitle: 'From Brooklyn to Your Block.',
    storyBody: [
      'Slice Society started in a 12-seat shop in Brooklyn in 1999. One oven, one recipe, and the longest line on the block. We still use that same recipe.',
      'Real NY pizza has a thin, crispy crust that you fold in half. It has to be big enough to drip grease on your shirt. Anything less is just flatbread with toppings.',
    ],
    promoTitle: 'One Slice.\nThat\'s All It Takes.',
    promoCTA: 'Get a Slice Now',
    ctaPrimary: 'Order a Pie', ctaSecondary: 'See Slices',
    address: '88 Fulton St, Brooklyn, NY 11201',
    hours: 'Mon–Sun: 11am – 2am (Late Night Fridays!)',
    phone: '+1 (718) 555-0247',
  },
  menu: [
    { tab: 'By the Slice', items: [
      { name: 'Classic Cheese', price: '$4', desc: 'Low-moisture mozzarella, crushed plum tomato sauce, hand-tossed dough.', tags: ['Classic'], image: img('photo-1574071318508-1cdbab80d002') },
      { name: 'Pepperoni Slam', price: '$5', desc: 'Cup-and-char pepperoni, extra mozz, tomato sauce.', tags: ['Bestseller'], image: img('photo-1555939594-58d7cb561ad1') },
      { name: 'White Slice', price: '$5', desc: 'Ricotta, garlic oil, mozzarella, fresh parsley.', tags: ['No Sauce'], image: img('photo-1534308983496-4fabb1a015ee') },
    ]},
    { tab: 'Whole Pies', items: [
      { name: '18" Plain Pie', price: '$20', desc: '8 big slices, serves 2–3 hungry New Yorkers.' },
      { name: 'The Society Special', price: '$28', desc: 'Pepperoni, sausage, peppers, onions, mushrooms, extra cheese.', image: img('photo-1558030137-a56c1b002c99') },
      { name: 'Grandma Pie', price: '$25', desc: 'Thick Sicilian crust, crushed tomato on top, garlic, mozz.', tags: ['Thick Crust'], image: img('photo-1628840042765-356cda07504e') },
    ]},
    { tab: 'Sides', items: [
      { name: 'Garlic Knots (6)', price: '$6', desc: 'Baked in-house, tossed in garlic butter and parsley.', image: img('photo-1588315029754-2dd089d39a1a') },
      { name: 'Caesar Salad', price: '$9', desc: 'Romaine, house dressing, croutons, parmesan.', image: img('photo-1574071318508-1cdbab80d002') },
    ]},
  ],
  testimonials: [
    { name: 'Tony R.', quote: 'I moved from Brooklyn to LA and I flew back just for this pizza. No joke. Best slice on Earth.', rating: 5 },
    { name: 'Amanda S.', quote: 'The Grandma Pie is INCREDIBLE. Thick, saucy, cheesy — it\'s like a hug in pizza form.', rating: 5 },
    { name: 'Marco D.', quote: 'I come here every Friday. The pepperoni cup-and-char is a religious experience.', rating: 5 },
  ],
  features: ['NY-Style by the Slice', 'Open Late', 'Whole Pies Ready in 20 min', 'Delivery Available'],
};

export default function SliceSociety() { return <RestaurantPage theme={theme} />; }

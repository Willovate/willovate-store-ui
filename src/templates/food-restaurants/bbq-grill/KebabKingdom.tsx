import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'kebab-kingdom', name: 'Kebab Kingdom', tagline: 'Charcoal-grilled Middle Eastern & Mediterranean kebabs',
  category: 'bbq',
  palette: { primary: '#d97706', secondary: '#1c1408', background: '#fefdf8', surface: '#fffbf0', text: '#1c1408', textLight: '#92400e', heroOverlay: 'linear-gradient(to right, rgba(28,20,8,0.88), rgba(217,119,6,0.2))' },
  typography: { heading: '"Cairo", sans-serif', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1575448689498-0d1ba28a8c17'), heroAlt: 'Assorted Middle Eastern kebabs on a skewer over charcoal grill',
    story: img('photo-1555939594-58d7cb561ad1'), storyAlt: 'Kebab chef cooking skewers on a traditional charcoal mangal',
    promo: img('photo-1517838277536-f5f99be501cd'), promoAlt: 'Colorful mezze spread with kebabs, flatbread, and dips',
    gallery: [
      { src: img('photo-1575448689498-0d1ba28a8c17'), alt: 'Lamb and chicken kebabs on skewers over charcoal grill' },
      { src: img('photo-1555939594-58d7cb561ad1'), alt: 'Kebab chef managing multiple skewers on a mangal grill' },
      { src: img('photo-1517838277536-f5f99be501cd'), alt: 'Mezze spread with hummus, tabbouleh, flatbread, and kebabs' },
      { src: img('photo-1529193591184-b1d58069ecdd'), alt: 'Iskender kebab plated on lavash with tomato sauce and butter' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Full Turkish mezze table with grilled meats and vegetable dishes' },
      { src: img('photo-1573225342350-16731dd9bf3d'), alt: 'Fresh flatbread baked in clay oven alongside kebab platter' },
    ],
  },
  content: {
    heroHeadline: 'The King of Kebabs.',
    heroSub: 'Charcoal-grilled lamb, chicken, and beef kebabs served with hand-rolled flatbread, mezze, and centuries of tradition.',
    storyTitle: 'From Ankara to Your Plate.',
    storyBody: [
      'Chef Mehmet Arslan learned to grill from his father in Ankara. The charcoal selection, the skewer technique, the resting time — everything was passed down with strict instructions to never change a thing.',
      'Every kebab at Kebab Kingdom is made from fresh-ground and marinated meat, loaded on hand-rolled skewers, and grilled over natural charcoal. The flatbread is baked fresh every 2 hours.',
    ],
    promoTitle: 'Grilled to Order.\nDelivered Hot.',
    promoCTA: 'Order Kebabs Now',
    ctaPrimary: 'Order Now', ctaSecondary: 'See Mezze',
    address: '18 Sultan Bazaar Rd, Dearborn, MI 48126',
    hours: 'Mon–Sun: 12pm – 11pm (Fri–Sat until Midnight)',
    phone: '+1 (313) 555-0188',
  },
  menu: [
    { tab: 'Kebab Plates', items: [
      { name: 'Lamb Shish Kebab', price: '$22', desc: 'Marinated cubed lamb, onion, peppers, charcoal grilled. Served with rice and salad.', tags: ['Chef\'s Favourite'], image: img('photo-1544025162-d76538a679db') },
      { name: 'Adana Kebab', price: '$21', desc: 'Spiced minced lamb with herbs, hand-pressed on a flat skewer. Served with lavash.', tags: ['Spicy'], image: img('photo-1592415486689-125cbbfcbee2') },
      { name: 'Chicken Döner Plate', price: '$18', desc: 'Slow-roasted vertical spit chicken, rice, salad, garlic sauce.', image: img('photo-1513104890138-7c749659a591') },
    ]},
    { tab: 'Mezze', items: [
      { name: 'Hummus & Pita', price: '$9', desc: 'Creamy hummus made from scratch, warm pita, olive oil drizzle.', image: img('photo-1595854341625-f33ee10dbf98') },
      { name: 'Tabbouleh', price: '$10', desc: 'Finely chopped parsley, bulgur, tomato, lemon, olive oil.', image: img('photo-1595854341625-f33ee10dbf98') },
      { name: 'Baba Ganoush', price: '$10', desc: 'Charcoal-roasted eggplant with tahini, garlic, lemon.', tags: ['Vegan'], image: img('photo-1631515243349-e0cb75fb8d3a') },
    ]},
    { tab: 'Wraps', items: [
      { name: 'Chicken Shawarma Wrap', price: '$14', desc: 'Marinated chicken, garlic sauce, pickles, tomato, fresh flatbread.', image: img('photo-1631515243349-e0cb75fb8d3a') },
      { name: 'Falafel Wrap', price: '$12', desc: 'Crispy falafel, hummus, Israeli salad, hot sauce.', tags: ['Vegetarian'], image: img('photo-1588315029754-2dd089d39a1a') },
    ]},
  ],
  testimonials: [
    { name: 'Aisha M.', quote: 'I am half Lebanese and this is the most authentic kebab I have had in America. The Adana is extraordinary.', rating: 5 },
    { name: 'Stefan B.', quote: 'The lamb shish is perfect — charred outside, pink inside, and the marinade is deeply flavored. Outstanding.', rating: 5 },
    { name: 'Omar F.', quote: 'The flatbread alone is worth the trip. Fresh, warm, slightly charred — it makes every bite better.', rating: 5 },
  ],
  features: ['Charcoal Mangal Grill', 'Fresh Ground Meat Daily', 'House-Baked Flatbread', 'Halal Certified'],
};

export default function KebabKingdom() { return <RestaurantPage theme={theme} />; }

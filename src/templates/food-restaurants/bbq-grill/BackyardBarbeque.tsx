import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'backyard-barbeque', name: 'Backyard Barbeque', tagline: 'Family-style BBQ with Southern soul & big portions',
  category: 'bbq',
  palette: { primary: '#f97316', secondary: '#292524', background: '#fefce8', surface: '#fdf8f1', text: '#1c1917', textLight: '#78716c', heroOverlay: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(249,115,22,0.2) 100%)' },
  typography: { heading: '"Roboto Slab", serif', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1544025162-d76538a679db'), heroAlt: 'Family-style BBQ spread on a picnic table with ribs, corn, and coleslaw',
    story: img('photo-1517838277536-f5f99be501cd'), storyAlt: 'Backyard BBQ grill with chicken and ribs over charcoal',
    promo: img('photo-1529193591184-b1d58069ecdd'), promoAlt: 'Big BBQ platter with multiple meats and sides',
    gallery: [
      { src: img('photo-1544025162-d76538a679db'), alt: 'Family-style BBQ spread with pulled pork, ribs, and sides' },
      { src: img('photo-1517838277536-f5f99be501cd'), alt: 'Chicken thighs and drumsticks on charcoal BBQ grill' },
      { src: img('photo-1529193591184-b1d58069ecdd'), alt: 'BBQ ribs glazed with honey and served with corn' },
      { src: img('photo-1592415486689-125cbbfcbee2'), alt: 'Grilled sausage links smoking on the grill' },
      { src: img('photo-1568901346375-23c9450c58cd'), alt: 'BBQ corn on the cob with butter and spices' },
      { src: img('photo-1578345810890-e4c0fb5fa7dd'), alt: 'Backyard BBQ with family gathered around a grill' },
    ],
  },
  content: {
    heroHeadline: 'Big Food.\nBig Family.\nBig Love.',
    heroSub: 'Southern-style backyard BBQ where the food is made to share, the portions are massive, and no one leaves hungry.',
    storyTitle: 'Straight Off the Backyard Grill.',
    storyBody: [
      'Backyard Barbeque started as a literal backyard cookout in 2008. The neighbourhood kept showing up, so we eventually had to open a restaurant to keep up with demand.',
      'We still cook on charcoal, still serve family-style, and still make the same sweet-and-smoky sauce that has been requested by every guest for 15 years.',
    ],
    promoTitle: 'Feed the Whole Crew.',
    promoCTA: 'Order Family Pack',
    ctaPrimary: 'Order Now', ctaSecondary: 'Family Packs',
    address: '2208 Southern Ave, Memphis, TN 38114',
    hours: 'Tue–Sun: 11am – 9pm · Sunday Brunch: 10am',
    phone: '+1 (901) 555-0222',
  },
  menu: [
    { tab: 'Platters', items: [
      { name: 'Classic 2-Meat Plate', price: '$19', desc: 'Pick any 2 meats, 2 sides, cornbread. Ribs, chicken, pulled pork, or brisket.', image: img('photo-1578985545062-69928b1d9587') },
      { name: 'The Backyard Feast', price: '$65', desc: 'Full rack ribs, whole chicken, 1lb pulled pork, 4 sides — feeds 4–5.', tags: ['Family Size'], image: img('photo-1528137871618-79d2761e3fd5') },
      { name: 'Smoked Chicken Plate', price: '$15', desc: 'Half chicken smoked with pecan wood, 1 side, cornbread.', image: img('photo-1513104890138-7c749659a591') },
    ]},
    { tab: 'Sandwiches', items: [
      { name: 'Pulled Pork Sandwich', price: '$12', desc: 'Slow-smoked pork, tangy slaw, pickles, toasted brioche.', image: img('photo-1596797038530-2c107229654b') },
      { name: 'BBQ Chicken Sandwich', price: '$13', desc: 'Smoked chicken breast, house sauce, pickled onion, jalapeños.', image: img('photo-1576458088443-04a19bb13da6') },
    ]},
    { tab: 'Sides', items: [
      { name: 'Southern Baked Beans', price: '$5', desc: 'Slow-cooked with brown sugar, mustard, and smoked pork bits.', image: img('photo-1544025162-d76538a679db') },
      { name: 'Creamy Coleslaw', price: '$4', desc: 'Classic, creamy, tangy — a must.', image: img('photo-1592415486689-125cbbfcbee2') },
      { name: 'Cornbread Muffins', price: '$4', desc: 'Baked fresh in cast iron, served with honey butter.', tags: ['Freshly Baked'], image: img('photo-1544025162-d76538a679db') },
    ]},
  ],
  testimonials: [
    { name: 'James W.', quote: 'We got the Backyard Feast for my son\'s birthday. Five people ate until they could not move. Every bite was incredible.', rating: 5 },
    { name: 'Carol B.', quote: 'That sweet-and-smoky house sauce should be illegal. I asked them to bottle it. They said no. I\'m going back anyway.', rating: 5 },
    { name: 'Tom H.', quote: 'This is the most authentic Southern BBQ I\'ve had outside of a church cookout. And I mean that as the highest compliment.', rating: 5 },
  ],
  features: ['Family-Style Portions', 'Real Charcoal BBQ', 'Sunday Brunch', 'Catering Available'],
};

export default function BackyardBarbeque() { return <RestaurantPage theme={theme} />; }

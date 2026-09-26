import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'fire-and-rib', name: 'Fire & Rib', tagline: 'Live-fire BBQ & craft beer, the way it should be',
  category: 'bbq',
  palette: { primary: '#ef4444', secondary: '#18181b', background: '#faf9f7', surface: '#f4f1ec', text: '#18181b', textLight: '#71717a', heroOverlay: 'linear-gradient(to right, rgba(24,24,27,0.88), rgba(239,68,68,0.25))' },
  typography: { heading: '"Alfa Slab One", serif', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1529193591184-b1d58069ecdd'), heroAlt: 'Rack of BBQ ribs over an open flame grill',
    story: img('photo-1544025162-d76538a679db'), storyAlt: 'Chef tending to meats on a live-fire open grill',
    promo: img('photo-1558030137-a56c1b002c99'), promoAlt: 'BBQ brisket and ribs spread on butcher paper',
    gallery: [
      { src: img('photo-1529193591184-b1d58069ecdd'), alt: 'Baby back ribs over roaring open-fire grill' },
      { src: img('photo-1592415486689-125cbbfcbee2'), alt: 'Grilled sausages with char marks on a hot grill' },
      { src: img('photo-1544025162-d76538a679db'), alt: 'Pitmaster placing rib racks over live charcoal' },
      { src: img('photo-1558030137-a56c1b002c99'), alt: 'Perfectly sliced smoked BBQ brisket' },
      { src: img('photo-1555939594-58d7cb561ad1'), alt: 'BBQ cook tending to smoking meats in a rustic outdoor pit' },
      { src: img('photo-1473093226555-0f20c014f19b'), alt: 'Cold craft beers alongside a BBQ feast' },
    ],
  },
  content: {
    heroHeadline: 'Fire Makes It Better.',
    heroSub: 'Open live-fire grilling, craft beer on tap, and the kind of ribs that require a full roll of paper towels.',
    storyTitle: 'Fire is the Ingredient.',
    storyBody: [
      'Fire & Rib was born from a simple idea: the best BBQ isn\'t made in a kitchen. It\'s made over live fire, with patience, good wood, and even better beer.',
      'We run three types of fires simultaneously — open grill for steaks, offset smoker for ribs, and a coal pit for the brisket. Each needs its own attention. That\'s what we give it.',
    ],
    promoTitle: 'Ribs on the Fire.\nBeer on Ice.',
    promoCTA: 'Book a Pit Table',
    ctaPrimary: 'Reserve Now', ctaSecondary: 'See the Pits',
    address: '9 Ember Lane, Nashville, TN 37201',
    hours: 'Fri–Wed: 4pm – 11pm · Sat–Sun: 12pm – 12am',
    phone: '+1 (615) 555-0312',
  },
  menu: [
    { tab: 'From the Grill', items: [
      { name: 'Full Rack St. Louis Ribs', price: '$34', desc: 'Applewood smoked for 6 hours, finished on the open grill with house sauce.', tags: ['Bestseller'], image: img('photo-1567188040759-fb8a883dc6d8') },
      { name: 'Prime Cowboy Chop', price: '$45', desc: '24oz bone-in ribeye, open-fire seared, compound butter.', tags: ['Premium'], image: img('photo-1606313564200-e75d5e30476c') },
      { name: 'Smoked Half Chicken', price: '$22', desc: 'Spatchcocked, smoked with cherry wood, crispy herb skin.', image: img('photo-1585937421612-70a008356fbe') },
    ]},
    { tab: 'Sandwiches', items: [
      { name: 'Fire & Rib Classic', price: '$16', desc: 'Pulled pork shoulder, pickled red onion, vinegar slaw, brioche.', image: img('photo-1631515243349-e0cb75fb8d3a') },
      { name: 'Smoked Brisket Melt', price: '$18', desc: 'Sliced brisket, smoked cheddar, pickled jalapeño, Texas toast.', image: img('photo-1585937421612-70a008356fbe') },
    ]},
    { tab: 'Craft Beers', items: [
      { name: 'Pitfire Amber Ale', price: '$7', desc: 'Our house brew. Pairs perfectly with ribs — malty, smooth, balanced.', image: img('photo-1544025162-d76538a679db') },
      { name: 'Smokehouse Stout', price: '$8', desc: 'Dark, roasty, notes of coffee and chocolate. Made for brisket.', image: img('photo-1549007994-cb92caebd54b') },
      { name: 'Rotating IPA', price: '$7', desc: 'Ask your server for today\'s local craft IPA.', tags: ['Local Brew'] },
    ]},
  ],
  testimonials: [
    { name: 'Bobby S.', quote: 'The St. Louis Ribs are next-level. Smoke ring for days, sauce caramelized on the grill, meat falls right off.', rating: 5 },
    { name: 'Dana K.', quote: 'They have the Cowboy Chop — a 24oz bone-in ribeye. I ordered it, and I will never be the same person again.', rating: 5 },
    { name: 'Ryan P.', quote: 'The Pitfire Amber Ale with the brisket sandwich is the combination I did not know I needed. Now I need it weekly.', rating: 5 },
  ],
  features: ['Live Open-Fire Grill', 'House Craft Beers', 'Offset Smoker', 'Whole-Hog Weekends'],
};

export default function FireAndRib() { return <RestaurantPage theme={theme} />; }

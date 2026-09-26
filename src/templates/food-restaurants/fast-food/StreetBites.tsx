import React from 'react';
import { FastFoodNavbar, FastFoodHero, FastFoodCombos, FastFoodStory, FastFoodApp, FastFoodFooter, FastFoodGallery, FastFoodMenu, type FastFoodThemeConfig } from '../components/FastFoodCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const config: FastFoodThemeConfig = {
  id: 'street-bites',
  name: 'Street Bites',
  tagline: 'Authentic street food, massive flavors.',
  palette: {
    primary: '#ff0055', // neon pink/red
    secondary: '#111111', // dark
    background: '#0a0a0a', // very dark
    surface: '#1a1a1a',
    text: '#ffffff',
    accent: '#00e5ff', // neon cyan
  },
  typography: {
    heading: '"Bebas Neue", sans-serif',
    body: '"Inter", sans-serif',
  },
  images: {
    hero: img('photo-1565299507177-b0ac66763828'), // tacos/street food
    story: img('photo-1555939594-58d7cb561ad1'), // food truck cooking
    app: img('photo-1628840042765-356cda07504e'), // hand holding taco
    combos: [
      img('photo-1552332386-f8dd00dc2f85'),
      img('photo-1564759077036-3def242e69c5'),
      img('photo-1555939594-58d7cb561ad1')
    ],
    gallery: [
      img('photo-1565299507177-b0ac66763828'),
      img('photo-1552332386-f8dd00dc2f85'),
      img('photo-1564759077036-3def242e69c5'),
      img('photo-1555939594-58d7cb561ad1')
    ]
  },
  layout: 'street'
};

const menuCategories = [
  {
    name: 'Tacos',
    items: [
      { name: 'Al Pastor', price: '$3.50', desc: 'Marinated pork, pineapple, cilantro, onions.', image: img('photo-1588315029754-2dd089d39a1a') },
      { name: 'Carne Asada', price: '$4.00', desc: 'Grilled steak, salsa verde, onions.', image: img('photo-1585937421612-70a008356fbe') },
      { name: 'Mushroom Tempura', price: '$3.50', desc: 'Crispy mushrooms, chipotle mayo, cabbage slaw.', image: img('photo-1604382354936-07c5d9983bd3') },
    ]
  },
  {
    name: 'Loaded Fries',
    items: [
      { name: 'Street Fries', price: '$8.00', desc: 'Fries topped with asada, queso, pico, and crema.', image: img('photo-1567188040759-fb8a883dc6d8') },
      { name: 'Elote Fries', price: '$7.50', desc: 'Roasted corn, cotija cheese, mayo, chili powder.', image: img('photo-1529193591184-b1d58069ecdd') },
    ]
  },
  {
    name: 'Drinks',
    items: [
      { name: 'Horchata', price: '$3.00', desc: 'Sweet rice milk with cinnamon.', image: img('photo-1555939594-58d7cb561ad1') },
      { name: 'Agua Fresca', price: '$3.00', desc: 'Watermelon or Pineapple, made daily.', image: img('photo-1555939594-58d7cb561ad1') },
    ]
  }
];

export default function StreetBites() {
  return (
    <div style={{ backgroundColor: config.palette.background, fontFamily: config.typography.body, overflowX: 'hidden' }}>
      <FastFoodNavbar theme={config} />
      
      <FastFoodHero 
        theme={config}
        headline="Straight From The Street."
        subheadline="No tables, no waiters, just uncompromising flavor served hot and fast."
        videoSrc=""
      />

      <FastFoodCombos 
        theme={config}
        title="Street Specials"
        items={[
          { name: 'Taco Trio', price: '$10.00', desc: 'Any 3 tacos + drink.', img: config.images.combos[0] },
          { name: 'The Loaded Box', price: '$12.00', desc: 'Street fries + 2 tacos.', img: config.images.combos[1] },
          { name: 'Late Night Fix', price: '$15.00', desc: '4 tacos, fries, and 2 drinks.', img: config.images.combos[2] },
        ]}
      />

      <FastFoodMenu theme={config} categories={menuCategories} />

      <FastFoodStory 
        theme={config}
        headline="Born In The Truck."
        content={[
          "We started in a 10-foot food truck with a flat top grill and a dream. The lines grew, the menu expanded, but the hustle stayed the same.",
          "We still cook every order like it's the only one that matters."
        ]}
      />

      <FastFoodGallery theme={config} images={config.images.gallery} />
      
      <FastFoodApp theme={config} />
      
      <FastFoodFooter theme={config} />
    </div>
  );
}

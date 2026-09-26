import React from 'react';
import { FastFoodNavbar, FastFoodHero, FastFoodCombos, FastFoodStory, FastFoodApp, FastFoodFooter, FastFoodGallery, FastFoodMenu, type FastFoodThemeConfig } from '../components/FastFoodCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const config: FastFoodThemeConfig = {
  id: 'wrap-rush',
  name: 'Wrap Rush',
  tagline: 'Hand-rolled, tightly packed, ready to go.',
  palette: {
    primary: '#6b21a8', // purple
    secondary: '#d946ef', // fuchsia
    background: '#fdf4ff', // light purple background
    surface: '#ffffff',
    text: '#2e1065', // dark purple
    accent: '#f59e0b', // amber
  },
  typography: {
    heading: '"Outfit", sans-serif',
    body: '"Inter", sans-serif',
  },
  images: {
    hero: img('photo-1626700051175-6818013e1d4f'), // wrap/burrito
    story: img('photo-1552332386-f8dd00dc2f85'), // food prep
    app: img('photo-1566843972142-a7fcb70de55a'), // holding wrap
    combos: [
      img('photo-1626700051175-6818013e1d4f'),
      img('photo-1566843972142-a7fcb70de55a'),
      img('photo-1509722747041-616f39b57569') // sandwich/wrap
    ],
    gallery: [
      img('photo-1626700051175-6818013e1d4f'),
      img('photo-1552332386-f8dd00dc2f85'),
      img('photo-1566843972142-a7fcb70de55a'),
      img('photo-1509722747041-616f39b57569')
    ]
  },
  layout: 'neon'
};

const menuCategories = [
  {
    name: 'Signature Wraps',
    items: [
      { name: 'The Californian', price: '$9.99', desc: 'Grilled chicken, avocado, bacon, lettuce, ranch, tomato basil wrap.', image: img('photo-1567188040759-fb8a883dc6d8') },
      { name: 'Spicy Buffalo', price: '$8.99', desc: 'Crispy chicken, buffalo sauce, blue cheese, celery slaw.', image: img('photo-1558030137-a56c1b002c99') },
      { name: 'Falafel Hummus', price: '$8.49', desc: 'Crispy falafel, garlic hummus, cucumber, spinach, whole wheat wrap.', image: img('photo-1529193591184-b1d58069ecdd') },
    ]
  },
  {
    name: 'Breakfast Wraps',
    items: [
      { name: 'Morning Rush', price: '$6.99', desc: 'Scrambled eggs, sausage, hashbrowns, cheddar, salsa.', image: img('photo-1528137871618-79d2761e3fd5') },
      { name: 'Veggie Sunrise', price: '$6.49', desc: 'Egg whites, spinach, feta, roasted peppers.', image: img('photo-1440516851687-7a8a3a48e2d4') },
    ]
  },
  {
    name: 'Snacks',
    items: [
      { name: 'Pita Chips & Hummus', price: '$4.49', desc: 'House-made chips and garlic hummus.', image: img('photo-1549007994-cb92caebd54b') },
      { name: 'Sweet Potato Tots', price: '$3.99', desc: 'Crispy baked tots with a side of aioli.', image: img('photo-1516714435131-44d6b64dc6a2') },
    ]
  }
];

export default function WrapRush() {
  return (
    <div style={{ backgroundColor: config.palette.background, fontFamily: config.typography.body, overflowX: 'hidden' }}>
      <FastFoodNavbar theme={config} />
      
      <FastFoodHero 
        theme={config}
        headline="Fuel On The Go."
        subheadline="Packed with protein, loaded with flavor, and wrapped tightly for a mess-free meal anywhere."
        videoSrc=""
      />

      <FastFoodCombos 
        theme={config}
        title="Rush Combos"
        items={[
          { name: 'The Cali Meal', price: '$12.99', desc: 'Californian wrap, chips, and a drink.', img: config.images.combos[0] },
          { name: 'Buffalo Combo', price: '$11.99', desc: 'Buffalo wrap, tots, and a drink.', img: config.images.combos[1] },
          { name: 'Breakfast Combo', price: '$8.99', desc: 'Morning Rush wrap and a coffee.', img: config.images.combos[2] },
        ]}
      />

      <FastFoodMenu theme={config} categories={menuCategories} />

      <FastFoodStory 
        theme={config}
        headline="No Forks Required."
        content={[
          "We engineered the perfect wrap. The optimal ratio of sauce to filling, wrapped so tightly it never falls apart.",
          "Whether you're eating at your desk, in your car, or walking down the street, we've got you covered."
        ]}
      />

      <FastFoodGallery theme={config} images={config.images.gallery} />
      
      <FastFoodApp theme={config} />
      
      <FastFoodFooter theme={config} />
    </div>
  );
}

import React from 'react';
import { FastFoodNavbar, FastFoodHero, FastFoodCombos, FastFoodStory, FastFoodApp, FastFoodFooter, FastFoodGallery, FastFoodMenu, type FastFoodThemeConfig } from '../components/FastFoodCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const config: FastFoodThemeConfig = {
  id: 'quick-bowl',
  name: 'QuickBowl',
  tagline: 'Fresh, fast, and fueled by nature.',
  palette: {
    primary: '#00a35c', // fresh green
    secondary: '#006639', // dark green
    background: '#f4f9f6', // very light green
    surface: '#ffffff',
    text: '#1a3326', // dark forest
    accent: '#ffb800', // warm yellow
  },
  typography: {
    heading: '"Montserrat", sans-serif',
    body: '"Inter", sans-serif',
  },
  images: {
    hero: img('photo-1546069901-ba9599a7e63c'), // healthy bowl
    story: img('photo-1490645935967-10de6ba17061'), // fresh ingredients
    app: img('photo-1512621776951-a57141f2eefd'), // holding bowl
    combos: [
      img('photo-1546069901-ba9599a7e63c'),
      img('photo-1512621776951-a57141f2eefd'),
      img('photo-1540420773420-3366772f4999') // salad bowl
    ],
    gallery: [
      img('photo-1490645935967-10de6ba17061'),
      img('photo-1540420773420-3366772f4999'),
      img('photo-1546069901-ba9599a7e63c'),
      img('photo-1512621776951-a57141f2eefd')
    ]
  },
  layout: 'classic'
};

const menuCategories = [
  {
    name: 'Signature Bowls',
    items: [
      { name: 'Harvest Chicken Bowl', price: '$11.99', desc: 'Roasted chicken, sweet potatoes, wild rice, kale, balsamic vinaigrette.', image: img('photo-1571407970349-bc81e7e96d47') },
      { name: 'Spicy Tofu Crunch', price: '$10.99', desc: 'Crispy tofu, quinoa, edamame, carrots, spicy peanut dressing.', image: img('photo-1529193591184-b1d58069ecdd') },
      { name: 'Mediterranean Grain', price: '$11.49', desc: 'Falafel, brown rice, hummus, cucumber, feta, lemon tahini.', image: img('photo-1555939594-58d7cb561ad1') },
    ]
  },
  {
    name: 'Build Your Own',
    items: [
      { name: 'Base & Greens', price: 'from $8.99', desc: 'Choose 2 bases (Quinoa, Rice, Kale, Spinach).', image: img('photo-1440516851687-7a8a3a48e2d4') },
      { name: 'Add Protein', price: '+$3.00', desc: 'Chicken, Tofu, Steak, or Salmon.', image: img('photo-1516714435131-44d6b64dc6a2') },
    ]
  },
  {
    name: 'Smoothies',
    items: [
      { name: 'Green Glow', price: '$6.99', desc: 'Spinach, apple, ginger, lemon, cucumber.', image: img('photo-1567188040759-fb8a883dc6d8') },
      { name: 'Berry Antioxidant', price: '$6.99', desc: 'Mixed berries, banana, almond milk, chia.', image: img('photo-1440516851687-7a8a3a48e2d4') },
    ]
  }
];

export default function QuickBowl() {
  return (
    <div style={{ backgroundColor: config.palette.background, fontFamily: config.typography.body, overflowX: 'hidden' }}>
      <FastFoodNavbar theme={config} />
      
      <FastFoodHero 
        theme={config}
        headline="Fast Food, Redefined."
        subheadline="Wholesome ingredients, bold flavors, and served at the speed of life. Eating well shouldn't slow you down."
        videoSrc=""
      />

      <FastFoodCombos 
        theme={config}
        title="Featured Bowls"
        items={[
          { name: 'Harvest Chicken', price: '$11.99', desc: 'Our most popular bowl.', img: config.images.combos[0] },
          { name: 'Spicy Tofu', price: '$10.99', desc: 'Plant-based protein packed.', img: config.images.combos[1] },
          { name: 'Mediterranean', price: '$11.49', desc: 'Fresh and light.', img: config.images.combos[2] },
        ]}
      />

      <FastFoodMenu theme={config} categories={menuCategories} />

      <FastFoodStory 
        theme={config}
        headline="Real Food. Real Fast."
        content={[
          "We believe that fast food doesn't have to mean junk food. We source our produce locally, prepare everything in-house daily, and build your bowl right in front of you.",
          "Good food is fuel. Let us power your day."
        ]}
      />

      <FastFoodGallery theme={config} images={config.images.gallery} />
      
      <FastFoodApp theme={config} />
      
      <FastFoodFooter theme={config} />
    </div>
  );
}

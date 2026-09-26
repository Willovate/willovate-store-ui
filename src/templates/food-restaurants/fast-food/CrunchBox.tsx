import React from 'react';
import { FastFoodNavbar, FastFoodHero, FastFoodCombos, FastFoodStory, FastFoodApp, FastFoodFooter, FastFoodGallery, FastFoodMenu, type FastFoodThemeConfig } from '../components/FastFoodCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const config: FastFoodThemeConfig = {
  id: 'crunch-box',
  name: 'CrunchBox',
  tagline: 'Southern fried chicken, boxed up right.',
  palette: {
    primary: '#ff8a00', // orange
    secondary: '#d91a1a', // deep red
    background: '#fcf8f2', // off white
    surface: '#ffffff',
    text: '#221100', // dark brown
    accent: '#111111',
  },
  typography: {
    heading: '"Oswald", sans-serif',
    body: '"Inter", sans-serif',
  },
  images: {
    hero: img('photo-1626082927389-6cd097cdc6ec'), // fried chicken
    story: img('photo-1626645738196-c2a7c87a8f58'), // frying chicken
    app: img('photo-1569058242253-92a9c755a0ec'), // chicken sandwich
    combos: [
      img('photo-1614707253590-50d4fc833076'),
      img('photo-1634591410144-846101ce6b4e'),
      img('photo-1594212204628-941d4c2fdce1')
    ],
    gallery: [
      img('photo-1614707253590-50d4fc833076'),
      img('photo-1626082895617-2c6ab34758cb'),
      img('photo-1569058242253-92a9c755a0ec'),
      img('photo-1626645738196-c2a7c87a8f58')
    ]
  },
  layout: 'classic'
};

const menuCategories = [
  {
    name: 'Tenders & Wings',
    items: [
      { name: '4-Piece Box', price: '$8.99', desc: '4 hand-breaded tenders, fries, Texas toast, and Crunch sauce.', image: img('photo-1587314168485-3236d6710814') },
      { name: '6-Piece Wings', price: '$9.49', desc: 'Crispy bone-in wings tossed in your choice of sauce.', image: img('photo-1606313564200-e75d5e30476c') },
      { name: 'Family Bucket', price: '$24.99', desc: '12 tenders, 2 large sides, 4 toasts, and plenty of sauce.', image: img('photo-1529193591184-b1d58069ecdd') },
    ]
  },
  {
    name: 'Sandwiches',
    items: [
      { name: 'The Original Crunch', price: '$7.49', desc: 'Crispy breast, pickles, mayo, toasted brioche.', image: img('photo-1628840042765-356cda07504e') },
      { name: 'Spicy Firebird', price: '$7.99', desc: 'Dipped in Nashville hot oil, slaw, pickles.', image: img('photo-1544025162-d76538a679db') },
    ]
  },
  {
    name: 'Sides',
    items: [
      { name: 'Seasoned Fries', price: '$3.49', desc: 'Tossed in our secret spice blend.', image: img('photo-1574071318508-1cdbab80d002') },
      { name: 'Mac & Cheese', price: '$3.99', desc: 'Creamy, cheesy, and baked golden.', image: img('photo-1567188040759-fb8a883dc6d8') },
      { name: 'Coleslaw', price: '$2.99', desc: 'Fresh and tangy.', image: img('photo-1574071318508-1cdbab80d002') },
    ]
  }
];

export default function CrunchBox() {
  return (
    <div style={{ backgroundColor: config.palette.background, fontFamily: config.typography.body, overflowX: 'hidden' }}>
      <FastFoodNavbar theme={config} />
      
      <FastFoodHero 
        theme={config}
        headline="Respect The Crunch."
        subheadline="Hand-breaded, perfectly seasoned, and fried to golden perfection. This is southern comfort in a box."
        videoSrc=""
      />

      <FastFoodCombos 
        theme={config}
        title="Fan Favorites"
        items={[
          { name: 'The Tender Box', price: '$11.99', desc: '4 Tenders, Fries, Toast, Drink.', img: config.images.combos[0] },
          { name: 'The Sandwich Meal', price: '$10.99', desc: 'Original Sandwich, Fries, Drink.', img: config.images.combos[1] },
          { name: 'Wings Combo', price: '$12.99', desc: '6 Wings, Fries, Drink.', img: config.images.combos[2] },
        ]}
      />

      <FastFoodMenu theme={config} categories={menuCategories} />

      <FastFoodStory 
        theme={config}
        headline="Secret Spices. Real Chicken."
        content={[
          "We don't cut corners. Our chicken is marinated for 24 hours, hand-breaded to order, and fried perfectly every single time.",
          "It's about doing one thing, and doing it better than anyone else."
        ]}
      />

      <FastFoodGallery theme={config} images={config.images.gallery} />
      
      <FastFoodApp theme={config} />
      
      <FastFoodFooter theme={config} />
    </div>
  );
}

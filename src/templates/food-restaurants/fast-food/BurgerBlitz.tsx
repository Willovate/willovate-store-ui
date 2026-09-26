import React from 'react';
import { FastFoodNavbar, FastFoodHero, FastFoodCombos, FastFoodStory, FastFoodApp, FastFoodFooter, FastFoodGallery, FastFoodMenu, type FastFoodThemeConfig } from '../components/FastFoodCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const config: FastFoodThemeConfig = {
  id: 'burger-blitz',
  name: 'Burger Blitz',
  tagline: 'Smash burgers, crinkle fries, and thick shakes.',
  palette: {
    primary: '#ff312e', // bright red
    secondary: '#ffc800', // mustard yellow
    background: '#fafafa',
    surface: '#ffffff',
    text: '#111111',
    accent: '#0052cc', // electric blue
  },
  typography: {
    heading: '"Russo One", sans-serif',
    body: '"Inter", sans-serif',
  },
  images: {
    hero: img('photo-1568901346375-23c9450c58cd'), // double cheeseburger
    story: img('photo-1550547660-d9450f859349'), // burger ingredients
    app: img('photo-1627308595229-7830a5c91f9f'), // eating fries
    combos: [
      img('photo-1551782450-a2132b4ba21d'),
      img('photo-1594212204628-941d4c2fdce1'),
      img('photo-1572802419224-296b0aeee0d9')
    ],
    gallery: [
      img('photo-1593504049359-74330189a345'),
      img('photo-1625869016599-2a912bbbc5bf'),
      img('photo-1550547660-d9450f859349'),
      img('photo-1610440042657-612c34d2b7fa')
    ]
  },
  layout: 'bold'
};

const menuCategories = [
  {
    name: 'Burgers',
    items: [
      { name: 'The Blitz Classic', price: '$8.99', desc: 'Double smash patty, American cheese, Blitz sauce, pickles, toasted brioche.', image: img('photo-1558030137-a56c1b002c99') },
      { name: 'Spicy Inferno', price: '$9.49', desc: 'Pepper jack, jalapeños, crispy onions, habanero aioli.', image: img('photo-1513104890138-7c749659a591') },
      { name: 'Shroom & Swiss', price: '$9.99', desc: 'Sautéed mushrooms, Swiss cheese, truffle mayo.', image: img('photo-1555939594-58d7cb561ad1') },
    ]
  },
  {
    name: 'Sides',
    items: [
      { name: 'Crinkle Cut Fries', price: '$3.49', desc: 'Golden, crispy, and salted perfectly.', image: img('photo-1516714435131-44d6b64dc6a2') },
      { name: 'Loaded Cheese Fries', price: '$5.99', desc: 'Topped with melted cheddar, bacon bits, and scallions.', image: img('photo-1604382354936-07c5d9983bd3') },
      { name: 'Onion Rings', price: '$4.49', desc: 'Thick cut, beer-battered, served with ranch.', image: img('photo-1587314168485-3236d6710814') },
    ]
  },
  {
    name: 'Shakes',
    items: [
      { name: 'Classic Vanilla', price: '$4.99', desc: 'Thick spun vanilla bean shake.', image: img('photo-1587314168485-3236d6710814') },
      { name: 'Double Chocolate', price: '$4.99', desc: 'Fudge swirl, whipped cream, cherry.', image: img('photo-1574071318508-1cdbab80d002') },
      { name: 'Strawberry Dream', price: '$4.99', desc: 'Real strawberry purée, blended thick.', image: img('photo-1558030137-a56c1b002c99') },
    ]
  }
];

export default function BurgerBlitz() {
  return (
    <div style={{ backgroundColor: config.palette.background, fontFamily: config.typography.body, overflowX: 'hidden' }}>
      <FastFoodNavbar theme={config} />
      
      <FastFoodHero 
        theme={config}
        headline="Smash. Eat. Repeat."
        subheadline="100% Angus beef smashed to perfection. The juiciest burgers in town, served fast and fresh."
        videoSrc=""
      />

      <FastFoodCombos 
        theme={config}
        title="Top Combos"
        items={[
          { name: 'The Blitz Meal', price: '$12.99', desc: 'Classic Blitz burger, medium fries, and a drink.', img: config.images.combos[0] },
          { name: 'Spicy Combo', price: '$13.49', desc: 'Spicy Inferno burger, loaded fries, and a drink.', img: config.images.combos[1] },
          { name: 'Double Trouble', price: '$15.99', desc: 'Two classic burgers, large fries, and two drinks.', img: config.images.combos[2] },
        ]}
      />

      <FastFoodMenu theme={config} categories={menuCategories} />

      <FastFoodStory 
        theme={config}
        headline="We Don't Fake The Funk."
        content={[
          "We started with one goal: make the perfect smash burger. No frozen patties, no artificial nonsense. Just high-quality meat, fresh veggies, and our signature sauce.",
          "Every burger is smashed fresh on the grill to create that perfect, crispy edge that locks in the flavor."
        ]}
      />

      <FastFoodGallery theme={config} images={config.images.gallery} />
      
      <FastFoodApp theme={config} />
      
      <FastFoodFooter theme={config} />
    </div>
  );
}

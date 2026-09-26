import React from 'react';
import { CafeNavbar, CafeVideoHero, StorySection, InteractiveMenu, CafeGallery, VisitSection, CafeFooter, type CafeThemeConfig } from '../components/CafeCore';

const image = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`;

const config: CafeThemeConfig = {
  id: 'morning-ritual',
  name: 'Morning Ritual',
  tagline: 'Coffee for gentle starts',
  palette: {
    primary: '#5b4638',
    secondary: '#d9846f',
    background: '#fff7ed',
    surface: '#f7ede2',
    text: '#5b4638',
    textLight: '#927262',
    accent: '#ead4bf',
  },
  typography: {
    heading: 'Outfit, sans-serif',
    body: 'Inter, sans-serif',
  },
  images: {
    hero: image('photo-1509042239860-f550ce710b93'), // Latte on table
    about: image('photo-1498837167922-ddd27525d352'), // Coffee beans
    process: image('photo-1442512595331-e89e73853f31'), // Pour over
    visit: image('photo-1501339847302-ac426a4a7cbb'), // Cafe interior
    menu: [],
    gallery: [
      image('photo-1522992319-0365e5f11656'),
      image('photo-1495474472287-4d71bcdd2085'),
      image('photo-1497935586351-b67a49e012bf'),
    ]
  },
  layout: 'airy',
};

const menuCategories = [
  {
    name: 'Coffee',
    items: [
      { name: 'House Latte', desc: 'Velvety espresso, oat milk & a little cloud of foam.', price: '$5.50', image: image('photo-1517701604599-bb29b565090c') },
      { name: 'Seasonal Pour Over', desc: 'A bright rotating single-origin coffee.', price: '$6.00', image: image('photo-1495474472287-4d71bcdd2085') },
    ]
  },
  {
    name: 'Pastries',
    items: [
      { name: 'Morning Croissant', desc: 'Golden, flaky, and still warm from the oven.', price: '$4.50', image: image('photo-1555507036-ab1f4038808a') },
      { name: 'Jammy Berry Scone', desc: 'Buttermilk scone with blackberry jam.', price: '$5.00', image: image('photo-1486427944299-d1955d23e34d') },
    ]
  },
  {
    name: 'Plates',
    items: [
      { name: 'Honey Cinnamon Toast', desc: 'Sourdough, whipped ricotta and local honey.', price: '$8.00', image: image('photo-1525351484163-7529414344d8') },
      { name: 'Garden Breakfast Bowl', desc: 'Soft egg, herbs, avocado and toasted seeds.', price: '$11.00', image: image('photo-1498837167922-ddd27525d352') },
    ]
  }
];

export default function MorningRitual() {
  return (
    <main>
      <CafeNavbar theme={config} />
      <CafeVideoHero theme={config} headline="A softer kind of morning." subheadline="Sunlit coffee, buttery pastries, and a small pause before the day begins." />
      <StorySection theme={config} text="Morning Ritual began with a shared belief: a neighbourhood café should feel a bit like an exhale. Come alone with a book, bring your favourite people, or simply collect something warm for the walk home." />
      <InteractiveMenu theme={config} categories={menuCategories} />
      <CafeGallery theme={config} />
      <VisitSection theme={config} />
      <CafeFooter theme={config} />
    </main>
  );
}

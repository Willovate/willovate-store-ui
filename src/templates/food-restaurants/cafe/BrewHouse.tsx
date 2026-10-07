import React from 'react';
import { CafeNavbar, CafeVideoHero, StorySection, InteractiveMenu, CafeGallery, VisitSection, CafeFooter, type CafeThemeConfig } from '../components/CafeCore';

const image = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`;

const config: CafeThemeConfig = {
  id: 'brew-house',
  name: 'Brew House',
  tagline: 'Coffee with backbone.',
  palette: {
    primary: '#201b18',
    secondary: '#9e6d44',
    background: '#e7ddd1',
    surface: '#d5c4af',
    text: '#201b18',
    textLight: '#736258',
    accent: '#bda995',
  },
  typography: {
    heading: 'Inter, sans-serif',
    body: 'Space Mono, monospace',
  },
  images: {
    hero: image('photo-1509042239860-f550ce710b93'),
    about: image('photo-1495474472287-4d71bcdd2085'),
    process: image('photo-1442512595331-e89e73853f31'),
    visit: image('photo-1442512595331-e89e73853f31'),
    menu: [],
    gallery: [
      image('photo-1514432324607-a09d9b4aefdd'),
      image('photo-1511920170033-f8396924c348'),
      image('photo-1442512595331-e89e73853f31'),
    ],
    headingBackground: image('photo-1447933601403-0c6688de566e')
  },
  layout: 'bold',
};

const menuCategories = [
  {
    name: 'Espresso',
    items: [
      { name: 'House Espresso', desc: 'Notes of dark chocolate and cherry.', price: '$4.00', image: image('photo-1447933601403-0c6688de566e') },
      { name: 'Cortado', desc: 'Equal parts espresso and steamed milk.', price: '$4.50', image: image('photo-1517701604599-bb29b565090c') },
    ]
  },
  {
    name: 'Filter',
    items: [
      { name: 'Batch Brew', desc: 'Rotating single origin, brewed fresh.', price: '$3.50', image: image('photo-1442512595331-e89e73853f31') },
      { name: 'Cold Brew Tonic', desc: 'Slow-steeped cold brew with artisanal tonic.', price: '$6.00', image: image('photo-1461023058943-07fcbe16d735') },
    ]
  }
];

export default function BrewHouse() {
  return (
    <main>
      <CafeNavbar theme={config} />
      <CafeVideoHero theme={config} headline="Coffee with backbone." subheadline="Carefully sourced beans, roasted in small batches and brewed with intention." />
      <StorySection theme={config} text="We buy coffees that feel clear in the cup, roast them in small lots, and tune every recipe until it holds up to a busy Tuesday." />
      <InteractiveMenu theme={config} categories={menuCategories} />
      <CafeGallery theme={config} />
      <VisitSection theme={config} />
      <CafeFooter theme={config} />
    </main>
  );
}

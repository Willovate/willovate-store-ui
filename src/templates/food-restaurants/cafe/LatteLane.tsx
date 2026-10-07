import React from 'react';
import { CafeNavbar, CafeVideoHero, StorySection, InteractiveMenu, CafeGallery, VisitSection, CafeFooter, type CafeThemeConfig } from '../components/CafeCore';

const image = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`;

const config: CafeThemeConfig = {
  id: 'latte-lane',
  name: 'Latte Lane',
  tagline: 'Small treats, big mood',
  palette: {
    primary: '#6a3325',
    secondary: '#d96f4d',
    background: '#fff4e8',
    surface: '#ffe8d4',
    text: '#6a3325',
    textLight: '#a15d4c',
    accent: '#f0c9b8',
  },
  typography: {
    heading: 'Quicksand, sans-serif',
    body: 'Inter, sans-serif',
  },
  images: {
    hero: image('photo-1506224477000-07c7e0e260e9'),
    about: image('photo-1486427944299-d1955d23e34d'),
    process: image('photo-1601050690597-df0568f70950'),
    visit: image('photo-1554118811-1e0d58224f24'),
    menu: [],
    gallery: [
      image('photo-1554118811-1e0d58224f24'),
      image('photo-1541167760496-1628856ab772'),
      image('photo-1520209759809-a9bcb6cb3241'),
    ],
    headingBackground: image('photo-1497935586351-b67a49e012bf')
  },
  layout: 'airy',
};

const menuCategories = [
  {
    name: 'Signatures',
    items: [
      { name: 'Terracotta Latte', desc: 'Espresso with house-made spiced caramel.', price: '$6.00', image: image('photo-1461023058943-07fcbe16d735') },
      { name: 'Blood Orange Soda', desc: 'Sparkling citrus with a splash of cream.', price: '$5.50', image: image('photo-1541167760496-1628856ab772') },
    ]
  },
  {
    name: 'Sweets',
    items: [
      { name: 'Cardamom Bun', desc: 'Soft, twisted, and dusted with sugar.', price: '$4.50', image: image('photo-1525193612562-0ec53b0e5d7c') },
      { name: 'Pistachio Cookie', desc: 'Brown butter and toasted pistachios.', price: '$3.50', image: image('photo-1445116572660-236099ec97a0') },
    ]
  }
];

export default function LatteLane() {
  return (
    <main>
      <CafeNavbar theme={config} />
      <CafeVideoHero theme={config} headline="Meet me on Latte Lane." subheadline="Playful pours, handmade pastries and the city’s warmest corner table." />
      <StorySection theme={config} text="Rounded terracotta warmth with polished latte energy. We believe coffee doesn't have to be so serious. It should be fun, sweet, and a little bit indulgent." />
      <InteractiveMenu theme={config} categories={menuCategories} />
      <CafeGallery theme={config} />
      <VisitSection theme={config} />
      <CafeFooter theme={config} />
    </main>
  );
}

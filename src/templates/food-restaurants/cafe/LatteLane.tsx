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
    hero: image('photo-1511081692775-05d0f180a065'),
    about: image('photo-1514066558159-fc8c737ef259'),
    process: image('photo-1494526585095-c41746248156'),
    visit: image('photo-1504754524776-8f4f37790ca0'),
    menu: [],
    gallery: [
      image('photo-1504754524776-8f4f37790ca0'),
      image('photo-1541167760496-1628856ab772'),
      image('photo-1516738901171-8eb4fc13bd20'),
    ]
  },
  layout: 'airy',
};

const menuCategories = [
  {
    name: 'Signatures',
    items: [
      { name: 'Terracotta Latte', desc: 'Espresso with house-made spiced caramel.', price: '$6.00', image: image('photo-1461023058943-07fcbe16d735') },
      { name: 'Blood Orange Soda', desc: 'Sparkling citrus with a splash of cream.', price: '$5.50', image: image('photo-1453614512568-c4024d13c247') },
    ]
  },
  {
    name: 'Sweets',
    items: [
      { name: 'Cardamom Bun', desc: 'Soft, twisted, and dusted with sugar.', price: '$4.50', image: image('photo-1485808191679-5f86510681a2') },
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

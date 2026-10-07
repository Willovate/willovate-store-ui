import React from 'react';
import { AnnouncementBar, RestaurantNavbar, RestaurantHero, FeaturesStrip, RestaurantStory, RestaurantMenu, PromoSection, RestaurantGallery, Testimonials, LocationCTA, RestaurantFooter, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'velvet-table', name: 'The Velvet Table', tagline: 'A lush, botanical fine dining experience.',
  category: 'fine-dining',
  palette: { primary: '#be123c', secondary: '#052e16', background: '#022c22', surface: '#064e3b', text: '#ecfdf5', textLight: '#a7f3d0', heroOverlay: 'linear-gradient(to right, rgba(2,44,34,0.9), rgba(5,46,22,0.4))' },
  typography: { heading: '"Lora", serif', body: '"Open Sans", sans-serif' },
  images: {
    hero: img('photo-1504674900247-0877df9cc836'), heroAlt: 'Luxurious dining room with velvet green chairs and botanical elements',
    story: img('photo-1504674900247-0877df9cc836'), storyAlt: 'Colorful, beautifully plated avant-garde dish',
    promo: img('photo-1504674900247-0877df9cc836'), promoAlt: 'Lush greenery inside a restaurant',
    gallery: [
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Dining room' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Beetroot carpaccio' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Botanical interior' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Scallop dish' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Gourmet prep' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Wine pour' },
    ],
  },
  content: {
    heroHeadline: 'A Feast for the Senses.',
    heroSub: 'Immerse yourself in a lush botanical setting while enjoying our avant-garde approach to seasonal gastronomy.',
    storyTitle: 'Nature on a Plate.',
    storyBody: [
      'The Velvet Table is a sanctuary in the city. We draw inspiration from nature, foraging local herbs and prioritizing seasonal, vibrant produce to create visually stunning and delicious dishes.',
      'Our dining room is designed to transport you, featuring plush velvet seating, cascading greenery, and soft, intimate lighting.',
    ],
    promoTitle: 'A Unique Experience.',
    promoCTA: 'Book a Table',
    ctaPrimary: 'Reservations', ctaSecondary: 'Explore',
    address: '77 Garden Blvd, Arts District',
    hours: 'Thu-Sun: 6PM - 10PM',
    phone: '(555) 333-2222',
  },
  menu: [
    { tab: 'First Course', items: [
      { name: 'Beetroot Carpaccio', price: '$22', desc: 'Thinly sliced heirloom beets, goat cheese mousse, candied walnuts, micro-arugula.', tags: ['Vegan Option'], image: img('photo-1504674900247-0877df9cc836') },
      { name: 'Lobster Bisque', price: '$26', desc: 'Butter-poached lobster, cognac cream, chive oil.', image: img('photo-1504674900247-0877df9cc836') },
    ]},
    { tab: 'Main Course', items: [
      { name: 'Herb-Crusted Rack of Lamb', price: '$58', desc: 'Mint infused pea purée, roasted root vegetables, rosemary jus.', tags: ['Signature'], image: img('photo-1497935586351-b67a49e012bf') },
      { name: 'Pan-Roasted Duck Breast', price: '$52', desc: 'Cherry gastrique, sweet potato fondant, charred endive.', image: img('photo-1504674900247-0877df9cc836') },
    ]},
  ],
  testimonials: [
    { name: 'Chloe S.', quote: 'The interior is absolutely stunning, and the food matches the aesthetic perfectly. A magical evening.', rating: 5 },
    { name: 'Ben H.', quote: 'Every dish was a work of art. The attention to color and flavor balance is incredible.', rating: 5 },
  ],
  features: ['Botanical Decor', 'Avant-Garde Cuisine', 'Craft Cocktails', 'Intimate Seating'],
};

export default function VelvetTable() {
  return (
    <div style={{ backgroundColor: theme.palette.background, fontFamily: theme.typography.body, overflowX: 'hidden', minHeight: '100vh' }}>
      <RestaurantNavbar theme={theme} />
      <RestaurantHero theme={theme} />
      <FeaturesStrip theme={theme} />
      <PromoSection theme={theme} />
      <RestaurantMenu theme={theme} />
      <RestaurantStory theme={theme} />
      <RestaurantGallery theme={theme} />
      <Testimonials theme={theme} />
      <LocationCTA theme={theme} />
      <RestaurantFooter theme={theme} />
    </div>
  );
}

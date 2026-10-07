import React from 'react';
import { AnnouncementBar, RestaurantNavbar, RestaurantHero, FeaturesStrip, RestaurantStory, RestaurantMenu, PromoSection, RestaurantGallery, Testimonials, LocationCTA, RestaurantFooter, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'ivory-court', name: 'Ivory Court', tagline: 'Modern European tasting menus in an elegant setting.',
  category: 'fine-dining',
  palette: { primary: '#b45309', secondary: '#fef3c7', background: '#ffffff', surface: '#fafaf9', text: '#1c1917', textLight: '#78716c', heroOverlay: 'linear-gradient(to right, rgba(28,25,23,0.7), rgba(255,255,255,0.2))' },
  typography: { heading: '"Cinzel", serif', body: '"Cormorant Garamond", serif' },
  images: {
    hero: img('photo-1504674900247-0877df9cc836'), heroAlt: 'Luxurious dining room with white tablecloths and crystal glasses',
    story: img('photo-1504674900247-0877df9cc836'), storyAlt: 'Chef carefully arranging herbs on a fine dining plate',
    promo: img('photo-1504674900247-0877df9cc836'), promoAlt: 'Sommelier pouring red wine into a crystal glass',
    gallery: [
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Elegant dining area' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Intricate plating' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Wine service' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Gourmet appetizer' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Chef presentation' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Culinary art' },
    ],
  },
  content: {
    heroHeadline: 'Culinary Artistry.',
    heroSub: 'An exploration of modern European cuisine, presented through a meticulously crafted 9-course tasting menu.',
    storyTitle: 'The Pursuit of Perfection.',
    storyBody: [
      'At Ivory Court, dining is treated as high art. Our kitchen operates with precision and passion, sourcing the rarest ingredients globally to create moments of culinary wonder.',
      'From our temperature-controlled wine cellar to the bespoke porcelain plates, every detail is curated to provide an unforgettable evening.',
    ],
    promoTitle: 'Experience the Menu.',
    promoCTA: 'Reserve',
    ctaPrimary: 'Reservations', ctaSecondary: 'Tasting Menus',
    address: '250 Grand Avenue, Metropolis',
    hours: 'Wed-Sun: 6PM - 11PM',
    phone: '(555) 789-0123',
  },
  menu: [
    { tab: 'Tasting Menu', items: [
      { name: 'Amuse-Bouche', price: '', desc: 'Caviar tartlet, crème fraîche, gold leaf.', image: img('photo-1504674900247-0877df9cc836') },
      { name: 'First Course', price: '', desc: 'White asparagus, quail egg, black truffle vinaigrette.', image: img('photo-1504674900247-0877df9cc836') },
      { name: 'Main Course', price: '', desc: 'A5 Wagyu beef, charred leeks, potato mille-feuille, red wine reduction.', tags: ['Signature'], image: img('photo-1504674900247-0877df9cc836') },
    ]},
  ],
  testimonials: [
    { name: 'Jonathan K.', quote: 'The most extraordinary dining experience of my life. The wine pairings were brilliant.', rating: 5 },
    { name: 'Sophia R.', quote: 'Every course was a masterpiece. The attention to detail is unmatched.', rating: 5 },
  ],
  features: ['9-Course Tasting Menu', 'Extensive Wine Cellar', 'Private Dining Room', 'Jacket Required'],
};

export default function IvoryCourt() {
  return (
    <div style={{ backgroundColor: theme.palette.background, fontFamily: theme.typography.body, overflowX: 'hidden', minHeight: '100vh' }}>
      <RestaurantNavbar theme={theme} />
      <RestaurantHero theme={theme} />
      <PromoSection theme={theme} />
      <RestaurantStory theme={theme} />
      <RestaurantMenu theme={theme} />
      <FeaturesStrip theme={theme} />
      <RestaurantGallery theme={theme} />
      <Testimonials theme={theme} />
      <LocationCTA theme={theme} />
      <RestaurantFooter theme={theme} />
    </div>
  );
}

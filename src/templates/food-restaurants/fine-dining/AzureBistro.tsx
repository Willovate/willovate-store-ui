import React from 'react';
import { AnnouncementBar, RestaurantNavbar, RestaurantHero, FeaturesStrip, RestaurantStory, RestaurantMenu, PromoSection, RestaurantGallery, Testimonials, LocationCTA, RestaurantFooter, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'azure-bistro', name: 'Azure Bistro', tagline: 'Coastal French fine dining.',
  category: 'fine-dining',
  palette: { primary: '#0ea5e9', secondary: '#f8fafc', background: '#ffffff', surface: '#f1f5f9', text: '#0f172a', textLight: '#64748b', heroOverlay: 'linear-gradient(to top, rgba(15,23,42,0.8), rgba(255,255,255,0.1))' },
  typography: { heading: '"Playfair Display", serif', body: '"Lato", sans-serif' },
  images: {
    hero: img('photo-1504674900247-0877df9cc836'), heroAlt: 'Elegant coastal dining room overlooking the ocean',
    story: img('photo-1504674900247-0877df9cc836'), storyAlt: 'Chef plating a delicate seafood dish',
    promo: img('photo-1504674900247-0877df9cc836'), promoAlt: 'Beautifully arranged oysters and champagne',
    gallery: [
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Dining room' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Seafood plating' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Oysters' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Scallops' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Steak dish' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Wine pairing' },
    ],
  },
  content: {
    heroHeadline: 'Elegance by the Sea.',
    heroSub: 'Experience the finest coastal French cuisine, prepared with locally sourced seafood and paired with an extensive wine list.',
    storyTitle: 'A Culinary Journey.',
    storyBody: [
      'Azure Bistro brings the sophisticated flavors of the French Riviera to our local coast. Our executive chef crafts seasonal tasting menus that highlight the freshest catch.',
      'We believe dining should be an immersive experience, combining exquisite food, impeccable service, and a breathtaking atmosphere.',
    ],
    promoTitle: 'Reserve Your Table.',
    promoCTA: 'Book Now',
    ctaPrimary: 'Reservations', ctaSecondary: 'View Menus',
    address: '1 Ocean Drive, Coastal City',
    hours: 'Tue-Sun: 5PM - 10PM',
    phone: '(555) 123-9876',
  },
  menu: [
    { tab: 'Tasting Menu', items: [
      { name: 'Oysters Mignonette', price: '$24', desc: 'Half dozen local oysters, classic shallot mignonette.', image: img('photo-1504674900247-0877df9cc836') },
      { name: 'Seared Scallops', price: '$38', desc: 'Diver scallops, cauliflower purée, brown butter, capers.', tags: ['Signature'], image: img('photo-1504674900247-0877df9cc836') },
      { name: 'Bouillabaisse', price: '$45', desc: 'Traditional Provençal fish stew, saffron, rouille, crusty bread.', image: img('photo-1504674900247-0877df9cc836') },
    ]},
    { tab: 'Mains', items: [
      { name: 'Filet Mignon', price: '$55', desc: 'Center cut beef filet, pommes purée, haricots verts, bordelaise.', image: img('photo-1504674900247-0877df9cc836') },
    ]},
  ],
  testimonials: [
    { name: 'Eleanor V.', quote: 'The tasting menu was an absolute delight. Impeccable service and beautiful ocean views.', rating: 5 },
    { name: 'James W.', quote: 'Best seafood I have had outside of France. The scallops are a must-try.', rating: 5 },
  ],
  features: ['Ocean Views', 'Sommelier on Staff', 'Valet Parking', 'Smart Casual Dress Code'],
};

export default function AzureBistro() {
  return (
    <div style={{ backgroundColor: theme.palette.background, fontFamily: theme.typography.body, overflowX: 'hidden', minHeight: '100vh' }}>
      <AnnouncementBar text={`🌊 ${theme.tagline}`} palette={theme.palette} />
      <RestaurantNavbar theme={theme} />
      <RestaurantHero theme={theme} />
      <RestaurantStory theme={theme} />
      <RestaurantGallery theme={theme} />
      <RestaurantMenu theme={theme} />
      <PromoSection theme={theme} />
      <FeaturesStrip theme={theme} />
      <Testimonials theme={theme} />
      <LocationCTA theme={theme} />
      <RestaurantFooter theme={theme} />
    </div>
  );
}

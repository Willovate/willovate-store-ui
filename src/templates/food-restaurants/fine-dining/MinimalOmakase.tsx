import React from 'react';
import { AnnouncementBar, RestaurantNavbar, RestaurantHero, FeaturesStrip, RestaurantStory, RestaurantMenu, PromoSection, RestaurantGallery, Testimonials, LocationCTA, RestaurantFooter, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'minimal-omakase', name: 'Minimal Omakase', tagline: 'Authentic Edo-mae sushi experience.',
  category: 'fine-dining',
  palette: { primary: '#dc2626', secondary: '#171717', background: '#fafafa', surface: '#f5f5f5', text: '#0a0a0a', textLight: '#525252', heroOverlay: 'linear-gradient(to right, rgba(10,10,10,0.8), rgba(250,250,250,0.1))' },
  typography: { heading: '"Noto Serif JP", serif', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1504674900247-0877df9cc836'), heroAlt: 'Sushi chef preparing nigiri at a wooden counter',
    story: img('photo-1504674900247-0877df9cc836'), storyAlt: 'Close up of premium otoro sushi',
    promo: img('photo-1504674900247-0877df9cc836'), promoAlt: 'Minimalist wooden dining interior',
    gallery: [
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Chef at work' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Nigiri selection' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Restaurant interior' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Sake pouring' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Sushi preparation' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Japanese tableware' },
    ],
  },
  content: {
    heroHeadline: 'Leave it to the Chef.',
    heroSub: 'An intimate 12-seat counter serving traditional Edo-mae sushi, flown in daily from Tsukiji Market.',
    storyTitle: 'Simplicity & Mastery.',
    storyBody: [
      'Omakase translates to "I leave it up to you." At our counter, you surrender to the chef\'s expertise as he guides you through a seasonal progression of the finest seafood.',
      'We age our fish, blend our own red vinegar for the rice, and grate fresh wasabi root for every service. No details are overlooked.',
    ],
    promoTitle: 'Limited Seating.',
    promoCTA: 'Book Your Seat',
    ctaPrimary: 'Reservations', ctaSecondary: 'The Experience',
    address: '88 Zen Lane, City Center',
    hours: 'Two seatings nightly: 5:30PM & 8:00PM',
    phone: '(555) 888-0000',
  },
  menu: [
    { tab: 'Omakase', items: [
      { name: 'The Signature Omakase', price: '$150', desc: '18 courses including seasonal appetizers, premium nigiri, tamago, and dessert.', tags: ['Signature'], image: img('photo-1504674900247-0877df9cc836') },
      { name: 'Premium Sake Pairing', price: '$85', desc: '6 curated pours from boutique Japanese breweries.', image: img('photo-1504674900247-0877df9cc836') },
    ]},
  ],
  testimonials: [
    { name: 'Kenji M.', quote: 'The rice was perfectly seasoned and the temperature of the fish was ideal. A true Edo-mae experience.', rating: 5 },
    { name: 'Amanda L.', quote: 'Sitting at the counter watching the chef work is mesmerizing. Worth every penny.', rating: 5 },
  ],
  features: ['12-Seat Counter', 'Daily Fish Deliveries', 'Sake Sommelier', 'Intimate Atmosphere'],
};

export default function MinimalOmakase() {
  return (
    <div style={{ backgroundColor: theme.palette.background, fontFamily: theme.typography.body, overflowX: 'hidden', minHeight: '100vh' }}>
      <AnnouncementBar text={`🍣 ${theme.tagline}`} palette={theme.palette} />
      <RestaurantNavbar theme={theme} />
      <RestaurantHero theme={theme} />
      <RestaurantGallery theme={theme} />
      <RestaurantStory theme={theme} />
      <RestaurantMenu theme={theme} />
      <FeaturesStrip theme={theme} />
      <PromoSection theme={theme} />
      <Testimonials theme={theme} />
      <LocationCTA theme={theme} />
      <RestaurantFooter theme={theme} />
    </div>
  );
}

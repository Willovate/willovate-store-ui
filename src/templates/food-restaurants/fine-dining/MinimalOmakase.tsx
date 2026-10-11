import React from 'react';
import {
  RestaurantPage,
  type RestaurantThemeConfig
} from '../components/RestaurantCore';

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'minimal-omakase',
  name: 'Minimal Omakase',
  tagline: 'Authentic Edo-mae sushi. 12 hinoki seats. Pure culinary devotion.',
  category: 'fine-dining',
  palette: {
    primary: '#dc2626',      // Japanese Vermilion Crimson
    secondary: '#121316',    // Deep Ink Obsidian
    background: '#0d0e11',   // Zen Charcoal
    surface: '#181a1f',      // Polished Hinoki Shadow
    text: '#f8fafc',         // Washi Paper White
    textLight: '#94a3b8',    // Slate Smoke
    heroOverlay: 'linear-gradient(to right, rgba(13,14,17,0.94) 0%, rgba(13,14,17,0.6) 55%, rgba(0,0,0,0.2) 100%)',
    border: 'rgba(220,38,38,0.25)',
  },
  typography: {
    heading: '"Cinzel", "Noto Serif JP", serif',
    body: '"Inter", sans-serif',
  },
  images: {
    hero: img('photo-1617196034183-421b4040ed20'),
    heroAlt: 'Master sushi chef gently placing wild bluefin otoro nigiri onto a blackened yakisugi counter',
    story: img('photo-1569050467447-ce54b3bbc37d'),
    storyAlt: 'Intricate knife scoring on wild Hokkaido scallop and Shizuoka grated wasabi',
    promo: img('photo-1617196034738-26b1a23fda5b'),
    promoAlt: 'Minimalist 12-seat single-slab Hinoki wood counter with soft ambient lighting',
    gallery: [
      { src: img('photo-1617196034183-421b4040ed20'), alt: 'Master chef hand-shaping warm red-vinegar shari nigiri' },
      { src: img('photo-1569050467447-ce54b3bbc37d'), alt: 'Aged wild bluefin otoro brushed with 15-year nikiri shoyu' },
      { src: img('photo-1617196034738-26b1a23fda5b'), alt: 'Serene 12-seat Hinoki cedar sanctuary in silence' },
      { src: img('photo-1579871494447-9811cf80d66c'), alt: 'Ceremonial sake service poured from hand-blown Edo-kiriko glass' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Live sea urchin (Hokkaido Uni) service in sea water' },
      { src: img('photo-1514190051997-0f6f39ca5cde'), alt: 'Handmade Bizen stoneware vessels and charcoal glazed plates' },
    ],
  },
  content: {
    heroHeadline: 'Surrender to the Master.',
    heroSub:
      'An intimate 12-seat counter sanctuary devoted to the purest tradition of Edo-mae sushi. Wild harvests flown in directly from Tokyo’s Toyosu Market. Every single piece is a meditation.',
    storyTitle: 'Discipline, Time & Shari.',
    storyBody: [
      'Omakase translates directly to "I entrust it to you." At our hinoki counter, you place yourself entirely in the care of Master Chef Kenji Takahashi, who shapes eighteen courses in real-time before your eyes.',
      'We age each fish species to its precise apex of umami, blend our own private 3-year aged red vinegar (akazu) for the warm shari rice, and grate fresh mountain wasabi from Shizuoka right before service. Zero shortcuts. Pure devotion.',
    ],
    promoTitle: 'Twelve Seats. Two Seatings Nightly.',
    promoCTA: 'Reserve Counter Seat',
    ctaPrimary: 'Reserve Counter',
    ctaSecondary: 'View 18-Course Flow',
    address: '88 Zen Lane, Cultural District, Tokyo Quarter',
    hours: 'Seatings nightly at 5:30 PM & 8:15 PM · Tuesday – Sunday',
    phone: '(555) 888-0000',
    chefName: 'Kenji Takahashi',
    chefTitle: 'Sushi Master & Edo-mae Shokunin',
    chefQuote: 'The fish is only half of the story. The true soul of Edo-mae sushi is the shari — its warmth, its acidity, and how it dissolves on the tongue in harmony with the sea.',
  },
  tastingCourses: [
    {
      courseNumber: '01',
      title: 'Sakizuke',
      dishName: 'Hokkaido Bafun Uni & Steamed Abalone',
      description: 'Slow-poached Kuroawabi abalone, rich liver sauce emulsion, sweet sea urchin from Yoichi.',
      winePairing: 'Juyondai Junmai Daiginjo ‘Ryugetsu’',
      wineOrigin: 'Takagi Brewery, Yamagata, Japan',
    },
    {
      courseNumber: '02',
      title: 'Yakimono',
      dishName: 'Binchotan-Charred Nodoguro (Blackthroat Seaperch)',
      description: 'Fatty seaperch crisped over Japanese white charcoal, grated daikon, Sudachi citrus.',
      winePairing: 'Kokuryu ‘Black Dragon’ Shizuku Daiginjo',
      wineOrigin: 'Fukui Prefecture, Japan',
    },
    {
      courseNumber: '03',
      title: 'Nigiri Progression',
      dishName: '10-Day Aged Wild Hon-Maguro Otoro',
      description: 'Hand-pressed with warm Akazu rice, brushed with 15-year aged house nikiri, Shizuoka real wasabi.',
      winePairing: 'Isojiman Junmai Daiginjo Nakadori',
      wineOrigin: 'Shizuoka Prefecture, Japan',
    },
    {
      courseNumber: '04',
      title: 'Mizumono',
      dishName: 'Castella Tamagoyaki & Shizuoka Crown Melon',
      description: 'Shrimp paste and organic egg custard baked slowly for 3 hours, chilled musk melon.',
      winePairing: 'Uji Ceremonial Single-Estate Koicha Matcha',
      wineOrigin: 'Kyoto, Japan',
    },
  ],
  menu: [
    {
      tab: 'Counter Experiences',
      items: [
        {
          name: 'The Grand Edo-mae Omakase (18 Courses)',
          price: '$185',
          desc: 'Seasonal otsumami appetizers, 12 signature nigiri pieces (Otoro, Uni, Nodoguro, Wagyu), tamago, dashi, dessert.',
          tags: ['Signature', '12 Seats Only'],
          image: img('photo-1617196034183-421b4040ed20'),
          winePairing: 'Master Sake Progression Pairing',
        },
        {
          name: 'Lunch Nigiri Omakase (12 Courses)',
          price: '$110',
          desc: 'Focused midday service featuring morning Toyosu market arrivals, 9 nigiri, handroll, and red miso soup.',
          tags: ['Lunch Seating'],
          image: img('photo-1569050467447-ce54b3bbc37d'),
          winePairing: 'Dassai 23 Junmai Daiginjo',
        },
      ],
    },
    {
      tab: 'Sake & Rare Spirits',
      items: [
        {
          name: 'Rare Junmai Daiginjo Flight (6 Pours)',
          price: '$95',
          desc: 'Curated by Master Sommelier, featuring unpasteurized Genshu and aged vintage sakes from Niigata and Yamagata.',
          image: img('photo-1579871494447-9811cf80d66c'),
        },
        {
          name: 'Japanese Single Malt Reserve Pairing',
          price: '$135',
          desc: 'Four rare expressions from Yamazaki, Hakushu 18-Year, and Karuizawa distillery.',
          image: img('photo-1617196034738-26b1a23fda5b'),
        },
      ],
    },
  ],
  testimonials: [
    {
      name: 'Kenji Morimoto',
      quote:
        'The shari temperature was perfectly calibrated to each piece of fish. You can taste the 3-year aged red vinegar and the sheer discipline of the shokunin.',
      rating: 5,
      publication: 'Tokyo Gastronomy Review',
    },
    {
      name: 'Amanda Lindqvist',
      quote:
        'Sitting at the hinoki counter is pure theater. The silent focus, the gentle flick of the master’s wrist, and the sublime otoro that dissolves on the tongue.',
      rating: 5,
      publication: 'Michelin Inspector Note',
    },
    {
      name: 'David Chen',
      quote:
        'I have eaten at three-star omakase counters across Ginza and Kyoto. Minimal Omakase is every bit as transcendent. The sake pairing was unforgettable.',
      rating: 5,
      publication: 'The Global Palate',
    },
  ],
  features: [
    '12 Hinoki Wood Counter Seats',
    'Daily Air-Freight from Toyosu Tokyo',
    'Certified Kikisake-shi Sake Sommelier',
    'Strict Prompt Seating Protocol',
  ],
};

export default function MinimalOmakase() {
  return <RestaurantPage theme={theme} />;
}

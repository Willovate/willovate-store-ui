import React from 'react';
import {
  RestaurantPage,
  type RestaurantThemeConfig
} from '../components/RestaurantCore';

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'velvet-table',
  name: 'The Velvet Table',
  tagline: 'A lush botanical sanctuary where avant-garde gastronomy meets wild nature.',
  category: 'fine-dining',
  palette: {
    primary: '#be123c',      // Regal Rose Ruby
    secondary: '#03251d',    // Deep Forest Pine
    background: '#021e17',   // Night Emerald Sanctuary
    surface: '#05392d',      // Velvet Leaf Surface
    text: '#f0fdf4',         // Crisp Herbal Cream
    textLight: '#86efac',    // Soft Mint
    heroOverlay: 'linear-gradient(to right, rgba(2,30,23,0.92) 0%, rgba(3,37,29,0.6) 60%, rgba(0,0,0,0.2) 100%)',
    border: 'rgba(190,18,60,0.3)',
  },
  typography: {
    heading: '"Lora", "Playfair Display", serif',
    body: '"Inter", "Open Sans", sans-serif',
  },
  images: {
    hero: img('photo-1414235077428-338989a2e8c0'),
    heroAlt: 'Opulent botanical dining room with emerald velvet booths and cascading living ferns',
    story: img('photo-1611270629569-8b357cb88da9'),
    storyAlt: 'Chef plating wild-foraged herbs, edible blossoms and beetroot carpaccio',
    promo: img('photo-1466637574441-749b8f19452f'),
    promoAlt: 'Atmospheric living greenhouse conservatory inside the fine dining dining room',
    gallery: [
      { src: img('photo-1414235077428-338989a2e8c0'), alt: 'Intimate velvet booth under hanging botanical canopy' },
      { src: img('photo-1485963631004-f2f00b1d6606'), alt: 'Heirloom beetroot carpaccio with elderflower pearls' },
      { src: img('photo-1466637574441-749b8f19452f'), alt: 'Verdant conservatory atrium illuminated by amber taper candles' },
      { src: img('photo-1611270629569-8b357cb88da9'), alt: 'Pan-roasted duck breast with wild cherry gastrique' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Sous-chef hand-foraging herbs in the rooftop kitchen garden' },
      { src: img('photo-1510812431401-41d2bd2722f3'), alt: 'Botanical cocktail infusion ceremony with smoke bell' },
    ],
  },
  content: {
    heroHeadline: 'Nature in Avant-Garde Form.',
    heroSub:
      'Immerse your senses in a lush urban botanical sanctuary. Our avant-garde seasonal cuisine translates the wildest local flora and forest harvest into luminous edible art.',
    storyTitle: 'The Living Earth on a Plate.',
    storyBody: [
      'The Velvet Table was founded on a simple conviction: the deepest culinary elegance comes from the earth itself. Every morning, our team forages native forest botanicals, wild mushrooms, and coastal herbs.',
      'Inside our glass-roofed conservatory, plush forest-green velvet, flickering taper candles, and soothing ambient acoustics create an enchanted realm where time slows and every bite is an awakening.',
    ],
    promoTitle: 'Dine in the Living Greenhouse.',
    promoCTA: 'Reserve Conservatory Table',
    ctaPrimary: 'Book a Table',
    ctaSecondary: 'View Botanical Menu',
    address: '77 Garden Boulevard, Arts & Botanical District',
    hours: 'Thursday – Sunday · 6:00 PM – 10:30 PM',
    phone: '(555) 333-2222',
    chefName: 'Rowan Vance',
    chefTitle: 'Chef Forager & Culinary Alchemist',
    chefQuote: 'We do not tame nature in our kitchen — we listen to its season, capture its living essence, and paint it onto porcelain.',
  },
  tastingCourses: [
    {
      courseNumber: '01',
      title: 'Forest Awakening',
      dishName: 'Heirloom Beetroot Carpaccio & Elderflower Gel',
      description: 'Paper-thin crimson beets, whipped cashew chevre, candied walnuts, pine tip oil, wild wood sorrel.',
      winePairing: '2021 Weingut Keller Riesling Trocken',
      wineOrigin: 'Rheinhessen, Germany',
    },
    {
      courseNumber: '02',
      title: 'The Forager’s Sea',
      dishName: 'Butter-Poached Lobster & Pine-Smoked Bisque',
      description: 'Maine lobster claw, cognac-infused cream, sea lettuce crisp, spruce tip oil, oscietra caviar.',
      winePairing: '2020 Domaine Leflaive Puligny-Montrachet',
      wineOrigin: 'Burgundy, France',
    },
    {
      courseNumber: '03',
      title: 'Wild Harvest',
      dishName: 'Herb-Crusted Rack of Lamb & Wild Morels',
      description: 'Pasture-raised lamb, mint-scented sweet pea purée, glazed spring morels, charred rosemary jus.',
      winePairing: '2017 Château de Beaucastel Châteauneuf-du-Pape',
      wineOrigin: 'Rhône Valley, France',
    },
    {
      courseNumber: '04',
      title: 'Earth & Meadow',
      dishName: 'Dark Chocolate Ganache & Fermented Pinecone Glaze',
      description: 'Single-origin 74% cocoa, smoked sea salt, chamomile flower gelato, candied forest pine nuts.',
      winePairing: '2015 Quinta do Noval Vintage Port',
      wineOrigin: 'Douro Valley, Portugal',
    },
  ],
  menu: [
    {
      tab: 'Botanical Creations',
      items: [
        {
          name: 'Heirloom Beetroot Carpaccio',
          price: '$26',
          desc: 'Whipped artisanal goat cheese, candied walnuts, micro-sorrel, elderflower vinaigrette.',
          tags: ['Plant-Forward', 'Organic'],
          image: img('photo-1485963631004-f2f00b1d6606'),
          winePairing: '2022 Domaine Sigalas Assyrtiko',
        },
        {
          name: 'Butter-Poached Lobster Bisque',
          price: '$32',
          desc: 'Fresh Maine lobster, roasted lobster coral reduction, cognac cream, chive blossom.',
          image: img('photo-1504674900247-0877df9cc836'),
          winePairing: '2019 Louis Latour Chassagne-Montrachet',
        },
        {
          name: 'Garden Flora Tasting Board',
          price: '$28',
          desc: 'Foraged crudités, wild ramp hummus, house pickled chanterelles, edible violet blossoms.',
          tags: ['Foraged', 'Vegetarian'],
          image: img('photo-1466637574441-749b8f19452f'),
        },
      ],
    },
    {
      tab: 'Pasture & Forest',
      items: [
        {
          name: 'Herb-Crusted Rack of Lamb',
          price: '$64',
          desc: 'New Zealand lamb rack, fresh pea velouté, glazed heirloom baby carrots, rosemary glaze.',
          tags: ['Signature'],
          image: img('photo-1611270629569-8b357cb88da9'),
          winePairing: '2018 Guigal Côte-Rôtie',
        },
        {
          name: 'Pan-Roasted Duck Breast',
          price: '$56',
          desc: 'Wild sour cherry gastrique, sweet potato fondant, charred endive, pomegranate reduction.',
          image: img('photo-1414235077428-338989a2e8c0'),
          winePairing: '2019 Domaine Serene Evenstad Reserve Pinot Noir',
        },
        {
          name: 'Forest Chanterelle Risotto',
          price: '$48',
          desc: 'Acquerello carnaroli rice, black truffle butter, shaved pecorino sardo, porcini dust.',
          tags: ['Vegetarian'],
          image: img('photo-1504674900247-0877df9cc836'),
          winePairing: '2020 Gaja Barbaresco',
        },
      ],
    },
  ],
  testimonials: [
    {
      name: 'Chloe Sinclair',
      quote:
        'The botanical conservatory is spellbinding. Every dish arrived like a poetic woodland arrangement and tasted even better.',
      rating: 5,
      publication: 'Vogue Living Gastronomy',
    },
    {
      name: 'Benedict Hayes',
      quote:
        'The lamb with fresh morels and the elderflower beetroot carpaccio was pure artistry. Service is gentle, warm, and remarkably knowledgeable.',
      rating: 5,
      publication: 'The Michelin Guide Review',
    },
    {
      name: 'Isabelle Laurent',
      quote:
        'The cocktail pairings featuring house-distilled pine and wild chamomile extracts were completely visionary. An absolute dream.',
      rating: 5,
      publication: 'World’s 50 Best Discovery',
    },
  ],
  features: [
    'Living Greenhouse Conservatory',
    'Daily Wild Botanical Foraging',
    'Natural & Biodynamic Wine List',
    'Intimate Candlelit Booths',
  ],
};

export default function VelvetTable() {
  return <RestaurantPage theme={theme} />;
}

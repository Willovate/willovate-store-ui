import React from 'react';
import {
  RestaurantPage,
  type RestaurantThemeConfig
} from '../components/RestaurantCore';

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'noir-ember',
  name: 'Noir & Ember',
  tagline: 'Dry-aged prime beef. Live wood fire. Rare cask whiskies.',
  category: 'fine-dining',
  palette: {
    primary: '#d4af37',      // Brushed Champagne Gold
    secondary: '#0e1013',    // Smoked Obsidian
    background: '#090a0c',   // Deep Charcoal
    surface: '#15171b',      // Dark Slate
    text: '#ffffff',
    textLight: '#94a3b8',
    heroOverlay: 'linear-gradient(135deg, rgba(9,10,12,0.94) 0%, rgba(14,16,19,0.65) 60%, rgba(0,0,0,0.3) 100%)',
    border: 'rgba(212,175,55,0.22)',
  },
  typography: {
    heading: '"Oswald", "Cinzel", serif',
    body: '"Inter", sans-serif',
  },
  images: {
    hero: img('photo-1544025162-d76694265947'),
    heroAlt: 'Dry-aged tomahawk ribeye seared over live hardwood charcoal with ember sparks',
    story: img('photo-1550966871-3ed3cdb5ed0c'),
    storyAlt: 'Executive Chef Adrian Mercer carving 45-day dry-aged wagyu at the butcher block',
    promo: img('photo-1510812431401-41d2bd2722f3'),
    promoAlt: 'Rare single-malt whisky poured tableside into cut-crystal glassware',
    gallery: [
      { src: img('photo-1544025162-d76694265947'), alt: '40oz Tomahawk seared over white oak coals' },
      { src: img('photo-1529193591184-b1d58069ecdd'), alt: 'Dry-aged ribeye marbled with Himalayan salt crust' },
      { src: img('photo-1414235077428-338989a2e8c0'), alt: 'Atmospheric candlelit dining room with leather booths' },
      { src: img('photo-1559339352-11d035aa65de'), alt: 'Private cellar reserve of 280+ rare single-malt whiskies' },
      { src: img('photo-1550966871-3ed3cdb5ed0c'), alt: 'Chef seasoning prime cut with smoked sea salt' },
      { src: img('photo-1551024709-8f23befc6f87'), alt: 'Smoked dark chocolate ganache dessert with gold leaf' },
    ],
  },
  content: {
    heroHeadline: 'Fire, Smoke & Prime.',
    heroSub:
      'Dry-aged USDA Prime steaks charred over live white oak. Rare single-cask Islay whiskies. An unapologetically sultry atmosphere in the heart of the city.',
    storyTitle: 'The Ritual of the Hearth.',
    storyBody: [
      'Every cut that enters the dining room undergoes our rigorous in-house dry-aging protocol for a minimum of 45 days, developing an unmatched depth of hazelnut aroma and velvety tenderness.',
      'Cooked over open Argentine parrillagrill fires fueled exclusively by cured white oak and binchotan coals at temperatures surpassing 900°F. Savor each bite paired with our sommelier-curated cellar of vintage Barolos and peated single malts.',
    ],
    promoTitle: 'The Private Ember Salon.',
    promoCTA: 'Reserve Private Salon',
    ctaPrimary: 'Book a Table',
    ctaSecondary: 'View Menu & Cuts',
    address: '500 Ember Lane, Financial District, New York, NY',
    hours: 'Monday – Sunday · 5:00 PM – 12:00 AM',
    phone: '(212) 555-0199',
    chefName: 'Adrian Mercer',
    chefTitle: 'Executive Chef & Master Pitmaster',
    chefQuote: 'Great meat requires no disguise — only patience in the aging locker, unrelenting heat from genuine hardwood coals, and total reverence for the animal.',
  },
  tastingCourses: [
    {
      courseNumber: '01',
      title: 'The Prelude',
      dishName: 'Charred Bone Marrow & Smoked Sea Salt',
      description: 'Roasted beef femur marrow, wild herb gremolata, charred sourdough soldier, pickled shallot pearls.',
      winePairing: 'Ardbeg 10-Year Islay Single Malt Highball',
      wineOrigin: 'Islay, Scotland',
    },
    {
      courseNumber: '02',
      title: 'From the Embers',
      dishName: 'Wood-Fired Spanish Octopus & Nduja Emulsion',
      description: 'Tender braised octopus charred over binchotan, crispy purple potatoes, spicy Calabrian nduja vinaigrette.',
      winePairing: '2020 López de Heredia Viña Gravonia Blanco',
      wineOrigin: 'Rioja Alta, Spain',
    },
    {
      courseNumber: '03',
      title: 'The Masterpiece',
      dishName: '45-Day Dry-Aged Prime Ribeye & Black Truffle Jus',
      description: 'Carved tableside, smoked marrow reduction, roasted baby leeks, whipped Yukon gold potatoes with duck fat.',
      winePairing: '2016 Caymus Vineyards Special Selection Cabernet',
      wineOrigin: 'Napa Valley, California',
    },
    {
      courseNumber: '04',
      title: 'The Finale',
      dishName: 'Smoked Single-Origin Chocolate Dome',
      description: 'Valrhona 70% guanaja, toasted malt gelato, 25-year aged balsamic caramel, edible 24k gold leaf.',
      winePairing: 'Lagavulin 16-Year Distillers Edition',
      wineOrigin: 'Islay, Scotland',
    },
  ],
  menu: [
    {
      tab: 'Prime Steaks',
      items: [
        {
          name: '45-Day Dry-Aged Ribeye (16oz)',
          price: '$92',
          desc: 'Bone-in prime beef charred over white oak embers, bone marrow butter, fleur de sel.',
          tags: ['Signature', 'In-House Aged'],
          image: img('photo-1529193591184-b1d58069ecdd'),
          winePairing: '2018 Silver Oak Cabernet Sauvignon',
        },
        {
          name: 'Japanese A5 Wagyu Strip (6oz)',
          price: '$135',
          desc: 'Air-freighted from Miyazaki Prefecture, seared on binchotan, wasabi stem relish, aged tamari.',
          tags: ['A5 Certified', 'Rare Cut'],
          image: img('photo-1544025162-d76694265947'),
          winePairing: 'Yamazaki 12-Year Single Malt',
        },
        {
          name: 'The Tomahawk for Two (42oz)',
          price: '$225',
          desc: 'Long-bone rib steak carved tableside, black garlic butter, smoked chimichurri, hand-cut duck fat frites.',
          tags: ['For Two', 'Tableside Carving'],
          image: img('photo-1544025162-d76694265947'),
          winePairing: '2017 Penfolds St. Henri Shiraz',
        },
      ],
    },
    {
      tab: 'Hearth Starters',
      items: [
        {
          name: 'Charred Bone Marrow',
          price: '$24',
          desc: 'Herb gremolata, pickled red onion, grilled brioche toast points.',
          image: img('photo-1550966871-3ed3cdb5ed0c'),
          winePairing: 'Talisker 10-Year Island Scotch',
        },
        {
          name: 'Prime Beef Tartare',
          price: '$28',
          desc: 'Hand-cut tenderloin, quail egg yolk, caper berries, house cured mustard seeds, tallow potato chips.',
          image: img('photo-1504674900247-0877df9cc836'),
          winePairing: '2021 Domaine Dujac Morey-Saint-Denis',
        },
        {
          name: 'Wood-Fired Spanish Octopus',
          price: '$32',
          desc: 'Smoked paprika oil, fingerling confit, roasted garlic aioli, celery heart salad.',
          image: img('photo-1534482421-64566f976cfa'),
          winePairing: '2020 Albariño de Fefiñanes',
        },
      ],
    },
    {
      tab: 'Sides & Cellar',
      items: [
        {
          name: 'Black Truffle Mac & Gruyère',
          price: '$22',
          desc: 'Aged cave cheddar, French Gruyère, hand-shaved Périgord black winter truffles.',
          image: img('photo-1551024709-8f23befc6f87'),
        },
        {
          name: 'Charred Broccolini & Bone Marrow Pangrattato',
          price: '$18',
          desc: 'Calabrian chili, toasted pine nuts, smoked sea salt, lemon agrumato.',
          image: img('photo-1553361371-9b22f78e8b1d'),
        },
        {
          name: 'Duck Fat Frites',
          price: '$16',
          desc: 'Twice-cooked Kennebec potatoes, rosemary salt, roasted garlic béarnaise.',
          image: img('photo-1529193591184-b1d58069ecdd'),
        },
      ],
    },
  ],
  testimonials: [
    {
      name: 'Marcus Davenport',
      quote:
        'The crust achieved on the 45-day dry-aged ribeye is phenomenal. You taste the oak, the age, and the heat in every single bite.',
      rating: 5,
      publication: 'New York Food & Wine Critic',
    },
    {
      name: 'Elena Rostova',
      quote:
        'A temple of smoke and prime beef. The sommelier paired our Wagyu with an eighteen-year Japanese whisky that was revelatory.',
      rating: 5,
      publication: 'Epicurean Journal',
    },
    {
      name: 'Robert Vance',
      quote:
        'The Tomahawk for two carved tableside was the culinary highlight of our year. Impeccable service, seductive lighting, and unmatched flavor.',
      rating: 5,
      publication: 'Michelin Guide Inspector Note',
    },
  ],
  features: [
    'In-House 45-Day Dry Aging Vault',
    'Open Hardwood Parrilla Hearth',
    'Cellar of 280+ Rare Whiskies',
    'Private Dining Salon & Cigar Terrace',
  ],
};

export default function NoirEmber() {
  return <RestaurantPage theme={theme} />;
}

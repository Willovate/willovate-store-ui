import React from 'react';
import {
  RestaurantPage,
  type RestaurantThemeConfig
} from '../components/RestaurantCore';

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'ivory-court',
  name: 'Ivory Court',
  tagline: 'Modern European tasting menus in an atmosphere of quiet elegance.',
  category: 'fine-dining',
  palette: {
    primary: '#c5a059',      // Champagne Antique Gold
    secondary: '#1c1917',    // Deep European Slate
    background: '#fdfcf9',   // Warm Alabaster Ivory
    surface: '#f6f3eb',      // Soft Linen
    text: '#1c1917',         // Rich Charcoal Ink
    textLight: '#78716c',    // Warm Stone
    heroOverlay: 'linear-gradient(to right, rgba(28,25,23,0.85) 0%, rgba(28,25,23,0.52) 60%, rgba(0,0,0,0.2) 100%)',
    border: 'rgba(197,160,89,0.3)',
  },
  typography: {
    heading: '"Cinzel", "Playfair Display", Georgia, serif',
    body: '"Cormorant Garamond", "Inter", serif',
  },
  images: {
    hero: img('photo-1414235077428-338989a2e8c0'),
    heroAlt: 'Grand Parisian dining room with crystal chandeliers and crisp hand-pressed linen',
    story: img('photo-1565299585323-38d6b0865b47'),
    storyAlt: 'Chef arranging micro edible flowers and caviar on hand-thrown porcelain',
    promo: img('photo-1510812431401-41d2bd2722f3'),
    promoAlt: 'Head Sommelier pouring vintage Krug Grand Cuvée Champagne',
    gallery: [
      { src: img('photo-1414235077428-338989a2e8c0'), alt: 'Candlelit salon set with Rosenthal porcelain and Christofle silver' },
      { src: img('photo-1565299585323-38d6b0865b47'), alt: 'Golden egg with Ossetra caviar and Meyer lemon sabayon' },
      { src: img('photo-1510812431401-41d2bd2722f3'), alt: 'Cellar reserve tasting with vintage Burgundy decanters' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'White asparagus with winter black truffle emulsion' },
      { src: img('photo-1529193591184-b1d58069ecdd'), alt: 'Roast squab with foie gras and heirloom cherry reduction' },
      { src: img('photo-1621996346565-e3dbc646d9a9'), alt: 'Dessert composition of Tahitian vanilla and caramelized pear' },
    ],
  },
  content: {
    heroHeadline: 'The Height of European Gastronomy.',
    heroSub:
      'An exploration of classic French discipline and contemporary European artistry. Nine meticulously composed courses. Every detail deliberate. Every moment unforgettable.',
    storyTitle: 'The Relentless Pursuit of Art.',
    storyBody: [
      'At Ivory Court, dining is elevated to high art. Under the direction of Chef Hélène Laurent, our kitchen operates with surgical precision, curating ingredients exclusively from trusted small-batch European purveyors.',
      'From Brittany line-caught turbot to Périgord black winter truffles and an underground cellar boasting 1,400 reference labels, your evening is orchestrated as an intimate symphonic performance.',
    ],
    promoTitle: 'The Grand Autumn Degustation.',
    promoCTA: 'Reserve Tasting Experience',
    ctaPrimary: 'Book a Table',
    ctaSecondary: 'Explore Tasting Menu',
    address: '250 Grand Avenue, Cultural Quarter, Metropolis',
    hours: 'Wednesday – Sunday · 6:00 PM – 11:30 PM',
    phone: '(555) 789-0123',
    chefName: 'Hélène Laurent',
    chefTitle: 'Chef Patronne & Chevalier de l’Ordre Culinaire',
    chefQuote: 'True elegance is not an abundance of ingredients, but the profound clarity of flavour when each element is elevated to its absolute purest expression.',
  },
  tastingCourses: [
    {
      courseNumber: '01',
      title: 'L’Ouverture',
      dishName: 'Ossetra Caviar Imperial & Meyer Lemon Sabayon',
      description: 'Hand-pressed buckwheat tartlet, crème fraîche, 24k gold leaf, organic crisp apple gelee.',
      winePairing: 'Champagne Salon Blanc de Blancs ‘Le Mesnil’ 2012',
      wineOrigin: 'Le Mesnil-sur-Oger, Champagne, France',
    },
    {
      courseNumber: '02',
      title: 'La Mer',
      dishName: 'Wild Brittany Turbot & Vin Jaune Velouté',
      description: 'Slow-poached in seaweed butter, charred baby leeks, braised morels, vin jaune reduction.',
      winePairing: 'Domaine des Comtes Lafon Meursault-Charmes 2018',
      wineOrigin: 'Burgundy, France',
    },
    {
      courseNumber: '03',
      title: 'La Terre',
      dishName: 'Bresse Squab & Black Winter Truffle Wellington',
      description: 'Roasted squab breast encased in puff pastry with foie gras and duxelles, Madeira jus.',
      winePairing: 'Château Cheval Blanc Premier Grand Cru Classé A 2010',
      wineOrigin: 'Saint-Émilion, Bordeaux, France',
    },
    {
      courseNumber: '04',
      title: 'Le Doux',
      dishName: 'Tahitian Vanilla Soufflé & Grand Marnier Glacé',
      description: 'Baked to order with warm Madagascar vanilla bean anglaise and candied orange crisps.',
      winePairing: 'Château d’Yquem Sauternes 2009',
      wineOrigin: 'Sauternes, Bordeaux, France',
    },
  ],
  menu: [
    {
      tab: 'Degustation Highlights',
      items: [
        {
          name: 'Golden Egg with Royal Caviar',
          price: '$75',
          desc: 'Lightly warm egg yolk confit, crème fraîche, 20g Royal Ossetra caviar, brioche soldier.',
          tags: ['Signature', 'Caviar Service'],
          image: img('photo-1565299585323-38d6b0865b47'),
          winePairing: 'Dom Pérignon Vintage 2013',
        },
        {
          name: 'White Asparagus & Périgord Truffle',
          price: '$58',
          desc: 'Poached asparagus spears, quail egg mollet, shaved black truffle, brown butter hollandaise.',
          image: img('photo-1504674900247-0877df9cc836'),
          winePairing: '2020 Domaine Leflaive Puligny-Montrachet',
        },
        {
          name: 'Brittany Turbot in Champagne Sauce',
          price: '$88',
          desc: 'Line-caught turbot fillet, baby sea fennel, caviar beurre blanc, Pommes Purée.',
          tags: ['Wild Harvest'],
          image: img('photo-1534482421-64566f976cfa'),
          winePairing: '2019 Louis Jadot Corton-Charlemagne Grand Cru',
        },
      ],
    },
    {
      tab: 'Supplements & Caviar',
      items: [
        {
          name: 'Imperial Beluga Service (30g)',
          price: '$210',
          desc: 'Served on crushed crystal ice with traditional warm buckwheat blinis, chives, and farm butter.',
          tags: ['Prestige'],
          image: img('photo-1541544537887-a35c38e3e785'),
          winePairing: 'Krug Clos d’Ambonnay Champagne',
        },
        {
          name: 'A5 Miyazaki Wagyu Tenderloin (4oz)',
          price: '$95',
          desc: 'Supplement for Course 7. Charred over binchotan with bone marrow bordelaise.',
          image: img('photo-1529193591184-b1d58069ecdd'),
          winePairing: '2015 Château Margaux',
        },
        {
          name: 'Sommelier Grand Cru Pairing',
          price: '$185',
          desc: 'Seven prestigious cellar pours chosen by Head Sommelier to accompany the tasting journey.',
          image: img('photo-1510812431401-41d2bd2722f3'),
        },
      ],
    },
  ],
  testimonials: [
    {
      name: 'Jonathan K.',
      quote:
        'The most extraordinary dining experience of my life. The wine pairings were inspired — each pour transformed the dish it accompanied.',
      rating: 5,
      publication: 'Michelin 3-Star Guide Review',
    },
    {
      name: 'Sophia Laurent-Roux',
      quote:
        'Every course was an undeniable masterpiece. The attention to detail from the Christofle silverware to the hand-carved soufflé service is unmatched.',
      rating: 5,
      publication: 'Gourmet World Review',
    },
    {
      name: 'Sir Thomas Montgomery',
      quote:
        'Ivory Court maintains the timeless prestige of classic European dining while constantly surprising the palate. An absolute triumph.',
      rating: 5,
      publication: 'The Luxury Restaurant Chronicle',
    },
  ],
  features: [
    '9-Course Seasonal Degustation',
    'Cellar of 1,400 Grand Cru Bottles',
    'Private Salon de Degustation',
    'Formal Evening Attire Preferred',
  ],
};

export default function IvoryCourt() {
  return <RestaurantPage theme={theme} />;
}

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
  currencySymbol: '₹',
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
    hero: img('photo-1517248135467-4c7edcad34c4'),
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
      { src: img('photo-1556911220-bff31c812dba'), alt: 'Sous-chef hand-foraging herbs in the rooftop kitchen garden' },
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
      tab: 'Botanical Starters',
      items: [
        {
          name: 'Heirloom Beetroot Carpaccio',
          price: '₹1,150',
          desc: 'Whipped artisanal goat cheese, candied walnuts, micro-sorrel, elderflower vinaigrette.',
          tags: ['Plant-Forward', 'Organic'],
          image: img('photo-1485963631004-f2f00b1d6606'),
          winePairing: '2022 Domaine Sigalas Assyrtiko',
        },
        {
          name: 'Butter-Poached Lobster Bisque',
          price: '₹1,450',
          desc: 'Fresh Maine lobster, roasted lobster coral reduction, cognac cream, chive blossom.',
          image: img('photo-1546069901-ba9599a7e63c'),
          winePairing: '2019 Louis Latour Chassagne-Montrachet',
        },
        {
          name: 'Garden Flora Tasting Board',
          price: '₹1,250',
          desc: 'Foraged crudités, wild ramp hummus, house pickled chanterelles, edible violet blossoms.',
          tags: ['Foraged', 'Vegetarian'],
          image: img('photo-1466637574441-749b8f19452f'),
        },
        {
          name: 'Smoked Golden Trout Tartare',
          price: '₹1,350',
          desc: 'Mountain stream trout, preserved Meyer lemon, finger lime caviar, sea-salt lavash.',
          image: img('photo-1534482421-64566f976cfa'),
          winePairing: '2021 Sancerre Blanc',
        },
        {
          name: 'Black Winter Truffle Agnolotti',
          price: '₹1,550',
          desc: 'Delicate pillow pasta filled with sweet corn purée, Normandy butter, shaved Périgord truffle.',
          tags: ['Handcrafted Pasta'],
          image: img('photo-1551183053-bf91a1d81141'),
          winePairing: '2020 Barolo Monfalletto',
        },
      ],
    },
    {
      tab: 'Pasture & Forest',
      items: [
        {
          name: 'Herb-Crusted Rack of Lamb',
          price: '₹2,650',
          desc: 'New Zealand lamb rack, fresh pea velouté, glazed heirloom baby carrots, rosemary glaze.',
          tags: ['Signature'],
          image: img('photo-1611270629569-8b357cb88da9'),
          winePairing: '2018 Guigal Côte-Rôtie',
        },
        {
          name: 'Pan-Roasted Duck Breast',
          price: '₹2,250',
          desc: 'Wild sour cherry gastrique, sweet potato fondant, charred endive, pomegranate reduction.',
          image: img('photo-1414235077428-338989a2e8c0'),
          winePairing: '2019 Domaine Serene Evenstad Reserve Pinot Noir',
        },
        {
          name: 'Forest Chanterelle Risotto',
          price: '₹1,850',
          desc: 'Acquerello carnaroli rice, black truffle butter, shaved pecorino sardo, porcini dust.',
          tags: ['Vegetarian'],
          image: img('photo-1540420773420-3366772f4999'),
          winePairing: '2020 Gaja Barbaresco',
        },
        {
          name: 'Dry-Aged Wagyu Rib Cap (8oz)',
          price: '₹3,800',
          desc: 'Snake River Farms American wagyu, bone marrow potato mousseline, roasted cipollini onion.',
          image: img('photo-1600891964599-f61ba0e24092'),
          winePairing: '2017 Opus One Napa Valley',
        },
        {
          name: 'Roasted Guinea Fowl with Morels',
          price: '₹2,100',
          desc: 'French heritage fowl breast, vin jaune sauce, braised Swiss chard, crispy skin tuile.',
          image: img('photo-1558030006-450675393462'),
          winePairing: '2018 Domaine Drouhin Oregon Pinot',
        },
      ],
    },
    {
      tab: 'Oceanic Harmony',
      items: [
        {
          name: 'Wild Turbot with Verbena Emulsion',
          price: '₹2,500',
          desc: 'Pan-roasted Brittany turbot, fresh lemon verbena velouté, baby summer squash ribbons.',
          image: img('photo-1534482421-64566f976cfa'),
          winePairing: '2020 Puligny-Montrachet',
        },
        {
          name: 'Wood-Grilled Langoustines',
          price: '₹2,800',
          desc: 'Scottish langoustines split and basted with brown butter, smoked sea salt, finger lime pearls.',
          tags: ['Imported Daily'],
          image: img('photo-1533777857889-4be7c70b33f7'),
          winePairing: '2021 Chablis Grand Cru',
        },
        {
          name: 'Seared Day-Boat Scallops & Caviar',
          price: '₹2,400',
          desc: 'Jumbo Maine diver scallops, sunchoke silk, imperial caviar dollop, chive oil.',
          image: img('photo-1534482421-64566f976cfa'),
          winePairing: 'Billecart-Salmon Brut Rosé',
        },
        {
          name: 'Black Cod in Sweet Plum Shoyu',
          price: '₹2,250',
          desc: 'Alaskan sablefish marinated in mirin and aged plum shoyu, baby bok choy, crispy lotus root.',
          image: img('photo-1569050467447-ce54b3bbc37d'),
          winePairing: '2020 Meursault',
        },
        {
          name: 'Mediterranean Dorade en Papillote',
          price: '₹1,950',
          desc: 'Steamed in parchment with fennel fronds, cherry tomatoes, taggiasca olives, and white wine.',
          image: img('photo-1529193591184-b1d58069ecdd'),
          winePairing: '2021 Vermentino di Sardegna',
        },
      ],
    },
    {
      tab: 'Wild Sides & Grains',
      items: [
        {
          name: 'Caramelized Sunchoke Purée',
          price: '₹680',
          desc: 'Roasted organic sunchokes whipped with cultured butter and crispy sunchoke crisps.',
          image: img('photo-1553361371-9b22f78e8b1d'),
        },
        {
          name: 'Glazed Heirloom Baby Roots',
          price: '₹580',
          desc: 'Braised rainbow carrots, golden beets, lavender honey glaze, toasted pumpkin seeds.',
          image: img('photo-1466637574441-749b8f19452f'),
        },
        {
          name: 'Wild Farro & Morel Fricassee',
          price: '₹750',
          desc: 'Ancient grain farro, French morels, fresh thyme, aged Parmigiano Reggiano broth.',
          image: img('photo-1534422298391-e4f8c172dddb'),
        },
        {
          name: 'Pommes Aligot with Cantal Cheese',
          price: '₹720',
          desc: 'Traditional elastic whipped potatoes blended with French Cantal cheese and roasted garlic.',
          image: img('photo-1582293041079-7814c2f12063'),
        },
        {
          name: 'Charred Asparagus with Meyer Lemon',
          price: '₹620',
          desc: 'Wood-fired green asparagus, grated cured egg yolk, cold-pressed olive oil, Maldon salt.',
          image: img('photo-1553361371-9b22f78e8b1d'),
        },
      ],
    },
    {
      tab: 'Meadow Desserts & Nectars',
      items: [
        {
          name: 'Dark Chocolate & Fermented Pinecone Glaze',
          price: '₹850',
          desc: 'Single-origin 74% cocoa, smoked sea salt, chamomile flower gelato, candied forest pine nuts.',
          tags: ['Signature'],
          image: img('photo-1551024709-8f23befc6f87'),
          winePairing: '2015 Quinta do Noval Vintage Port',
        },
        {
          name: 'Rosewater Panna Cotta & Poached Pear',
          price: '₹680',
          desc: 'Madagascar vanilla cream, Damask rosewater gelée, saffron-poached Bosc pear.',
          image: img('photo-1509440159596-0249088772ff'),
          winePairing: '2021 Moscato d’Asti',
        },
        {
          name: 'Pistachio Frangipane Tartlet',
          price: '₹720',
          desc: 'Sicilian Bronte pistachios, crisp sweet pastry crust, wild raspberry coulis.',
          image: img('photo-1587314168485-3236d6710814'),
          winePairing: 'Château Rieussec Sauternes',
        },
        {
          name: 'Elderflower & Honeycomb Pavlova',
          price: '₹650',
          desc: 'Crisp meringue nest, elderflower whipped cream, fresh passionfruit, raw honeycomb crumble.',
          image: img('photo-1565958011703-44f9829ba187'),
          winePairing: 'Veuve Clicquot Demi-Sec',
        },
        {
          name: 'Artisanal Alpine Cheese Cart Selection',
          price: '₹1,150',
          desc: 'Five cave-aged cheeses served with truffled honey, Marcona almonds, and sourdough crisps.',
          tags: ['Savory Finish'],
          image: img('photo-1510812431401-41d2bd2722f3'),
          winePairing: '2018 Chateau Chalon Vin Jaune',
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
  accolades: [
    { year: '2024', title: 'Michelin Green Star for Gastronomy', organization: 'Michelin Guide', badge: 'Michelin Green Star' },
    { year: '2024', title: 'World’s 50 Best Sustainable Restaurant Award', organization: 'World’s 50 Best', badge: '50 Best Sustainable' },
    { year: '2024', title: 'Best Farm-to-Table & Foraged Gastronomy', organization: 'Epicurean Guild', badge: 'Epicurean Guild' },
    { year: '2023', title: 'Sommelier Award for Biodynamic Cellar', organization: 'Gault & Millau', badge: 'Gault & Millau' },
  ],
  privateDining: {
    headline: 'Dine Beneath Living Greenhouses and Verdant Canopies',
    subheadline: 'Intimate forest feasts surrounded by living ferns, flowering night-bloomers, and amber taper candles.',
    rooms: [
      {
        id: 'glass-conservatory',
        name: 'The Glass Conservatory',
        capacity: '22 Guests',
        description: 'Dine beneath a soaring glass atrium enveloped in living botanical walls and aromatic herbs, featuring custom botanical pairing cocktails.',
        image: img('photo-1466637574441-749b8f19452f'),
        features: ['Living Fern Canopy', 'Private Botanical Cocktail Bar', 'Bespoke 7-Course Foraged Feast', 'Private Rooftop Garden Access'],
        minimumSpend: '₹1,40,000',
      },
      {
        id: 'foragers-atrium',
        name: 'The Forager’s Atrium',
        capacity: '12 Guests',
        description: 'An intimate secluded sanctuary with emerald velvet circular booth, illuminated by candlelight and hand-blown forest glass.',
        image: img('photo-1414235077428-338989a2e8c0'),
        features: ['Dedicated Botanical Sommelier', 'Hand-Thrown Ceramics Service', 'Chef Rowan Tableside Presentation', 'Acoustic Ambient Soundscape'],
        minimumSpend: '₹95,000',
      },
      {
        id: 'sanctuary-buyout',
        name: 'Full Sanctuary Buyout',
        capacity: '75 Guests',
        description: 'Complete exclusive sanctuary access including the greenhouse, living dining room, and private rooftop apothecary garden.',
        image: img('photo-1517248135467-4c7edcad34c4'),
        features: ['Full Brigade & Forager Crew', 'Live Acoustic Harp or Cello', 'Biodynamic Wine Cellar Pairing', 'Valet on Garden Boulevard'],
        minimumSpend: '₹5,50,000',
      },
    ],
  },
  hospitalityGuide: [
    { title: 'Dress Code', description: 'Botanical Elegance / Smart Casual Chic · Nature-inspired refined attire. Clean silhouettes, no athletic apparel or flip-flops.' },
    { title: 'Valet & Arrival', description: 'Complimentary valet parking at 77 Garden Boulevard. Direct elevator access to our botanical conservatory.' },
    { title: 'Corkage Policy', description: 'We gladly accommodate biodynamic, natural, or organic wines not found on our list. Corkage fee is ₹2,200 per 750ml bottle.' },
    { title: 'Cancellation Policy', description: 'Due to daily foraged harvests from regional wild reserves, cancellations require 48 hours notice. Late cancellations incur ₹2,000 per guest.' },
    { title: 'Children & Pacing', description: 'The multi-course botanical degustation requires 2.5 hours. We recommend our dining experience for guests aged 10 and above.' },
  ],
  giftExperiences: [
    {
      id: 'velvet-degustation',
      title: 'Avant-Garde Botanical Degustation for Two',
      price: '₹19,500',
      description: 'Our full 5-course foraged forest tasting featuring Maine lobster, herb-crusted lamb rack, and biodynamic natural wine pairings.',
      popular: true,
      includes: ['5-Course Botanical Degustation for Two', 'Natural & Biodynamic Wine Pairings', 'Foraged Botanical Cocktail Welcome', 'Hand-Bound Botanical Herbarium Keepsake'],
    },
    {
      id: 'velvet-forager-table',
      title: 'Chef Rowan’s Forager Table & Rooftop Tour for Two',
      price: '₹26,000',
      description: 'An immersive culinary journey beginning with a private sunset tour of our rooftop living apothecary garden, followed by an extended 7-course feast.',
      includes: ['Rooftop Apothecary Garden Tour', '7-Course Extended Botanical Tasting', 'Rare Amphora Wine Pairings', 'Signed Foraging Guide Book'],
    },
    {
      id: 'velvet-voucher',
      title: 'Botanical Conservatory Dining Experience Voucher',
      price: '₹10,000',
      description: 'An open gift voucher redeemable for greenhouse dinners, botanical cocktails, or special celebration events.',
      includes: ['Valid for 12 months', 'Direct Concierge Table Priority', 'Botanical Herbal Infusion Welcome'],
    },
  ],
  sommelierReserve: {
    intro: 'Curated by Natural Wine Director Maya Lin, prioritizing low-intervention, biodynamic, and amphora-aged wines from small artisan vignerons.',
    sommelierName: 'Maya Lin',
    sommelierTitle: 'Natural & Biodynamic Wine Director',
    cellarStats: {
      referenceLabels: '780+',
      vintageRange: '1988-2023',
      grandCruCount: '65+',
    },
    featuredBottles: [
      {
        vintage: '2018',
        name: 'Domaine Pierre Overnoy Arbois Pupillin Savagnin',
        region: 'Jura, France',
        tastingNote: 'Crushed hazelnut, green apple, chamomile tea, electrifying alpine mineral vibrance.',
        price: '₹62,000',
      },
      {
        vintage: '2019',
        name: 'Domaine Leflaive Puligny-Montrachet',
        region: 'Burgundy, France',
        tastingNote: 'Acacia blossom, lemon verbena, crushed chalk, luminous purity and boundless length.',
        price: '₹48,000',
      },
      {
        vintage: '2017',
        name: 'Château de Beaucastel Châteauneuf-du-Pape',
        region: 'Rhône Valley, France',
        tastingNote: 'Black plum, wild garrigue herbs, lavender, dark mineral earthiness.',
        price: '₹28,000',
      },
      {
        vintage: '2016',
        name: 'Pheasant’s Tears Rkatsiteli Qvevri Amphora',
        region: 'Kakheti, Georgia',
        tastingNote: 'Dried apricot, amber honey, smoked tea leaves, grippy antique clay tannin structure.',
        price: '₹16,500',
      },
    ],
  },
  serviceStatus: {
    statusText: 'Open Tonight · Botanical Sanctuary Service',
    doorsTime: '6:00 PM – 10:30 PM',
    dressCodeSummary: 'Botanical Elegance · Smart Casual Chic',
  },
};

export default function VelvetTable() {
  return <RestaurantPage theme={theme} />;
}

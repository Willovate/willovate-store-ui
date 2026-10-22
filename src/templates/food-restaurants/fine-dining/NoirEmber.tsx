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
  currencySymbol: '₹',
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
      tab: 'Prime Steaks & Wagyu',
      items: [
        {
          name: '45-Day Dry-Aged Ribeye (16oz)',
          price: '₹3,200',
          desc: 'Bone-in prime beef charred over white oak embers, bone marrow butter, fleur de sel.',
          tags: ['Signature', 'In-House Aged'],
          image: img('photo-1529193591184-b1d58069ecdd'),
          winePairing: '2018 Silver Oak Cabernet Sauvignon',
        },
        {
          name: 'Japanese A5 Wagyu Strip (6oz)',
          price: '₹4,800',
          desc: 'Air-freighted from Miyazaki Prefecture, seared on binchotan, wasabi stem relish, aged tamari.',
          tags: ['A5 Certified', 'Rare Cut'],
          image: img('photo-1600891964599-f61ba0e24092'),
          winePairing: 'Yamazaki 12-Year Single Malt',
        },
        {
          name: 'The Tomahawk for Two (42oz)',
          price: '₹7,500',
          desc: 'Long-bone rib steak carved tableside, black garlic butter, smoked chimichurri, hand-cut duck fat frites.',
          tags: ['For Two', 'Tableside Carving'],
          image: img('photo-1544025162-d76694265947'),
          winePairing: '2017 Penfolds St. Henri Shiraz',
        },
        {
          name: 'Smoked Bone-In Filet Mignon (10oz)',
          price: '₹2,900',
          desc: 'Center cut tenderloin cold-smoked with hickory, seared over lump charcoal, charred shallot bordelaise.',
          tags: ['Center Cut', 'Tender'],
          image: img('photo-1558030006-450675393462'),
          winePairing: '2019 Caymus Napa Cabernet',
        },
        {
          name: '60-Day Dry-Aged Porterhouse (32oz)',
          price: '₹5,900',
          desc: 'Striploin and tenderloin on the bone, aged in Himalayan salt vault, brushed with rendered wagyu tallow.',
          tags: ['Dry Aged 60 Days'],
          image: img('photo-1529193591184-b1d58069ecdd'),
          winePairing: '2016 Tenuta San Guido Sassicaia',
        },
      ],
    },
    {
      tab: 'Hearth Starters',
      items: [
        {
          name: 'Charred Bone Marrow',
          price: '₹850',
          desc: 'Herb gremolata, pickled red onion, grilled brioche toast points.',
          image: img('photo-1550966871-3ed3cdb5ed0c'),
          winePairing: 'Talisker 10-Year Island Scotch',
        },
        {
          name: 'Prime Beef Tartare',
          price: '₹950',
          desc: 'Hand-cut tenderloin, quail egg yolk, caper berries, house cured mustard seeds, tallow potato chips.',
          image: img('photo-1555939594-58d7cb561ad1'),
          winePairing: '2021 Domaine Dujac Morey-Saint-Denis',
        },
        {
          name: 'Wood-Fired Spanish Octopus',
          price: '₹1,150',
          desc: 'Smoked paprika oil, fingerling confit, roasted garlic aioli, celery heart salad.',
          image: img('photo-1534482421-64566f976cfa'),
          winePairing: '2020 Albariño de Fefiñanes',
        },
        {
          name: 'Cast-Iron Seared Foie Gras',
          price: '₹1,300',
          desc: 'Hudson Valley foie gras, spiced mission fig compote, toasted brioche, 25-year balsamico.',
          tags: ['Decadent'],
          image: img('photo-1533777857889-4be7c70b33f7'),
          winePairing: '2017 Château d’Yquem Sauternes',
        },
        {
          name: 'Ember-Roasted King Crab Legs',
          price: '₹1,600',
          desc: 'Red king crab split and kissed with live hardwood fire, garlic herb ghee, charred Meyer lemon.',
          tags: ['Raw Bar & Grill'],
          image: img('photo-1534482421-64566f976cfa'),
          winePairing: '2020 Puligny-Montrachet',
        },
      ],
    },
    {
      tab: 'Live-Fire Mains & Seafood',
      items: [
        {
          name: 'Chilean Sea Bass in Charcoal Broth',
          price: '₹2,200',
          desc: 'Sustainably caught, miso glaze, wood-charred baby bok choy, smoked bonito dashi.',
          tags: ['Wild Catch'],
          image: img('photo-1534482421-64566f976cfa'),
          winePairing: '2021 Meursault Premier Cru',
        },
        {
          name: 'Kurobuta Heritage Pork Chop (14oz)',
          price: '₹1,800',
          desc: 'Berkshire bone-in chop, roasted Honeycrisp apples, cider-bourbon reduction, crispy sage.',
          image: img('photo-1558030006-450675393462'),
          winePairing: '2019 Ridge Geyserville Zinfandel',
        },
        {
          name: 'Whole Butter-Basted Maine Lobster',
          price: '₹3,100',
          desc: 'Split two-pound live lobster roasted over white oak coals with tarragon-drawn butter.',
          tags: ['Live Catch'],
          image: img('photo-1533777857889-4be7c70b33f7'),
          winePairing: '2018 Kistler Les Noisetiers Chardonnay',
        },
        {
          name: 'Binchotan Roasted Duck Breast',
          price: '₹1,950',
          desc: 'Dry-aged Liberty duck, charred chicory, sour cherry gastrique, parsnip silk.',
          image: img('photo-1414235077428-338989a2e8c0'),
          winePairing: '2019 Domaine Dujac Chambolle-Musigny',
        },
        {
          name: 'Colorado Lamb Chops with Mint Chimichurri',
          price: '₹2,400',
          desc: 'Double-cut rack chops seared over mesquite coals with smoked goat curd and baby leeks.',
          image: img('photo-1529193591184-b1d58069ecdd'),
          winePairing: '2017 Vega Sicilia Valbuena 5°',
        },
      ],
    },
    {
      tab: 'Sides & Truffle Specialties',
      items: [
        {
          name: 'Black Truffle Mac & Gruyère',
          price: '₹750',
          desc: 'Aged cave cheddar, French Gruyère, hand-shaved Périgord black winter truffles.',
          image: img('photo-1546069901-ba9599a7e63c'),
        },
        {
          name: 'Charred Broccolini & Bone Marrow Pangrattato',
          price: '₹650',
          desc: 'Calabrian chili, toasted pine nuts, smoked sea salt, lemon agrumato.',
          image: img('photo-1553361371-9b22f78e8b1d'),
        },
        {
          name: 'Duck Fat Frites & Garlic Béarnaise',
          price: '₹550',
          desc: 'Twice-cooked Kennebec potatoes, rosemary salt, roasted garlic béarnaise.',
          image: img('photo-1585109649139-366815a0d713'),
        },
        {
          name: 'Robuchon-Style Yukon Purée',
          price: '₹690',
          desc: '50/50 churned Normandy butter and golden potatoes with veal marrow demi-glace.',
          image: img('photo-1582293041079-7814c2f12063'),
        },
        {
          name: 'Roasted Wild Hen of the Woods',
          price: '₹720',
          desc: 'Maitake mushrooms roasted over binchotan with black garlic glaze and crispy shallots.',
          image: img('photo-1553361371-9b22f78e8b1d'),
        },
      ],
    },
    {
      tab: 'Smoked Desserts & Cellar Pours',
      items: [
        {
          name: 'Smoked Valrhona Chocolate Dome',
          price: '₹700',
          desc: '70% Guanaja dark chocolate, malted caramel gelato, 25-year balsamico, 24k edible gold.',
          tags: ['Signature Dessert'],
          image: img('photo-1551024709-8f23befc6f87'),
          winePairing: 'Lagavulin 16-Year Single Malt',
        },
        {
          name: 'Ember-Roasted Mission Fig Tart',
          price: '₹650',
          desc: 'Flaky rye crust, lavender mascarpone, warm wildflower honey, smoked sea salt.',
          image: img('photo-1509440159596-0249088772ff'),
          winePairing: '2016 Graham’s Vintage Port',
        },
        {
          name: 'Toasted Hazelnut Praline Soufflé',
          price: '₹750',
          desc: 'Baked to order with warm dark chocolate crème anglaise and espresso bean gelato.',
          image: img('photo-1579372786545-d24232daf58c'),
          winePairing: 'Château Suduiraut Sauternes 2011',
        },
        {
          name: 'Charred Bourbon Vanilla Bean Crème Brûlée',
          price: '₹590',
          desc: 'Caramelized turbinado glass top, Madagascar vanilla custard, fresh raspberries.',
          image: img('photo-1587314168485-3236d6710814'),
          winePairing: 'Highland Park 18-Year Scotch',
        },
        {
          name: 'Rare Whisky & Single-Estate Chocolate Board',
          price: '₹1,450',
          desc: 'Trio of peated Islay single malts paired with artisan dark truffles and candied orange peel.',
          tags: ['Cellar Special'],
          image: img('photo-1510812431401-41d2bd2722f3'),
          winePairing: 'Ardbeg Uigeadail Cask Strength',
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
  accolades: [
    { year: '2024', title: 'Michelin Guide Selection', organization: 'Michelin Guide New York', badge: 'Michelin Selected' },
    { year: '2024', title: 'Best Steakhouse & Live-Fire Hearth', organization: 'World’s 50 Best Discovery', badge: '50 Best Discovery' },
    { year: '2023', title: 'Best of Award of Excellence', organization: 'Wine Spectator (1,100+ Bottles)', badge: 'Wine Spectator' },
    { year: '2023', title: 'Outstanding Hospitality Nominee', organization: 'James Beard Foundation', badge: 'James Beard' },
  ],
  privateDining: {
    headline: 'Exclusive Private Salons & Ember Hearth Buyouts',
    subheadline: 'From executive dinners overlooking our hardwood parrillagrill to full evening dining room buyouts with private sommelier flights.',
    rooms: [
      {
        id: 'ember-salon',
        name: 'The Ember Salon',
        capacity: '14 Guests',
        description: 'Intimate walnut-paneled private salon with direct viewing window to the hardwood hearth, private sommelier, and custom curated whisky flight.',
        image: img('photo-1544025162-d76694265947'),
        features: ['Dedicated Sommelier', 'Hardwood Hearth View', 'Custom 6-Course Pairing', 'Discrete Private Entrance'],
        minimumSpend: '₹1,20,000',
      },
      {
        id: 'cask-vault',
        name: 'The Cask Cellar Vault',
        capacity: '26 Guests',
        description: 'Surrounded by our collection of 280+ rare single-cask Islay whiskies and vintage Barolo lockers, featuring custom leather captain chairs and high-fidelity acoustics.',
        image: img('photo-1559339352-11d035aa65de'),
        features: ['Rare Cask Tasting Flight', 'High-Fidelity Acoustics', 'AV Screen for Presentations', 'Private Bartender & Butler'],
        minimumSpend: '₹2,50,000',
      },
      {
        id: 'full-buyout',
        name: 'Full Hearth & Salon Buyout',
        capacity: '90 Guests',
        description: 'Complete exclusive access to the main hearth dining room, cocktail lounge, and private salon with customized live carving stations.',
        image: img('photo-1414235077428-338989a2e8c0'),
        features: ['Full Kitchen Brigade Dedication', 'Valet Porte-Cochère Buyout', 'Live Vinyl DJ or Acoustic Trio', 'Bespoke Gold-Foil Menus'],
        minimumSpend: '₹6,50,000',
      },
    ],
  },
  hospitalityGuide: [
    { title: 'Dress Code', description: 'Smart Elegant · Jackets strongly encouraged for gentlemen. Athletic wear, hooded sweatshirts, sportswear, and open-toed footwear for gentlemen are strictly prohibited.' },
    { title: 'Valet & Arrival', description: 'Complimentary white-glove valet parking is provided at our private porte-cochère on Ember Lane starting 30 minutes prior to service.' },
    { title: 'Corkage Policy', description: 'We allow up to two 750ml bottles per reservation of rare wines not featured on our 1,100-bottle list. Corkage fee is ₹3,000 per bottle.' },
    { title: 'Cancellation Policy', description: 'Due to our 45-day dry-aging curation, reservations may be cancelled up to 48 hours in advance without penalty. Cancellations within 48 hours incur a ₹2,500 fee per guest.' },
    { title: 'Children & Pacing', description: 'Our multi-course hearth tasting unfolds over 2.5 to 3 hours. We welcome young guests aged 10 and above who appreciate tasting menu dining.' },
  ],
  giftExperiences: [
    {
      id: 'noir-degustation',
      title: 'Grand Fire & Smoke Degustation for Two',
      price: '₹18,500',
      description: 'The definitive 4-course dry-aged tasting experience with tableside Tomahawk carving and sommelier wine pairing.',
      includes: ['4-Course Hearth Tasting for Two', 'Sommelier Barolo & Napa Pairings', 'Welcome Islay Highball Cocktail', 'Signed Tasting Keepsake Menu'],
    },
    {
      id: 'noir-vip-whisky',
      title: 'VIP Butcher Block & Rare Cask Flight for Two',
      price: '₹28,000',
      description: 'An ultra-exclusive culinary journey seated beside the hearth, featuring Japanese A5 Wagyu and 25-year rare single malts.',
      popular: true,
      includes: ['A5 Hyogo Wagyu Tasting Progression', 'Flight of 4 Ultra-Rare Islay Single Malts', 'Tableside Caviar Tartlet Prelude', 'Dedicated Master Sommelier Service'],
    },
    {
      id: 'noir-voucher',
      title: 'The Cellar Reserve Dining Voucher',
      price: '₹10,000',
      description: 'An open-choice gift certificate valid toward dinner, rare cellar bottles, or private salon events.',
      includes: ['Valid for 12 months', 'Applicable to full food & wine menu', 'Priority Table Booking Concierge', 'Complimentary Champagne Welcome'],
    },
  ],
  sommelierReserve: {
    intro: 'Curated by Master Sommelier Julian Delacroix, our cellar emphasizes vintage Nebbiolo from Piedmont, cult Napa Valley Cabernets, and peated single-cask Islay whiskies.',
    sommelierName: 'Julian Delacroix',
    sommelierTitle: 'Master Sommelier & Beverage Director',
    cellarStats: {
      referenceLabels: '1,100+',
      vintageRange: '1962-2022',
      grandCruCount: '95+',
    },
    featuredBottles: [
      {
        vintage: '2016',
        name: 'Caymus Vineyards Special Selection Cabernet',
        region: 'Napa Valley, California',
        tastingNote: 'Rich cassis, tobacco leaf, roasted espresso bean, velvety layered finish.',
        price: '₹32,000',
      },
      {
        vintage: '2010',
        name: 'Giacomo Conterno Barolo Cascina Francia',
        region: 'Piedmont, Italy',
        tastingNote: 'Crushed dried rose, black truffle, tar, vibrant tannins with immense depth.',
        price: '₹58,000',
      },
      {
        vintage: '1978',
        name: 'Ardbeg Vintage Cask Peated Single Malt',
        region: 'Islay, Scotland',
        tastingNote: 'Campfire smoke, maritime brine, candied lemon zest, long smoldering oak finish.',
        price: '₹85,000',
      },
      {
        vintage: '2012',
        name: 'Dom Pérignon Vintage Brut Champagne',
        region: 'Épernay, Champagne, France',
        tastingNote: 'Toasted brioche, white peach, smoked mineral flint, vibrant persistent bead.',
        price: '₹36,000',
      },
    ],
  },
  serviceStatus: {
    statusText: 'Open Tonight · Live Wood Fire Hearth Service',
    doorsTime: '5:00 PM – 12:00 AM',
    dressCodeSummary: 'Smart Elegant · Jacket Encouraged',
  },
};

export default function NoirEmber() {
  return <RestaurantPage theme={theme} />;
}

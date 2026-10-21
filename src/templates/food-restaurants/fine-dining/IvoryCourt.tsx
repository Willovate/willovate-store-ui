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
  currencySymbol: '₹',
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
      { src: img('photo-1600891964599-f61ba0e24092'), alt: 'White asparagus with winter black truffle emulsion' },
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
      tab: 'Caviar & Raw Bar',
      items: [
        {
          name: 'Golden Egg with Royal Caviar',
          price: '₹2,800',
          desc: 'Lightly warm egg yolk confit, crème fraîche, 20g Royal Ossetra caviar, brioche soldier.',
          tags: ['Signature', 'Caviar Service'],
          image: img('photo-1565299585323-38d6b0865b47'),
          winePairing: 'Dom Pérignon Vintage 2013',
        },
        {
          name: 'Imperial Beluga Service (30g)',
          price: '₹7,200',
          desc: 'Served on crushed crystal ice with traditional warm buckwheat blinis, chives, and farm butter.',
          tags: ['Prestige'],
          image: img('photo-1533777857889-4be7c70b33f7'),
          winePairing: 'Krug Clos d’Ambonnay Champagne',
        },
        {
          name: 'Hokkaido Scallop Crudo',
          price: '₹1,450',
          desc: 'Slivered giant diver scallops, yuzu kosho vinaigrette, finger lime pearls, white truffle oil.',
          image: img('photo-1534482421-64566f976cfa'),
          winePairing: '2020 Chablis Grand Cru Les Clos',
        },
        {
          name: 'Bluefin Tuna Tartare & Gold Leaf',
          price: '₹1,650',
          desc: 'Akami and chutoro hand-cut tartare, dashi jelly, pickled wasabi stems, nori rice crisps.',
          image: img('photo-1607301406259-dfb186e15de8'),
          winePairing: 'Taittinger Comtes de Champagne Blanc de Blancs',
        },
        {
          name: 'Gillardeau Oysters Trio',
          price: '₹1,350',
          desc: 'Three prime French oysters: natural with mignonette, cucumber-gin granita, and warmed sabayon.',
          image: img('photo-1534482421-64566f976cfa'),
          winePairing: '2022 Sancerre Chavignol',
        },
      ],
    },
    {
      tab: 'First Compositions',
      items: [
        {
          name: 'White Asparagus & Périgord Truffle',
          price: '₹2,200',
          desc: 'Poached asparagus spears, quail egg mollet, shaved black truffle, brown butter hollandaise.',
          image: img('photo-1540420773420-3366772f4999'),
          winePairing: '2020 Domaine Leflaive Puligny-Montrachet',
        },
        {
          name: 'Lobster Coral Raviolo',
          price: '₹1,750',
          desc: 'Single jumbo raviolo filled with Maine lobster and ricotta, shellfish reduction, tarragon foam.',
          tags: ['House Specialty'],
          image: img('photo-1546069901-ba9599a7e63c'),
          winePairing: '2019 Meursault Charmes',
        },
        {
          name: 'Velouté of Roasted Chestnut & Sunchoke',
          price: '₹1,150',
          desc: 'Velvety winter soup poured tableside over shaved black truffles and duck fat croutons.',
          image: img('photo-1466637574441-749b8f19452f'),
          winePairing: '2020 Corton-Charlemagne Grand Cru',
        },
        {
          name: 'Foie Gras Terrine & Warm Brioche',
          price: '₹1,600',
          desc: 'Port wine marinated duck liver terrine, spiced quince jelly, toasted house brioche.',
          image: img('photo-1544025162-d76694265947'),
          winePairing: 'Château d’Yquem Sauternes 2011',
        },
        {
          name: 'Garden Pea & Mint Infusion with King Crab',
          price: '₹1,550',
          desc: 'Chilled sweet pea soup, tender Red King Crab clusters, Meyer lemon oil, borage flowers.',
          image: img('photo-1485963631004-f2f00b1d6606'),
          winePairing: '2021 Pouilly-Fumé Baron de L',
        },
      ],
    },
    {
      tab: 'Sea Harvest',
      items: [
        {
          name: 'Brittany Turbot in Champagne Sauce',
          price: '₹3,200',
          desc: 'Line-caught turbot fillet, baby sea fennel, caviar beurre blanc, Pommes Purée.',
          tags: ['Wild Harvest'],
          image: img('photo-1534482421-64566f976cfa'),
          winePairing: '2019 Louis Jadot Corton-Charlemagne Grand Cru',
        },
        {
          name: 'Pan-Roasted Dover Sole Meunière',
          price: '₹3,400',
          desc: 'Whole Dover sole filleted tableside, clarified hazelnut butter, parsley, fresh lemon juice.',
          tags: ['Tableside Service'],
          image: img('photo-1529193591184-b1d58069ecdd'),
          winePairing: '2020 Batard-Montrachet Grand Cru',
        },
        {
          name: 'Black Sea Bass Barigoule',
          price: '₹2,600',
          desc: 'Crispy skin black sea bass, braised baby artichokes, smoked bacon lardons, white wine emulsion.',
          image: img('photo-1534422298391-e4f8c172dddb'),
          winePairing: '2018 Meursault Premier Cru',
        },
        {
          name: 'Roasted Langoustine Tail & Chanterelles',
          price: '₹2,850',
          desc: 'Scottish giant langoustine, golden chanterelles, vin jaune reduction, watercress coulis.',
          image: img('photo-1533777857889-4be7c70b33f7'),
          winePairing: '2019 Chassagne-Montrachet',
        },
        {
          name: 'Mediterranean Rouget Barbet',
          price: '₹2,400',
          desc: 'Red mullet fillet wrapped in crisp potato scales, tapenade puree, bouillabaisse essence.',
          image: img('photo-1569050467447-ce54b3bbc37d'),
          winePairing: '2021 Bandol Rosé Domaine Tempier',
        },
      ],
    },
    {
      tab: 'Butcher Reserve',
      items: [
        {
          name: 'A5 Miyazaki Wagyu Tenderloin (4oz)',
          price: '₹4,800',
          desc: 'Japanese champion beef, seared on binchotan coals, bone marrow bordelaise, truffle mousseline.',
          image: img('photo-1600891964599-f61ba0e24092'),
          winePairing: '2015 Château Margaux',
        },
        {
          name: 'Roasted Bresse Pigeon with Foie Gras',
          price: '₹2,700',
          desc: 'French Appellation Bresse pigeon breast, leg pastilla, Savoy cabbage, Armagnac reduction.',
          image: img('photo-1558030006-450675393462'),
          winePairing: '2017 Chambertin Grand Cru',
        },
        {
          name: 'Prime Milk-Fed Veal Chop (12oz)',
          price: '₹2,850',
          desc: 'Pan-roasted veal rib chop, sweetbread croustillant, glazed morels, silky parsnip purée.',
          image: img('photo-1544025162-d76694265947'),
          winePairing: '2016 Château Haut-Brion',
        },
        {
          name: 'Roasted Challans Duckling for Two',
          price: '₹5,100',
          desc: 'Whole roasted duck carved tableside with spiced honey lavender glaze and duck leg confit salad.',
          tags: ['For Two'],
          image: img('photo-1414235077428-338989a2e8c0'),
          winePairing: '2018 Clos de Vougeot Grand Cru',
        },
        {
          name: 'Venison Saddle Grand Veneur',
          price: '₹2,950',
          desc: 'Seared Scottish red deer loin, spiced poivrade sauce, lingonberry preserve, celeriac fondant.',
          image: img('photo-1555939594-58d7cb561ad1'),
          winePairing: '2015 Hermitage La Chapelle',
        },
      ],
    },
    {
      tab: 'Haute Pâtisserie & Cognac',
      items: [
        {
          name: 'Tahitian Vanilla Soufflé & Grand Marnier Glacé',
          price: '₹950',
          desc: 'Baked to order with warm Madagascar vanilla bean anglaise and candied orange crisps.',
          tags: ['Signature Dessert'],
          image: img('photo-1579372786545-d24232daf58c'),
          winePairing: 'Château d’Yquem Sauternes 2009',
        },
        {
          name: 'Crunchy Chocolate & Hazelnut Praliné Sphere',
          price: '₹880',
          desc: 'Valrhona Grand Cru chocolate mousse, crunchy feuilletine base, warm gianduja sauce poured tableside.',
          image: img('photo-1587314168485-3236d6710814'),
          winePairing: '1998 Taylor Fladgate Vintage Port',
        },
        {
          name: 'Caramelized Mille-Feuille Minute',
          price: '₹790',
          desc: 'Inverted caramelized puff pastry, bourbon vanilla diplomat cream, salted caramel drizzle.',
          image: img('photo-1509440159596-0249088772ff'),
          winePairing: 'Château Guiraud Sauternes',
        },
        {
          name: 'Wild Strawberry & Basil Vacherin',
          price: '₹720',
          desc: 'Crisp French meringue batons, wild mara des bois sorbet, sweet basil chantilly, candied zest.',
          image: img('photo-1565958011703-44f9829ba187'),
          winePairing: 'Laurent-Perrier Cuvée Rosé',
        },
        {
          name: 'Sommelier Grand Cru Pairing',
          price: '₹6,500',
          desc: 'Seven prestigious cellar pours chosen by Head Sommelier to accompany the tasting journey.',
          tags: ['Cellar Experience'],
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
  accolades: [
    { year: '2024', title: 'Three Michelin Stars', organization: 'Michelin Guide', badge: '★★★ Michelin' },
    { year: '2024', title: 'Grand Award of Excellence (1,400+ References)', organization: 'Wine Spectator', badge: 'Grand Award' },
    { year: '2024', title: 'World’s 50 Best #18 in the World', organization: 'World’s 50 Best Restaurants', badge: 'World’s 50 Best #18' },
    { year: '2023', title: 'Member of Les Grandes Tables du Monde', organization: 'Les Grandes Tables du Monde', badge: 'Grandes Tables' },
  ],
  privateDining: {
    headline: 'Haute Gastronomy in Grand Private Salons',
    subheadline: 'Orchestrated under the baton of Chef Hélène Laurent for milestone banquets and private celebrations.',
    rooms: [
      {
        id: 'salon-dor',
        name: 'The Salon d’Or',
        capacity: '16 Guests',
        description: 'Illuminated by 19th-century Baccarat crystal chandeliers, custom Rosenthal porcelain, and Christofle silver service with private sommelier.',
        image: img('photo-1414235077428-338989a2e8c0'),
        features: ['Dedicated Maitre d’ & Sommelier', 'Baccarat Crystal Setting', 'Christofle Silver Service', 'Private Cloakroom & Terrace'],
        minimumSpend: '₹1,80,000',
      },
      {
        id: 'grand-library',
        name: 'The Grand Library Salon',
        capacity: '28 Guests',
        description: 'Lined with antique leather-bound volumes and historic Grand Cru Burgundy verticals, offering quiet acoustic perfection and presentation tech.',
        image: img('photo-1517248135467-4c7edcad34c4'),
        features: ['Grand Cru Tasting Vertical', 'Dedicated Private Kitchen', 'Discrete VIP Chauffeur Slip', 'Retractable 4K Projection'],
        minimumSpend: '₹3,20,000',
      },
      {
        id: 'palace-buyout',
        name: 'Full Palace Hall Buyout',
        capacity: '80 Guests',
        description: 'Complete takeover of the Ivory Court salons, champagne atrium, and grand dining hall with bespoke 9-course degustation.',
        image: img('photo-1550966871-3ed3cdb5ed0c'),
        features: ['Full Kitchen Brigade Dedicated', 'String Quartet or Harpist', 'Custom Printed Gold-Foil Menus', 'Valet & Red Carpet Porte-Cochère'],
        minimumSpend: '₹8,00,000',
      },
    ],
  },
  hospitalityGuide: [
    { title: 'Dress Code', description: 'Black Tie or Formal / Smart Elegant · Gentlemen are required to wear tailored jackets. Athletic sneakers, denim, and t-shirts are strictly prohibited in the dining salons.' },
    { title: 'Valet & Arrival', description: 'White-glove valet parking and chauffeur curbside greeting are provided at our Grand Avenue entrance starting 30 minutes prior to service.' },
    { title: 'Corkage Policy', description: 'Guests may bring up to two 750ml bottles of mature rare wine not listed in our cellar. Corkage is ₹3,500 per bottle.' },
    { title: 'Cancellation Policy', description: 'Due to daily sourcing from Brittany and Périgord, cancellations must be made 72 hours prior. Cancellations within 72 hours incur a ₹4,000 charge per seat.' },
    { title: 'Children & Pacing', description: 'The Nine-Course Degustation is orchestrated over three hours. We welcome mature guests aged 12 and above.' },
  ],
  giftExperiences: [
    {
      id: 'ivory-degustation',
      title: 'The Grand Nine-Course Degustation for Two',
      price: '₹32,000',
      description: 'Our flagship 9-course European degustation with Ossetra caviar prelude, Brittany turbot, and Prestige Grand Cru wine pairings.',
      popular: true,
      includes: ['9-Course Degustation for Two', 'Sommelier Grand Cru Pairings', 'Pre-Dinner Krug Champagne Toast', 'Signed Commemorative Menu'],
    },
    {
      id: 'ivory-private-salon',
      title: 'Chef Hélène Laurent’s Private Salon Tasting for Four',
      price: '₹72,000',
      description: 'Exclusive private dining in the Salon d’Or with tableside white truffle shaving and sommelier cellar tour.',
      includes: ['Private Salon d’Or Booking', 'Tableside Périgord Truffle Shaving', 'Private Sommelier & Cellar Access', 'Bespoke Printed Menus'],
    },
    {
      id: 'ivory-voucher',
      title: 'Ivory Court Dining Privilege Gift Certificate',
      price: '₹25,000',
      description: 'An open privilege voucher redeemable against evening dining, rare cellar reserves, or private banquets.',
      includes: ['Valid for 12 months', 'Direct Maitre d’ Priority Table Concierge', 'Complimentary Vintage Champagne Welcome'],
    },
  ],
  sommelierReserve: {
    intro: 'Head Sommelier Étienne Blanchard oversees our subterranean limestone cellar housing 1,400 reference labels dating back to 1945.',
    sommelierName: 'Étienne Blanchard',
    sommelierTitle: 'Head Sommelier & Meilleur Ouvrier de France',
    cellarStats: {
      referenceLabels: '1,400+',
      vintageRange: '1945-2022',
      grandCruCount: '140+',
    },
    featuredBottles: [
      {
        vintage: '2010',
        name: 'Domaine de la Romanée-Conti Romanée-Saint-Vivant',
        region: 'Vosne-Romanée, Burgundy, France',
        tastingNote: 'Violets, wild dark strawberry, sous-bois, ethereal silky tannins of aristocratic stature.',
        price: '₹2,40,000',
      },
      {
        vintage: '2008',
        name: 'Krug Clos d’Ambonnay Champagne Brut',
        region: 'Ambonnay, Champagne, France',
        tastingNote: 'Golden brioche, crystallized citrus peel, toasted hazelnut, extraordinarily fine persistency.',
        price: '₹1,90,000',
      },
      {
        vintage: '2009',
        name: 'Château d’Yquem Premier Cru Supérieur',
        region: 'Sauternes, Bordeaux, France',
        tastingNote: 'Candied apricot, saffron, wildflower honey, electrifying acidity balancing pure opulence.',
        price: '₹65,000',
      },
      {
        vintage: '2015',
        name: 'Domaine Leflaive Chevalier-Montrachet Grand Cru',
        region: 'Côte de Beaune, Burgundy, France',
        tastingNote: 'White blossom, crushed flint, Meyer lemon butter, crystalline limestone laser focus.',
        price: '₹1,10,000',
      },
    ],
  },
  serviceStatus: {
    statusText: 'Open Tonight · Autumn Degustation Service',
    doorsTime: '6:00 PM – 11:30 PM',
    dressCodeSummary: 'Formal / Jacket Required for Gentlemen',
  },
};

export default function IvoryCourt() {
  return <RestaurantPage theme={theme} />;
}

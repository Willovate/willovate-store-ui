import React from 'react';
import {
  RestaurantPage,
  type RestaurantThemeConfig
} from '../components/RestaurantCore';

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'azure-bistro',
  name: 'Azure Bistro',
  tagline: 'Coastal French fine dining. Ocean harvests from our shores to your table.',
  category: 'fine-dining',
  currencySymbol: '₹',
  palette: {
    primary: '#0284c7',      // Aegean Azure
    secondary: '#082f49',    // Deep Sea Navy
    background: '#f8fafc',   // Crisp Sea Salt White
    surface: '#f0f9ff',      // Coastal Breeze Soft Blue
    text: '#0f172a',         // Mediterranean Deep Slate
    textLight: '#475569',    // Coastal Mist
    heroOverlay: 'linear-gradient(to top, rgba(8,47,73,0.92) 0%, rgba(8,47,73,0.52) 50%, rgba(8,47,73,0.18) 100%)',
    border: 'rgba(2,132,199,0.25)',
  },
  typography: {
    heading: '"Playfair Display", "Cinzel", Georgia, serif',
    body: '"Lato", "Inter", sans-serif',
  },
  images: {
    hero: img('photo-1537047902294-62a40c20a6ae'),
    heroAlt: 'Luminous coastal dining room overlooking the shimmering Mediterranean sea',
    story: img('photo-1534482421-64566f976cfa'),
    storyAlt: 'Executive chef searing wild diver scallops on a heavy copper skillet',
    promo: img('photo-1533777857889-4be7c70b33f7'),
    promoAlt: 'Chilled seafood tower with Belon oysters, langoustines and vintage Champagne',
    gallery: [
      { src: img('photo-1414235077428-338989a2e8c0'), alt: 'Sunset oceanfront table set with linen and handblown crystal' },
      { src: img('photo-1534482421-64566f976cfa'), alt: 'Pan-seared diver scallops with sea cauliflower purée' },
      { src: img('photo-1533777857889-4be7c70b33f7'), alt: 'Wild Belon oysters with shallot mignonette on crushed ice' },
      { src: img('photo-1551218808-94e220e084d2'), alt: 'Authentic Marseille bouillabaisse with saffron broth and rouille' },
      { src: img('photo-1529193591184-b1d58069ecdd'), alt: 'Line-caught sea bass with crispy skin and Provençal herb emulsion' },
      { src: img('photo-1510812431401-41d2bd2722f3'), alt: 'Sommelier pouring Chablis Premier Cru at the outdoor terrace' },
    ],
  },
  content: {
    heroHeadline: 'Elegance by the Sea.',
    heroSub:
      'Experience the refined coastal soul of the French Riviera. Daily wild seafood from local artisanal divers, a cellar of world-class coastal vintages, and sunset views that linger forever.',
    storyTitle: 'Tides, Copper & Heritage.',
    storyBody: [
      'At Azure Bistro, our culinary compass is dictated by the morning tide. Executive Chef Laurent Moreau works exclusively with independent day-boat fishermen who land their catch directly at our harbour slipway.',
      'From authentic Marseille bouillabaisse simmered for eight hours with rockfish and saffron to hand-shucked oysters paired with crisp Chablis, dining here is a love letter to the Mediterranean coastline.',
    ],
    promoTitle: 'Private Terrace Over the Bay.',
    promoCTA: 'Reserve Sunset Table',
    ctaPrimary: 'Book a Table',
    ctaSecondary: 'View Seafood Menus',
    address: '1 Ocean Drive, Waterfront Promenade, Coastal Bay',
    hours: 'Tuesday – Sunday · 5:00 PM – 10:30 PM',
    phone: '(555) 123-9876',
    chefName: 'Laurent Moreau',
    chefTitle: 'Executive Chef & Maître Rôtisseur',
    chefQuote: 'The ocean needs no heavy sauces. When fish is pulled from the water at dawn, the chef’s job is merely to honour its pristine purity with fire, sea salt, and lemon agrumato.',
  },
  tastingCourses: [
    {
      courseNumber: '01',
      title: 'The Tide',
      dishName: 'Chilled Belon Oysters & Champagne Mignonette',
      description: 'Hand-harvested flat oysters, pink shallot pearls, finger lime caviar, sea fennel.',
      winePairing: '2020 Domaine William Fèvre Chablis Premier Cru',
      wineOrigin: 'Chablis, Burgundy, France',
    },
    {
      courseNumber: '02',
      title: 'The Deep',
      dishName: 'Pan-Seared Diver Scallops & Saffron Cauliflower',
      description: 'Day-boat sea scallops, silky cauliflower purée, noisette emulsion, crispy caper blossoms.',
      winePairing: '2021 Domaine Tempier Bandol Blanc',
      wineOrigin: 'Bandol, Provence, France',
    },
    {
      courseNumber: '03',
      title: 'The Coast',
      dishName: 'Wild Mediterranean Sea Bass in Sea Salt Crust',
      description: 'Baked in aromatic herbal salt dough, carved tableside with herb vierge and ratatouille purée.',
      winePairing: '2019 Domaine Dujac Puligny-Montrachet',
      wineOrigin: 'Côte de Beaune, Burgundy, France',
    },
    {
      courseNumber: '04',
      title: 'Riviera Sunset',
      dishName: 'Menton Lemon Tarte & Roasted Honey Gelato',
      description: 'Sablé pastry, candied Amalfi citrus peel, caramelized wild thyme honey, white chocolate veil.',
      winePairing: '2018 Château Guiraud Premier Grand Cru Sauternes',
      wineOrigin: 'Sauternes, France',
    },
  ],
  menu: [
    {
      tab: 'Riviera Starters',
      items: [
        {
          name: 'Belon Oysters on Ice (Half Dozen)',
          price: '₹1,250',
          desc: 'French shallot mignonette, lemon agrumato, house spicy sea sauce.',
          tags: ['Raw Bar', 'Gluten-Free'],
          image: img('photo-1533777857889-4be7c70b33f7'),
          winePairing: '2021 Billecart-Salmon Brut Sous Bois',
        },
        {
          name: 'Pan-Seared Sea Scallops',
          price: '₹1,650',
          desc: 'Diver-caught jumbo scallops, caramelized cauliflower purée, brown butter caper emulsion, trout roe.',
          tags: ['Signature'],
          image: img('photo-1534482421-64566f976cfa'),
          winePairing: '2020 Domaine Leflaive Bourgogne Blanc',
        },
        {
          name: 'Traditional Marseille Bouillabaisse',
          price: '₹1,850',
          desc: 'Saffron rockfish broth, day catch fillets, gruyère garlic crouton, saffron rouille.',
          image: img('photo-1546069901-ba9599a7e63c'),
          winePairing: '2021 Domaine Ott Château de Selle Rosé',
        },
        {
          name: 'Niçoise Yellowfin Tuna Tartare',
          price: '₹1,350',
          desc: 'Hand-diced sashimi grade tuna, quail egg, taggiasca olives, crispy capers, shallot crisp.',
          image: img('photo-1607301406259-dfb186e15de8'),
          winePairing: '2022 Clos Sainte Magdeleine Cassis',
        },
        {
          name: 'Escargots de Bourgogne en Coquille',
          price: '₹950',
          desc: 'Half-dozen wild snails baked in shells with garlic herb Normandy butter and crusty baguette.',
          image: img('photo-1534422298391-e4f8c172dddb'),
          winePairing: '2021 Chablis Premier Cru',
        },
      ],
    },
    {
      tab: 'Mediterranean Catch',
      items: [
        {
          name: 'Line-Caught Turbot Meunière',
          price: '₹2,600',
          desc: 'Golden brown butter, fresh lemon, flat parsley, pomme purée, crispy capers.',
          tags: ['Catch of the Day'],
          image: img('photo-1529193591184-b1d58069ecdd'),
          winePairing: '2019 Louis Latour Meursault',
        },
        {
          name: 'Provençal Stuffed Calamari',
          price: '₹1,750',
          desc: 'Filled with crab, pine nuts, and sourdough crumb, roasted San Marzano tomato coulis.',
          image: img('photo-1414235077428-338989a2e8c0'),
          winePairing: '2020 Clos Sainte Magdeleine Cassis Blanc',
        },
        {
          name: 'Whole Roasted Loup de Mer',
          price: '₹2,200',
          desc: 'Mediterranean sea bass stuffed with fresh rosemary and lemon, extra virgin olive oil, sea salt.',
          image: img('photo-1534482421-64566f976cfa'),
          winePairing: '2021 Bandol Blanc Domaine Tempier',
        },
        {
          name: 'Butter-Poached Langoustine Tails',
          price: '₹2,800',
          desc: 'Three giant Brittany langoustines, saffron leek fondue, sweet garlic foam.',
          tags: ['Prestige Seafood'],
          image: img('photo-1533777857889-4be7c70b33f7'),
          winePairing: '2019 Puligny-Montrachet',
        },
        {
          name: 'Sautéed Red Mullet with Fennel',
          price: '₹1,800',
          desc: 'Crispy skin rouget, braised baby anise fennel, orange tapenade butter.',
          image: img('photo-1569050467447-ce54b3bbc37d'),
          winePairing: '2022 Côtes de Provence Rosé',
        },
      ],
    },
    {
      tab: 'Bistro Butcher Cuts',
      items: [
        {
          name: 'Filet Mignon au Poivre',
          price: '₹2,400',
          desc: 'Prime beef filet, pommes Dauphinoise, haricots verts, green peppercorn cognac sauce.',
          tags: ['Classic French'],
          image: img('photo-1544025162-d76694265947'),
          winePairing: '2018 Château Pontet-Canet Pauillac',
        },
        {
          name: 'Duck Confit with Sarladaise Potatoes',
          price: '₹1,850',
          desc: 'Crisp cured duck leg cooked in duck fat, roasted garlic potatoes, frisée salad with lardons.',
          image: img('photo-1414235077428-338989a2e8c0'),
          winePairing: '2019 Domaine de la Romanée-Conti Corton',
        },
        {
          name: 'Dry-Aged Côte de Boeuf for Two (36oz)',
          price: '₹5,800',
          desc: 'Bone-in ribeye charred over wood fire, truffle fries, béarnaise, shallot red wine jus.',
          tags: ['For Two'],
          image: img('photo-1600891964599-f61ba0e24092'),
          winePairing: '2016 Château Palmer Margaux',
        },
        {
          name: 'Herb-Roasted Colorado Rack of Lamb',
          price: '₹2,500',
          desc: 'Persillade crust, glazed baby carrots, rosemary jus, ratatouille tartelette.',
          image: img('photo-1558030006-450675393462'),
          winePairing: '2017 Châteauneuf-du-Pape Beaucastel',
        },
        {
          name: 'Braised Beef Short Rib Bourguignon',
          price: '₹2,100',
          desc: 'Slow-cooked in red Burgundy wine with pearl onions, cremini mushrooms, and lardon bacon.',
          image: img('photo-1555939594-58d7cb561ad1'),
          winePairing: '2018 Gevrey-Chambertin',
        },
      ],
    },
    {
      tab: 'Garden Primeurs & Sides',
      items: [
        {
          name: 'Traditional Ratatouille Niçoise',
          price: '₹680',
          desc: 'Slow-simmered zucchini, eggplant, sweet peppers, San Marzano tomatoes, fresh thyme.',
          image: img('photo-1466637574441-749b8f19452f'),
        },
        {
          name: 'Pommes Dauphinoise au Gratin',
          price: '₹580',
          desc: 'Layered thinly sliced potatoes baked with cream, garlic, nutmeg, and French Gruyère.',
          image: img('photo-1582293041079-7814c2f12063'),
        },
        {
          name: 'Haricots Verts with Toasted Almonds',
          price: '₹520',
          desc: 'French thin green beans tossed in brown Normandy butter and flaked almonds.',
          image: img('photo-1553361371-9b22f78e8b1d'),
        },
        {
          name: 'Truffled Wild Mushrooms Persillade',
          price: '₹750',
          desc: 'Chanterelles and morels sautéed with shallots, garlic, flat parsley, and truffle oil.',
          image: img('photo-1540420773420-3366772f4999'),
        },
        {
          name: 'Hand-Cut Pommes Frites with Aioli',
          price: '₹480',
          desc: 'Crispy twice-fried potatoes dusted with sea salt, served with scratch-made garlic aioli.',
          image: img('photo-1585109649139-366815a0d713'),
        },
      ],
    },
    {
      tab: 'French Confections & Digestifs',
      items: [
        {
          name: 'Classic Tahitian Vanilla Crème Brûlée',
          price: '₹580',
          desc: 'Crackling burnt sugar top over velvety rich egg yolk and vanilla custard.',
          tags: ['French Classic'],
          image: img('photo-1587314168485-3236d6710814'),
          winePairing: '2018 Château Guiraud Sauternes',
        },
        {
          name: 'Warm Valrhona Chocolate Fondant',
          price: '₹650',
          desc: 'Molten dark chocolate cake, pistachio gelato, candied orange zest.',
          image: img('photo-1579372786545-d24232daf58c'),
          winePairing: 'Banyuls Rimage Grand Cru',
        },
        {
          name: 'Caramelized Apple Tarte Tatin',
          price: '₹620',
          desc: 'Upside-down caramelized apples on puff pastry with Isigny Ste Mère crème fraîche.',
          image: img('photo-1509440159596-0249088772ff'),
          winePairing: 'Château d’Yquem 2011',
        },
        {
          name: 'Freshly Baked Madeleines Basket',
          price: '₹480',
          desc: 'Six warm French shell sponge cakes with lemon zest and honey dusting.',
          image: img('photo-1587248720327-8eb72564be1e'),
          winePairing: 'Grand Marnier Cuvée du Centenaire',
        },
        {
          name: 'Artisan French Fromage Board',
          price: '₹950',
          desc: 'Comté 24-month, Roquefort, Camembert di Normandie, fig walnut bread, honeycomb.',
          tags: ['Cheese Selection'],
          image: img('photo-1510812431401-41d2bd2722f3'),
          winePairing: 'Vintage Armagnac 1995',
        },
      ],
    },
  ],
  testimonials: [
    {
      name: 'Eleanor Vance',
      quote:
        'The tasting menu was a complete revelation. The diver scallops alone are worth a transatlantic flight — truly every course was sublime.',
      rating: 5,
      publication: 'Condé Nast Traveler',
    },
    {
      name: 'James Westlake',
      quote:
        'The finest coastal seafood I have tasted outside of Saint-Tropez. Impeccable wine service and sunset over the water that took our breath away.',
      rating: 5,
      publication: 'Michelin Guide Review',
    },
    {
      name: 'Caroline Fontaine',
      quote:
        'A masterclass in French coastal gastronomy. The bouillabaisse is profoundly deep and authentic. Azure Bistro is truly a national treasure.',
      rating: 5,
      publication: 'The Epicurean Standard',
    },
  ],
  features: [
    'Panoramic Sunset Ocean Terrace',
    'Daily Day-Boat Seafood Landings',
    'Certified Sommelier Wine Programme',
    'Private Harbor Berth & Valet Service',
  ],
  accolades: [
    { year: '2024', title: 'Two Michelin Stars', organization: 'Michelin Guide', badge: '★★ Michelin' },
    { year: '2024', title: 'Best Coastal Mediterranean Restaurant', organization: 'World Culinary Awards', badge: 'World Culinary' },
    { year: '2023', title: 'Grand Award for Coastal Wine Program', organization: 'Wine Spectator (950+ Bottles)', badge: 'Wine Spectator' },
    { year: '2023', title: 'Culinary Trophy of Excellence', organization: 'Relais & Châteaux', badge: 'Relais & Châteaux' },
  ],
  privateDining: {
    headline: 'Coastal Glamour Overlooking the Shimmering Bay',
    subheadline: 'Celebrate with sunset views, artisanal oyster shucking, and fresh Mediterranean catches directly off the day-boats.',
    rooms: [
      {
        id: 'bayview-terrace',
        name: 'The Riviera Bayview Terrace',
        capacity: '24 Guests',
        description: 'Private teakwood terrace suspended over the water with heated marine glass, sunset panoramic views, and private raw bar chef.',
        image: img('photo-1414235077428-338989a2e8c0'),
        features: ['Private Sunset Vista', 'Live Oyster & Raw Bar Chef', 'Chilled Champagne Bar', 'Private Harbour Mooring'],
        minimumSpend: '₹1,50,000',
      },
      {
        id: 'captains-salon',
        name: 'The Captain’s Salon',
        capacity: '16 Guests',
        description: 'An intimate maritime salon decorated with polished brass and ocean photography, ideal for executive coastal feasts.',
        image: img('photo-1537047902294-62a40c20a6ae'),
        features: ['Dedicated Sommelier', 'High-Speed Presentation AV', 'Bespoke 6-Course Seafood Tasting', 'Valet & Yacht Slip Docking'],
        minimumSpend: '₹1,10,000',
      },
      {
        id: 'full-bistro-buyout',
        name: 'Full Bistro & Terrace Buyout',
        capacity: '110 Guests',
        description: 'Exclusive takeover of both indoor dining room and outdoor panoramic bay deck with live Mediterranean jazz trio.',
        image: img('photo-1533777857889-4be7c70b33f7'),
        features: ['Full Kitchen Brigade', 'Live Seafood Display Stations', 'Valet Waterfront Porte-Cochère', 'Custom Seafood Tower Ceremony'],
        minimumSpend: '₹7,00,000',
      },
    ],
  },
  hospitalityGuide: [
    { title: 'Dress Code', description: 'Coastal Chic / Smart Elegant · Collared shirts and tailored trousers or elegant evening wear. Beachwear, sandals, and athletic wear are strictly prohibited.' },
    { title: 'Valet & Arrival', description: 'Complimentary valet parking is provided at Waterfront Promenade. Private yacht slipway dockage available upon request.' },
    { title: 'Corkage Policy', description: 'Up to two 750ml bottles per table of rare coastal vintages not represented in our cellar. Corkage is ₹2,500 per bottle.' },
    { title: 'Cancellation Policy', description: 'Due to our daily day-boat catch commitments, cancellations must be received 48 hours prior. Cancellations within 48h incur a ₹2,000 per guest charge.' },
    { title: 'Children & Pacing', description: 'We welcome guests of all ages during early sunset seatings (5:00 PM – 7:00 PM). Evening seatings are recommended for guests aged 8 and above.' },
  ],
  giftExperiences: [
    {
      id: 'azure-degustation',
      title: 'Riviera Seafood Degustation for Two with Chablis',
      price: '₹22,000',
      description: 'Our full 6-course wild diver scallop, Marseille bouillabaisse, and line-caught sea bass feast paired with Premier Cru Chablis.',
      popular: true,
      includes: ['6-Course Coastal Tasting for Two', 'Premier Cru Chablis Pairings', 'Belon Oyster Amuse-Bouche Prelude', 'Waterfront Window Table Priority'],
    },
    {
      id: 'azure-oyster-champagne',
      title: 'Belon Oyster & Vintage Champagne Masterclass for Two',
      price: '₹14,500',
      description: 'Hand-shucked Belon oysters, langoustines, and a sommelier-led tasting of vintage Blanc de Blancs champagnes.',
      includes: ['Dozen Hand-Shucked Belon Oysters', 'Bottle of Vintage Champagne Salon', 'Sommelier Guided Seafood Shucking', 'Sunset Terrace Seating'],
    },
    {
      id: 'azure-voucher',
      title: 'Azure Bistro Waterfront Dining Privilege Voucher',
      price: '₹10,000',
      description: 'A luxurious gift certificate applicable toward evening seafood dining, terrace cocktails, or private events.',
      includes: ['Valid for 12 months', 'Direct Concierge Table Reservation', 'Complimentary Champagne Welcome'],
    },
  ],
  sommelierReserve: {
    intro: 'Curated by Sommelier Chloé Vasseur, celebrating maritime terroirs from Chablis, Cassis, Bandol, and the volcanic slopes of Santorini.',
    sommelierName: 'Chloé Vasseur',
    sommelierTitle: 'Head Sommelier & Champagne Specialist',
    cellarStats: {
      referenceLabels: '950+',
      vintageRange: '1970-2023',
      grandCruCount: '80+',
    },
    featuredBottles: [
      {
        vintage: '2018',
        name: 'Domaine François Raveneau Chablis Grand Cru Blanchot',
        region: 'Chablis, Burgundy, France',
        tastingNote: 'Oyster shell salinity, lemon oil, white flowers, profound limestone energy.',
        price: '₹78,000',
      },
      {
        vintage: '2012',
        name: 'Champagne Salon ‘Le Mesnil’ Blanc de Blancs Brut',
        region: 'Le Mesnil-sur-Oger, Champagne, France',
        tastingNote: 'Chalky minerality, roasted almond, candied lemon peel, peerless laser precision.',
        price: '₹1,35,000',
      },
      {
        vintage: '2017',
        name: 'Domaine Tempier Bandol Rouge ‘La Tourtine’',
        region: 'Bandol, Provence, France',
        tastingNote: 'Mourvèdre brilliance, wild blackberries, garrigue, Provençal herbs and dark leather.',
        price: '₹24,000',
      },
      {
        vintage: '2020',
        name: 'Domaine Sigalas Kavalieros Assyrtiko',
        region: 'Santorini, Greece',
        tastingNote: 'Volcanic smoke, sea spray, ripe citrus, bone-dry intense phenolic grip.',
        price: '₹18,500',
      },
    ],
  },
  serviceStatus: {
    statusText: 'Open Tonight · Sunset Oceanfront Service',
    doorsTime: '5:00 PM – 10:30 PM',
    dressCodeSummary: 'Coastal Chic · Smart Elegant Attire',
  },
};

export default function AzureBistro() {
  return <RestaurantPage theme={theme} />;
}

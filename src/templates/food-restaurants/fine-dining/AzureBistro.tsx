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
    hero: img('photo-1414235077428-338989a2e8c0'),
    heroAlt: 'Luminous coastal dining room overlooking the shimmering Mediterranean sea',
    story: img('photo-1534482421-64566f976cfa'),
    storyAlt: 'Executive chef searing wild diver scallops on a heavy copper skillet',
    promo: img('photo-1541544537887-a35c38e3e785'),
    promoAlt: 'Chilled seafood tower with Belon oysters, langoustines and vintage Champagne',
    gallery: [
      { src: img('photo-1414235077428-338989a2e8c0'), alt: 'Sunset oceanfront table set with linen and handblown crystal' },
      { src: img('photo-1534482421-64566f976cfa'), alt: 'Pan-seared diver scallops with sea cauliflower purée' },
      { src: img('photo-1541544537887-a35c38e3e785'), alt: 'Wild Belon oysters with shallot mignonette on crushed ice' },
      { src: img('photo-1504674900247-0877df9cc836'), alt: 'Authentic Marseille bouillabaisse with saffron broth and rouille' },
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
      tab: 'Raw Bar & Starters',
      items: [
        {
          name: 'Belon Oysters on Ice (Half Dozen)',
          price: '$28',
          desc: 'French shallot mignonette, lemon agrumato, house spicy sea sauce.',
          tags: ['Raw Bar', 'Gluten-Free'],
          image: img('photo-1541544537887-a35c38e3e785'),
          winePairing: '2021 Billecart-Salmon Brut Sous Bois',
        },
        {
          name: 'Pan-Seared Sea Scallops',
          price: '$42',
          desc: 'Diver-caught jumbo scallops, caramelized cauliflower purée, brown butter caper emulsion, trout roe.',
          tags: ['Signature'],
          image: img('photo-1534482421-64566f976cfa'),
          winePairing: '2020 Domaine Leflaive Bourgogne Blanc',
        },
        {
          name: 'Traditional Marseille Bouillabaisse',
          price: '$48',
          desc: 'Saffron rockfish broth, day catch fillets, gruyère garlic crouton, saffron rouille.',
          image: img('photo-1504674900247-0877df9cc836'),
          winePairing: '2021 Domaine Ott Château de Selle Rosé',
        },
      ],
    },
    {
      tab: 'Catch of the Day & Mains',
      items: [
        {
          name: 'Line-Caught Turbot Meunière',
          price: '$68',
          desc: 'Golden brown butter, fresh lemon, flat parsley, pomme purée, crispy capers.',
          tags: ['Catch of the Day'],
          image: img('photo-1529193591184-b1d58069ecdd'),
          winePairing: '2019 Louis Latour Meursault',
        },
        {
          name: 'Filet Mignon au Poivre',
          price: '$58',
          desc: 'Prime beef filet, pommes Dauphinoise, haricots verts, green peppercorn cognac sauce.',
          image: img('photo-1544025162-d76694265947'),
          winePairing: '2018 Château Pontet-Canet Pauillac',
        },
        {
          name: 'Provençal Stuffed Calamari',
          price: '$44',
          desc: 'Filled with crab, pine nuts, and sourdough crumb, roasted San Marzano tomato coulis.',
          image: img('photo-1414235077428-338989a2e8c0'),
          winePairing: '2020 Clos Sainte Magdeleine Cassis Blanc',
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
};

export default function AzureBistro() {
  return <RestaurantPage theme={theme} />;
}

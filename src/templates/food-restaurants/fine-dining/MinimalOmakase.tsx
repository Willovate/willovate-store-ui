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
  currencySymbol: '₹',
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
    hero: img('photo-1611143669185-af224c5e3252'),
    heroAlt: 'Master sushi chef gently placing wild bluefin otoro nigiri onto a blackened yakisugi counter',
    story: img('photo-1569050467447-ce54b3bbc37d'),
    storyAlt: 'Intricate knife scoring on wild Hokkaido scallop and Shizuoka grated wasabi',
    promo: img('photo-1579871494447-9811cf80d66c'),
    promoAlt: 'Minimalist 12-seat single-slab Hinoki wood counter with soft ambient lighting',
    gallery: [
      { src: img('photo-1611143669185-af224c5e3252'), alt: 'Master chef hand-shaping warm red-vinegar shari nigiri' },
      { src: img('photo-1569050467447-ce54b3bbc37d'), alt: 'Aged wild bluefin otoro brushed with 15-year nikiri shoyu' },
      { src: img('photo-1579584425555-c3ce17fd4351'), alt: 'Serene 12-seat Hinoki cedar sanctuary in silence' },
      { src: img('photo-1583623025817-d180a2221d0a'), alt: 'Ceremonial sake service poured from hand-blown Edo-kiriko glass' },
      { src: img('photo-1617196034796-73dfa7b1fd56'), alt: 'Live sea urchin (Hokkaido Uni) service in sea water' },
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
      tab: 'Edomae Nigiri',
      items: [
        {
          name: 'Wild Bluefin Otoro Nigiri',
          price: '₹950',
          desc: 'Fatty tuna belly brushed with 3-year aged nikiri shoyu, aged red vinegar shari.',
          tags: ['Toyosu Direct', 'Signature'],
          image: img('photo-1611143669185-af224c5e3252'),
          winePairing: 'Dassai Beyond Junmai Daiginjo',
        },
        {
          name: 'Hokkaido Bafun Uni Nigiri',
          price: '₹1,250',
          desc: 'Sweet sea urchin from Nemuro, crispy Ariake seaweed, fresh grated Shizuoka wasabi.',
          tags: ['Prestige'],
          image: img('photo-1579871494447-9811cf80d66c'),
          winePairing: 'Kokuryu Ishidaya Junmai Daiginjo',
        },
        {
          name: 'Nodoguro Seared Blackthroat Seaperch',
          price: '₹850',
          desc: 'Lightly torched skin with sea salt, releasing luxurious natural fish oils, sudachi citrus drop.',
          image: img('photo-1569050467447-ce54b3bbc37d'),
          winePairing: 'Juyondai Honmaru Sake',
        },
        {
          name: 'Shimafuji Striped Jack (Shima-Aji)',
          price: '₹750',
          desc: 'Firm, buttery texture, topped with finely grated ginger and scallion oil.',
          image: img('photo-1579584425555-c3ce17fd4351'),
          winePairing: 'Kubota Manju Junmai Daiginjo',
        },
        {
          name: 'Charcoal-Grilled Anago Sea Eel',
          price: '₹790',
          desc: 'Simmered Tokyo Bay sea eel glazed with sweet tsume reduction, sansho pepper powder.',
          image: img('photo-1617196034796-73dfa7b1fd56'),
          winePairing: 'Hakkaisan Yukimuro 3-Year Aged',
        },
      ],
    },
    {
      tab: 'Sashimi & Otsumami',
      items: [
        {
          name: 'Chutoro & Caviar Tartare',
          price: '₹1,850',
          desc: 'Medium fatty tuna, Imperial Ossetra caviar, fresh egg yolk sauce, crispy nori crisps.',
          tags: ['Delicacy'],
          image: img('photo-1607301406259-dfb186e15de8'),
          winePairing: 'Isojiman Nakadori Junmai Daiginjo',
        },
        {
          name: 'Sawara Smoked in Rice Straw',
          price: '₹1,350',
          desc: 'King mackerel kissed with burning rice straw smoke, ponzu jelly, micro shiso leaves.',
          image: img('photo-1583623025817-d180a2221d0a'),
          winePairing: 'Kenbishi Mizuho Junmai',
        },
        {
          name: 'Steamed Awabi Abalone & Liver Sauce',
          price: '₹2,200',
          desc: 'Tender black abalone steamed for 6 hours in sake, rich abalone liver emulsion with shari ball.',
          tags: ['Rare Delicacy'],
          image: img('photo-1534422298391-e4f8c172dddb'),
          winePairing: 'Hiroki Junmai Daiginjo',
        },
        {
          name: 'Madai Sea Bream with Truffle Ponzu',
          price: '₹1,250',
          desc: 'Thinly sliced red sea bream sashimi, white truffle oil, sea salt, baby shiso.',
          image: img('photo-1534482421-64566f976cfa'),
          winePairing: 'Dassai 23 Junmai Daiginjo',
        },
        {
          name: 'Chawanmushi with Uni & Snow Crab',
          price: '₹1,150',
          desc: 'Silky savory egg custard, dashi broth, Matsuba snow crab meat, yuzu zest.',
          image: img('photo-1553621042-f6e147245754'),
          winePairing: 'Kikusui Funaguchi Genshu',
        },
      ],
    },
    {
      tab: 'Robata & Warm Bites',
      items: [
        {
          name: 'A5 Miyazaki Wagyu Sukiyaki Skewer',
          price: '₹1,650',
          desc: 'Grilled over binchotan charcoal, sweet tare glaze, organic raw quail egg dip.',
          tags: ['A5 Certified'],
          image: img('photo-1544025162-d76694265947'),
          winePairing: 'Yamazaki 12-Year Single Malt',
        },
        {
          name: 'Gindara Saikyoyaki (Miso Black Cod)',
          price: '₹1,450',
          desc: 'Alaskan black cod marinated for 72 hours in sweet Kyoto Saikyo miso, charred hajikami ginger.',
          image: img('photo-1534482421-64566f976cfa'),
          winePairing: 'Born Gold Muroka Junmai Daiginjo',
        },
        {
          name: 'King Crab Robata with Kani Miso Butter',
          price: '₹2,100',
          desc: 'Red king crab leg roasted on binchotan, basted with rich crab tomalley garlic butter.',
          image: img('photo-1533777857889-4be7c70b33f7'),
          winePairing: 'Katsuyama Lei Sapphire Label',
        },
        {
          name: 'Maitake Mushroom & Wagyu Tallow Yakitori',
          price: '₹850',
          desc: 'Wild Japanese cluster mushrooms brushed with rendered wagyu fat and sea salt.',
          image: img('photo-1553361371-9b22f78e8b1d'),
          winePairing: 'Tedorigawa Yamahai Junmai',
        },
        {
          name: 'Eel & Foie Gras Donburi Bite',
          price: '₹1,350',
          desc: 'Mini rice bowl with seared French foie gras, grilled unagi, sweet sansho reduction.',
          image: img('photo-1569050467447-ce54b3bbc37d'),
          winePairing: 'Hakushu Distiller’s Reserve',
        },
      ],
    },
    {
      tab: 'Artisan Temaki Hand Rolls',
      items: [
        {
          name: 'Toro & Scallion (Negitoro) Hand Roll',
          price: '₹950',
          desc: 'Chopped fatty bluefin tuna, pickled daikon radish, fresh scallions, warm shari, crispy nori.',
          tags: ['Fan Favorite'],
          image: img('photo-1553621042-f6e147245754'),
        },
        {
          name: 'Uni & Wagyu Surf and Turf Temaki',
          price: '₹1,350',
          desc: 'Torched A5 wagyu beef strip topped with cold creamy sea urchin and fresh wasabi.',
          image: img('photo-1579584425555-c3ce17fd4351'),
        },
        {
          name: 'Sweet Botan Ebi & Shiso Temaki',
          price: '₹850',
          desc: 'Raw jumbo sweet prawn, Japanese green shiso leaf, toasted sesame seeds.',
          image: img('photo-1617196034796-73dfa7b1fd56'),
        },
        {
          name: 'Spicy Bluefin Tuna & Crispy Rice',
          price: '₹790',
          desc: 'Tuna tossed with rayu chili oil and kewpie, warm red-vinegar rice, seasoned nori.',
          image: img('photo-1607301406259-dfb186e15de8'),
        },
        {
          name: 'King Crab & Truffle Butter Temaki',
          price: '₹1,150',
          desc: 'Warm buttered king crab meat, white truffle essence, cucumber matchsticks.',
          image: img('photo-1533777857889-4be7c70b33f7'),
        },
      ],
    },
    {
      tab: 'Japanese Confections & Rare Sakes',
      items: [
        {
          name: 'Kyoto Matcha Castella Cake & Gold Leaf',
          price: '₹750',
          desc: 'Uji first-harvest ceremonial matcha sponge cake with Azuki sweet red bean paste and 24k gold.',
          image: img('photo-1551024709-8f23befc6f87'),
          winePairing: 'Single-Estate Gyokuro Green Tea',
        },
        {
          name: 'Black Sesame Choux au Craquelin',
          price: '₹680',
          desc: 'Crisp pastry puff filled with intense roasted black sesame mousseline cream.',
          image: img('photo-1563729784474-d77dbb933a9e'),
          winePairing: 'Hojicha Roasted Green Tea',
        },
        {
          name: 'Yuzu Tartlet with Shiso Sorbet',
          price: '₹720',
          desc: 'Tart Japanese citrus curd in toasted sesame crust with refreshing green shiso ice.',
          image: img('photo-1579372786545-d24232daf58c'),
        },
        {
          name: 'House Tamagoyaki Sponge (2 Pcs)',
          price: '₹550',
          desc: 'Traditional sweet baked egg omelet with shrimp paste and mountain yam, served warm.',
          tags: ['Shokunin Classic'],
          image: img('photo-1583623025817-d180a2221d0a'),
        },
        {
          name: 'Rare Vintage Sake Flight (3 Pours)',
          price: '₹3,200',
          desc: 'Trio of ultra-rare Junmai Daiginjo expressions aged up to 10 years at sub-zero temperatures.',
          tags: ['Sake Master Flight'],
          image: img('photo-1510812431401-41d2bd2722f3'),
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

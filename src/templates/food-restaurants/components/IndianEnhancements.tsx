import React, { useState } from 'react';
import {
  Flame, Sparkles, Check, ShoppingBag, ArrowRight, ShieldCheck,
  Clock, Award, Droplets, ChevronRight, X, Heart, RefreshCw, Layers, Plus,
  Utensils, Compass, Thermometer, Wind, Star, Coffee, Leaf, Eye
} from 'lucide-react';
import { useStorefront, type StorefrontThemeConfig, formatPrice, type StoreProduct } from '../shared/FoodStorefrontCore';

// ─── INDIAN TYPES & INTERFACES ───────────────────────────────────────────────

export interface DumBiryaniHandi {
  id: string;
  name: string;
  origin: string;
  price: number;
  riceType: string;
  grainLength: string;
  dumSimmerHours: string;
  aromaNotes: string[];
  description: string;
  image: string;
  badge: string;
  spiceRating: number;
  serves: string;
  sealType: string;
}

export interface TandoorSkewer {
  id: string;
  name: string;
  category: 'poultry' | 'mutton' | 'vegetarian' | 'seafood';
  categoryLabel: string;
  price: number;
  marinadeHours: string;
  clayOvenTemp: string;
  spiceLevel: number;
  description: string;
  chutneyPairing: string;
  image: string;
  badge?: string;
  chefTechnique: string;
}

export interface SingleOriginSpice {
  id: string;
  name: string;
  hindiName: string;
  region: string;
  harvestGrade: string;
  flavorProfile: string;
  ayurvedaBenefit: string;
  image: string;
  color: string;
}

export interface GrandThaliBanquet {
  id: string;
  name: string;
  tradition: string;
  price: number;
  katorisCount: number;
  description: string;
  itemsList: string[];
  defaultBread: string;
  defaultDessert: string;
  dietaryBadge: string;
  image: string;
  serves: string;
}

export interface RoyalBeverage {
  id: string;
  name: string;
  type: 'chai' | 'lassi' | 'cooler' | 'coffee';
  price: number;
  vessel: string;
  brewMethod: string;
  notes: string;
  image: string;
  badge: string;
}

// ─── CURATED DATA ────────────────────────────────────────────────────────────

export const DUM_BIRYANI_ITEMS: DumBiryaniHandi[] = [
  {
    id: 'shahi-zaffrani-mutton',
    name: 'Shahi Zaffrani Mutton Dum Handi',
    origin: 'Royal Awadhi Court, Lucknow',
    price: 745,
    riceType: '24-Month Aged Dehradun Taraori Basmati',
    grainLength: '8.4 mm Extra Long Pearl Grain',
    dumSimmerHours: '4.5 Hours on Gentle Babool Charcoal Embers',
    aromaNotes: ['Kashmir Mongra Saffron', 'Kewra Distillate', 'Mace & Nutmeg', 'Bilona Gir Cow Ghee', 'Rose Petal Smoke'],
    description: 'Prime baby goat marinated for 18 hours in raw papaya, hung curd, and 32 hand-ground royal spices. Layered with saffron milk and sealed in an unglazed earthen pot with an organic whole wheat dough purdah lid.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=85',
    badge: 'SIGNATURE ROYAL DUM',
    spiceRating: 3,
    serves: '2 Guests',
    sealType: 'Atta Dough Purdah Seal'
  },
  {
    id: 'awadhi-murgh-pukht',
    name: 'Awadhi Murgh Pukht Biryani',
    origin: 'Nawabi Household Tradition, Lucknow',
    price: 595,
    riceType: 'Heritage Aged Long-Grain Basmati',
    grainLength: '8.2 mm Slender Fluffy Grain',
    dumSimmerHours: '3.5 Hours Slow Sealed Dum',
    aromaNotes: ['Green Cardamom', 'Golden Brown Birista Onions', 'Star Anise', 'White Butter', 'Vetiver Water'],
    description: 'Free-range country chicken gently simmered in a fragrant bone-marrow yakhni broth. Sealed with whole spices and slow-cooked in its own moisture to achieve ethereal tenderness.',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=85',
    badge: 'CHEF FAVORITE',
    spiceRating: 2,
    serves: '1-2 Guests',
    sealType: 'Double-Crimp Dough Seal'
  },
  {
    id: 'nawabi-subz-paneer-dum',
    name: 'Nawabi Subz Malai Paneer Dum Handi',
    origin: 'Benares & Royal Rampur Feast',
    price: 495,
    riceType: 'Fragrant Aged Aromatic Basmati',
    grainLength: '8.0 mm Silky Grain',
    dumSimmerHours: '2.5 Hours Gentle Hearth Dum',
    aromaNotes: ['Fresh Mint & Coriander', 'Stone-Crushed Shahi Jeera', 'Kashmiri Saffron Threads', 'Cardamom', 'Cashew Cream'],
    description: 'Handcrafted Gir-cow malai paneer cubes, heirloom winter carrots, baby French beans, and tender green peas steeped in saffron milk and pot-sealed with floral attar.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1000&q=85',
    badge: '100% PURE VEG',
    spiceRating: 2,
    serves: '2 Guests',
    sealType: 'Clay Earthen Lid with Wheat Paste'
  },
  {
    id: 'malabar-tiger-prawn-dum',
    name: 'Malabar Coastal Tiger Prawn Dum Pot',
    origin: 'Tellicherry Coast, Kerala',
    price: 795,
    riceType: 'Khaima / Jeerakasala Fragrant Short Grain',
    grainLength: '4.8 mm Aromatic Pearl Rice',
    dumSimmerHours: '2 Hours Coastal Charcoal Dum',
    aromaNotes: ['Fresh Curry Leaves', 'Crushed Black Tellicherry Pepper', 'Toasted Coconut Ghee', 'Shallot Crisps', 'Fennel'],
    description: 'Wild Bay of Bengal tiger prawns tossed in freshly grated coconut, shallots, and green peppercorn masala, folded with ghee-toasted Jeerakasala rice and sealed under banana leaf with dough.',
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1000&q=85',
    badge: 'PENINSULAR HERITAGE',
    spiceRating: 4,
    serves: '2 Guests',
    sealType: 'Banana Leaf & Atta Purdah'
  }
];

export const TANDOOR_SKEWERS: TandoorSkewer[] = [
  {
    id: 'bhatti-da-murgh',
    name: 'Bhatti Da Murgh Tikka',
    category: 'poultry',
    categoryLabel: 'Tandoori Poultry',
    price: 540,
    marinadeHours: '24 Hours Double Marinade',
    clayOvenTemp: '840°F Hardwood Embers',
    spiceLevel: 4,
    description: 'Tender chicken thigh cuts steeped in dark mustard oil, Kashmiri degi mirch, pounded coriander seeds, and hung curd, blistered on long square iron skewers.',
    chutneyPairing: 'Pounded Mint & Raw Mango Chutney',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=85',
    badge: 'HIGHWAY LEGEND',
    chefTechnique: 'Blistered over babool charcoal, basted twice with smoked butter'
  },
  {
    id: 'galouti-kebab-sheermal',
    name: 'Royal Galouti Kebab with Sheermal',
    category: 'mutton',
    categoryLabel: 'Royal Lamb/Mutton',
    price: 680,
    marinadeHours: 'Smoked with Clove & Betel Leaf',
    clayOvenTemp: '450°F Slow Mahi Tawa on Charcoal',
    spiceLevel: 2,
    description: 'Melt-in-the-mouth Awadhi mutton patties infused with 160 secret spices and raw papaya tenderizer. Served over warm saffron-infused sheermal flatbread.',
    chutneyPairing: 'Smoked Garlic Thecha & Walnut Chutney',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85',
    badge: 'MELT-IN-MOUTH AWADHI',
    chefTechnique: 'Smoked using the royal Dhungar technique with burning charcoal and cloves'
  },
  {
    id: 'paneer-peshawari-tikka',
    name: 'Paneer Peshawari Tikka',
    category: 'vegetarian',
    categoryLabel: 'Clay Oven Paneer',
    price: 460,
    marinadeHours: '12 Hours Hung Curd Marinade',
    clayOvenTemp: '820°F Clay Tandoor',
    spiceLevel: 3,
    description: 'Thick hand-pressed Gir-cow malai paneer cubes marinated in crushed coriander seeds, carom seeds (ajwain), and roasted gram flour, skewered with bell peppers and onions.',
    chutneyPairing: 'Spicy Coriander-Green Chilli Relish',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=85',
    badge: 'FARM CHEESE',
    chefTechnique: 'Flash-charred in 4 minutes to seal moisture inside the cheese curd'
  },
  {
    id: 'malai-broccoli-tandoori',
    name: 'Tandoori Malai Broccoli Florets',
    category: 'vegetarian',
    categoryLabel: 'Clay Oven Greens',
    price: 420,
    marinadeHours: '8 Hours Cardamom Cream',
    clayOvenTemp: '800°F Clay Tandoor',
    spiceLevel: 1,
    description: 'Tender broccoli florets marinated in Philadelphia cream cheese, roasted cashew paste, mace, and green cardamom, lightly blistered with melted butter.',
    chutneyPairing: 'Tamarind Date Reduction',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=85',
    badge: 'SUBTLE & VELVETY',
    chefTechnique: 'Tender-stem roasted on copper skewers to preserve crisp-tender bite'
  },
  {
    id: 'seekh-kebab-nizami',
    name: 'Seekh Kebab Nizami',
    category: 'mutton',
    categoryLabel: 'Royal Lamb/Mutton',
    price: 620,
    marinadeHours: '14 Hours Herb & Marrow Blend',
    clayOvenTemp: '860°F Clay Tandoor',
    spiceLevel: 4,
    description: 'Finely minced mountain goat spiced with fresh mint, cilantro, ginger juice, roasted cumin, and royal garam masala, mounted on wide steel skewers.',
    chutneyPairing: 'Kachumber & Saffron Onion Rings',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=85',
    badge: 'SMOKED CHARCOAL',
    chefTechnique: 'Continuous skewer rotation with ghee misting over glowing coals'
  },
  {
    id: 'tandoori-tawa-pomfret',
    name: 'Tandoori Silver Pomfret',
    category: 'seafood',
    categoryLabel: 'Coastal Seafood',
    price: 790,
    marinadeHours: '6 Hours Coastal Mustard Masala',
    clayOvenTemp: '840°F Clay Tandoor',
    spiceLevel: 3,
    description: 'Whole fresh silver pomfret diamond-scored and marinated in yellow chilli powder, ajwain, cold-pressed mustard oil, and lime juice, crisp-roasted on wire racks.',
    chutneyPairing: 'Curry Leaf & Coconut Podi',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=85',
    badge: 'DAY-BOAT CATCH',
    chefTechnique: 'Charcoal-crisped skin with juicy flake, finished with chaat masala'
  }
];

export const SPICE_TERROIR_LIST: SingleOriginSpice[] = [
  {
    id: 'tellicherry-pepper',
    name: 'Tellicherry Black Gold',
    hindiName: 'Kali Mirch',
    region: 'Wayanad, Malabar Coast (Kerala)',
    harvestGrade: 'Grade TGSEB (Extra Bold 4.75mm)',
    flavorProfile: 'Intense woodsy heat, citrus peel aroma, warming piperine kick',
    ayurvedaBenefit: 'Kindles Jatharagni (digestive fire) and enhances nutrient bio-absorption',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=85',
    color: '#3b2f2f'
  },
  {
    id: 'kashmiri-saffron',
    name: 'Kashmiri Mongra Saffron',
    hindiName: 'Kesar',
    region: 'Pampore Valley (Jammu & Kashmir)',
    harvestGrade: 'GI Tagged Pure Mongra Grade 1',
    flavorProfile: 'Floral honeyed aroma, deep crimson tincture, sweet hay & metallic notes',
    ayurvedaBenefit: 'Tridoshic harmonizer, rejuvenates skin luster and elevates mental tranquility',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=85',
    color: '#d97706'
  },
  {
    id: 'guntur-chilli',
    name: 'Guntur Sannam Red Chillies',
    hindiName: 'Lal Mirch',
    region: 'Guntur, Andhra Pradesh',
    harvestGrade: 'S4 Grade (40,000 SHU pungency)',
    flavorProfile: 'Fiery pungent kick, deep natural crimson hue without artificial colorants',
    ayurvedaBenefit: 'Stimulates circulation and clears metabolic sluggishness',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=85',
    color: '#dc2626'
  },
  {
    id: 'green-cardamom',
    name: 'Alleppey Green Cardamom',
    hindiName: 'Chhoti Elaichi',
    region: 'Cardamom Hills, Idukki (Kerala)',
    harvestGrade: '8mm Jumbo Bold Green Pods',
    flavorProfile: 'Sweet floral camphor, eucalyptus hints, refreshing resinous sweetness',
    ayurvedaBenefit: 'Soothes Pitta imbalances, freshens breath, and calms acid fire',
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=600&q=85',
    color: '#16a34a'
  },
  {
    id: 'a2-bilona-ghee',
    name: 'Vedic Gir Cow Bilona Ghee',
    hindiName: 'Shuddh Desi Ghee',
    region: 'Vrindavan Gaushala Heritage Dairy',
    harvestGrade: 'A2 Vedic Bilona Churned from Whole Curd',
    flavorProfile: 'Rich nutty caramelized aroma, granular golden crystals that melt on tongue',
    ayurvedaBenefit: 'Highest Ojas building nectar, nourishes joints, brain tissues, and gut lining',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=85',
    color: '#eab308'
  },
  {
    id: 'byadgi-chilli',
    name: 'Byadgi Wrinkled Mild Chilli',
    hindiName: 'Byadgi Mirch',
    region: 'Haveri District, Karnataka',
    harvestGrade: 'Export Select Kaddi Grade (Mild 12,000 SHU)',
    flavorProfile: 'Rich paprika sweetness, intense crimson oil release, gentle warm tang',
    ayurvedaBenefit: 'High antioxidant carotenoid load without provoking gastric irritation',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=85',
    color: '#991b1b'
  }
];

export const GRAND_THALIS: GrandThaliBanquet[] = [
  {
    id: 'maharaja-shahi-thali',
    name: 'The Imperial Awadhi Shahi Thali',
    tradition: 'Royal Court Banquet of Awadh & Mughlai Heritage',
    price: 1150,
    katorisCount: 11,
    description: 'A feast fit for royalty served on heavy hand-beaten bronze kansa tableware. Features our slow-simmered 24-hr Dal Makhani, Dum Biryani handi, Murgh Awadhi Korma, Paneer Lababdar, Sheermal, Laccha Paratha, Kesari Phirni, and Benarasi Meetha Paan.',
    itemsList: [
      '24-Hour Charcoal Dal Makhani',
      'Awadhi Mutton Dum Biryani Handi',
      'Royal Murgh Lababdar',
      'Shahi Malai Paneer Kofta',
      'Burani Garlic Raita',
      'Kashmiri Saffron Pulao',
      'Warm Saffron Sheermal Bread',
      'Tandoori Laccha Paratha',
      'Pounded Sirka Baby Onions',
      'Chilled Kesari Kheer Phirni',
      'Royal Silver Leaf Meetha Paan'
    ],
    defaultBread: 'Saffron Sheermal & Laccha Paratha',
    defaultDessert: 'Kesari Phirni with Crushed Pistachio',
    dietaryBadge: 'ROYAL NON-VEG BANQUET',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1000&q=85',
    serves: 'Single Noble / Shareable by 2'
  },
  {
    id: 'dakshin-banana-leaf-sadhya',
    name: 'Dakshin 14-Item Banana Leaf Feast',
    tradition: 'Peninsular Coastal & Chettinad Grand Feast',
    price: 890,
    katorisCount: 14,
    description: 'Served on a fresh organic plantain leaf cut at dawn. Highlights include Chettinad Kozhi Pepper Roast, Malabar Flaky Parotta, Kerala Vegetable Avial, Mysore Rasam, Stone-Ground Sambar, Curd Rice, and Coconut Elaneer Payasam.',
    itemsList: [
      'Chettinad Kozhi Pepper Roast',
      'Kerala Coconut Avial with Curry Leaves',
      'Flaky Layered Malabar Parotta (2 pcs)',
      'Steamed Kaima Red Matta Rice',
      'Tangy Tamarind Mysore Rasam',
      'Drumstick & Shallot Sambar',
      'Kozhikode Cabbage Thoran',
      'Crispy Appalam Papadum',
      'Ginger Inji Puli Pickle',
      'Curd Rice with Mustard Tadka',
      'Tender Coconut Elaneer Payasam'
    ],
    defaultBread: 'Layered Malabar Parotta',
    defaultDessert: 'Elaneer Tender Coconut Payasam',
    dietaryBadge: 'COASTAL SPECIALTY',
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=1000&q=85',
    serves: 'Single Feast'
  },
  {
    id: 'sattvik-temple-harvest-thali',
    name: 'Sattvik Temple Harvest Pure Veg Thali',
    tradition: 'Mindful Vedic Gastronomy (No Onion, No Garlic)',
    price: 720,
    katorisCount: 10,
    description: 'Harmoniously balanced according to ancient Ayurvedic principles of the Six Rasas. 100% vegetarian, free of allium roots, prepared with organic heirloom lentils, Gir-cow dairy, fresh amla chutney, and hand-rolled jowar bhakri.',
    itemsList: [
      'Moong Dal Panchmel Tadka with Hing',
      'Seasonal Pumpkin & Raw Banana Subzi',
      'Gir-cow Fresh Paneer Methi Malai',
      'Hand-Pounded Jowar Bhakri (2 pcs)',
      'Brown Rice with Ghee Tempering',
      'Wild Amla (Gooseberry) Mint Relish',
      'Cumin Spiced Fresh Buttermilk (Chaas)',
      'Crispy Moong Dal Papad',
      'Cucumber Pomegranate Kosambari',
      'Jaggery & Cardamom Puran Poli'
    ],
    defaultBread: 'Hand-Pounded Jowar Bhakri',
    defaultDessert: 'Jaggery Puran Poli with Desi Ghee',
    dietaryBadge: '100% VEGAN / SATTVIK OPTION',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=85',
    serves: 'Single Feast'
  },
  {
    id: 'bombay-chowk-chaat-platter',
    name: 'Bombay Chowk Street Chaat & Grill Platter',
    tradition: 'High-Energy Mumbai Bazaar & Chowpatty Spread',
    price: 640,
    katorisCount: 8,
    description: 'An explosion of sweet, tangy, spicy, and crunch. Freshly puffed puris, crisp sev, chilled sweetened yogurt, tangy imli dates water, alongside butter-toasted ladi pav and char-grilled corn tikkis.',
    itemsList: [
      'Pani Puri Flight (6 pcs with 3 Herbal Waters)',
      'Sev Batata Puri with Trio Chutneys',
      'Dahi Gujiya Bhalla with Roasted Cumin',
      'Mini Khasta Dal Kachori (2 pcs)',
      'Golden Melting Butter Ladi Pav (2 pcs)',
      'Tawa Paneer Bhurji Scoop',
      'Crispy Charred Corn Tikki',
      'Gulkand Kulfi Falooda with Rose Jelly'
    ],
    defaultBread: 'Toasted Amul Butter Ladi Pav',
    defaultDessert: 'Rabdi Kulfi Falooda with Tukmaria Seeds',
    dietaryBadge: 'STREET FOOD SENSATION',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1000&q=85',
    serves: '2-3 Guests Grazing'
  }
];

export const ROYAL_BEVERAGES: RoyalBeverage[] = [
  {
    id: 'kulhad-masala-chai',
    name: 'Clay Kulhad Ginger Masala Chai',
    type: 'chai',
    price: 140,
    vessel: 'Unglazed Earthen Kulhad Clay Cup',
    brewMethod: 'Slow-simmered Assam whole leaf tea with freshly grated ginger, green cardamom, and lemongrass',
    notes: 'Earth-clay aroma, spicy warm finish, sweetened with unrefined jaggery',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=85',
    badge: 'STREET FAVORITE'
  },
  {
    id: 'kesar-pista-royal-lassi',
    name: 'Kesar Pista Saffron Royal Lassi',
    type: 'lassi',
    price: 220,
    vessel: 'Heavy Copper Goblet with Clay Saucer',
    brewMethod: 'Traditional wooden mathani churned thick curd infused with Kashmiri saffron strands and crushed pistachios',
    notes: 'Velvety clotted malai layer on top, cooling sweetness, rose water fragrance',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=85',
    badge: 'ROYAL CHURNED'
  },
  {
    id: 'filter-degree-kaapi',
    name: 'Kumbakonam Filter Degree Kaapi',
    type: 'coffee',
    price: 150,
    vessel: 'Traditional Brass Dabarah & Davara Set',
    brewMethod: 'Chikmagalur dark roast beans blended with 15% roasted chicory, brewed in brass percolator and frothed high',
    notes: 'Intense thick golden decoction, frothy caramel head, rich earthy chocolate notes',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=85',
    badge: 'PENINSULAR BREW'
  },
  {
    id: 'kokum-jeera-cooler',
    name: 'Kokum Jeera Coastal Cooler',
    type: 'cooler',
    price: 180,
    vessel: 'Frosted Highball with Mint Sprig',
    brewMethod: 'Cold-steeped wild Konkan kokum fruit rinds, roasted ground cumin, Himalayan rock salt, and sparkling water',
    notes: 'Refreshing deep ruby tartness, cooling digestive tonic, mineral finish',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=85',
    badge: 'DIGESTIVE ELIXIR'
  },
  {
    id: 'paan-gulkand-rose-spritz',
    name: 'Calcutta Paan Gulkand Spritz',
    type: 'cooler',
    price: 240,
    vessel: 'Stemmed Crystal Coupe with Edible Gold Foil',
    brewMethod: 'Artisanal Calcutta Meetha betel leaf infusion with organic Damask rose petal preserve (gulkand) and soda',
    notes: 'Refreshing aromatic palate cleanser with sweet menthol and rose notes',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=85',
    badge: 'PALATE CLEANSER'
  }
];

// ─── 1. DUM BIRYANI ATELIER SECTION ──────────────────────────────────────────

export function DumBiryaniAtelierSection() {
  const { theme, addToCart } = useStorefront();
  const [selectedHandiId, setSelectedHandiId] = useState<string>(DUM_BIRYANI_ITEMS[0].id);
  const [isUnsealed, setIsUnsealed] = useState<boolean>(false);
  const [accompaniment, setAccompaniment] = useState<string>('Burani Garlic Raita');
  const [portionCount, setPortionCount] = useState<number>(1);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const activeHandi = DUM_BIRYANI_ITEMS.find(h => h.id === selectedHandiId) || DUM_BIRYANI_ITEMS[0];

  const handleUnsealPurdah = () => {
    setIsUnsealed(true);
  };

  const handleSelectHandi = (id: string) => {
    setSelectedHandiId(id);
    setIsUnsealed(false);
  };

  const handleAddHandiToOrder = () => {
    const handiProduct: StoreProduct = {
      id: `biryani-${activeHandi.id}-${Date.now()}`,
      name: `${activeHandi.name} (Sealed Earthen Handi)`,
      description: `${activeHandi.description} • Accompanied by: ${accompaniment} • Seal: ${activeHandi.sealType}`,
      price: activeHandi.price,
      category: 'dum-biryani',
      image: activeHandi.image,
      tags: ['dum-biryani', 'awadhi', 'signature'],
      spiceLevel: activeHandi.spiceRating,
      leadTime: 'Sealed to order · 25 mins'
    };

    addToCart(handiProduct, {}, portionCount);
    setAddedToast(`Added ${portionCount}x ${activeHandi.name} with ${accompaniment} to order!`);
    setTimeout(() => setAddedToast(null), 3500);
  };

  return (
    <section
      id="dum-biryani-atelier"
      style={{
        padding: '5.5rem 1.5rem',
        backgroundColor: theme.palette.background,
        color: theme.palette.text,
        borderBottom: `1px solid ${theme.palette.border}`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              backgroundColor: theme.palette.badgeBg,
              color: theme.palette.badgeText,
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '1rem',
              border: `1px solid ${theme.palette.border}`
            }}
          >
            <Flame size={14} color={theme.palette.primary} />
            <span>The Royal Dum Pukht Atelier</span>
          </div>

          <h2
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '1rem',
              color: theme.palette.text
            }}
          >
            Slow Charcoal Embers. Sealed Earthen Pots.
            <br />
            <span style={{ color: theme.palette.primary }}>Unseal the Saffron Purdah.</span>
          </h2>

          <p
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: theme.palette.textMuted
            }}
          >
            In the 18th-century royal kitchens of Lucknow, meat and rice were never cooked with water alone.
            They were sealed under fresh dough inside porous clay deghs, allowing aromatic steam to condense
            and cycle back through the aged basmati grains.
          </p>
        </div>

        {/* Handi Selector Pills */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            marginBottom: '2.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          {DUM_BIRYANI_ITEMS.map(handi => {
            const isSelected = handi.id === selectedHandiId;
            return (
              <button
                key={handi.id}
                onClick={() => handleSelectHandi(handi.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '999px',
                  backgroundColor: isSelected ? theme.palette.primary : theme.palette.surface,
                  color: isSelected ? '#ffffff' : theme.palette.text,
                  border: `1px solid ${isSelected ? theme.palette.primary : theme.palette.border}`,
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 14px rgba(0,0,0,0.2)' : 'none'
                }}
              >
                <span>{handi.name.split(' ')[0]}</span>
                <span style={{ opacity: 0.8, fontSize: '0.8rem' }}>({formatPrice(handi.price, theme.currencySymbol)})</span>
              </button>
            );
          })}
        </div>

        {/* Main Showcase Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
            backgroundColor: theme.palette.surface,
            borderRadius: '24px',
            border: `1px solid ${theme.palette.border}`,
            padding: '2rem',
            boxShadow: '0 20px 45px rgba(0,0,0,0.1)'
          }}
        >
          {/* Left Column: Visual Handi Vessel & Unseal Simulator */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '18px',
                overflow: 'hidden',
                aspectRatio: '4/3',
                border: `1px solid ${theme.palette.border}`
              }}
            >
              <img
                src={activeHandi.image}
                alt={activeHandi.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                  filter: isUnsealed ? 'brightness(1.03) contrast(1.05)' : 'brightness(0.92)'
                }}
              />

              {/* Purdah Seal Badge Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: isUnsealed ? 'rgba(22, 163, 74, 0.92)' : 'rgba(180, 83, 9, 0.92)',
                  color: '#ffffff',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                }}
              >
                {isUnsealed ? <Wind size={14} /> : <ShieldCheck size={14} />}
                <span>{isUnsealed ? 'PURDAH UNSEALED · AROMA RELEASED' : `HERMETICALLY SEALED: ${activeHandi.sealType}`}</span>
              </div>

              {/* Price Tag */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  backgroundColor: theme.palette.background,
                  color: theme.palette.primary,
                  padding: '0.5rem 1rem',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  border: `1px solid ${theme.palette.border}`,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.25)'
                }}
              >
                {formatPrice(activeHandi.price, theme.currencySymbol)}
              </div>
            </div>

            {/* Interactive Unseal Simulator Button */}
            <div style={{ marginTop: '1.25rem' }}>
              {!isUnsealed ? (
                <button
                  onClick={handleUnsealPurdah}
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 6px 18px rgba(0,0,0,0.18)'
                  }}
                >
                  <Sparkles size={18} />
                  <span>Break the Atta Seal (Unseal Purdah Simulator)</span>
                </button>
              ) : (
                <div
                  style={{
                    padding: '0.85rem 1rem',
                    backgroundColor: 'rgba(22, 163, 74, 0.1)',
                    border: '1px solid rgba(22, 163, 74, 0.3)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a', fontWeight: 600, fontSize: '0.88rem' }}>
                    <Check size={16} />
                    <span>Seal broken! Saffron & kewra attar aromas released.</span>
                  </div>
                  <button
                    onClick={() => setIsUnsealed(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: theme.palette.textMuted,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Reseal Handi
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Culinary Details & Specs */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: theme.palette.primary,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {activeHandi.origin}
              </span>
              <span style={{ color: theme.palette.textMuted }}>•</span>
              <span style={{ fontSize: '0.85rem', color: theme.palette.textMuted }}>{activeHandi.serves}</span>
            </div>

            <h3
              style={{
                fontFamily: theme.typography.headingFont,
                fontSize: '1.85rem',
                fontWeight: 700,
                marginBottom: '0.85rem',
                color: theme.palette.text
              }}
            >
              {activeHandi.name}
            </h3>

            <p style={{ color: theme.palette.textMuted, lineHeight: 1.65, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              {activeHandi.description}
            </p>

            {/* Telemetry Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                marginBottom: '1.5rem',
                padding: '1rem',
                backgroundColor: theme.palette.background,
                borderRadius: '14px',
                border: `1px solid ${theme.palette.border}`
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', color: theme.palette.textMuted, textTransform: 'uppercase', fontWeight: 600 }}>
                  Rice Terroir
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: theme.palette.text, marginTop: '2px' }}>
                  {activeHandi.riceType}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: theme.palette.textMuted, textTransform: 'uppercase', fontWeight: 600 }}>
                  Grain Dimension
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: theme.palette.text, marginTop: '2px' }}>
                  {activeHandi.grainLength}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: theme.palette.textMuted, textTransform: 'uppercase', fontWeight: 600 }}>
                  Dum Simmering
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: theme.palette.primary, marginTop: '2px' }}>
                  {activeHandi.dumSimmerHours}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: theme.palette.textMuted, textTransform: 'uppercase', fontWeight: 600 }}>
                  Spice Profile
                </div>
                <div style={{ display: 'flex', gap: '3px', marginTop: '4px' }}>
                  {[1, 2, 3, 4, 5].map(lvl => (
                    <Flame
                      key={lvl}
                      size={14}
                      color={lvl <= activeHandi.spiceRating ? '#dc2626' : 'rgba(150,150,150,0.3)'}
                      fill={lvl <= activeHandi.spiceRating ? '#dc2626' : 'transparent'}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Aroma Notes Tags */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: theme.palette.textMuted, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                Aroma & Essential Attar Veil
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {activeHandi.aromaNotes.map((note, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '999px',
                      backgroundColor: theme.palette.badgeBg,
                      color: theme.palette.badgeText,
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      border: `1px solid ${theme.palette.border}`
                    }}
                  >
                    ✨ {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Accompaniment Choice */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: theme.palette.textMuted, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                Pairing Accompaniment (Included in Earthen Handi)
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['Burani Garlic Raita', 'Hyderabadi Mirchi Ka Salan', 'Pomegranate Kachumber'].map(acc => (
                  <button
                    key={acc}
                    onClick={() => setAccompaniment(acc)}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      backgroundColor: accompaniment === acc ? theme.palette.primary : theme.palette.background,
                      color: accompaniment === acc ? '#ffffff' : theme.palette.text,
                      border: `1px solid ${accompaniment === acc ? theme.palette.primary : theme.palette.border}`,
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {accompaniment === acc && '✓ '}
                    {acc}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Action Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: `1px solid ${theme.palette.border}`,
                  borderRadius: '10px',
                  backgroundColor: theme.palette.background
                }}
              >
                <button
                  onClick={() => setPortionCount(Math.max(1, portionCount - 1))}
                  style={{
                    padding: '0.65rem 0.85rem',
                    background: 'none',
                    border: 'none',
                    color: theme.palette.text,
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  -
                </button>
                <span style={{ padding: '0 0.5rem', fontWeight: 700, fontSize: '0.95rem' }}>
                  {portionCount}
                </span>
                <button
                  onClick={() => setPortionCount(portionCount + 1)}
                  style={{
                    padding: '0.65rem 0.85rem',
                    background: 'none',
                    border: 'none',
                    color: theme.palette.text,
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddHandiToOrder}
                style={{
                  flex: 1,
                  padding: '0.85rem 1.5rem',
                  backgroundColor: theme.palette.primary,
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  transition: 'background-color 0.2s ease',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
                }}
              >
                <ShoppingBag size={18} />
                <span>
                  Order Handi Feast • {formatPrice(activeHandi.price * portionCount, theme.currencySymbol)}
                </span>
              </button>
            </div>

            {addedToast && (
              <div
                style={{
                  marginTop: '0.85rem',
                  padding: '0.6rem 1rem',
                  backgroundColor: 'rgba(22, 163, 74, 0.15)',
                  color: '#16a34a',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  border: '1px solid rgba(22, 163, 74, 0.3)'
                }}
              >
                {addedToast}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 2. TANDOOR LIVE GRILL SECTION ───────────────────────────────────────────

export function TandoorLiveGrillSection() {
  const { theme, addToCart } = useStorefront();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSkewer, setSelectedSkewer] = useState<TandoorSkewer>(TANDOOR_SKEWERS[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredSkewers = activeCategory === 'all'
    ? TANDOOR_SKEWERS
    : TANDOOR_SKEWERS.filter(s => s.category === activeCategory);

  const handleOrderSkewer = (skewer: TandoorSkewer) => {
    const item: StoreProduct = {
      id: `tandoor-${skewer.id}-${Date.now()}`,
      name: `${skewer.name} (Clay Tandoor Charred)`,
      description: `${skewer.description} • Chutney: ${skewer.chutneyPairing}`,
      price: skewer.price,
      category: 'tandoor',
      image: skewer.image,
      tags: ['tandoor', 'clay-oven', 'charcoal'],
      spiceLevel: skewer.spiceLevel
    };
    addToCart(item, {}, 1);
    setToastMessage(`Added ${skewer.name} to order!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <section
      id="tandoor-live-grill"
      style={{
        padding: '5.5rem 1.5rem',
        backgroundColor: theme.palette.surface,
        color: theme.palette.text,
        borderBottom: `1px solid ${theme.palette.border}`
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              backgroundColor: theme.palette.badgeBg,
              color: theme.palette.badgeText,
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '1rem',
              border: `1px solid ${theme.palette.border}`
            }}
          >
            <Flame size={14} color="#dc2626" />
            <span>800°F Clay Tandoor Hearth</span>
          </div>

          <h2
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '1rem',
              color: theme.palette.text
            }}
          >
            Glowing Charcoal. Riverbed Clay.
            <br />
            <span style={{ color: theme.palette.primary }}>Direct Fire Skewer Matrix.</span>
          </h2>

          <p
            style={{
              maxWidth: '700px',
              margin: '0 auto',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: theme.palette.textMuted
            }}
          >
            Our heavy clay tandoors are hand-crafted from Yamuna riverbed silt, cured with mustard oil,
            and stoked with natural babool charcoal embers reaching blistering 840°F temperatures to lock in
            unrivaled smoke and succulent juices.
          </p>
        </div>

        {/* Live Hearth Telemetry Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            padding: '1.25rem 1.75rem',
            backgroundColor: theme.palette.background,
            borderRadius: '16px',
            border: `1px solid ${theme.palette.border}`,
            marginBottom: '3rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <Thermometer size={24} color="#dc2626" />
            <div>
              <div style={{ fontSize: '0.75rem', color: theme.palette.textMuted, textTransform: 'uppercase', fontWeight: 600 }}>
                Hearth Core Temp
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: theme.palette.text }}>
                840°F · Continuous Heat
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <Flame size={24} color={theme.palette.primary} />
            <div>
              <div style={{ fontSize: '0.75rem', color: theme.palette.textMuted, textTransform: 'uppercase', fontWeight: 600 }}>
                Charcoal Fuel
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: theme.palette.text }}>
                Organic Babool & Tamarind
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <ShieldCheck size={24} color="#16a34a" />
            <div>
              <div style={{ fontSize: '0.75rem', color: theme.palette.textMuted, textTransform: 'uppercase', fontWeight: 600 }}>
                Clay Pot Seasoning
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: theme.palette.text }}>
                Raw Mustard Oil & Jaggery
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <Clock size={24} color={theme.palette.textMuted} />
            <div>
              <div style={{ fontSize: '0.75rem', color: theme.palette.textMuted, textTransform: 'uppercase', fontWeight: 600 }}>
                Average Skewer Roast
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: theme.palette.primary }}>
                4 to 6 Mins Flash Char
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { id: 'all', label: 'All Tandoori Specialties' },
            { id: 'poultry', label: 'Tandoori Poultry' },
            { id: 'mutton', label: 'Royal Lamb & Mutton' },
            { id: 'vegetarian', label: 'Clay Oven Paneer & Greens' },
            { id: 'seafood', label: 'Coastal Seafood' },
          ].map(tab => {
            const isTabActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                style={{
                  padding: '0.55rem 1.15rem',
                  borderRadius: '999px',
                  backgroundColor: isTabActive ? theme.palette.primary : theme.palette.background,
                  color: isTabActive ? '#ffffff' : theme.palette.text,
                  border: `1px solid ${isTabActive ? theme.palette.primary : theme.palette.border}`,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Skewers Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.75rem',
            marginBottom: '2.5rem'
          }}
        >
          {filteredSkewers.map(skewer => (
            <div
              key={skewer.id}
              style={{
                backgroundColor: theme.palette.background,
                borderRadius: '18px',
                overflow: 'hidden',
                border: `1px solid ${theme.palette.border}`,
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 6px 20px rgba(0,0,0,0.06)'
              }}
            >
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img
                  src={skewer.image}
                  alt={skewer.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {skewer.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: theme.palette.primary,
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.3rem 0.75rem',
                      borderRadius: '999px',
                      letterSpacing: '0.04em'
                    }}
                  >
                    {skewer.badge}
                  </span>
                )}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    backdropFilter: 'blur(6px)',
                    color: '#ffffff',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 800
                  }}
                >
                  {formatPrice(skewer.price, theme.currencySymbol)}
                </div>
              </div>

              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.78rem', color: theme.palette.primary, fontWeight: 700, textTransform: 'uppercase' }}>
                    {skewer.categoryLabel}
                  </span>
                  <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                    {[1, 2, 3, 4, 5].map(lvl => (
                      <Flame
                        key={lvl}
                        size={12}
                        color={lvl <= skewer.spiceLevel ? '#dc2626' : 'rgba(150,150,150,0.3)'}
                        fill={lvl <= skewer.spiceLevel ? '#dc2626' : 'transparent'}
                      />
                    ))}
                  </div>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: theme.palette.text, marginBottom: '0.5rem' }}>
                  {skewer.name}
                </h3>

                <p style={{ fontSize: '0.88rem', color: theme.palette.textMuted, lineHeight: 1.6, marginBottom: '1rem', flex: 1 }}>
                  {skewer.description}
                </p>

                {/* Specs List */}
                <div
                  style={{
                    backgroundColor: theme.palette.surface,
                    borderRadius: '10px',
                    padding: '0.75rem',
                    fontSize: '0.8rem',
                    marginBottom: '1.25rem',
                    border: `1px solid ${theme.palette.border}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <span style={{ color: theme.palette.textMuted }}>Marinade Duration:</span>
                    <span style={{ fontWeight: 600, color: theme.palette.text }}>{skewer.marinadeHours}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <span style={{ color: theme.palette.textMuted }}>Hearth Setting:</span>
                    <span style={{ fontWeight: 600, color: theme.palette.primary }}>{skewer.clayOvenTemp}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: theme.palette.textMuted }}>Pairing Chutney:</span>
                    <span style={{ fontWeight: 600, color: theme.palette.text }}>{skewer.chutneyPairing}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleOrderSkewer(skewer)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <ShoppingBag size={16} />
                  <span>Order Sizzling Skewer</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '24px',
              backgroundColor: '#16a34a',
              color: '#ffffff',
              padding: '0.85rem 1.5rem',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '0.9rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
              zIndex: 9999
            }}
          >
            {toastMessage}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── 3. SPICE TERROIR SECTION ────────────────────────────────────────────────

export function SpiceTerroirSection() {
  const { theme } = useStorefront();
  const [selectedSpice, setSelectedSpice] = useState<SingleOriginSpice>(SPICE_TERROIR_LIST[0]);

  return (
    <section
      id="spice-terroir"
      style={{
        padding: '5.5rem 1.5rem',
        backgroundColor: theme.palette.background,
        color: theme.palette.text,
        borderBottom: `1px solid ${theme.palette.border}`
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              backgroundColor: theme.palette.badgeBg,
              color: theme.palette.badgeText,
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '1rem',
              border: `1px solid ${theme.palette.border}`
            }}
          >
            <Compass size={14} color={theme.palette.primary} />
            <span>Single-Origin Botanical Sourcing</span>
          </div>

          <h2
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '1rem',
              color: theme.palette.text
            }}
          >
            Subcontinental Spice Terroir.
            <br />
            <span style={{ color: theme.palette.primary }}>The Sacred Six Rasas (Tastes).</span>
          </h2>

          <p
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: theme.palette.textMuted
            }}
          >
            True Indian gastronomy is neither indiscriminately fiery nor haphazard. It is an ancient
            science of Ayurvedic spice harmonization, stone-pounding whole seeds at room temperature so delicate
            essential oils never evaporate.
          </p>
        </div>

        {/* 6 Rasas Wheel Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '1rem',
            marginBottom: '3.5rem'
          }}
        >
          {[
            { sanskrit: 'Madhura', english: 'Sweet', icon: '🍯', note: 'Calms Vata & Pitta, grounds and nourishes' },
            { sanskrit: 'Amla', english: 'Sour', icon: '🍋', note: 'Awakens digestive secretions and liver agility' },
            { sanskrit: 'Lavana', english: 'Salty', icon: '🧂', note: 'Maintains electrolyte osmolarity and savor' },
            { sanskrit: 'Katu', english: 'Pungent', icon: '🌶️', note: 'Kindles enzymatic metabolism and clears kapha' },
            { sanskrit: 'Tikta', english: 'Bitter', icon: '🌿', note: 'Detoxifies bloodstream and sharpens palate' },
            { sanskrit: 'Kashaya', english: 'Astringent', icon: '🍃', note: 'Tones mucous membranes and promotes satiety' }
          ].map(rasa => (
            <div
              key={rasa.sanskrit}
              style={{
                backgroundColor: theme.palette.surface,
                padding: '1.25rem',
                borderRadius: '16px',
                border: `1px solid ${theme.palette.border}`,
                textAlign: 'center',
                boxShadow: '0 4px 14px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>{rasa.icon}</div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: theme.palette.text }}>
                {rasa.sanskrit}
              </div>
              <div style={{ fontSize: '0.78rem', color: theme.palette.primary, fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                {rasa.english}
              </div>
              <p style={{ fontSize: '0.75rem', color: theme.palette.textMuted, lineHeight: 1.45, margin: 0 }}>
                {rasa.note}
              </p>
            </div>
          ))}
        </div>

        {/* Single-Origin Spices Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {SPICE_TERROIR_LIST.map(spice => {
            const isSelected = selectedSpice.id === spice.id;
            return (
              <div
                key={spice.id}
                onClick={() => setSelectedSpice(spice)}
                style={{
                  backgroundColor: theme.palette.surface,
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: `2px solid ${isSelected ? theme.palette.primary : theme.palette.border}`,
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 8px 24px rgba(0,0,0,0.12)' : 'none'
                }}
              >
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginBottom: '1rem' }}>
                  <img
                    src={spice.image}
                    alt={spice.name}
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: '14px',
                      objectFit: 'cover',
                      border: `1px solid ${theme.palette.border}`
                    }}
                  />
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: theme.palette.primary, textTransform: 'uppercase' }}>
                      {spice.hindiName}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: theme.palette.text, margin: '2px 0 4px 0' }}>
                      {spice.name}
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: theme.palette.textMuted }}>
                      📍 {spice.region}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: theme.palette.background,
                    borderRadius: '10px',
                    padding: '0.75rem',
                    fontSize: '0.8rem',
                    marginBottom: '0.85rem',
                    border: `1px solid ${theme.palette.border}`
                  }}
                >
                  <div style={{ color: theme.palette.textMuted, fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700 }}>
                    Harvest Standard
                  </div>
                  <div style={{ fontWeight: 700, color: theme.palette.text, marginTop: '2px' }}>
                    {spice.harvestGrade}
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', color: theme.palette.textMuted, lineHeight: 1.55, marginBottom: '0.75rem' }}>
                  <strong style={{ color: theme.palette.text }}>Flavor: </strong>
                  {spice.flavorProfile}
                </div>

                <div style={{ fontSize: '0.82rem', color: theme.palette.primary, lineHeight: 1.5, fontWeight: 500 }}>
                  <strong style={{ color: theme.palette.primary }}>Ayurvedic Benefit: </strong>
                  {spice.ayurvedaBenefit}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── 4. ROYAL THALI CURATOR SECTION ──────────────────────────────────────────

export function RoyalThaliCuratorSection() {
  const { theme, addToCart } = useStorefront();
  const [selectedThaliId, setSelectedThaliId] = useState<string>(GRAND_THALIS[0].id);
  const [breadChoice, setBreadChoice] = useState<string>('Butter Naan');
  const [dessertChoice, setDessertChoice] = useState<string>('Gulab Jamun with Saffron');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeThali = GRAND_THALIS.find(t => t.id === selectedThaliId) || GRAND_THALIS[0];

  const handleOrderThali = () => {
    const item: StoreProduct = {
      id: `thali-${activeThali.id}-${Date.now()}`,
      name: `${activeThali.name} (Multi-Katori Grand Banquet)`,
      description: `${activeThali.description} • Chosen Bread: ${breadChoice} • Chosen Dessert: ${dessertChoice}`,
      price: activeThali.price,
      category: 'thali',
      image: activeThali.image,
      tags: ['thali', 'banquet', 'royal-feast'],
      portion: activeThali.serves
    };

    addToCart(item, {}, 1);
    setToastMessage(`Added ${activeThali.name} with ${breadChoice} & ${dessertChoice} to order!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <section
      id="royal-thali-curator"
      style={{
        padding: '5.5rem 1.5rem',
        backgroundColor: theme.palette.surface,
        color: theme.palette.text,
        borderBottom: `1px solid ${theme.palette.border}`
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              backgroundColor: theme.palette.badgeBg,
              color: theme.palette.badgeText,
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '1rem',
              border: `1px solid ${theme.palette.border}`
            }}
          >
            <Award size={14} color={theme.palette.primary} />
            <span>Grand Indian Thali Banquets</span>
          </div>

          <h2
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '1rem',
              color: theme.palette.text
            }}
          >
            Hand-Beaten Bronze & Banana Leaves.
            <br />
            <span style={{ color: theme.palette.primary }}>The Complete Subcontinental Thali.</span>
          </h2>

          <p
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: theme.palette.textMuted
            }}
          >
            An Indian banquet is celebrated not as sequential courses, but as an orchestral array of
            complementary flavors enjoyed simultaneously. From slow-churned dals to hot clay oven naans and
            cooling raitas.
          </p>
        </div>

        {/* Thali Selector Pills */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {GRAND_THALIS.map(thali => {
            const isSelected = thali.id === selectedThaliId;
            return (
              <button
                key={thali.id}
                onClick={() => setSelectedThaliId(thali.id)}
                style={{
                  padding: '0.75rem 1.35rem',
                  borderRadius: '999px',
                  backgroundColor: isSelected ? theme.palette.primary : theme.palette.background,
                  color: isSelected ? '#ffffff' : theme.palette.text,
                  border: `1px solid ${isSelected ? theme.palette.primary : theme.palette.border}`,
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 14px rgba(0,0,0,0.15)' : 'none'
                }}
              >
                {thali.name.split(' ')[0]} {thali.name.split(' ')[1]} • {formatPrice(thali.price, theme.currencySymbol)}
              </button>
            );
          })}
        </div>

        {/* Thali Display Box */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
            backgroundColor: theme.palette.background,
            borderRadius: '24px',
            border: `1px solid ${theme.palette.border}`,
            padding: '2.5rem',
            boxShadow: '0 15px 40px rgba(0,0,0,0.08)'
          }}
        >
          {/* Visual Plate */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                aspectRatio: '4/3',
                border: `1px solid ${theme.palette.border}`,
                boxShadow: '0 10px 30px rgba(0,0,0,0.12)'
              }}
            >
              <img
                src={activeThali.image}
                alt={activeThali.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: theme.palette.primary,
                  color: '#ffffff',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '0.4rem 0.9rem',
                  borderRadius: '999px'
                }}
              >
                {activeThali.dietaryBadge}
              </span>
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  backdropFilter: 'blur(8px)',
                  color: '#ffffff',
                  padding: '0.5rem 1.1rem',
                  borderRadius: '12px',
                  fontSize: '1.25rem',
                  fontWeight: 800
                }}
              >
                {formatPrice(activeThali.price, theme.currencySymbol)}
              </div>
            </div>

            <div
              style={{
                marginTop: '1.25rem',
                padding: '0.9rem 1.25rem',
                backgroundColor: theme.palette.surface,
                borderRadius: '14px',
                border: `1px solid ${theme.palette.border}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: theme.palette.textMuted, textTransform: 'uppercase', fontWeight: 600 }}>
                  Katoris & Preparations
                </span>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: theme.palette.text }}>
                  {activeThali.katorisCount} Distinct Bowls & Accompaniments
                </div>
              </div>
              <span style={{ fontSize: '0.85rem', color: theme.palette.primary, fontWeight: 700 }}>
                {activeThali.serves}
              </span>
            </div>
          </div>

          {/* Details & Customizer */}
          <div>
            <div style={{ fontSize: '0.8rem', color: theme.palette.primary, fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              {activeThali.tradition}
            </div>

            <h3
              style={{
                fontFamily: theme.typography.headingFont,
                fontSize: '2rem',
                fontWeight: 700,
                color: theme.palette.text,
                marginBottom: '1rem'
              }}
            >
              {activeThali.name}
            </h3>

            <p style={{ color: theme.palette.textMuted, lineHeight: 1.65, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              {activeThali.description}
            </p>

            {/* Included Katoris List */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: theme.palette.textMuted, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Complete Katori Array Included:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.45rem' }}>
                {activeThali.itemsList.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', color: theme.palette.text }}>
                    <Check size={14} color={theme.palette.primary} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Bread Selector */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: theme.palette.textMuted, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Select Your Handcrafted Tandoori Bread:
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['Butter Naan', 'Garlic Coriander Naan', 'Tandoori Laccha Paratha', 'Roomali Roti', 'Malabar Parotta'].map(bread => (
                  <button
                    key={bread}
                    onClick={() => setBreadChoice(bread)}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      backgroundColor: breadChoice === bread ? theme.palette.primary : theme.palette.surface,
                      color: breadChoice === bread ? '#ffffff' : theme.palette.text,
                      border: `1px solid ${breadChoice === bread ? theme.palette.primary : theme.palette.border}`,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {breadChoice === bread && '✓ '}
                    {bread}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Dessert Selector */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: theme.palette.textMuted, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Select Sweet Finish (Mithai / Dessert):
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['Gulab Jamun with Saffron', 'Chilled Kesari Phirni', 'Elaneer Payasam', 'Royal Gulkand Kulfi'].map(dessert => (
                  <button
                    key={dessert}
                    onClick={() => setDessertChoice(dessert)}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      backgroundColor: dessertChoice === dessert ? theme.palette.primary : theme.palette.surface,
                      color: dessertChoice === dessert ? '#ffffff' : theme.palette.text,
                      border: `1px solid ${dessertChoice === dessert ? theme.palette.primary : theme.palette.border}`,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {dessertChoice === dessert && '✓ '}
                    {dessert}
                  </button>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleOrderThali}
              style={{
                width: '100%',
                padding: '0.95rem',
                backgroundColor: theme.palette.primary,
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                boxShadow: '0 6px 18px rgba(0,0,0,0.15)'
              }}
            >
              <ShoppingBag size={18} />
              <span>Order Grand Thali Feast • {formatPrice(activeThali.price, theme.currencySymbol)}</span>
            </button>
          </div>
        </div>

        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '24px',
              backgroundColor: '#16a34a',
              color: '#ffffff',
              padding: '0.85rem 1.5rem',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '0.9rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
              zIndex: 9999
            }}
          >
            {toastMessage}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── 5. CHAI & LASSI BAR SECTION ─────────────────────────────────────────────

export function ChaiLassiBarSection() {
  const { theme, addToCart } = useStorefront();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOrderBeverage = (bev: RoyalBeverage) => {
    const item: StoreProduct = {
      id: `bev-${bev.id}-${Date.now()}`,
      name: `${bev.name} (${bev.vessel})`,
      description: `${bev.brewMethod} • Tasting: ${bev.notes}`,
      price: bev.price,
      category: 'beverages',
      image: bev.image,
      tags: ['chai', 'lassi', 'elixirs']
    };
    addToCart(item, {}, 1);
    setToastMessage(`Added ${bev.name} to order!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <section
      id="chai-lassi-bar"
      style={{
        padding: '5.5rem 1.5rem',
        backgroundColor: theme.palette.background,
        color: theme.palette.text,
        borderBottom: `1px solid ${theme.palette.border}`
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              backgroundColor: theme.palette.badgeBg,
              color: theme.palette.badgeText,
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '1rem',
              border: `1px solid ${theme.palette.border}`
            }}
          >
            <Coffee size={14} color={theme.palette.primary} />
            <span>Royal Chai Khana & Artisanal Lassis</span>
          </div>

          <h2
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '1rem',
              color: theme.palette.text
            }}
          >
            Clay Kulhads. Churned Malai.
            <br />
            <span style={{ color: theme.palette.primary }}>Subcontinental Refreshment Elixirs.</span>
          </h2>

          <p
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: theme.palette.textMuted
            }}
          >
            From freshly smashed ginger chai served in single-fire unglazed clay kulhads to thick saffron lassis
            churned with wooden mathanis and high-pour Kumbakonam brass degree coffee.
          </p>
        </div>

        {/* Beverages Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {ROYAL_BEVERAGES.map(bev => (
            <div
              key={bev.id}
              style={{
                backgroundColor: theme.palette.surface,
                borderRadius: '18px',
                overflow: 'hidden',
                border: `1px solid ${theme.palette.border}`,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 6px 18px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                  src={bev.image}
                  alt={bev.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.3rem 0.75rem',
                    borderRadius: '999px'
                  }}
                >
                  {bev.badge}
                </span>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(6px)',
                    color: '#ffffff',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    fontWeight: 800
                  }}
                >
                  {formatPrice(bev.price, theme.currencySymbol)}
                </div>
              </div>

              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span style={{ fontSize: '0.78rem', color: theme.palette.primary, fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Served in: {bev.vessel}
                </span>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: theme.palette.text, marginBottom: '0.5rem' }}>
                  {bev.name}
                </h3>

                <p style={{ fontSize: '0.85rem', color: theme.palette.textMuted, lineHeight: 1.55, marginBottom: '0.85rem', flex: 1 }}>
                  {bev.brewMethod}
                </p>

                <div
                  style={{
                    padding: '0.6rem 0.85rem',
                    backgroundColor: theme.palette.background,
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    color: theme.palette.text,
                    marginBottom: '1.25rem',
                    border: `1px solid ${theme.palette.border}`
                  }}
                >
                  <strong>Aroma: </strong>{bev.notes}
                </div>

                <button
                  onClick={() => handleOrderBeverage(bev)}
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Plus size={16} />
                  <span>Add Beverage</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '24px',
              backgroundColor: '#16a34a',
              color: '#ffffff',
              padding: '0.85rem 1.5rem',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '0.9rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
              zIndex: 9999
            }}
          >
            {toastMessage}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── 6. LIVE INDIAN STATUS BAR ───────────────────────────────────────────────

export function LiveIndianStatusBar() {
  const { theme, openReservation, setActivePage } = useStorefront();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.palette.surface,
        borderTop: `1px solid ${theme.palette.border}`,
        padding: '0.65rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 900,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
        backdropFilter: 'blur(10px)',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
        {/* Tandoor Live indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#dc2626',
              boxShadow: '0 0 8px #dc2626',
              display: 'inline-block'
            }}
          />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: theme.palette.text }}>
            Clay Tandoor: 840°F Charcoal Hearth Active
          </span>
        </div>

        {/* Naan Fresh status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: theme.palette.textMuted, fontSize: '0.82rem' }}>
          <Clock size={14} color={theme.palette.primary} />
          <span>Tandoori Breads: Baked Fresh to Order</span>
        </div>

        {/* Handi Dum timer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: theme.palette.textMuted, fontSize: '0.82rem' }}>
          <Flame size={14} color="#ea580c" />
          <span>Awadhi Dum Handi: Batch #4 Ready to Unseal</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={() => setActivePage('menu')}
          style={{
            padding: '0.45rem 0.95rem',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            color: theme.palette.text,
            border: `1px solid ${theme.palette.border}`,
            fontSize: '0.82rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          View Shahi Menu
        </button>

        <button
          onClick={() => openReservation()}
          style={{
            padding: '0.45rem 1.1rem',
            borderRadius: '8px',
            backgroundColor: theme.palette.primary,
            color: '#ffffff',
            border: 'none',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.18)'
          }}
        >
          <Utensils size={14} />
          <span>Reserve Royal Table</span>
        </button>
      </div>
    </div>
  );
}

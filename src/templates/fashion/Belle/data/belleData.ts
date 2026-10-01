import type {
  BelleProduct,
  BelleCategoryCard,
  BelleShopTheLookHotspot,
  BelleTestimonial,
  BelleEditorialBlock,
  BelleTrustItem,
} from '../types'

// High-resolution curated editorial fashion photography
const img = (id: string, width = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

const standardSizes = ['XS', 'S', 'M', 'L', 'XL']
const shoeSizes = ['UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8']
const oneSize = ['One Size']

export const BELLE_PRODUCTS: BelleProduct[] = [
  {
    id: 'belle-dr-01',
    name: 'Aurelia Silk Slip Dress',
    category: 'Dresses',
    gender: 'Women',
    price: 8499,
    salePrice: 6999,
    isSale: true,
    isNew: true,
    isFeatured: true,
    image: img('photo-1595777457583-95e059d581b8'),
    alternateImage: img('photo-1515372039744-b8f02a3ae446'),
    gallery: [
      img('photo-1595777457583-95e059d581b8', 1200),
      img('photo-1515372039744-b8f02a3ae446', 1200),
      img('photo-1572804013309-59a88b7e92f1', 1200),
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#d4af37' },
      { name: 'Midnight Noir', hex: '#111827' },
      { name: 'Dusty Rose', hex: '#bc8f8f' },
    ],
    sizes: standardSizes,
    rating: 4.9,
    reviewCount: 48,
    description:
      'Cut on the bias from 100% heavyweight mulberry silk. The Aurelia Slip features delicate adjustable spaghetti straps, a gentle cowl neckline, and a fluid silhouette that skims the body effortlessly from day to evening.',
    details: [
      '100% 22-momme Mulberry Silk',
      'Cut on the bias for natural contouring',
      'French seams throughout',
      'Adjustable silk strap sliders',
      'Dry clean or gentle hand wash cold',
    ],
    materialsAndCare: '100% Mulberry Silk. Specialist dry clean recommended or cold hand wash with silk detergent. Iron inside-out on low heat.',
    shippingAndReturns: 'Complimentary express delivery on orders over ₹2,999. Enjoy 14-day hassle-free doorstep returns & exchanges.',
    sku: 'BEL-DR-01-GLD',
  },
  {
    id: 'belle-bz-02',
    name: 'Sloane Oversized Wool Blazer',
    category: 'Women',
    gender: 'Women',
    price: 12999,
    isNew: true,
    isFeatured: true,
    image: img('photo-1539109136881-3be0616acf4b'),
    alternateImage: img('photo-1548142813-c348350df52b'),
    gallery: [
      img('photo-1539109136881-3be0616acf4b', 1200),
      img('photo-1548142813-c348350df52b', 1200),
      img('photo-1550614000-4895a10e1bfd', 1200),
    ],
    colors: [
      { name: 'Oatmeal Melange', hex: '#d6cbb9' },
      { name: 'Charcoal Houndstooth', hex: '#374151' },
      { name: 'Classic Black', hex: '#1f2937' },
    ],
    sizes: standardSizes,
    rating: 5.0,
    reviewCount: 36,
    description:
      'Tailored with structured menswear-inspired shoulders and a relaxed, straight cut. Woven in fine Italian wool blend with tortoiseshell buttons and deep flap pockets.',
    details: [
      '70% Wool, 25% Polyamide, 5% Cashmere',
      'Structured shoulder padding with horn buttons',
      'Double back vent for effortless movement',
      'Full cupro lining for smooth layering',
    ],
    materialsAndCare: 'Wool & Cashmere blend. Dry clean only. Do not tumble dry.',
    shippingAndReturns: 'Complimentary express delivery and garment cover included. 14-day exchange policy.',
    sku: 'BEL-BZ-02-OAT',
  },
  {
    id: 'belle-tp-03',
    name: 'Clara Relaxed Poplin Shirt',
    category: 'Tops',
    gender: 'Women',
    price: 4999,
    isNew: false,
    isFeatured: true,
    image: img('photo-1598554747436-c9293d6a588f'),
    alternateImage: img('photo-1602810318383-e386cc2a3ccf'),
    gallery: [
      img('photo-1598554747436-c9293d6a588f', 1200),
      img('photo-1602810318383-e386cc2a3ccf', 1200),
    ],
    colors: [
      { name: 'Crisp White', hex: '#ffffff' },
      { name: 'Sky Stripe', hex: '#93c5fd' },
      { name: 'Soft Sage', hex: '#a3b18a' },
    ],
    sizes: standardSizes,
    rating: 4.8,
    reviewCount: 52,
    description:
      'The quintessential oversized button-down shirt. Woven from crisp 100% organic cotton poplin with a modern dropped shoulder and mother-of-pearl buttons.',
    details: [
      '100% GOTS Certified Organic Cotton',
      'Extended cuffs with button detailing',
      'High-low curved hemline',
      'Pre-washed for an effortless soft hand-feel',
    ],
    materialsAndCare: 'Machine wash warm at 30°C. Hang dry or tumble dry low. Warm iron.',
    shippingAndReturns: 'Standard 2-4 business day delivery. Easy 14-day returns.',
    sku: 'BEL-TP-03-WHT',
  },
  {
    id: 'belle-tr-04',
    name: 'Palazzo High-Waist Wide Trousers',
    category: 'Women',
    gender: 'Women',
    price: 6499,
    salePrice: 5199,
    isSale: true,
    isFeatured: true,
    image: img('photo-1509631179647-0177331693ae'),
    alternateImage: img('photo-1551803091-e20673f15770'),
    gallery: [
      img('photo-1509631179647-0177331693ae', 1200),
      img('photo-1551803091-e20673f15770', 1200),
    ],
    colors: [
      { name: 'Camel', hex: '#c19a6b' },
      { name: 'Cream', hex: '#fdfbf7' },
      { name: 'Slate Black', hex: '#1e293b' },
    ],
    sizes: standardSizes,
    rating: 4.7,
    reviewCount: 29,
    description:
      'Impeccably draped wide-leg trousers designed with front pleats, slant pockets, and a flattering high-rise waistband that pairs seamlessly with knitwear or tailored blazers.',
    details: [
      'Crease-resistant fluid crepe blend',
      'Front double pleats and back welt pockets',
      'Concealed zip and hook-and-bar closure',
      'Extended inseam for tailored styling with heels',
    ],
    materialsAndCare: 'Poly-viscose blend. Machine wash cold delicate cycle or dry clean.',
    shippingAndReturns: 'Complimentary shipping above ₹2,999. 14 days returns.',
    sku: 'BEL-TR-04-CML',
  },
  {
    id: 'belle-bg-05',
    name: 'Montmartre Structured Leather Tote',
    category: 'Bags',
    gender: 'Women',
    price: 14999,
    salePrice: 12499,
    isSale: true,
    isNew: true,
    isFeatured: true,
    image: img('photo-1584917865442-de89df76afd3'),
    alternateImage: img('photo-1548036328-c9fa89d128fa'),
    gallery: [
      img('photo-1584917865442-de89df76afd3', 1200),
      img('photo-1548036328-c9fa89d128fa', 1200),
    ],
    colors: [
      { name: 'Saddle Tan', hex: '#8b4513' },
      { name: 'Ebony Black', hex: '#1c1917' },
      { name: 'Olive Green', hex: '#556b2f' },
    ],
    sizes: oneSize,
    rating: 4.9,
    reviewCount: 64,
    description:
      'Artisanal Italian vegetable-tanned leather handcrafted into a clean architectural silhouette. Accommodates up to a 15-inch laptop with a dedicated zipped interior sleeve.',
    details: [
      '100% Full-grain Italian calf leather',
      'Solid brushed brass hardware and protective metal feet',
      'Includes removable leather shoulder strap',
      'Suede-lined interior with zip organizer',
    ],
    materialsAndCare: 'Wipe with soft damp cloth. Condition with natural leather balm twice yearly.',
    shippingAndReturns: 'Comes in branded cotton dustbag. Signature required on delivery. Free returns.',
    sku: 'BEL-BG-05-TAN',
  },
  {
    id: 'belle-sh-06',
    name: 'Capri Pointed Toe Leather Mules',
    category: 'Shoes',
    gender: 'Women',
    price: 7999,
    isNew: true,
    isFeatured: true,
    image: img('photo-1543163521-1bf539c55dd2'),
    alternateImage: img('photo-1535043934128-cf0b28d52f95'),
    gallery: [
      img('photo-1543163521-1bf539c55dd2', 1200),
      img('photo-1535043934128-cf0b28d52f95', 1200),
    ],
    colors: [
      { name: 'Caramel Nappa', hex: '#b87333' },
      { name: 'Ivory Cream', hex: '#fdfbf7' },
      { name: 'Noir Gloss', hex: '#0f172a' },
    ],
    sizes: shoeSizes,
    rating: 4.8,
    reviewCount: 41,
    description:
      'Minimalist pointed kitten heels designed for day-long ease. Hand-crafted in Portugal with supple lambskin nappa and cushioned memory foam insoles.',
    details: [
      '45mm sculptural architectural heel',
      'Buttery lambskin leather upper and lining',
      'Non-slip injected leather sole',
      'Fits true to European size',
    ],
    materialsAndCare: 'Protect with waterproof leather spray before first wear. Store in dustbag.',
    shippingAndReturns: 'Free exchanges on size mismatch. 14 days returns.',
    sku: 'BEL-SH-06-CAR',
  },
  {
    id: 'belle-ac-07',
    name: 'Lumière Handcrafted Pearl Necklace',
    category: 'Accessories',
    gender: 'Women',
    price: 3499,
    isNew: false,
    isFeatured: false,
    image: img('photo-1599643478518-a784e5dc4c8f'),
    alternateImage: img('photo-1535632066927-ab7c9ab60908'),
    gallery: [
      img('photo-1599643478518-a784e5dc4c8f', 1200),
      img('photo-1535632066927-ab7c9ab60908', 1200),
    ],
    colors: [
      { name: '18k Gold Vermeil', hex: '#d4af37' },
      { name: 'Sterling Silver', hex: '#c0c0c0' },
    ],
    sizes: oneSize,
    rating: 4.9,
    reviewCount: 38,
    description:
      'Freshwater baroque pearls hand-strung on durable silk thread with an 18k gold vermeil toggle clasp. Each irregular organic pearl reflects soft, natural luminosity.',
    details: [
      'Genuine natural freshwater baroque pearls (8-9mm)',
      '18k Gold over 925 Sterling Silver clasp',
      'Total length 45cm (princess length)',
      'Hypoallergenic, nickel-free and lead-free',
    ],
    materialsAndCare: 'Keep away from perfumes, hairspray and water. Store in velvet jewelry pouch.',
    shippingAndReturns: 'Ships in luxury gift box with ribbon. 14-day returns.',
    sku: 'BEL-AC-07-GLD',
  },
  {
    id: 'belle-dr-08',
    name: 'Serena Linen Wrap Maxi Dress',
    category: 'Dresses',
    gender: 'Women',
    price: 6999,
    salePrice: 5499,
    isSale: true,
    isNew: true,
    isFeatured: true,
    image: img('photo-1515372039744-b8f02a3ae446'),
    alternateImage: img('photo-1572804013309-59a88b7e92f1'),
    gallery: [
      img('photo-1515372039744-b8f02a3ae446', 1200),
      img('photo-1572804013309-59a88b7e92f1', 1200),
    ],
    colors: [
      { name: 'Terracotta', hex: '#e2725b' },
      { name: 'Natural Flax', hex: '#e1d7c6' },
      { name: 'Olive Leaf', hex: '#556b2f' },
    ],
    sizes: standardSizes,
    rating: 4.7,
    reviewCount: 53,
    description:
      'Breezy French flax linen tailored into a classic silhouette with elbow-length sleeves, a functional wrap tie belt, and deep on-seam side pockets.',
    details: [
      '100% Certified European Flax Linen (180gsm)',
      'Self-tie wrap closure for adjustable waist definition',
      'Two functional side seam pockets',
      'Breathable, thermo-regulating weave',
    ],
    materialsAndCare: 'Wash at 30°C on delicate cycle. Air dry flat. Natural creases celebrate linen character.',
    shippingAndReturns: 'Standard 2-4 day delivery across India. Easy returns.',
    sku: 'BEL-DR-08-TER',
  },
  {
    id: 'belle-tp-09',
    name: 'Geneva Cashmere Mock-Neck Knit',
    category: 'Tops',
    gender: 'Women',
    price: 9999,
    isNew: false,
    isFeatured: true,
    image: img('photo-1576566588028-4147f3842f27'),
    alternateImage: img('photo-1620799140408-edc6dcb6d633'),
    gallery: [
      img('photo-1576566588028-4147f3842f27', 1200),
      img('photo-1620799140408-edc6dcb6d633', 1200),
    ],
    colors: [
      { name: 'Cashmere Cream', hex: '#fdfbf7' },
      { name: 'Camel Tan', hex: '#c19a6b' },
      { name: 'Charcoal Grey', hex: '#374151' },
    ],
    sizes: standardSizes,
    rating: 5.0,
    reviewCount: 44,
    description:
      'Spun from 2-ply Grade A Mongolian cashmere. Features a comfortable ribbed mock neck, raglan sleeves, and relaxed ribbed cuffs that provide featherweight warmth.',
    details: [
      '100% Grade A Mongolian Cashmere',
      '7-gauge seamless knit construction',
      'Ultra-soft handle with anti-pilling treatment',
      'Ribbed collar, cuffs, and hem',
    ],
    materialsAndCare: 'Hand wash in cold water using cashmere shampoo. Dry flat on clean towel.',
    shippingAndReturns: 'Complimentary shipping and signature packaging.',
    sku: 'BEL-TP-09-CRM',
  },
  {
    id: 'belle-men-10',
    name: 'Lucian Tailored Linen Blazer',
    category: 'Men',
    gender: 'Men',
    price: 11999,
    salePrice: 9999,
    isSale: true,
    isNew: true,
    isFeatured: true,
    image: img('photo-1507679799987-c73779587ccf'),
    alternateImage: img('photo-1617137984095-74e4e5e3613f'),
    gallery: [
      img('photo-1507679799987-c73779587ccf', 1200),
      img('photo-1617137984095-74e4e5e3613f', 1200),
    ],
    colors: [
      { name: 'Navy Blue', hex: '#1e3a8a' },
      { name: 'Sand Beige', hex: '#e5d3b3' },
      { name: 'Smoke Grey', hex: '#4b5563' },
    ],
    sizes: ['38R', '40R', '42R', '44R'],
    rating: 4.8,
    reviewCount: 27,
    description:
      'Unstructured Italian summer blazer tailored in 100% washed linen. Half-lined interior for featherlight breathability with notch lapels and natural horn buttons.',
    details: [
      '100% Italian Washed Linen',
      'Butterfly half lining in breathable viscose',
      'Two patch pockets with ticket interior pocket',
      'Double vented back',
    ],
    materialsAndCare: 'Dry clean only. Press with damp cloth on high linen heat.',
    shippingAndReturns: 'Complimentary delivery in garment travel bag. 14 days returns.',
    sku: 'BEL-MN-10-NVY',
  },
  {
    id: 'belle-men-11',
    name: 'Verona Merino Knit Polo',
    category: 'Men',
    gender: 'Men',
    price: 5499,
    isNew: false,
    isFeatured: true,
    image: img('photo-1617137984095-74e4e5e3613f'),
    alternateImage: img('photo-1507679799987-c73779587ccf'),
    gallery: [
      img('photo-1617137984095-74e4e5e3613f', 1200),
      img('photo-1507679799987-c73779587ccf', 1200),
    ],
    colors: [
      { name: 'Forest Green', hex: '#166534' },
      { name: 'Charcoal Black', hex: '#1f2937' },
      { name: 'Alabaster White', hex: '#f8fafc' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviewCount: 39,
    description:
      'Fine-gauge extrafine merino wool tailored with an open retro Johnny collar and ribbed trims. Regulates temperature naturally across cool mornings and sunny afternoons.',
    details: [
      '100% Extra-fine Merino Wool (19.5 micron)',
      'Ribbed collar without buttons for clean drape',
      'Breathable, odor-resistant natural yarn',
    ],
    materialsAndCare: 'Hand wash cold or wool cycle. Dry flat.',
    shippingAndReturns: 'Standard delivery in 2-3 business days.',
    sku: 'BEL-MN-11-GRN',
  },
  {
    id: 'belle-men-12',
    name: 'Sorrento Pleated Chino Trousers',
    category: 'Men',
    gender: 'Men',
    price: 5999,
    isNew: true,
    isFeatured: false,
    image: img('photo-1479064555552-3ef4979f8908'),
    alternateImage: img('photo-1507679799987-c73779587ccf'),
    gallery: [
      img('photo-1479064555552-3ef4979f8908', 1200),
      img('photo-1507679799987-c73779587ccf', 1200),
    ],
    colors: [
      { name: 'Khaki Stone', hex: '#c2b280' },
      { name: 'Dark Navy', hex: '#0f172a' },
      { name: 'Olive Drab', hex: '#4b5320' },
    ],
    sizes: ['30', '32', '34', '36', '38'],
    rating: 4.8,
    reviewCount: 31,
    description:
      'Classic single-pleated chinos woven in heavy twill cotton with a touch of stretch for day-to-night flexibility. Features side tab adjusters and a tapered ankle cuff.',
    details: [
      '98% BCI Cotton, 2% Elastane Twill',
      'Single front pleat with side buckle adjusters',
      'Internal split waistband for comfortable sitting',
    ],
    materialsAndCare: 'Machine wash 30°C. Warm iron.',
    shippingAndReturns: 'Free returns within 14 days.',
    sku: 'BEL-MN-12-KHK',
  },
  {
    id: 'belle-bg-13',
    name: 'Palermo Woven Leather Shoulder Bag',
    category: 'Bags',
    gender: 'Women',
    price: 10999,
    salePrice: 8999,
    isSale: true,
    isNew: false,
    isFeatured: true,
    image: img('photo-1548036328-c9fa89d128fa'),
    alternateImage: img('photo-1584917865442-de89df76afd3'),
    gallery: [
      img('photo-1548036328-c9fa89d128fa', 1200),
      img('photo-1584917865442-de89df76afd3', 1200),
    ],
    colors: [
      { name: 'Chocolate Brown', hex: '#3f1a0e' },
      { name: 'Cognac', hex: '#9a3412' },
      { name: 'Bone White', hex: '#f5f5f4' },
    ],
    sizes: oneSize,
    rating: 4.9,
    reviewCount: 57,
    description:
      'Intricately hand-woven intrecciato leather shoulder bag with a curved hobo silhouette and gold-toned zipper hardware. Softly structured to tuck comfortably under the arm.',
    details: [
      'Hand-woven full-grain calfskin strips',
      'Magnetic top frame with safety zip compartment',
      'Lined in premium cotton twill',
    ],
    materialsAndCare: 'Wipe gently with clean microfiber cloth. Keep in dustbag away from direct sunlight.',
    shippingAndReturns: 'Free insured shipping across all cities.',
    sku: 'BEL-BG-13-CHO',
  },
  {
    id: 'belle-sh-14',
    name: 'Venice Ankle-Strap Strappy Sandals',
    category: 'Shoes',
    gender: 'Women',
    price: 6499,
    isNew: true,
    isFeatured: false,
    image: img('photo-1535043934128-cf0b28d52f95'),
    alternateImage: img('photo-1543163521-1bf539c55dd2'),
    gallery: [
      img('photo-1535043934128-cf0b28d52f95', 1200),
      img('photo-1543163521-1bf539c55dd2', 1200),
    ],
    colors: [
      { name: 'Metallic Gold', hex: '#ffd700' },
      { name: 'Jet Black', hex: '#000000' },
      { name: 'Nude Blush', hex: '#e8c5b8' },
    ],
    sizes: shoeSizes,
    rating: 4.6,
    reviewCount: 22,
    description:
      'Barely-there delicate strap sandals with square toes and slender 60mm block heels. An evening staple crafted for stability and timeless sophistication.',
    details: [
      '60mm walkable architectural heel',
      'Soft lambskin straps with buckle closure',
      'Square open toe silhouette',
    ],
    materialsAndCare: 'Leather specialist care.',
    shippingAndReturns: 'Free size exchange.',
    sku: 'BEL-SH-14-GLD',
  },
  {
    id: 'belle-ac-15',
    name: 'Riviera UV-400 Tortoiseshell Sunglasses',
    category: 'Accessories',
    gender: 'Unisex',
    price: 2999,
    isNew: false,
    isFeatured: true,
    image: img('photo-1511499767150-a48a237f0083'),
    alternateImage: img('photo-1572635196237-14b3f281503f'),
    gallery: [
      img('photo-1511499767150-a48a237f0083', 1200),
      img('photo-1572635196237-14b3f281503f', 1200),
    ],
    colors: [
      { name: 'Amber Tortoise', hex: '#78350f' },
      { name: 'Onyx Black', hex: '#0f172a' },
    ],
    sizes: oneSize,
    rating: 4.8,
    reviewCount: 35,
    description:
      'Subtly oversized cat-eye sunglasses sculpted from Mazzucchelli Italian acetate. Features category 3 polarized lenses with 100% UV protection and barrel hinges.',
    details: [
      'Hand-polished Italian bio-acetate frame',
      'Category 3 Polarized CR-39 scratch-resistant lenses',
      'Includes faux-leather collapsible hard case and cloth',
    ],
    materialsAndCare: 'Clean with provided microfiber cloth only. Avoid hot car dashboards.',
    shippingAndReturns: 'Free returns within 14 days.',
    sku: 'BEL-AC-15-TOR',
  },
  {
    id: 'belle-dr-16',
    name: 'Camilla Pleated Chiffon Midi Dress',
    category: 'Dresses',
    gender: 'Women',
    price: 7499,
    salePrice: 5999,
    isSale: true,
    isNew: false,
    isFeatured: false,
    image: img('photo-1572804013309-59a88b7e92f1'),
    alternateImage: img('photo-1595777457583-95e059d581b8'),
    gallery: [
      img('photo-1572804013309-59a88b7e92f1', 1200),
      img('photo-1595777457583-95e059d581b8', 1200),
    ],
    colors: [
      { name: 'Emerald', hex: '#047857' },
      { name: 'Burgundy', hex: '#831843' },
      { name: 'Navy', hex: '#1e3a8a' },
    ],
    sizes: standardSizes,
    rating: 4.8,
    reviewCount: 46,
    description:
      'Floaty sunray accordion pleats cascade down this flattering midi dress. Features a smocked bodice, delicate cap sleeves, and a feminine keyhole back closure.',
    details: [
      'Sheer recycled chiffon with opaque stretch lining',
      'Permanent heat-set sunray accordion pleating',
      'Flattering midi length hitting mid-calf',
    ],
    materialsAndCare: 'Hand wash cold or dry clean. Hang dry to maintain crisp pleats.',
    shippingAndReturns: 'Express delivery in 2 business days.',
    sku: 'BEL-DR-16-EMR',
  },
  {
    id: 'belle-tp-17',
    name: 'Amalfi Ribbed Knit Silk-Blend Tank',
    category: 'Tops',
    gender: 'Women',
    price: 3499,
    isNew: true,
    isFeatured: false,
    image: img('photo-1503342217505-b0a15ec3261c'),
    alternateImage: img('photo-1598554747436-c9293d6a588f'),
    gallery: [
      img('photo-1503342217505-b0a15ec3261c', 1200),
      img('photo-1598554747436-c9293d6a588f', 1200),
    ],
    colors: [
      { name: 'Butter Yellow', hex: '#fef08a' },
      { name: 'Black', hex: '#000000' },
      { name: 'Ecru', hex: '#fef3c7' },
    ],
    sizes: standardSizes,
    rating: 4.7,
    reviewCount: 19,
    description:
      'A warm-weather wardrobe anchor. Fine rib-knit in a breathable silk and pima cotton blend with a high square neckline and bra-friendly wide straps.',
    details: [
      '55% Silk, 45% Pima Cotton',
      'Wide ribbed knit with comfortable stretch recovery',
      'Bra-concealing shoulder strap width',
    ],
    materialsAndCare: 'Cold hand wash with delicate detergent. Reshape whilst damp and lay flat.',
    shippingAndReturns: 'Free shipping on orders above ₹2,999.',
    sku: 'BEL-TP-17-YEL',
  },
  {
    id: 'belle-ac-18',
    name: 'Belgravia Silk Twill Square Scarf',
    category: 'Accessories',
    gender: 'Women',
    price: 2499,
    isNew: false,
    isFeatured: false,
    image: img('photo-1584917865442-de89df76afd3'),
    alternateImage: img('photo-1599643478518-a784e5dc4c8f'),
    gallery: [
      img('photo-1584917865442-de89df76afd3', 1200),
      img('photo-1599643478518-a784e5dc4c8f', 1200),
    ],
    colors: [
      { name: 'Botanical Navy', hex: '#1e3a8a' },
      { name: 'Golden Baroque', hex: '#d97706' },
    ],
    sizes: oneSize,
    rating: 4.9,
    reviewCount: 23,
    description:
      'Generous 70x70cm square scarf hand-rolled at the edges and printed on pure silk twill with vintage equestrian and botanical illustrations.',
    details: [
      '100% Pure Mulberry Silk Twill (16mm)',
      'Hand-rolled and stitched hems',
      'Versatile as a neckerchief, head wrap, or bag accessory',
    ],
    materialsAndCare: 'Dry clean only. Cool iron.',
    shippingAndReturns: 'Presented in keepsake envelope.',
    sku: 'BEL-AC-18-BOT',
  },
  {
    id: 'belle-men-19',
    name: 'Milano Suede Penny Loafers',
    category: 'Shoes',
    gender: 'Men',
    price: 8999,
    salePrice: 7499,
    isSale: true,
    isNew: true,
    isFeatured: true,
    image: img('photo-1614252369475-531eba835eb1'),
    alternateImage: img('photo-1549298916-b41d501d3772'),
    gallery: [
      img('photo-1614252369475-531eba835eb1', 1200),
      img('photo-1549298916-b41d501d3772', 1200),
    ],
    colors: [
      { name: 'Snuff Suede', hex: '#78350f' },
      { name: 'Espresso', hex: '#3e2723' },
      { name: 'Slate Grey', hex: '#475569' },
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    rating: 4.9,
    reviewCount: 33,
    description:
      'Classic unlined Italian suede loafers built on a flexible Blake-stitched leather sole. Designed for featherweight barefoot comfort from the first wear.',
    details: [
      'Supple water-resistant Italian calf suede',
      'Blake-stitched leather sole with rubber heel insert',
      'Padded leather insole with arch support',
    ],
    materialsAndCare: 'Brush with brass suede brush. Waterproof spray protection.',
    shippingAndReturns: 'Free size exchanges.',
    sku: 'BEL-MN-19-SNF',
  },
  {
    id: 'belle-ac-20',
    name: 'Como Italian Leather Reversible Belt',
    category: 'Accessories',
    gender: 'Unisex',
    price: 3299,
    isNew: false,
    isFeatured: false,
    image: img('photo-1553062407-98eeb64c6a62'),
    alternateImage: img('photo-1584917865442-de89df76afd3'),
    gallery: [
      img('photo-1553062407-98eeb64c6a62', 1200),
      img('photo-1584917865442-de89df76afd3', 1200),
    ],
    colors: [
      { name: 'Black / Tan Reversible', hex: '#1c1917' },
      { name: 'Burgundy / Dark Brown', hex: '#581c87' },
    ],
    sizes: ['S (30-32)', 'M (34-36)', 'L (38-40)'],
    rating: 4.8,
    reviewCount: 28,
    description:
      'Crafted from two layers of bonded full-grain Italian leather with a twist-and-lock buckle that flips effortlessly between formal black and casual tan.',
    details: [
      'Dual-faced full-grain Italian leather',
      'Sleek brushed nickel rotating buckle',
      '30mm belt width suitable for both chinos and formal suiting',
    ],
    materialsAndCare: 'Leather specialist care only.',
    shippingAndReturns: 'Delivered in presentation box.',
    sku: 'BEL-AC-20-BLK',
  },
]

// Visual Category Cards for Homepage
export const BELLE_CATEGORIES: BelleCategoryCard[] = [
  {
    id: 'cat-women',
    title: 'Women',
    image: img('photo-1515886657613-9f3515b0c78f', 800),
    itemCount: '124 Items',
    linkCategory: 'Women',
  },
  {
    id: 'cat-men',
    title: 'Men',
    image: img('photo-1507679799987-c73779587ccf', 800),
    itemCount: '86 Items',
    linkCategory: 'Men',
  },
  {
    id: 'cat-dresses',
    title: 'Dresses',
    image: img('photo-1595777457583-95e059d581b8', 800),
    itemCount: '52 Items',
    linkCategory: 'Dresses',
  },
  {
    id: 'cat-tops',
    title: 'Tops & Knits',
    image: img('photo-1598554747436-c9293d6a588f', 800),
    itemCount: '68 Items',
    linkCategory: 'Tops',
  },
  {
    id: 'cat-shoes',
    title: 'Shoes',
    image: img('photo-1543163521-1bf539c55dd2', 800),
    itemCount: '44 Items',
    linkCategory: 'Shoes',
  },
  {
    id: 'cat-bags',
    title: 'Bags & Leather',
    image: img('photo-1584917865442-de89df76afd3', 800),
    itemCount: '38 Items',
    linkCategory: 'Bags',
  },
  {
    id: 'cat-accessories',
    title: 'Accessories',
    image: img('photo-1599643478518-a784e5dc4c8f', 800),
    itemCount: '59 Items',
    linkCategory: 'Accessories',
  },
]

// Shop The Look Hotspots (Complete Outfit Editorial)
export const BELLE_SHOP_THE_LOOK_IMAGE = img('photo-1539109136881-3be0616acf4b', 1400)

export const BELLE_SHOP_THE_LOOK_ITEMS: BelleShopTheLookHotspot[] = [
  {
    id: 'look-1',
    productId: 'belle-bz-02',
    name: 'Sloane Oversized Wool Blazer',
    price: 12999,
    x: 48,
    y: 32,
    image: img('photo-1539109136881-3be0616acf4b', 400),
    category: 'Outerwear',
  },
  {
    id: 'look-2',
    productId: 'belle-tp-03',
    name: 'Clara Relaxed Poplin Shirt',
    price: 4999,
    x: 46,
    y: 45,
    image: img('photo-1598554747436-c9293d6a588f', 400),
    category: 'Tops',
  },
  {
    id: 'look-3',
    productId: 'belle-tr-04',
    name: 'Palazzo High-Waist Wide Trousers',
    price: 6499,
    salePrice: 5199,
    x: 52,
    y: 70,
    image: img('photo-1509631179647-0177331693ae', 400),
    category: 'Trousers',
  },
  {
    id: 'look-4',
    productId: 'belle-bg-05',
    name: 'Montmartre Structured Leather Tote',
    price: 14999,
    salePrice: 12499,
    x: 34,
    y: 62,
    image: img('photo-1584917865442-de89df76afd3', 400),
    category: 'Leather Bags',
  },
]

// Editorial Blocks for Homepage
export const BELLE_EDITORIALS: BelleEditorialBlock[] = [
  {
    id: 'edit-1',
    tag: 'THE NEW EDITORIAL',
    title: 'EVERYDAY ESSENTIALS',
    description:
      'Carefully curated silhouettes designed to anchor your wardrobe. From heavyweight mulberry silks to tailored Italian wools, each garment balances quiet luxury with understated utility.',
    image: img('photo-1490481651871-ab68de25d43d', 1100),
    buttonText: 'EXPLORE WARDROBE ANCHORS',
    reversed: false,
  },
  {
    id: 'edit-2',
    tag: 'CRAFT & ARCHITECTURE',
    title: 'THE TAILORED PROPORTION',
    description:
      'We believe the purest elegance resides in restraint: architectural cuts, precision drape, and uncompromised natural fabrics that move effortlessly with your rhythm.',
    image: img('photo-1445205170230-053b83016050', 1100),
    buttonText: 'DISCOVER TAILORING',
    reversed: true,
  },
]

// Testimonials
export const BELLE_TESTIMONIALS: BelleTestimonial[] = [
  {
    id: 't-1',
    name: 'Aishwarya Sen',
    location: 'Mumbai, Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    quote:
      'The Aurelia Silk Slip is perfection. The drape of the 22-momme silk is heavy, luxurious and flattering. Belle has redefined what accessible luxury fashion feels like in India.',
    rating: 5,
    productName: 'Aurelia Silk Slip Dress',
  },
  {
    id: 't-2',
    name: 'Devika Singhania',
    location: 'New Delhi',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    quote:
      'The Sloane Blazer’s tailoring is comparable to Savile Row ateliers. It arrived in magnificent garment packaging with real horn buttons. An absolute staple for every boardroom and evening.',
    rating: 5,
    productName: 'Sloane Oversized Wool Blazer',
  },
  {
    id: 't-3',
    name: 'Rohit Kulkarni',
    location: 'Bengaluru, Karnataka',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    quote:
      'Finding genuinely unstructured linen blazers in India with authentic Italian cut was impossible until Belle. The Lucian blazer breathes beautifully and looks bespoke.',
    rating: 5,
    productName: 'Lucian Tailored Linen Blazer',
  },
  {
    id: 't-4',
    name: 'Meera Nambiar',
    location: 'Kochi, Kerala',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    quote:
      'The Montmartre leather tote is worth every rupee. The grain, the brass accents, and the suede interior make it the most complimented bag I have ever carried.',
    rating: 5,
    productName: 'Montmartre Structured Leather Tote',
  },
]

// Trust / Service Highlights
export const BELLE_TRUST_ITEMS: BelleTrustItem[] = [
  {
    icon: '✨',
    title: 'Artisanal Natural Fibers',
    description: '100% Grade-A Mulberry Silk, Mongolian Cashmere & French Flax Linen',
  },
  {
    icon: '🚚',
    title: 'Complimentary Express Shipping',
    description: 'Free signature delivery on all orders across India above ₹2,999',
  },
  {
    icon: '🔄',
    title: '14-Day Seamless Returns',
    description: 'Doorstep exchange & pick-up with zero restocking friction',
  },
  {
    icon: '💎',
    title: 'Dedicated Style Concierge',
    description: 'Personal styling assistance & sizing guidance available 7 days a week',
  },
]

// Instagram Editorial Grid (6-8 images)
export const BELLE_INSTAGRAM_IMAGES = [
  { id: 'insta-1', img: img('photo-1515886657613-9f3515b0c78f', 600), handle: '@belle.atelier' },
  { id: 'insta-2', img: img('photo-1490481651871-ab68de25d43d', 600), handle: '@belle.atelier' },
  { id: 'insta-3', img: img('photo-1539109136881-3be0616acf4b', 600), handle: '@belle.atelier' },
  { id: 'insta-4', img: img('photo-1509631179647-0177331693ae', 600), handle: '@belle.atelier' },
  { id: 'insta-5', img: img('photo-1595777457583-95e059d581b8', 600), handle: '@belle.atelier' },
  { id: 'insta-6', img: img('photo-1584917865442-de89df76afd3', 600), handle: '@belle.atelier' },
  { id: 'insta-7', img: img('photo-1507679799987-c73779587ccf', 600), handle: '@belle.atelier' },
  { id: 'insta-8', img: img('photo-1543163521-1bf539c55dd2', 600), handle: '@belle.atelier' },
]

// Nav Menu Definition with Mega Menu Columns
export const BELLE_NAV_CATEGORIES = [
  'Women',
  'Men',
  'New Arrivals',
  'Clothing',
  'Shoes',
  'Accessories',
  'Collections',
  'Sale',
]

export const BELLE_CATEGORY_CARDS = BELLE_CATEGORIES
export const BELLE_SHOP_THE_LOOK_HOTSPOTS = BELLE_SHOP_THE_LOOK_ITEMS
export const BELLE_EDITORIAL_BLOCKS = BELLE_EDITORIALS

export const BELLE_INSTAGRAM_POSTS = BELLE_INSTAGRAM_IMAGES.map((item, idx) => ({
  id: item.id,
  image: item.img,
  handle: item.handle,
  likes: ['1,842', '2,105', '984', '3,410', '1,620', '2,890', '1,450', '2,310'][idx] || '1,500',
  caption: 'Belle Spring/Summer 2026 Haute Edition',
}))

export const BELLE_SIZES = ['XS', 'S', 'M', 'L', 'XL']

export const BELLE_MEGA_MENU: Record<
  string,
  {
    columns: { title: string; items: string[] }[]
    featuredTitle: string
    featuredImage: string
  }
> = {
  Women: {
    columns: [
      {
        title: 'Ready-to-Wear',
        items: ['Coats & Trench', 'Blazers & Suiting', 'Silk Slip Dresses', 'Cashmere Knitwear', 'Tailored Trousers'],
      },
      {
        title: 'Accessories & Leather',
        items: ['Structured Totes', 'Bespoke Belts', 'Cashmere Scarves', 'Gold Atelier Jewelry', 'Evening Clutches'],
      },
      {
        title: 'Featured Edits',
        items: ['Quiet Luxury Capsule', 'Parisian Tailoring', 'Mulberry Silk Essentials', 'Monochrome Dressing'],
      },
    ],
    featuredTitle: 'The Mulberry Silk Edit',
    featuredImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80',
  },
  Men: {
    columns: [
      {
        title: 'Tailoring & Sartorial',
        items: ['Unstructured Linen Blazers', 'Double-Breasted Suits', 'Poplin Dress Shirts', 'Pleated Wool Trousers'],
      },
      {
        title: 'Casual & Outerwear',
        items: ['Merino Knit Polo', 'Suede Overshirts', 'Cashmere Overcoats', 'Minimalist Crewnecks'],
      },
      {
        title: 'Shoes & Leather',
        items: ['Hand-welted Loafers', 'Derby Shoes', 'Full-Grain Weekend Bags', 'Italian Calfskin Belts'],
      },
    ],
    featuredTitle: 'Italian Tailored Linen',
    featuredImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
  },
  Clothing: {
    columns: [
      {
        title: 'Tops & Blouses',
        items: ['Silk Cowl Necks', 'Oversized Poplin Shirts', 'Fine-Gauge Cardigans', 'Structured Bodysuits'],
      },
      {
        title: 'Dresses & Skirts',
        items: ['Bias-Cut Maxi Dresses', 'Pleated Midi Skirts', 'Sculpted Column Gowns', 'Wrap Linen Dresses'],
      },
      {
        title: 'Trousers & Tailoring',
        items: ['Wide Leg Palazzos', 'Cigarette Trousers', 'High-Rise Linen Slacks', 'Tailored Bermuda Shorts'],
      },
    ],
    featuredTitle: 'Artisanal Drape Capsule',
    featuredImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80',
  },
  Collections: {
    columns: [
      {
        title: 'Curated Lookbooks',
        items: ['Spring / Summer 2026', 'Autumn / Winter Capsule', 'Resort Sartorial', 'The Wedding Guest Edit'],
      },
      {
        title: 'By Fabric & Material',
        items: ['100% Mongolian Cashmere', '22-Momme Mulberry Silk', 'Normandy Flax Linen', 'Organic Supima Cotton'],
      },
      {
        title: 'Limited Series',
        items: ['Atelier Bespoke Drops', 'Hand-Numbered Editions', 'Sustainable Circular Pieces'],
      },
    ],
    featuredTitle: 'Resort Haute Lookbook',
    featuredImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
  },
}


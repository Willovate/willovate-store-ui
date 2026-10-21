import type {
  LopezProduct,
  LopezCategoryCard,
  LopezTestimonial,
  LopezBlogPost,
  LopezServiceHighlight,
  LopezBannerItem,
} from '../types'

export const LOPEZ_CATEGORIES: LopezCategoryCard[] = [
  {
    id: 'cat-earrings',
    name: 'Earrings',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&auto=format&fit=crop&q=80',
    startingPrice: 'From $29.00',
    itemCount: 42,
    tagline: 'Dangle, Hoop & Huggies',
  },
  {
    id: 'cat-rings',
    name: 'Rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80',
    startingPrice: 'From $29.00',
    itemCount: 38,
    tagline: 'Fashion, Flush & Cocktail Rings',
  },
  {
    id: 'cat-necklaces',
    name: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&auto=format&fit=crop&q=80',
    startingPrice: 'From $45.00',
    itemCount: 26,
    tagline: 'Pendants & Delicate Chains',
  },
  {
    id: 'cat-bracelets',
    name: 'Bracelets',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80',
    startingPrice: 'From $35.00',
    itemCount: 19,
    tagline: 'Bangles & Minimalist Cuffs',
  },
  {
    id: 'cat-solitaires',
    name: 'Diamond Solitaires',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&auto=format&fit=crop&q=80',
    startingPrice: 'From $120.00',
    itemCount: 15,
    tagline: 'Single Stone Classics',
  },
  {
    id: 'cat-bridal',
    name: 'Bridal Sets',
    image: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&auto=format&fit=crop&q=80',
    startingPrice: 'From $199.00',
    itemCount: 12,
    tagline: 'Heirloom Duets',
  },
]

export const LOPEZ_SERVICES: LopezServiceHighlight[] = [
  {
    id: 'srv-1',
    title: 'Free Shipping',
    description: 'Contrary to popular belief, Lorem Ipsum is random text.',
    icon: 'truck',
  },
  {
    id: 'srv-2',
    title: 'Free Shipping',
    description: 'Contrary to popular belief, Lorem Ipsum is random text.',
    icon: 'headset',
  },
  {
    id: 'srv-3',
    title: 'Free Shipping',
    description: 'Contrary to popular belief, Lorem Ipsum is random text.',
    icon: 'shield',
  },
]

export const LOPEZ_BANNERS: LopezBannerItem[] = [
  {
    id: 'ban-1',
    title: 'Summer Collection',
    subtitle: 'Handcrafted Minimalist Earrings',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1000&auto=format&fit=crop&q=80',
    buttonText: 'Shop Earrings',
    tag: 'NEW LAUNCH',
  },
  {
    id: 'ban-2',
    title: 'Fashion Rings & Accents',
    subtitle: 'Simplicity is the Ultimate Sophistication',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1000&auto=format&fit=crop&q=80',
    buttonText: 'Discover Rings',
    tag: 'POPULAR DROP',
  },
]

export const LOPEZ_PRODUCTS: LopezProduct[] = [
  {
    id: 'lp-01',
    name: 'Dangle Earrings',
    subtitle: 'Elongated articulated drop earrings featuring delicate wire silhouettes and polished gold accents.',
    category: 'Earrings',
    price: 39.0,
    compareAtPrice: 49.0,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80',
    ],
    rating: 5.0,
    reviewCount: 42,
    isNew: true,
    isSale: true,
    stockCount: 15,
    artisanDescription:
      'The Lopez Dangle Earrings showcase fluid movement with effortless lightweight balance, making them perfect from daytime minimalism to evening glamour.',
    metalOptions: ['18K Yellow Gold Plated', 'Rhodium Silver', '14K Rose Gold'],
    details: [
      'Drop Length: 42mm gentle contour',
      'Closure: Hypoallergenic post and butterfly clutch',
      'Finish: Mirror gloss high polish',
      'Free insured delivery & luxury presentation box',
    ],
    karat: '18K Yellow Gold Plated',
  },
  {
    id: 'lp-02',
    name: 'Threader Earrings',
    subtitle: 'Whisper-thin box chain threader earrings with sleek geometric bar pendulums.',
    category: 'Earrings',
    price: 50.0,
    images: [
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80',
    ],
    rating: 5.0,
    reviewCount: 38,
    isNew: true,
    stockCount: 12,
    artisanDescription:
      'Effortlessly adaptable threader earrings designed to drape softly through single or multiple lobe piercings for modern layered styling.',
    metalOptions: ['14K Solid Yellow Gold', '925 Sterling Silver', '14K Rose Gold'],
    details: [
      'Chain Length: 65mm ultra-fine box link',
      'Feature Bar: 12mm solid bar accent',
      'Weight: 1.1 grams per pair for featherweight wear',
    ],
    karat: '14K Solid Yellow Gold',
  },
  {
    id: 'lp-03',
    name: 'FASHION RING',
    subtitle: 'Sleek architectural statement ring featuring a modern open-wrap band.',
    category: 'Rings',
    price: 40.0,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&auto=format&fit=crop&q=80',
    ],
    rating: 5.0,
    reviewCount: 29,
    isNew: false,
    stockCount: 20,
    artisanDescription:
      'Bold yet refined, the Fashion Ring presents a clean sculptural silhouette sculpted in durable solid silver with thick gold vermeil.',
    metalOptions: ['18K Gold Vermeil', 'Sterling Silver', 'Warm Bronze'],
    details: [
      'Band Width: 4.5mm tapering to 2.2mm comfort profile',
      'Adjustable wrap contour (fits US sizes 5-9)',
      'High-buff polish with interior stamped hallmark',
    ],
    karat: '18K Gold Vermeil',
  },
  {
    id: 'lp-04',
    name: 'Hoop Earrings',
    subtitle: 'Classic tubular medium hoops with a contemporary seamless hinge closure.',
    category: 'Earrings',
    price: 79.0,
    compareAtPrice: 95.0,
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80',
    ],
    rating: 5.0,
    reviewCount: 64,
    isNew: true,
    isSale: true,
    stockCount: 8,
    artisanDescription:
      'The quintessential Lopez hoop earring — hollow-formed for all-day comfort without pulling the earlobe.',
    metalOptions: ['14K Solid Yellow Gold', '14K White Gold', '14K Rose Gold'],
    details: [
      'Diameter: 25mm diameter with 2.8mm tubular width',
      'Clasp: Click-in seamless wire closure',
      'Allergy-safe nickel-free alloy',
    ],
    karat: '14K Solid Yellow Gold',
  },
  {
    id: 'lp-05',
    name: 'Flush Setting Ring',
    subtitle: 'Minimalist gypsy-flush round solitaire ring with mirror-polished flat court shank.',
    category: 'Rings',
    price: 29.0,
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
    ],
    rating: 5.0,
    reviewCount: 31,
    isNew: false,
    stockCount: 18,
    artisanDescription:
      'A true masterclass in restraint. The brilliant stone sits perfectly flush against the metal body for a snag-free profile.',
    metalOptions: ['18K Yellow Gold', 'White Gold', 'Brushed Titanium'],
    details: [
      'Setting: Gypsy / Burnish flush set',
      'Stone: 0.15ct round brilliant accent stone',
      'Width: 3.2mm comfort-fit flat profile',
    ],
    karat: '18K Yellow Gold',
  },
  {
    id: 'lp-06',
    name: 'Huggie Earrings',
    subtitle: 'Petite 11mm pavé diamond-set huggies that hug the lobe in pure brilliance.',
    category: 'Earrings',
    price: 29.0,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80',
    ],
    rating: 5.0,
    reviewCount: 57,
    isNew: true,
    stockCount: 14,
    artisanDescription:
      'Subtle, dazzling, and crafted for day-to-night permanence. Fits snug around first or second lobe piercings.',
    metalOptions: ['18K Yellow Gold', '18K White Gold', '18K Rose Gold'],
    details: [
      'Inner Diameter: 8.5mm / Outer Diameter: 11.5mm',
      'Secure click-latch hinge closure',
      'Hypoallergenic biocompatible core',
    ],
    karat: '18K Yellow Gold',
  },
  {
    id: 'lp-07',
    name: 'CLUSTER RING',
    subtitle: 'Artisanal multi-stone floral cluster cocktail ring in high-carat setting.',
    category: 'Rings',
    price: 55.0,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
    ],
    rating: 5.0,
    reviewCount: 25,
    isNew: false,
    stockCount: 9,
    artisanDescription:
      'Intricate cluster constellation designed to catch ambient light from all viewing angles.',
    metalOptions: ['18K Yellow Gold Plated', '925 Sterling Silver', 'Platinum Dip'],
    details: [
      'Cluster Head: 10mm diameter circular rosette',
      'Prong-set micro stones with diamond cut brilliance',
      'Signature tapered split-shank',
    ],
    karat: '18K Yellow Gold Plated',
  },
  {
    id: 'lp-08',
    name: 'COCKTAIL RING',
    subtitle: 'Dramatic geometric emerald-cut solitaire cocktail band with split cathedral shoulders.',
    category: 'Rings',
    price: 55.0,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
    ],
    rating: 5.0,
    reviewCount: 47,
    isNew: true,
    stockCount: 11,
    artisanDescription:
      'An iconic showstopper. The geometric center gem is framed by stepped Art Deco shoulders for maximum presence.',
    metalOptions: ['18K Yellow Gold', 'White Gold Finish', 'Rose Gold'],
    details: [
      'Center Stone: 12x8mm faceted emerald cut solitaire',
      'Setting: 4-Corner basket mount',
      'Complimentary ring sizing adjustment tool included',
    ],
    karat: '18K Yellow Gold',
  },
]

export const LOPEZ_TESTIMONIALS: LopezTestimonial[] = [
  {
    id: 'test-1',
    author: 'Newaz Sharif',
    role: 'UI Ux Designer',
    quote:
      'This product is best product i ever get. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt labore et dolore magna.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'test-2',
    author: 'Elena Rostova',
    role: 'Fashion Stylist',
    quote:
      'The Dangle Earrings and Threaders arrived in exquisite packaging. The weight, balance, and shine feel like pieces five times their price.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'test-3',
    author: 'Marcus Vance',
    role: 'Architectural Director',
    quote:
      'Exceptional minimalist lines and spotless finishing. Lopez has truly perfected clean, timeless modern jewelry.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  },
]

export const LOPEZ_BLOG_POSTS: LopezBlogPost[] = [
  {
    id: 'post-1',
    title: 'Temporibus autem quibusdam',
    excerpt:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.',
    date: 'Aug 28, 2019',
    author: 'Demo Lopez Admin',
    commentsCount: 6,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'post-2',
    title: 'The Standard Chunk Of Lorem Ipsum Used Since',
    excerpt:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.',
    date: 'Aug 28, 2019',
    author: 'Demo Lopez Admin',
    commentsCount: 11,
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'post-3',
    title: 'Temporibus autem quibusdam',
    excerpt:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.',
    date: 'Aug 28, 2019',
    author: 'Demo Lopez Admin',
    commentsCount: 0,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
  },
]

export const LOPEZ_BRANDS = [
  { id: 'b-1', name: 'AURELIA' },
  { id: 'b-2', name: 'VALENTI' },
  { id: 'b-3', name: 'LUMEN' },
  { id: 'b-4', name: 'SOLIS' },
  { id: 'b-5', name: 'NOVA' },
  { id: 'b-6', name: 'GEMMA' },
]

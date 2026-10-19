import type {
  TimzeeProduct,
  TimzeeHeroSlide,
  TimzeePromoCard,
  TimzeeGalleryBlock,
  TimzeeTestimonial,
  TimzeeBlogPost,
  TimzeeBrandPartner,
} from '../types'

export const TIMZEE_HERO_SLIDES: TimzeeHeroSlide[] = [
  {
    id: 'slide-1',
    pretitle: 'Alertzy',
    title: 'Exclusive Offer -20% Off This Week',
    description:
      'Expanding the offering is the choice between a leather strap or a metal bracelet, bringing the total new look. Black-tone stainless steel.',
    buttonText: 'EXPLORE SERVICES',
    secondaryButtonText: 'SHOP TIMEPIECES',
    desktopImage:
      'https://timzee-demo.myshopify.com/cdn/shop/files/slider__1.jpg?v=1614295638&width=3000',
    mobileImage:
      'https://timzee-demo.myshopify.com/cdn/shop/files/Mobile-Sliders3.jpg?v=1614300900&width=1500',
  },
  {
    id: 'slide-2',
    pretitle: 'Gertious',
    title: 'Exclusive of Sales Tax',
    description:
      'Expanding the offering is the choice between a leather strap or a metal bracelet, bringing the total new look. Swiss automatic movement with 42-hour power reserve.',
    buttonText: 'EXPLORE',
    secondaryButtonText: 'DISCOVER MORE',
    desktopImage:
      'https://timzee-demo.myshopify.com/cdn/shop/files/slider__3_2000x_1.jpg?v=1645525352&width=3000',
    mobileImage:
      'https://timzee-demo.myshopify.com/cdn/shop/files/Mobile-Sliders2.jpg?v=1614300900&width=1500',
  },
  {
    id: 'slide-3',
    pretitle: 'Gorgeous',
    title: 'Exclusive of Sales Tax',
    description:
      'Handcrafted chronometers engineered for enduring elegance and military-grade durability. Scratch-resistant sapphire crystal glass.',
    buttonText: 'EXPLORE',
    secondaryButtonText: 'VIEW GALLERY',
    desktopImage:
      'https://timzee-demo.myshopify.com/cdn/shop/files/slider__2.jpg?v=1614295640&width=3000',
    mobileImage:
      'https://timzee-demo.myshopify.com/cdn/shop/files/Mobile-Sliders.jpg?v=1614300900&width=1500',
  },
]

export const TIMZEE_PROMO_CARDS: TimzeePromoCard[] = [
  {
    id: 'promo-1',
    subtitle: 'Flash Sale',
    title: "Men's Watch",
    discount: '25% Discount',
    image:
      'https://timzee-demo.myshopify.com/cdn/shop/files/Untitled-1.jpg?v=1614294897&width=1500',
    linkText: 'Shop Now',
  },
  {
    id: 'promo-2',
    subtitle: 'Flash Sale',
    title: "Women's Watch",
    discount: '40% Discount',
    image:
      'https://timzee-demo.myshopify.com/cdn/shop/files/promo2_c5444c07-50e6-4452-90ed-99ca49a106fc.png?v=1614300803&width=1500',
    linkText: 'Shop Now',
  },
  {
    id: 'promo-3',
    subtitle: 'Flash Sale',
    title: "Couple's Watch",
    discount: '30% Discount',
    image:
      'https://timzee-demo.myshopify.com/cdn/shop/files/promo3_e10c824c-b077-4e67-be09-c11067066cf5.png?v=1614300803&width=1500',
    linkText: 'Shop Now',
  },
]

export const TIMZEE_PRODUCTS: TimzeeProduct[] = [
  {
    id: 'tmz-analog-numeral',
    name: 'Analog Numeral',
    category: 'analog',
    tabGroup: ['classic', 'modern', 'classico'],
    price: 750,
    compareAtPrice: 850,
    rating: 5.0,
    reviewCount: 38,
    images: [
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch5_0f753270-74d5-471c-b694-5f55d31a0f0e.png?v=1562222675&width=533',
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch12.png?v=1562223032&width=533',
    ],
    badge: 'HOT',
    description:
      'Timeless precision analog watch featuring bespoke numerals, a brushed titanium case, and Swiss quartz mechanics with double anti-reflective coating.',
    caseDiameter: '42mm',
    movement: 'Swiss Quartz Calibre',
    waterResistance: '100m / 10 ATM',
    dialColor: 'Midnight Obsidian',
    strapMaterial: 'Genuine Italian Calfskin Leather',
    inStock: true,
  },
  {
    id: 'tmz-black-numeral-dial',
    name: 'Black Numeral Dial',
    category: 'dress',
    tabGroup: ['classic', 'modern', 'dialer'],
    price: 200,
    compareAtPrice: 250,
    rating: 4.8,
    reviewCount: 24,
    images: [
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch12.png?v=1562223032&width=533',
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch5_0f753270-74d5-471c-b694-5f55d31a0f0e.png?v=1562222675&width=533',
    ],
    badge: 'OFF 20%',
    description:
      'A refined dark luxury dress watch with clean Roman hour markers and date window at the 3 o’clock position.',
    caseDiameter: '40mm',
    movement: 'Miyota Precision Quartz',
    waterResistance: '50m / 5 ATM',
    dialColor: 'Matte Jet Black',
    strapMaterial: 'Hand-Stitched Alligator Embossed',
    inStock: true,
  },
  {
    id: 'tmz-golden-automatic',
    name: 'Golden Automatic',
    category: 'automatic',
    tabGroup: ['classic', 'special', 'classico', 'executive'],
    price: 200,
    compareAtPrice: 400,
    rating: 4.9,
    reviewCount: 42,
    images: [
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch18.png?v=1562227748&width=533',
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch15.png?v=1562224550&width=533',
    ],
    badge: 'OFF 50%',
    description:
      '18K gold electroplated casing houses an open-heart exhibition skeleton movement with a 48-hour mechanical power reserve.',
    caseDiameter: '43mm',
    movement: 'Self-Winding Automatic 24 Jewels',
    waterResistance: '100m / 10 ATM',
    dialColor: 'Sunburst Champagne Gold',
    strapMaterial: 'Solid Gold-Tone Stainless Steel 316L',
    inStock: true,
  },
  {
    id: 'tmz-golden-classical',
    name: 'Golden Classical',
    category: 'automatic',
    tabGroup: ['classic', 'special', 'executive'],
    price: 301,
    compareAtPrice: 380,
    rating: 5.0,
    reviewCount: 19,
    images: [
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch15.png?v=1562224550&width=533',
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch14_b2e50cb0-e772-4668-8cc5-dc3c54adce87.png?v=1680777571&width=533',
    ],
    badge: 'EXCLUSIVE',
    description:
      'Vintage horology inspiration meets modern Swiss precision. Fluted bezel, golden Breguet hands, and exhibition case back.',
    caseDiameter: '41mm',
    movement: 'Automatic ETA 2824-2 Clone',
    waterResistance: '50m / 5 ATM',
    dialColor: 'Enamel Ivory & Gold',
    strapMaterial: 'Top-Grain Saddle Brown Leather',
    inStock: true,
  },
  {
    id: 'tmz-numeral-semi',
    name: 'Numeral Semi',
    category: 'mechanical',
    tabGroup: ['modern', 'special', 'dialer'],
    price: 250,
    compareAtPrice: 295,
    rating: 4.7,
    reviewCount: 16,
    images: [
      'https://timzee-demo.myshopify.com/cdn/shop/products/watch1.png?v=1562222447&width=533',
      'https://timzee-demo.myshopify.com/cdn/shop/products/watch2_02f3b74c-51b8-49b6-b632-67a2abc70b38.png?v=1562222484&width=533',
    ],
    badge: 'NEW',
    description:
      'Contemporary minimalism with semi-skeletonized dial aperture highlighting the oscillating balance wheel in real time.',
    caseDiameter: '42mm',
    movement: 'Manual Hand-Wind Mechanical',
    waterResistance: '100m / 10 ATM',
    dialColor: 'Anthracite Sunray',
    strapMaterial: 'Supple Horween Leather',
    inStock: true,
  },
  {
    id: 'tmz-roman-semi',
    name: 'Roman Semi',
    category: 'dress',
    tabGroup: ['classic', 'modern', 'classico'],
    price: 280,
    compareAtPrice: 320,
    rating: 4.9,
    reviewCount: 31,
    images: [
      'https://timzee-demo.myshopify.com/cdn/shop/products/watch2_02f3b74c-51b8-49b6-b632-67a2abc70b38.png?v=1562222484&width=533',
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch3.png?v=1562222510&width=533',
    ],
    badge: 'BESTSELLER',
    description:
      'Classic Roman indices on a semi-textured concentric dial. Ultra-slim profile designed to slide effortlessly beneath dress shirts.',
    caseDiameter: '39mm',
    movement: 'Ultra-Thin Quartz Calibre',
    waterResistance: '30m / 3 ATM',
    dialColor: 'Silver Guilloché',
    strapMaterial: 'Black Mock-Croco Leather',
    inStock: true,
  },
  {
    id: 'tmz-stainless-steel',
    name: 'Stainless Steel',
    category: 'chronograph',
    tabGroup: ['modern', 'special', 'sports'],
    price: 320,
    compareAtPrice: 390,
    rating: 4.8,
    reviewCount: 52,
    images: [
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch3.png?v=1562222510&width=533',
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch22.png?v=1562229815&width=533',
    ],
    badge: 'TRENDING',
    description:
      'Marine-grade 316L solid stainless steel construction with integrated links, luminescent hands, and triple chronograph sub-dials.',
    caseDiameter: '44mm',
    movement: 'Chronograph Quartz Mecha-Quartz',
    waterResistance: '200m / 20 ATM Diver',
    dialColor: 'Ocean Deep Navy',
    strapMaterial: 'Solid Brushed Oyster Steel Bracelet',
    inStock: true,
  },
  {
    id: 'tmz-red-black-numeral',
    name: 'Red & Black Numeral',
    category: 'sports',
    tabGroup: ['modern', 'sports', 'dialer'],
    price: 401,
    compareAtPrice: 402,
    rating: 5.0,
    reviewCount: 29,
    images: [
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch22.png?v=1562229815&width=533',
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch21.png?v=1562229540&width=533',
    ],
    badge: 'OFF 0%',
    description:
      'Racing-inspired dial featuring bold crimson accents, tachymeter scale ceramic bezel, and luminescent Super-LumiNova markers.',
    caseDiameter: '44mm',
    movement: 'High-Precision Sport Chrono',
    waterResistance: '100m / 10 ATM',
    dialColor: 'Carbon Fiber Black with Red Details',
    strapMaterial: 'Perforated Racing Calfskin',
    inStock: true,
  },
  {
    id: 'tmz-platinum-numeral',
    name: 'Platinum Numeral',
    category: 'automatic',
    tabGroup: ['classic', 'executive', 'classico'],
    price: 200,
    compareAtPrice: 201,
    rating: 4.9,
    reviewCount: 33,
    images: [
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch21.png?v=1562229540&width=533',
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch10.png?v=1562224314&width=533',
    ],
    badge: 'OFF 0%',
    description:
      'Platinum electroplated luster combined with applied indices and a subtle sunray blue dial that dances in natural light.',
    caseDiameter: '41mm',
    movement: 'Automatic Movement with Date',
    waterResistance: '50m / 5 ATM',
    dialColor: 'Royal Ice Blue',
    strapMaterial: 'Platinum Finish Mesh Milanese Bracelet',
    inStock: true,
  },
  {
    id: 'tmz-classical-numeral',
    name: 'Classical Numeral',
    category: 'dress',
    tabGroup: ['classic', 'classico', 'dialer'],
    price: 350,
    compareAtPrice: 398,
    rating: 4.8,
    reviewCount: 18,
    images: [
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch10.png?v=1562224314&width=533',
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch7_cb15c914-d10f-4cd5-869a-beb6798eeb36.png?v=1562222786&width=533',
    ],
    badge: 'OFF 12%',
    description:
      'Traditional horology aesthetic with stepped case architecture and delicate leaf hands evoking early 20th-century pocket watches.',
    caseDiameter: '39.5mm',
    movement: 'Hand-Assembled Swiss Movement',
    waterResistance: '30m / 3 ATM',
    dialColor: 'Porcelain White',
    strapMaterial: 'Cordovan Oxblood Leather',
    inStock: true,
  },
  {
    id: 'tmz-dial-numeral',
    name: 'Dial Numeral',
    category: 'analog',
    tabGroup: ['modern', 'dialer', 'sports'],
    price: 290,
    compareAtPrice: 340,
    rating: 4.7,
    reviewCount: 15,
    images: [
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch7_cb15c914-d10f-4cd5-869a-beb6798eeb36.png?v=1562222786&width=533',
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch4.png?v=1562666305&width=533',
    ],
    badge: 'NEW',
    description:
      'High-contrast tactical dial with bold stencil typography, anti-scratch sapphire crystal, and matte bead-blasted finish.',
    caseDiameter: '43mm',
    movement: 'Shock-Resistant Quartz',
    waterResistance: '100m / 10 ATM',
    dialColor: 'Military Gunmetal Gray',
    strapMaterial: 'Ballistic Cordura Textile & Leather',
    inStock: true,
  },
  {
    id: 'tmz-analog-automatic',
    name: 'Analog Automatic',
    category: 'automatic',
    tabGroup: ['classic', 'special', 'executive'],
    price: 490,
    compareAtPrice: 580,
    rating: 5.0,
    reviewCount: 47,
    images: [
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch4.png?v=1562666305&width=533',
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch20.png?v=1562229380&width=533',
    ],
    badge: 'PREMIUM',
    description:
      'A true masterwork featuring a dual-direction self-winding rotor visible through sapphire crystal exhibition glass.',
    caseDiameter: '42mm',
    movement: 'In-House Chronometer Certified COSC',
    waterResistance: '100m / 10 ATM',
    dialColor: 'Emerald Sunburst',
    strapMaterial: 'British Tan Italian Leather',
    inStock: true,
  },
  {
    id: 'tmz-platinum-classic',
    name: 'Platinum Classic',
    category: 'dress',
    tabGroup: ['classic', 'classico', 'executive'],
    price: 520,
    compareAtPrice: 600,
    rating: 4.9,
    reviewCount: 22,
    images: [
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch20.png?v=1562229380&width=533',
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch9.png?v=1562222905&width=533',
    ],
    badge: 'LIMITED',
    description:
      'Ultra-exclusive platinum timepiece with applied white gold baton indices and a minimalist sub-seconds counter.',
    caseDiameter: '40mm',
    movement: 'Slim Manual Wind Calibre',
    waterResistance: '50m / 5 ATM',
    dialColor: 'Opaline Silver',
    strapMaterial: 'Genuine Louisiana Alligator',
    inStock: true,
  },
  {
    id: 'tmz-stainless-automatic',
    name: 'Stainless Automatic',
    category: 'automatic',
    tabGroup: ['modern', 'sports', 'executive'],
    price: 360,
    compareAtPrice: 420,
    rating: 4.8,
    reviewCount: 39,
    images: [
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch9.png?v=1562222905&width=533',
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch14.png?v=1562223091&width=533',
    ],
    badge: 'BESTSELLER',
    description:
      'Robust all-day everyday sports automatic timepiece with screw-down crown, rotating ceramic bezel, and solid link bracelet.',
    caseDiameter: '42mm',
    movement: 'Seiko NH35 Automatic 21,600 bph',
    waterResistance: '200m / 20 ATM',
    dialColor: 'Pitch Black Ceramic',
    strapMaterial: 'Solid Jubilee Steel Bracelet',
    inStock: true,
  },
  {
    id: 'tmz-gold-case-automatic',
    name: 'Gold Case Automatic',
    category: 'automatic',
    tabGroup: ['special', 'executive', 'classico'],
    price: 680,
    compareAtPrice: 790,
    rating: 5.0,
    reviewCount: 64,
    images: [
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch14.png?v=1562223091&width=533',
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch18.png?v=1562227748&width=533',
    ],
    badge: 'LUXURY',
    description:
      'High-horology gold case housing an open-heart escapement mechanism and perpetual calendar display sub-dials.',
    caseDiameter: '43.5mm',
    movement: 'Grand Complication Automatic',
    waterResistance: '50m / 5 ATM',
    dialColor: 'Champagne & Rose Gold',
    strapMaterial: 'Hand-Crafted French Epsom Calfskin',
    inStock: true,
  },
  {
    id: 'tmz-classic-roman',
    name: 'Classic Roman',
    category: 'dress',
    tabGroup: ['classic', 'classico'],
    price: 410,
    compareAtPrice: 480,
    rating: 4.9,
    reviewCount: 19,
    images: [
      'https://timzee-demo.myshopify.com/cdn/shop/products/watch1.png?v=1562222447&width=533',
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch12.png?v=1562223032&width=533',
    ],
    badge: 'HOT',
    description:
      'Roman numeral markers framed by a slim high-polished bezel with diamond-cut hands and date magnification lens.',
    caseDiameter: '40mm',
    movement: 'Precision Swiss Quartz',
    waterResistance: '50m / 5 ATM',
    dialColor: 'Sunburst Silver-White',
    strapMaterial: 'Dark Espresso Brown Leather',
    inStock: true,
  },
  {
    id: 'tmz-golden-analog-watch',
    name: 'Golden Analog Watch',
    category: 'analog',
    tabGroup: ['modern', 'special', 'classico'],
    price: 330,
    compareAtPrice: 390,
    rating: 4.8,
    reviewCount: 27,
    images: [
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch15.png?v=1562224550&width=533',
      'https://timzee-demo.myshopify.com/cdn/shop/products/Watch5_0f753270-74d5-471c-b694-5f55d31a0f0e.png?v=1562222675&width=533',
    ],
    badge: 'OFF 15%',
    description:
      'A striking fusion of polished gold tones and contemporary analog layout built for formal soirees and boardroom poise.',
    caseDiameter: '41mm',
    movement: 'Precision Quartz Calibre',
    waterResistance: '50m / 5 ATM',
    dialColor: 'Radiant Gold',
    strapMaterial: 'Gold PVD Stainless Steel Link Bracelet',
    inStock: true,
  },
]

export const TIMZEE_GALLERY_BLOCKS: TimzeeGalleryBlock[] = [
  {
    id: 'gal-1',
    title: 'Versits',
    subtitle: 'Limited Horology',
    description:
      'Rhuyese ser sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.uis leo. Sed fringilla mauris sit amet nibh.',
    image:
      'https://timzee-demo.myshopify.com/cdn/shop/files/banner_286c6b34-88cb-465a-a2e8-2a5faf8295df.jpg?v=1614295013&width=1500',
    buttonText: 'VIEW ALLPRODUCTS',
  },
  {
    id: 'gal-2',
    title: '2019 Novalties',
    subtitle: 'Heritage Masterpieces',
    description: 'Bespoke timepieces engineered for collector distinction.',
    image:
      'https://timzee-demo.myshopify.com/cdn/shop/files/Gallery2.jpg?v=1614300904&width=1500',
    buttonText: 'VIEW ALL COLLECTION',
  },
  {
    id: 'gal-3',
    title: 'Javelin',
    subtitle: 'High Precision',
    description: 'Chronometers engineered for aeronautic precision and high g-force tolerance.',
    image:
      'https://timzee-demo.myshopify.com/cdn/shop/files/Gallery3.jpg?v=1614300904&width=1500',
    buttonText: 'EXPLORE JAVELIN',
  },
  {
    id: 'gal-4',
    title: 'Voltamic',
    subtitle: 'Futuristic Calibres',
    description: 'Precision hybrid movements fusing mechanical craft and electronic regulation.',
    image:
      'https://timzee-demo.myshopify.com/cdn/shop/files/Gallery6.jpg?v=1614300904&width=1500',
    buttonText: 'DISCOVER VOLTAMIC',
  },
  {
    id: 'gal-5',
    title: 'Cerutaio',
    subtitle: 'Artisanal Elegance',
    description: 'Hand-engraved case bodies with rare precious stone cabochons.',
    image:
      'https://timzee-demo.myshopify.com/cdn/shop/files/Gallery5.jpg?v=1614300904&width=1500',
    buttonText: 'VIEW CERUTAIO',
  },
  {
    id: 'gal-6',
    title: 'Zerairo',
    subtitle: 'Grand Complications',
    description: 'Perpetual calendars and minute repeaters crafted by senior watchmakers.',
    image:
      'https://timzee-demo.myshopify.com/cdn/shop/files/Gallery4.jpg?v=1614300904&width=1500',
    buttonText: 'DISCOVER ZERAIRO',
  },
]

export const TIMZEE_TESTIMONIALS: TimzeeTestimonial[] = [
  {
    id: 'testi-1',
    quote:
      '"Leo eget bibendum sodales, uis leo. Sed fringilla mauris sit amet nibh. The craftsmanship and mechanical integrity of Timzee timepieces are beyond any expectation in modern horology."',
    author: 'Andrew Mark',
    title: 'Horology Connoisseur & Private Collector',
  },
  {
    id: 'testi-2',
    quote:
      '‘‘The entire pursuit of a watchmaker should be the perfection of each and every watch. Timzee achieves this balance between heritage architecture and modern reliability seamlessly.”',
    author: 'John Doe',
    title: 'Master Horologist, Geneva',
  },
]

export const TIMZEE_BLOG_POSTS: TimzeeBlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Story Behind a Super Watch',
    date: 'July 5, 2019',
    author: 'Ram M',
    image:
      'https://timzee-demo.myshopify.com/cdn/shop/articles/blog7.jpg?v=1562317901&width=1500',
    excerpt:
      'Discover how master watchmakers in the Jura mountains sculpt titanium and sapphire into astronomical complication masterpieces.',
    commentsCount: 3,
  },
  {
    id: 'blog-2',
    title: '3 Favorite Dial Rolex Watches',
    date: 'July 5, 2019',
    author: 'Ram M',
    image:
      'https://timzee-demo.myshopify.com/cdn/shop/articles/blog8.jpg?v=1562317604&width=1500',
    excerpt:
      'An analytical look at meteorite, enamel, and deep lacquered dials that have defined iconic chronometer auctions over the past half-century.',
    commentsCount: 5,
  },
  {
    id: 'blog-3',
    title: 'The Finest Present You Can Give',
    date: 'July 5, 2019',
    author: 'Ram M',
    image:
      'https://timzee-demo.myshopify.com/cdn/shop/articles/blog9.jpg?v=1562317292&width=1500',
    excerpt:
      'Why a bespoke engraved mechanical timepiece remains the pinnacle gift for milestone anniversaries and life achievements.',
    commentsCount: 2,
  },
  {
    id: 'blog-4',
    title: 'Luxury Watches for Women',
    date: 'July 5, 2019',
    author: 'Ram M',
    image:
      'https://timzee-demo.myshopify.com/cdn/shop/articles/blog10.jpg?v=1562317129&width=1500',
    excerpt:
      'Exploring feminine mechanical complications that balance diamond brilliance with genuine high-horology movements.',
    commentsCount: 4,
  },
  {
    id: 'blog-5',
    title: 'Gentlemen Always Prefer Timezee',
    date: 'July 5, 2019',
    author: 'Ram M',
    image:
      'https://timzee-demo.myshopify.com/cdn/shop/articles/blog12.jpg?v=1562316997&width=1500',
    excerpt:
      'A deep dive into sartorial styling: pairing fluted gold bezels with bespoke tailoring for effortless sophistication.',
    commentsCount: 8,
  },
]

export const TIMZEE_BRAND_PARTNERS: TimzeeBrandPartner[] = [
  {
    id: 'partner-1',
    name: 'Chronos Heritage',
    image:
      'https://timzee-demo.myshopify.com/cdn/shop/files/client1_6e709373-d4d6-4fee-905c-f47825f2b2a6.png?v=1614300918&width=1500',
  },
  {
    id: 'partner-2',
    name: 'Geneva Calibre',
    image:
      'https://timzee-demo.myshopify.com/cdn/shop/files/client3_50109f47-cc2b-438c-80d1-d5a6d59c4064.png?v=1614300918&width=1500',
  },
  {
    id: 'partner-3',
    name: 'Vortex Horology',
    image:
      'https://timzee-demo.myshopify.com/cdn/shop/files/client2_f5e7538d-5a02-406d-9b6f-8fabc6e087f4.png?v=1614300918&width=1500',
  },
  {
    id: 'partner-4',
    name: 'Atelier Precision',
    image:
      'https://timzee-demo.myshopify.com/cdn/shop/files/client4_ff7c56f6-25ab-4616-904a-e1c7b2812066.png?v=1614300918&width=1500',
  },
]

export const TIMZEE_SERVICES = [
  {
    id: 'srv-1',
    title: 'Free Worldwide Shipping',
    description: 'Fully insured express courier delivery on all orders over $300',
    icon: 'shipping',
  },
  {
    id: 'srv-2',
    title: '5-Year International Warranty',
    description: 'Comprehensive coverage on movement calibration and parts',
    icon: 'warranty',
  },
  {
    id: 'srv-3',
    title: 'Swiss Horology Certified',
    description: 'Laser-tested precision and individual certificate of authenticity',
    icon: 'certificate',
  },
  {
    id: 'srv-4',
    title: 'Atelier Concierge 24/7',
    description: 'Direct VIP access to master watchmakers and service advisers',
    icon: 'concierge',
  },
]

export const TIMZEE_APP_LOGOS = [
  {
    id: 'app-1',
    name: 'Apple App Store',
    image:
      'https://timzee-demo.myshopify.com/cdn/shop/files/App-logo-1_small_small_d09bc29f-61cf-4e34-a235-3170614f870b.png?v=1614294999&width=150',
  },
  {
    id: 'app-2',
    name: 'Google Play Store',
    image:
      'https://timzee-demo.myshopify.com/cdn/shop/files/App-logo-2_small_small_af049517-ec09-4b95-b698-c33aa2853cb9.png?v=1614294999&width=150',
  },
  {
    id: 'app-3',
    name: 'Windows Store',
    image:
      'https://timzee-demo.myshopify.com/cdn/shop/files/App-logo-3_small_small_small_small_2dc3e028-9587-4fb9-bc52-43b728749587.png?v=1614294999&width=150',
  },
]


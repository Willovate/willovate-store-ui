import type {
  OrganicaProduct,
  OrganicaSlide,
  OrganicaTrustItem,
  OrganicaDualBanner,
  OrganicaCategoryBox,
  OrganicaBlogPost,
  OrganicaTestimonial,
} from '../types'

export const ORGANICA_LOGO =
  'https://organica-1.myshopify.com/cdn/shop/files/logo_1.png'

export const ORGANICA_ANNOUNCEMENT =
  'MID-SEASON SALE UP TO 70% OFF. USE CODE: SALE70. SHOP NOW'

export const ORGANICA_PHONE = '+0123 456 789'

export const ORGANICA_TRUST_ITEMS: OrganicaTrustItem[] = [
  {
    id: 'trust-1',
    icon: '🚚',
    title: 'Free shipping item',
    subtitle: 'For any orders over $200',
  },
  {
    id: 'trust-2',
    icon: '🔄',
    title: '30 days return',
    subtitle: 'If goods have problems',
  },
  {
    id: 'trust-3',
    icon: '🎧',
    title: 'Support 24/7',
    subtitle: 'Contact us 24 hrs a day',
  },
]

export const ORGANICA_HERO_SLIDES: OrganicaSlide[] = [
  {
    id: 'slide-1',
    subtitle: 'Comes From Health',
    title: 'Face Cleanser',
    highlight: 'Mega - mushroom skin relife',
    description:
      'Infused with reishi and chaga mushroom bio-ferments to neutralize cellular redness and soothe stressed skin barriers.',
    buttonText: 'SHOP NOW',
    image:
      'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=1500&q=80',
  },
  {
    id: 'slide-2',
    subtitle: 'Pure Organic',
    title: 'Rock And Glamour',
    highlight: 'Certified Botanical Oils',
    description:
      'Ethically harvested superfoods and pure facial oils engineered to deliver a velvety smooth luminous complexion.',
    buttonText: 'DISCOVER MORE',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1500&q=80',
  },
]

export const ORGANICA_SIDE_BANNERS = [
  {
    id: 'side-1',
    title: 'Delicious Breakfast Bowls',
    subtitle: 'Organic Fresh Berries',
    image:
      'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'side-2',
    title: 'Our History',
    subtitle: 'Comes From Health & Fitness',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
  },
]

export const ORGANICA_BRAND_LOGOS = [
  'LOUIS VUITTON',
  'CHANEL',
  'WILLIAMS',
  'DOLCE & GABBANA',
  'HERMÈS',
  'GUCCI',
]

export const ORGANICA_PRODUCTS: OrganicaProduct[] = [
  {
    id: 'org-1',
    name: 'Cleansers Nano',
    price: 6.0,
    originalPrice: 50.0,
    discountBadge: '-88%',
    image:
      'https://organica-1.myshopify.com/cdn/shop/products/3-400x490_8145b50a-2cc1-458e-84be-be34df21b6e0_800x.jpg',
    hoverImage:
      'https://organica-1.myshopify.com/cdn/shop/products/1-800x980_800x.jpg',
    category: 'beauty',
    rating: 5.0,
    reviewCount: 45,
    inStock: true,
    description:
      'Gentle micellar cleanser micro-droplets that dissolve impurities and stubborn makeup without drying.',
    volume: '200ml',
  },
  {
    id: 'org-2',
    name: 'Donec Eu Libero',
    price: 5.0,
    originalPrice: 10.0,
    discountBadge: '-50%',
    image:
      'https://organica-1.myshopify.com/cdn/shop/products/14-400x490_5f4e347c-5ce9-403e-b211-2835f0f8e471_800x.jpg',
    hoverImage:
      'https://organica-1.myshopify.com/cdn/shop/products/7-800x980_800x.jpg',
    category: 'health',
    rating: 4.8,
    reviewCount: 32,
    inStock: true,
    description:
      'Organic herbal tonic crafted with soothing chamomile flower water and wild calendula extracts.',
    volume: '150ml',
  },
  {
    id: 'org-3',
    name: 'Facial Oil-Free',
    price: 7.0,
    originalPrice: 15.0,
    discountBadge: '-53%',
    image:
      'https://organica-1.myshopify.com/cdn/shop/products/7-800x980_800x.jpg',
    hoverImage:
      'https://organica-1.myshopify.com/cdn/shop/products/10-400x490_e4bf9eea-3254-4b62-a77b-183c9b6bf26b_800x.jpg',
    category: 'beauty',
    rating: 4.9,
    reviewCount: 28,
    inStock: true,
    description:
      'Featherweight hydrating gel lotion formulated without comedogenic mineral oils.',
    volume: '50ml',
  },
  {
    id: 'org-4',
    name: 'Natural Facial Mask',
    price: 8.0,
    originalPrice: 18.0,
    discountBadge: '-55%',
    image:
      'https://organica-1.myshopify.com/cdn/shop/products/1-800x980_800x.jpg',
    hoverImage:
      'https://organica-1.myshopify.com/cdn/shop/products/8-400x490_7098ea3c-3378-499b-9731-4ab163e9a5ab_800x.jpg',
    category: 'beauty',
    rating: 5.0,
    reviewCount: 56,
    inStock: true,
    description:
      'Detoxifying green clay and spirulina facial masque that clears pores and restores vitality.',
    volume: '100g',
  },
  {
    id: 'org-5',
    name: 'Henna Packet',
    price: 9.0,
    originalPrice: 20.0,
    discountBadge: '-55%',
    image:
      'https://organica-1.myshopify.com/cdn/shop/products/10-400x490_e4bf9eea-3254-4b62-a77b-183c9b6bf26b_800x.jpg',
    hoverImage:
      'https://organica-1.myshopify.com/cdn/shop/products/1-800x980_9745bb78-5a90-4640-a038-92e65b6dd60e_800x.jpg',
    category: 'health',
    rating: 4.7,
    reviewCount: 21,
    inStock: true,
    description:
      'Triple-sifted 100% Rajasthani organic henna powder for natural hair conditioning and rich auburn tones.',
    volume: '250g',
  },
  {
    id: 'org-6',
    name: 'Ho-wo screen',
    price: 6.0,
    originalPrice: 12.0,
    discountBadge: '-50%',
    image:
      'https://organica-1.myshopify.com/cdn/shop/products/8-400x490_7098ea3c-3378-499b-9731-4ab163e9a5ab_800x.jpg',
    hoverImage:
      'https://organica-1.myshopify.com/cdn/shop/products/29-800x980_fe909153-d19d-4696-9752-0bc63238b870_800x.jpg',
    category: 'newest',
    rating: 4.8,
    reviewCount: 39,
    inStock: true,
    description:
      'Broad spectrum mineral sun defense with sheer finish and broad UVA/UVB reflection.',
    volume: '75ml',
  },
  {
    id: 'org-7',
    name: 'Herbal Makeup Foundation',
    price: 12.0,
    originalPrice: 25.0,
    discountBadge: '-52%',
    image:
      'https://organica-1.myshopify.com/cdn/shop/products/29-800x980_fe909153-d19d-4696-9752-0bc63238b870_800x.jpg',
    hoverImage:
      'https://organica-1.myshopify.com/cdn/shop/products/35-400x490_1cfecef0-4f4f-4527-8c56-be019b7f500d_800x.jpg',
    category: 'beauty',
    rating: 4.9,
    reviewCount: 44,
    inStock: true,
    description:
      'Breathable organic foundation that provides medium-buildable satin finish with skincare benefits.',
    volume: '30ml',
  },
  {
    id: 'org-8',
    name: 'Nail Polish Remover Organic',
    price: 8.0,
    originalPrice: 14.0,
    discountBadge: '-43%',
    image:
      'https://organica-1.myshopify.com/cdn/shop/products/35-400x490_1cfecef0-4f4f-4527-8c56-be019b7f500d_800x.jpg',
    hoverImage:
      'https://organica-1.myshopify.com/cdn/shop/products/12-800x980_800x.jpg',
    category: 'newest',
    rating: 4.6,
    reviewCount: 18,
    inStock: true,
    description:
      'Acetone-free, soy-based remover enriched with vitamin E and nourishing argan oil.',
    volume: '100ml',
  },
  {
    id: 'org-9',
    name: 'Volution Makeup Palette',
    price: 22.0,
    originalPrice: 45.0,
    discountBadge: '-51%',
    image:
      'https://organica-1.myshopify.com/cdn/shop/products/12-800x980_800x.jpg',
    hoverImage:
      'https://organica-1.myshopify.com/cdn/shop/products/1-800x980_54cdb1c9-e10d-4d53-a4cf-f9de4b583da6_800x.jpg',
    category: 'beauty',
    rating: 5.0,
    reviewCount: 62,
    inStock: true,
    description:
      '12 earthy mineral pigment eye shadows and cheek powders inspired by autumn foliage.',
    volume: '18g',
  },
  {
    id: 'org-10',
    name: 'Organic Pure Green Kiwi Jar',
    price: 15.0,
    originalPrice: 25.0,
    discountBadge: '-40%',
    image:
      'https://organica-1.myshopify.com/cdn/shop/products/1-800x980_54cdb1c9-e10d-4d53-a4cf-f9de4b583da6_800x.jpg',
    hoverImage:
      'https://organica-1.myshopify.com/cdn/shop/products/3-400x490_8145b50a-2cc1-458e-84be-be34df21b6e0_800x.jpg',
    category: 'health',
    rating: 4.9,
    reviewCount: 37,
    inStock: true,
    description:
      'Sun-dried organic green kiwi slices enriched with vitamin C and active dietary enzymes.',
    volume: '200g',
  },
]

export const ORGANICA_DUAL_BANNERS: OrganicaDualBanner[] = [
  {
    id: 'dual-1',
    tag: 'FARM FRESH',
    title: 'The Best Milk From Cow',
    subtitle: 'Pure grass-fed whole milk & artisan butter biscuits.',
    buttonText: 'SHOP NOW',
    image:
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dual-2',
    tag: 'SPECIAL OFFER',
    title: 'SALE UP TO 70%',
    subtitle: 'Organic cream & Mega mushroom skin relife.',
    buttonText: 'DISCOVER NOW',
    image:
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
  },
]

export const ORGANICA_CATEGORY_BOXES: OrganicaCategoryBox[] = [
  {
    id: 'box-1',
    title: 'Organic Rice',
    subtitle: 'Naturally cultivated aromatic basmati & jasmine grains.',
    image:
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80',
    buttonText: 'Shop now',
  },
  {
    id: 'box-2',
    title: 'Organic Flour',
    subtitle: 'Stoneground whole grain organic baking flours.',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80',
    buttonText: 'Shop now',
  },
  {
    id: 'box-3',
    title: 'Contact Us',
    subtitle: 'Do you have questions about custom wholesale orders?',
    image:
      'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=500&q=80',
    buttonText: 'Contact now',
  },
]

export const ORGANICA_TESTIMONIAL: OrganicaTestimonial = {
  id: 'org-test',
  author: 'Mr Right!',
  role: 'Loyal Customer',
  avatar:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  content:
    'The technical support for this theme is awesome! I had several issues and each time they were prompt in working with me and solving the issue. I highly recommend Organica cosmetics and clean healthy superfoods!',
}

export const ORGANICA_BLOG_POSTS: OrganicaBlogPost[] = [
  {
    id: 'blog-1',
    day: '31',
    month: 'MARCH',
    title: 'Aenean commodo ligula eget dolor Aenean massa',
    author: 'Organica Theme Admin',
    excerpt:
      'Portals seize data-driven tag expedite streamline proactive testing metrics for holistic wellness.',
    image:
      'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'blog-2',
    day: '25',
    month: 'MARCH',
    title: 'Why stoneground organic flour changes daily digestion',
    author: 'Organica Nutritionist',
    excerpt:
      'Ancient grains retain essential vitamins B and E, providing sustained energy throughout your day.',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'blog-3',
    day: '18',
    month: 'MARCH',
    title: 'Natural herbal remedies for seasonal skin protection',
    author: 'Skincare Specialist',
    excerpt:
      'Discover cold-pressed botanical oils that build a strong lipid barrier against dry winter air.',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
  },
]


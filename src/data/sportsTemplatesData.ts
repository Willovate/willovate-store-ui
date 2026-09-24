import type { MarketplaceTemplate } from '../types'

export interface SportsProduct {
  id: string
  name: string
  category: string
  price: string
  compareAtPrice?: string
  image: string
  badge?: string
  rating: number
  reviewCount: number
  colors?: string[]
  sizes?: string[]
  techSpecs?: string[]
}

export interface SportsTemplateConfig {
  template: MarketplaceTemplate
  announcement?: string
  navItems: string[]
  heroStats?: { label: string; value: string }[]
  categories: { id: string; name: string; image: string; badge?: string; count?: string }[]
  featuredProducts: SportsProduct[]
  newArrivals?: SportsProduct[]
  bestSellers?: SportsProduct[]
  promoBanner?: {
    tag: string
    title: string
    subtitle: string
    code?: string
    discount?: string
    buttonText: string
    image?: string
    endDate?: string
  }
  techFeatures?: { icon: string; title: string; desc: string }[]
  story?: {
    eyebrow: string
    title: string
    quote: string
    author: string
    role: string
    image: string
    stats?: { num: string; label: string }[]
  }
  guides?: { title: string; tag: string; time: string; image: string; desc: string }[]
  reviews?: { name: string; role: string; quote: string; rating: number; verified?: boolean }[]
  faqs?: { q: string; a: string }[]
  collections?: { title: string; tag: string; image: string; count?: string }[]
  socialGallery?: { image: string; handle: string; likes: string }[]
}

export const SPORTS_TEMPLATES_CONFIG: Record<string, SportsTemplateConfig> = {
  'sports-velocity': {
    template: {
      id: 'sports-velocity',
      slug: 'sports-velocity',
      name: 'Velocity',
      businessType: 'sporting-goods',
      industryCategory: 'Sports Store',
      style: 'bold',
      catalogSize: 'large',
      tags: ['Performance Sports', 'Athletic', 'High Energy', 'Training', 'Footwear'],
      shortDescription: 'High-energy, motion-inspired layout with aggressive volt typography, kinetic product grids, and athlete telemetry data.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=80',
      fullPreviewUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1600&auto=format&fit=crop&q=85',
      popularityScore: 99,
      isActive: true,
      brandName: 'VELOCITY // LAB',
      headline: 'BREAK THE SPEED OF SOUND.\nZERO DRAG. MAX FORCE.',
      subtitle: 'Engineered with kinetic carbon-weave lattice and aerodynamic compression zones for elite competitive athletes.',
      buttonText: 'Shop Speed Drop',
      buttonColor: '#ccff00',
      accentColor: '#ccff00',
      isDark: true,
      modelImage: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=80',
      badge: 'recommended',
      rating: 4.96,
      reviewCount: 142,
      layoutType: 'bold-minimal',
      features: ['Kinetic Zoom Viewer', 'Dynamic Size Finder', 'Live Telemetry Badges', 'Rapid Quick-Buy', 'Color Wave Swatches'],
    },
    announcement: '⚡ FLASH VELOCITY DROP: Free Global Express on orders over $120 • Use Code: HYPERSONIC',
    navItems: ['Men', 'Women', 'Footwear', 'Performance Lab', 'Speedwear', 'Athletes'],
    heroStats: [
      { label: 'Energy Return', value: '88.4%' },
      { label: 'Weight', value: '168g' },
      { label: 'Tested By', value: '45+ Olympians' },
    ],
    categories: [
      { id: 'men', name: "Men's Performance", image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80', count: '64 Items' },
      { id: 'women', name: "Women's Speed", image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80', count: '58 Items' },
      { id: 'footwear', name: 'Kinetic Spikes & Flats', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80', count: '32 Items' },
      { id: 'apparel', name: 'Aero Compression Gear', image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=600&auto=format&fit=crop&q=80', count: '41 Items' },
    ],
    featuredProducts: [
      {
        id: 'vel-01',
        name: 'HyperSonic Carbon Pro 3',
        category: 'Footwear',
        price: '$230.00',
        compareAtPrice: '$260.00',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
        badge: 'NEW RECORD',
        rating: 4.9,
        reviewCount: 88,
        colors: ['#ccff00', '#0f172a', '#e11d48'],
        sizes: ['US 8', 'US 9', 'US 10', 'US 11'],
        techSpecs: ['Carbon-Weave Plate', 'Nitro-Infused Foam', '168g Featherweight'],
      },
      {
        id: 'vel-02',
        name: 'AeroShift Seamless Speed Top',
        category: 'Apparel',
        price: '$85.00',
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
        badge: 'ZERO DRAG',
        rating: 4.8,
        reviewCount: 54,
        colors: ['#0f172a', '#ccff00', '#64748b'],
        sizes: ['S', 'M', 'L', 'XL'],
        techSpecs: ['Hydrophobic Micro-Knit', 'Laser-Cut Venting'],
      },
      {
        id: 'vel-03',
        name: 'Kinetic 2-in-1 Sprint Short',
        category: 'Apparel',
        price: '$72.00',
        image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=600&auto=format&fit=crop&q=80',
        badge: 'BESTSELLER',
        rating: 4.9,
        reviewCount: 96,
        colors: ['#0f172a', '#334155'],
        sizes: ['S', 'M', 'L'],
        techSpecs: ['4-Way Stretch Compression', 'Anti-Chafe Welded Seams'],
      },
      {
        id: 'vel-04',
        name: 'Vortex Hydration Speed Vest',
        category: 'Accessories',
        price: '$110.00',
        image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=600&auto=format&fit=crop&q=80',
        badge: 'ULTRA LIGHT',
        rating: 4.7,
        reviewCount: 42,
        colors: ['#ccff00', '#0f172a'],
        sizes: ['S/M', 'L/XL'],
        techSpecs: ['Dual 500ml Flasks', 'Zero-Bounce Harness'],
      },
    ],
    newArrivals: [
      {
        id: 'vel-05',
        name: 'Quantum Aero Flight Jacket',
        category: 'Outerwear',
        price: '$195.00',
        image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&auto=format&fit=crop&q=80',
        badge: 'JUST DROPPED',
        rating: 4.9,
        reviewCount: 19,
        colors: ['#0f172a', '#ccff00'],
      },
      {
        id: 'vel-06',
        name: 'Vector Carbon Fiber Bottle Cage',
        category: 'Gear',
        price: '$45.00',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
        badge: '18 GRAMS',
        rating: 4.8,
        reviewCount: 31,
      },
    ],
    promoBanner: {
      tag: 'SEASON 04 CAMPAIGN',
      title: 'PRECISION OVER POWER',
      subtitle: 'Unlock 25% off all wind-tunnel certified performance apparel with instant membership sign-up.',
      code: 'SPEED25',
      discount: '25% OFF',
      buttonText: 'Claim Your Advantage',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80',
    },
    techFeatures: [
      { icon: '⚡', title: 'Carbon Lattice Matrix', desc: 'Proprietary 3D-woven carbon plate returns 88.4% of kinetic energy with zero flex fatigue.' },
      { icon: '💨', title: 'AeroFlow Dynamic Vents', desc: 'Wind-tunnel tested seam channels redirect turbulent airflow over shoulders and lats.' },
      { icon: '🛡️', title: 'ShieldSeam Bonding', desc: 'Ultrasonic welded seams eliminate 100% of thread friction during continuous motion.' },
    ],
    story: {
      eyebrow: 'ATHLETE DISPATCH // NO. 09',
      title: '“IT’S NOT ABOUT RUNNING FASTER. IT’S ABOUT REDEFINING WHAT FAST FEELS LIKE.”',
      quote: 'When every millisecond counts towards podium standing, you don’t compromise on kit. Velocity gives me the explosive snap I need out of every curve.',
      author: 'Marcus Vance',
      role: 'World Champion 200m Sprinter',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
      stats: [
        { num: '9.82s', label: 'Personal Best 100m' },
        { num: '14', label: 'International Medals' },
      ],
    },
  },
}

export const ALL_SPORTS_MARKETPLACE_TEMPLATES: MarketplaceTemplate[] = Object.values(SPORTS_TEMPLATES_CONFIG).map(
  (c) => c.template
)


import type { JewProduct } from '../types'
import prodLeaf from '../assets/prod-leaf-earrings.jpg'
import prodPendant from '../assets/prod-gold-pendant.jpg'
import prodClip from '../assets/prod-center-clip.jpg'
import prodOpulence from '../assets/prod-opulence-necklace.jpg'
import catEarrings from '../assets/category-earrings.jpg'
import catWedding from '../assets/category-wedding.jpg'
import catNecklaces from '../assets/category-necklaces.jpg'
import goldenGraceBanner from '../assets/golden-grace-banner.jpg'
import weddingRingsBanner from '../assets/wedding-rings-banner.jpg'
import heroSlide1 from '../assets/hero-slide-1.jpg'

export {
  prodLeaf,
  prodPendant,
  prodClip,
  prodOpulence,
  catEarrings,
  catWedding,
  catNecklaces,
  goldenGraceBanner,
  weddingRingsBanner,
  heroSlide1,
}

export const JEW_PRODUCTS: JewProduct[] = [
  {
    id: 'jew-leaf-earrings',
    name: 'Leaf Earings',
    category: 'Earrings',
    brand: 'Chimey',
    price: 27800,
    originalPrice: 32000,
    rating: 5,
    reviewCount: 38,
    isSoldOut: false,
    image: prodLeaf,
    hoverImage: prodClip,
    description: 'Delicately handcrafted pure 22K yellow gold leaf drop earrings inspired by organic botanical forms. Light as a feather and finished with a satin gold polish.',
    metals: ['22K Yellow Gold', '18K Rose Gold', 'Platinum'],
    tags: ['Earrings', 'Gold', 'Best Seller', 'Handmade'],
  },
  {
    id: 'jew-gold-pendant',
    name: 'Gold Pendant',
    category: 'Necklaces',
    brand: 'Asset',
    price: 45000,
    originalPrice: 48500,
    rating: 5,
    reviewCount: 42,
    isSoldOut: true,
    image: prodPendant,
    hoverImage: prodOpulence,
    description: 'Iconic mesh-woven 22K solid gold eternity sphere pendant necklace with dangling spherical bell charms. An heirloom piece of timeless craftsmanship.',
    metals: ['22K Yellow Gold', '18K White Gold'],
    tags: ['Pendants', 'Gold', 'Exclusive', 'Sold Out'],
  },
  {
    id: 'jew-center-clip',
    name: 'Center Clip',
    category: 'Earrings',
    brand: 'Thrive',
    price: 25000,
    originalPrice: 29000,
    rating: 5,
    reviewCount: 29,
    isSoldOut: false,
    image: prodClip,
    hoverImage: prodLeaf,
    description: 'Royal antique Rajputana sapphire and uncut polki center brooch & earring clip featuring delicate multi-tiered cascading gold tassel chains.',
    metals: ['22K Antique Gold', '18K Yellow Gold'],
    tags: ['Vintage', 'Sapphire', 'Trending'],
  },
  {
    id: 'jew-opulence-necklace',
    name: 'Opulence Necklace',
    category: 'Necklaces',
    brand: 'Asset',
    price: 41458,
    originalPrice: 46000,
    rating: 5,
    reviewCount: 56,
    isSoldOut: false,
    image: prodOpulence,
    hoverImage: prodPendant,
    description: 'Hammered medallion pendant suspended from an intricate braided gold snake chain. Designed to catch warm candlelight and glow with understated luxury.',
    metals: ['22K Yellow Gold', '18K Yellow Gold'],
    tags: ['Necklaces', 'Opulence', 'Featured'],
  },
  {
    id: 'jew-wedding-couple-bands',
    name: 'Matching Couple Wedding Bands',
    category: 'Wedding Collection',
    brand: 'Thrive',
    price: 64000,
    originalPrice: 72000,
    rating: 5,
    reviewCount: 64,
    isSoldOut: false,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&auto=format&fit=crop&q=80',
    description: 'Sleek comfort-fit dual 18K solid gold wedding bands. Perfectly balanced matching his and hers silhouettes symbolising an eternal, unbreakable bond.',
    metals: ['18K Yellow Gold', 'Platinum 950', 'Rose Gold'],
    tags: ['Wedding Collection', 'Rings', 'Couple'],
  },
  {
    id: 'jew-pearl-cuff-bangle',
    name: 'Artisan Pearl Hinged Bangle',
    category: 'Bracelets',
    brand: 'Chimey',
    price: 36500,
    originalPrice: 42000,
    rating: 5,
    reviewCount: 24,
    isSoldOut: false,
    image: 'https://images.unsplash.com/photo-1611591475155-4284ec289e61?w=800&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80',
    description: 'Double openwork geometric gold cuff adorned with graduated natural freshwater pearls. Features an invisible spring hinge for effortless daily wear.',
    metals: ['18K Solid Gold', '22K Gold Vermeil'],
    tags: ['Bracelets', 'Pearls', 'Modern'],
  },
]

export const JEW_CATEGORIES = [
  {
    id: 'earrings',
    name: 'Earrings',
    count: '24 Designs',
    image: catEarrings,
  },
  {
    id: 'wedding-collection',
    name: 'Wedding Collection',
    count: '38 Designs',
    image: catWedding,
  },
  {
    id: 'necklaces',
    name: 'Necklaces',
    count: '19 Designs',
    image: catNecklaces,
  },
]

export const JEW_SERVICE_PILLARS = [
  {
    id: 'free-shipping',
    title: 'Free Worldwide Delivery',
    subtitle: 'Complimentary insured shipping on all orders over Rs. 999',
    icon: 'shipping',
  },
  {
    id: 'hallmark',
    title: '100% Certified Jewelry',
    subtitle: 'Every piece certified with government hallmark & BIS stamp',
    icon: 'certificate',
  },
  {
    id: 'returns',
    title: '30-Day Easy Returns',
    subtitle: 'Hassle-free money-back guarantee with complimentary return pickup',
    icon: 'returns',
  },
  {
    id: 'support',
    title: '24/7 Concierge Support',
    subtitle: 'Dedicated gemologists ready to assist you anytime online',
    icon: 'support',
  },
]

export const JEW_HERO_SLIDES = [
  {
    id: 'slide-1',
    badge: 'VEGA JEWELRY STAR',
    title1: 'FEATHERWEIGHT',
    title2: 'FINDS',
    subtitle:
      'Sit amet consectetur adipiscing elit. Id leo in vitae turpis massa sed elementum tempus egestas. Et malesuada fames ac turpis egestas maecenas. Commodo sed egestas egestas fringilla phasellus faucibus. Dictum non consectetur a erat nam at lectus urna duis.',
    buttonText: 'Explore Collections',
    image: heroSlide1,
  },
  {
    id: 'slide-2',
    badge: 'VEGA JEWELRY STAR',
    title1: 'EFFORTLESS',
    title2: 'GLAMOUR',
    subtitle:
      'A bespoke celebration of statement chains, modern solitaires, and heirloom gold craft designed to elevate your everyday silhouette with quiet luxury.',
    buttonText: 'Shop New Arrivals',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=80',
  },
]

export const JEW_BLOG_POSTS = [
  {
    id: 'blog-1',
    date: '12 OCT',
    title: 'How to Choose the Perfect Wedding Rings for Your Big Day',
    excerpt: 'Explore essential advice from master goldsmiths on metal durability, matching profiles, and comfortable everyday wear.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700&auto=format&fit=crop&q=80',
  },
  {
    id: 'blog-2',
    date: '28 SEP',
    title: 'The Modern Resurgence of 22K Solid Gold Statement Chains',
    excerpt: 'From featherweight links to bold curb bracelets, discover how layering warm solid gold transforms understated outfits.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=700&auto=format&fit=crop&q=80',
  },
  {
    id: 'blog-3',
    date: '14 SEP',
    title: 'Preserving Heirloom Jewels: Cleaning & Storage Etiquette',
    excerpt: 'Gentle cleaning techniques and expert storage tips to keep your polki, emeralds, and diamonds sparkling for generations.',
    image: 'https://images.unsplash.com/photo-1611591475155-4284ec289e61?w=700&auto=format&fit=crop&q=80',
  },
  {
    id: 'blog-4',
    date: '02 SEP',
    title: 'The Art of Layering: Necklaces, Chokers & Pendants',
    excerpt: 'A styling masterclass on pairing different chain lengths, stone cuts, and textures to build a curated jewelry wardrobe.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=700&auto=format&fit=crop&q=80',
  },
]


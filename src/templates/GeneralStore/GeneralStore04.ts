import type { TemplateConfig } from '../../types/template'

export const GeneralStore04: TemplateConfig = {
  id: 'nook',
  name: 'Nook',
  description: 'Nook — thoughtfully chosen things for everyday living. A curated collection of things that make everyday spaces and routines better.',
  categories: [{ id: 'general', name: 'General Store' }],
  tags: [{ id: 'curated', name: 'Curated' }, { id: 'lifestyle', name: 'Lifestyle' }, { id: 'home', name: 'Home' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: '"Playfair Display", serif', body: '"Inter", sans-serif' },
    colors: { primary: '#292524', background: '#f5f3ee', accent: '#66745b' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'COMPLIMENTARY SHIPPING ON ORDERS OVER $50. THOUGHTFULLY PACKAGED.' } },
    { id: 's2', type: 'navbar', props: { brand: 'NOOK', style: 'minimal' } },
    { id: 's3', type: 'full-hero', props: {
      title: 'Small things.\nBetter everyday.',
      subtitle: 'Made for the spaces you live in. Everyday objects, thoughtfully chosen to bring calm and organization to your routine.',
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1600',
      ctaLabel: 'Shop The Collection'
    } },
    { id: 's4', type: 'bento-grid', props: {
      title: 'Explore Nook',
      items: [
        { title: 'Kitchen', description: 'Tools for nourishing routines.', size: 'large', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800' },
        { title: 'Workspace', description: 'Clear space, clear mind.', size: 'small', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=400' },
        { title: 'Personal Care', description: 'Quiet moments.', size: 'small', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=400' },
        { title: 'Home', description: 'Warm accents.', size: 'small', image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's5', type: 'catalog', props: {
      title: 'Curated Essentials',
      products: [
        { id: 'nk1', name: 'Ceramic Pour-Over Set', description: 'Kitchen', price: 45, imageUrl: 'https://images.unsplash.com/photo-1517006886278-f71f6d0f01ba?auto=format&fit=crop&q=80&w=600' },
        { id: 'nk2', name: 'Woven Cotton Throw', description: 'Home', price: 65, imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600' },
        { id: 'nk3', name: 'Glass Storage Jar Set', description: 'Organization', price: 38, imageUrl: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=600' },
        { id: 'nk4', name: 'Minimalist Desk Tray', description: 'Workspace', price: 24, imageUrl: 'https://images.unsplash.com/photo-1596526131083-e8c638c478d5?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'split-hero', props: {
      title: 'A Place for Everything.',
      subtitle: 'We believe that organization isn\'t about hiding your life away—it\'s about giving the things you love a proper home.',
      image: 'https://images.unsplash.com/photo-1595514535316-24eb22442ad4?auto=format&fit=crop&q=80&w=800',
      ctaLabel: 'Shop Storage',
      imageRight: false
    } },
    { id: 's7', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?auto=format&fit=crop&q=80&w=800',
      name: 'The Linen Apron',
      category: 'Kitchen',
      description: 'Crafted from 100% organic stonewashed linen. Designed with deep pockets and a cross-back for comfortable all-day wear in the kitchen or garden.',
      price: 55,
      features: ['100% Organic Linen', 'Cross-back Design', 'Machine Washable'],
      badge: 'Bestseller',
      imageRight: true
    } },
    { id: 's8', type: 'catalog', props: {
      title: 'For the Home',
      subtitle: 'Objects that bring warmth and texture to your space.',
      products: [
        { id: 'nk5', name: 'Beeswax Pillar Candle', description: 'Decor', price: 28, imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600' },
        { id: 'nk6', name: 'Hand-Carved Wooden Bowl', description: 'Kitchen', price: 42, imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=600' },
        { id: 'nk7', name: 'Linen Napkin Set', description: 'Dining', price: 32, imageUrl: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?auto=format&fit=crop&q=80&w=600' },
        { id: 'nk8', name: 'Seagrass Basket', description: 'Storage', price: 48, imageUrl: 'https://images.unsplash.com/photo-1528301721190-186c3bd85418?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's9', type: 'editorial-grid', props: {
      title: 'Slow Mornings',
      images: [
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=800'
      ]
    } },
    { id: 's10', type: 'shop-the-look', props: {
      title: 'The Ritual',
      subtitle: 'Everything you need for a quiet start.',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 40, y: 50, product: { name: 'Matte Ceramic Mug', price: 18 } },
        { x: 65, y: 70, product: { name: 'Oak Serving Tray', price: 45 } },
        { x: 25, y: 30, product: { name: 'Linen Hand Towel', price: 22 } }
      ]
    } },
    { id: 's11', type: 'promo', props: {
      text: 'THE SPRING RESET: REFRESH YOUR SPACE WITH 20% OFF ALL ORGANIZATION ESSENTIALS.'
    } },
    { id: 's12', type: 'catalog', props: {
      title: 'Community Favorites',
      products: [
        { id: 'nk9', name: 'Amber Glass Soap Dispenser', description: 'Bath', price: 18, imageUrl: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=600' },
        { id: 'nk10', name: 'Canvas Tote Bag', description: 'Carry', price: 35, imageUrl: 'https://images.unsplash.com/photo-1597816041042-45e3ed609f98?auto=format&fit=crop&q=80&w=600' },
        { id: 'nk11', name: 'Bamboo Cleaning Brush', description: 'Kitchen', price: 12, imageUrl: 'https://images.unsplash.com/photo-1584820927498-cafe6c1c1f9b?auto=format&fit=crop&q=80&w=600' },
        { id: 'nk12', name: 'Leather Cord Organizer', description: 'Workspace', price: 15, imageUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's13', type: 'story', props: {
      title: 'Things Worth Keeping.',
      subtitle: 'Our Philosophy',
      content: 'In a world of disposability, we believe in surrounding ourselves with fewer, better things. Every item at Nook is selected for its utility, longevity, and the quiet beauty it brings to daily life.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200'
    } },
    { id: 's14', type: 'testimonials', props: {
      title: 'Notes from Our Customers',
      testimonials: [
        { quote: 'The ceramic pieces I ordered have become my favorite part of my morning routine. Truly beautiful craftsmanship.', author: 'Elena R.' },
        { quote: 'Finally, everyday items that don\'t compromise on aesthetics. The organizational tools have transformed my desk.', author: 'Michael T.' },
        { quote: 'Everything arrived beautifully packaged with zero plastic. You can tell they care about every detail.', author: 'Sarah W.' }
      ]
    } },
    { id: 's15', type: 'bento-grid', props: {
      title: 'The Nook Standard',
      items: [
        { title: 'Thoughtful Sourcing', description: 'Ethical and sustainable materials.', span: 1 },
        { title: 'Plastic-Free Packaging', description: 'Recyclable and compostable.', span: 1 },
        { title: 'Easy Returns', description: '30 days to decide if it fits your space.', span: 1 },
        { title: 'Dedicated Support', description: 'We\'re here to help you choose.', span: 1 }
      ]
    } },
    { id: 's16', type: 'newsletter', props: {
      title: 'Join the Nook',
      subtitle: 'A weekly note on slow living, seasonal curations, and early access to new collections.',
      buttonText: 'Subscribe'
    } },
    { id: 's17', type: 'footer', props: {
      brand: 'NOOK',
      text: 'Thoughtfully chosen things for everyday living.',
      social: [
        { label: 'Pinterest', href: '#' },
        { label: 'Instagram', href: '#' },
        { label: 'Journal', href: '#' }
      ]
    } }
  ]
}

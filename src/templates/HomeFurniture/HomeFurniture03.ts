import type { TemplateConfig } from '../../types/template'

export const HomeFurniture03: TemplateConfig = {
  id: 'haven',
  name: 'Haven',
  description: 'Premium modern furniture showroom with a clean, approachable aesthetic.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'modern', name: 'Modern' }, { id: 'premium', name: 'Premium' }, { id: 'cozy', name: 'Cozy' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: true,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#2d3326', background: '#fcfcfc', accent: '#a68c70' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Complimentary white-glove delivery on all orders over $1,500.' } },
    { id: 's2', type: 'navbar', props: { brand: 'Haven', style: 'minimal' } },
    { id: 's3', type: 'full-hero', props: {
      title: 'Modern living, curated.',
      subtitle: 'Discover pieces that make your house feel like home.',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1600',
      ctaLabel: 'Shop Now'
    } },
    { id: 's4', type: 'category-grid', props: {
      title: 'Shop by Room',
      categories: [
        { name: 'Living Room', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=600' },
        { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600' },
        { name: 'Dining', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600' },
        { name: 'Textiles & Decor', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's5', type: 'split-hero', props: {
      title: 'Rooms made for living.',
      subtitle: 'Every piece in our collection is designed to bring warmth, comfort, and character into your everyday life.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
      ctaLabel: 'Explore the Collection'
    } },
    { id: 's6', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
      name: 'Oatmeal Linen Sofa',
      category: 'Living Room',
      description: 'Our signature piece. Wrapped in premium Belgian linen over a kiln-dried hardwood frame, offering unparalleled comfort and timeless style.',
      price: 2400,
      features: ['Belgian Linen', 'Kiln-dried Hardwood', 'Feather-blend Cushions'],
      imageRight: true,
      badge: 'Best Seller'
    } },
    { id: 's7', type: 'catalog', props: {
      products: [
        { id: 'hf1', name: 'Haven Boucle Lounge Chair', description: 'Curved Cream Boucle', price: 850, category: 'Living Room', imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600' },
        { id: 'hf2', name: 'Solid Ash Coffee Table', description: 'Natural Rounded Edge', price: 550, category: 'Living Room', imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
        { id: 'hf3', name: 'Ceramic Artisan Vase', description: 'Handcrafted Sand Glaze', price: 95, category: 'Textiles & Decor', imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=600' },
        { id: 'hf4', name: 'Woven Organic Throw', description: 'Heavyweight Cotton Weave', price: 120, category: 'Textiles & Decor', imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=600' },
        { id: 'hf5', name: 'Modular Linen Sectional', description: 'Deep Seated Down Fill', price: 2400, category: 'Living Room', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600' },
        { id: 'hf6', name: 'Natural Oak Dining Table', description: 'Solid European White Oak', price: 1650, category: 'Dining', imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' },
        { id: 'hf7', name: 'Cane & Oak Dining Chair', description: 'Hand-woven Cane Back', price: 380, category: 'Dining', imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600' },
        { id: 'hf8', name: 'Upholstered Platform Bed', description: 'Textured Oatmeal Linen', price: 1950, category: 'Bedroom', imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600' },
        { id: 'hf9', name: 'Slatted Ash Nightstand', description: 'Soft-Close Single Drawer', price: 420, category: 'Bedroom', imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600' },
        { id: 'hf10', name: 'Hand-Knotted Jute Rug', description: 'Braided Natural Fibers', price: 680, category: 'Textiles & Decor', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600' },
        { id: 'hf11', name: 'Boucle Accent Ottoman', description: 'Sculptural Round Footrest', price: 340, category: 'Living Room', imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600' },
        { id: 'hf12', name: 'Stoneware Table Lamp', description: 'Textured Ceramic Base', price: 210, category: 'Textiles & Decor', imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { id: 'hf13', name: 'Ash Wood Sideboard', description: 'Four Fluted Cabinet Doors', price: 1550, category: 'Dining', imageUrl: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=600' },
        { id: 'hf14', name: '6-Drawer Bedroom Dresser', description: 'Solid Ash Horizontal Chest', price: 1750, category: 'Bedroom', imageUrl: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&q=80&w=600' },
        { id: 'hf15', name: 'Organic Cotton Duvet Set', description: 'Washed European Flax', price: 240, category: 'Bedroom', imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600' },
        { id: 'hf16', name: 'Pedestal Breakfast Table', description: 'Circular Ash Dining Table', price: 890, category: 'Dining', imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's8', type: 'shop-the-look', props: {
      title: 'Warm Living Room',
      subtitle: 'A curated space balancing natural textures and soft neutral tones.',
      image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 30, y: 60, product: { name: 'Haven Boucle Lounge Chair', price: 850 } },
        { x: 70, y: 40, product: { name: 'Solid Ash Coffee Table', price: 550 } }
      ]
    } },
    { id: 's9', type: 'editorial-grid', props: {
      title: 'Quiet Mornings',
      images: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=600'
      ]
    } },
    { id: 's10', type: 'craftsmanship', props: {
      title: 'The Art of Making',
      description: 'We partner with master artisans to source the finest natural materials. From sustainably harvested oak to hand-spun wool, every element is chosen for its beauty and longevity.',
      mainImage: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800',
      metadata: [
        { label: 'Materials', value: 'Oak, Linen, Wool, Stone' },
        { label: 'Origin', value: 'Crafted in Europe' }
      ]
    } },
    { id: 's11', type: 'split-hero', props: {
      title: 'Designed for the way you live.',
      subtitle: 'We believe in comfort, longevity, and natural materials. Thoughtful design that creates timeless interiors you will love coming home to.',
      image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&q=80&w=800',
      ctaLabel: 'Read Our Story'
    } },
    { id: 's12', type: 'testimonials', props: {
      title: 'From Our Community',
      testimonials: [
        { quote: 'The most comfortable sofa we have ever owned. The linen feels incredible and the quality is obvious.', author: 'Sarah Jenkins' },
        { quote: 'Haven completely transformed our living room. Their pieces bring such a warm, inviting energy to the space.', author: 'Mark & Elena Davis' }
      ]
    } },
    { id: 's13', type: 'newsletter', props: {
      title: 'Join the Haven Community',
      description: 'Subscribe for early access to new collections and interior inspiration.',
      buttonText: 'Subscribe'
    } },
    { id: 's14', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Living', href: '#living' },
    { label: 'Dining', href: '#dining' },
    { label: 'Bedroom', href: '#bedroom' },
    { label: 'Décor', href: '#decor' }
  ],
  features: [
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'cart', label: 'Cart' }
  ]
}

export const Haven = HomeFurniture03

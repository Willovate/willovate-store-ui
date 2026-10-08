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
    { id: 's1', type: 'promo', props: { text: 'Complimentary white-glove delivery on all orders.' } },
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
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
      name: 'Oatmeal Linen Sofa',
      category: 'Seating',
      description: 'Our signature piece. Wrapped in premium Belgian linen over a kiln-dried hardwood frame, offering unparalleled comfort and timeless style.',
      price: 2400,
      features: ['Belgian Linen', 'Kiln-dried Hardwood', 'Feather-blend Cushions'],
      imageRight: true,
      badge: 'Best Seller'
    } },
    { id: 's7', type: 'catalog', props: {
      products: [
        { id: 'hf1', name: 'Lounge Chair', description: 'Boucle', price: 850, imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600' },
        { id: 'hf2', name: 'Coffee Table', description: 'Solid Ash', price: 550, imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
        { id: 'hf3', name: 'Ceramic Vase', description: 'Handcrafted', price: 95, imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=600' },
        { id: 'hf4', name: 'Woven Throw', description: 'Organic Cotton', price: 120, imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's8', type: 'shop-the-look', props: {
      title: 'Warm Living Room',
      subtitle: 'A curated space balancing natural textures and soft neutral tones.',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 30, y: 60, product: { name: 'Boucle Armchair', price: 950, imageUrl: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&q=80&w=600' } },
        { x: 70, y: 40, product: { name: 'Travertine Side Table', price: 420, imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=600' } }
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
    { label: 'Décor', href: '#decor' },
  ],
  features: [
    { id: 'account', label: 'My Account' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'cart', label: 'Cart' },
  ]
}

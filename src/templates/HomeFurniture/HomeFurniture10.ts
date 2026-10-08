import type { TemplateConfig } from '../../types/template'

export const Terra: TemplateConfig = {
  id: 'terra',
  name: 'Terra',
  description: 'Rustic, botanical, and earthy. Designed for spaces that bring the outside in.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'rustic', name: 'Rustic' }, { id: 'organic', name: 'Organic' }, { id: 'earthy', name: 'Earthy' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#333f2e', background: '#f5f7f2', accent: '#6b7a64' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Made from materials that belong together.' } },
    { id: 's2', type: 'navbar', props: { brand: 'TERRA', style: 'center' } },
    { id: 's3', type: 'full-hero', props: { 
      title: 'Bring the outside in.', 
      subtitle: 'We craft furniture using honest materials—stone, reclaimed wood, and natural linen—allowing nature to speak for itself.', 
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Explore the Organic Home' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'Elements of the Home', 
      categories: [
        { name: 'Furniture', image: 'https://images.unsplash.com/photo-1609081524998-a1163e2d44cb?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Lighting', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Objects', image: 'https://images.unsplash.com/photo-1520170350707-b2da59970118?auto=format&fit=crop&q=80&w=600' },
        { name: 'Textiles', image: 'https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'product-spotlight', props: { 
      image: 'https://images.unsplash.com/photo-1585298723682-7115561c51b7?auto=format&fit=crop&q=80&w=800', 
      name: 'The Reclaimed Console', 
      category: 'Signature', 
      description: 'Material first. Hand-hewn from century-old reclaimed timber, featuring raw, imperfect edges that celebrate the wood\'s history.', 
      price: 1850, 
      features: ['Solid Reclaimed Pine', 'Natural Oil Finish', 'Organic Live Edge'], 
      imageRight: false, 
      badge: 'Earthy' 
    } },
    { id: 's6', type: 'material-grid', props: { 
      title: 'Grounded by Nature', 
      subtitle: 'Materials chosen for their texture, their calm warmth, and how beautifully they age.', 
      materials: [
        { id: 'm1', name: 'Natural Oak', description: 'Warm-grained with visible natural variation.', image: 'https://images.unsplash.com/photo-1505236273191-1dce886b01e9?auto=format&fit=crop&q=80&w=600' }, 
        { id: 'm2', name: 'Limestone', description: 'Cool to the touch, earthy in appearance.', image: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?auto=format&fit=crop&q=80&w=600' }, 
        { id: 'm3', name: 'Organic Linen', description: 'Breathable fibers that soften with time.', image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=600' },
        { id: 'm4', name: 'Reclaimed Wood', description: 'Each piece carries its own quiet history.', image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's7', type: 'full-hero', props: { 
      title: 'Rooted in Material.', 
      subtitle: 'We believe in slower interiors. A connection to nature through honest materials and quiet spaces designed to ground you.', 
      image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Read the Terra Philosophy' 
    } },
    { id: 's8', type: 'shop-the-look', props: { 
      title: 'Morning Light', 
      subtitle: 'A room that breathes, layered with linen, raw wood, and botanical life.', 
      image: 'https://images.unsplash.com/photo-1529336953128-a85760f58cb5?auto=format&fit=crop&q=80&w=1600', 
      hotspots: [
        { x: 55, y: 55, product: { name: 'Field Oak Dining Table', price: 2400 } },
        { x: 35, y: 65, product: { name: 'Woven Reed Chair', price: 450 } },
        { x: 75, y: 35, product: { name: 'Stoneware Pendant', price: 320 } }
      ] 
    } },
    { id: 's9', type: 'catalog', props: {
      products: [
        { id: 'c1', name: 'Field Oak Dining Table', description: 'Solid Raw Oak', price: 2400, imageUrl: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&q=80&w=600' },
        { id: 'c2', name: 'Woven Reed Chair', description: 'Natural Rattan', price: 450, imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=600' },
        { id: 'c3', name: 'Linen Lounge Cover', description: 'Textured Earth', price: 180, imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600' },
        { id: 'c4', name: 'Jute Meadow Rug', description: 'Hand-woven', price: 350, imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's10', type: 'testimonials', props: { 
      title: 'From Our Homes', 
      testimonials: [
        { quote: 'The raw wood and stone have completely transformed our space. The materials feel alive and bring such a quiet, grounded atmosphere to our living room.', author: 'Sophie T.' },
        { quote: 'Terra understands how to make furniture feel like it grew naturally into the room. The textures are incredibly honest.', author: 'Mark D., Interior Stylist' }
      ] 
    } },
    { id: 's11', type: 'newsletter', props: { 
      title: 'Notes from the natural home.', 
      description: 'Sign up for our botanical reflections, seasonal materials, and quiet design notes.' 
    } },
    { id: 's12', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Furniture', href: '#furniture' },
    { label: 'Lighting', href: '#lighting' },
    { label: 'Sustainability', href: '#sustainability' },
    { label: 'Journal', href: '#journal' },
  ],
  features: [
    { id: 'cart', label: 'Cart' },
    { id: 'search', label: 'Search' },
  ]
}

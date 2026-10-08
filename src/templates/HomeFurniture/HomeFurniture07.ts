import type { TemplateConfig } from '../../types/template'

export const Nest: TemplateConfig = {
  id: 'nest',
  name: 'Nest',
  description: 'Warm minimalism, soft textures, and quiet residential storytelling.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'minimalist', name: 'Minimalist' }, { id: 'warm', name: 'Warm' }, { id: 'residential', name: 'Residential' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#4a4036', background: '#fdfbf7', accent: '#d98a6c' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Free shipping and extended 60-day returns.' } },
    { id: 's2', type: 'navbar', props: { brand: 'Nest', style: 'center' } },
    { id: 's3', type: 'split-hero', props: { 
      title: 'Made for the everyday moments.', 
      subtitle: 'Furniture that invites you to settle in. Designed with human scale and tactile materials for a warmer home.', 
      image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&q=80&w=800', 
      ctaLabel: 'Explore the Collection' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'Spaces to Live In', 
      categories: [
        { name: 'Living', image: 'https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Dining', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=600' },
        { name: 'Objects', image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'product-spotlight', props: { 
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800', 
      name: 'The Gentle Lounge Chair', 
      category: 'Living', 
      description: 'Generously proportioned and deeply comforting. Upholstered in brushed cotton that feels like a warm embrace.', 
      price: 1450, 
      features: ['Brushed Cotton Blend', 'Feather-wrapped Core', 'Solid Oak Base'], 
      imageRight: false, 
      badge: 'New Arrival' 
    } },
    { id: 's6', type: 'catalog', props: {
      products: [
        { id: 'c1', name: 'Linen Haven Sofa', description: 'Oatmeal', price: 2900, imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600' },
        { id: 'c2', name: 'Oak Side Table', description: 'Matte Finish', price: 420, imageUrl: 'https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&q=80&w=600' },
        { id: 'c3', name: 'Platform Bed', description: 'Warm Ash', price: 1800, imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=600' },
        { id: 'c4', name: 'Ceramic Table Lamp', description: 'Textured Sand', price: 280, imageUrl: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's7', type: 'shop-the-look', props: { 
      title: 'A Quiet Living Room', 
      subtitle: 'Soft textures, morning light, and objects that earn their keep.', 
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1600', 
      hotspots: [
        { x: 35, y: 65, product: { name: 'Linen Sofa', price: 2900 } },
        { x: 60, y: 75, product: { name: 'Oak Coffee Table', price: 850 } },
        { x: 75, y: 45, product: { name: 'Ceramic Lamp', price: 280 } }
      ] 
    } },
    { id: 's8', type: 'material-grid', props: { 
      title: 'Tactile by Nature', 
      subtitle: 'Materials chosen for how they feel against the skin and how beautifully they age.', 
      materials: [
        { id: 'm1', name: 'Solid Oak', image: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&q=80&w=600' }, 
        { id: 'm2', name: 'Brushed Cotton', image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=600' }, 
        { id: 'm3', name: 'Natural Wool', image: 'https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?auto=format&fit=crop&q=80&w=600' },
        { id: 'm4', name: 'Warm Stone', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's9', type: 'split-hero', props: { 
      title: 'The rituals of home.', 
      subtitle: 'We believe your home should be your softest landing. We design furniture that quietly supports your daily rituals, favoring enduring comfort over fleeting trends.', 
      image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&q=80&w=800', 
      ctaLabel: 'Read Our Story' 
    } },
    { id: 's10', type: 'testimonials', props: { 
      title: 'From Our Homes', 
      testimonials: [
        { quote: 'The Gentle Lounge Chair has become the centerpiece of my mornings. It feels incredibly personal and instantly comforting.', author: 'Elena R.' },
        { quote: 'Nest designs with such an understated elegance. Their pieces feel like they\'ve always belonged in the room.', author: 'Marcus V., Interior Architect' }
      ] 
    } },
    { id: 's11', type: 'editorial-grid', props: { 
      title: 'Quiet Corners', 
      images: [
        'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=600', 
        'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=80&w=600'
      ] 
    } },
    { id: 's12', type: 'newsletter', props: { 
      title: 'Notes for living well.', 
      description: 'Join our community for quiet reflections on home, design, and comfort.' 
    } },
    { id: 's13', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Living', href: '#living' },
    { label: 'Bedroom', href: '#bedroom' },
    { label: 'Dining', href: '#dining' },
    { label: 'Journal', href: '#journal' },
  ],
  features: [
    { id: 'cart', label: 'Cart' },
    { id: 'search', label: 'Search' },
  ]
}

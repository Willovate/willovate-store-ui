import type { TemplateConfig } from '../../types/template'

export const Linea: TemplateConfig = {
  id: 'linea',
  name: 'Linea',
  description: 'Nordic/Scandinavian functional minimalism.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'minimal', name: 'Minimal' }, { id: 'scandinavian', name: 'Scandinavian' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#2b2b2b', background: '#ffffff', accent: '#a1a8a2' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'LINEA', style: 'minimal' } },
    { id: 's2', type: 'split-hero', props: { title: 'Form and Function.', subtitle: 'Scandinavian design principles applied to everyday living.', image: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&q=80&w=800', ctaLabel: 'Shop Collection' } },
    { id: 's3', type: 'product-spotlight', props: { image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800', name: 'The Nørdic Chair', category: 'Seating', description: 'Bentwood frame with a natural woven seat.', price: 450, features: ['Ash Wood', 'Paper Cord', 'Stackable'], imageRight: true, badge: 'New' } },
    { id: 's4', type: 'story', props: {} },
    { id: 's5', type: 'material-grid', props: { title: 'Material Library', subtitle: 'Honest materials that patina over time.', materials: [{ id: 'ml1', name: 'Ash', image: 'https://images.unsplash.com/photo-1531685250784-7569952593d2?auto=format&fit=crop&q=80&w=600' }, { id: 'ml2', name: 'Linen', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600' }, { id: 'ml3', name: 'Paper Cord', image: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's6', type: 'catalog', props: {
      products: [
        { id: 'ln1', name: 'Minimal Dining Table', description: 'Birch Plywood', price: 1100, imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' },
        { id: 'ln2', name: 'Woven Chair', description: 'Ash & Paper Cord', price: 450, imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
        { id: 'ln3', name: 'Pendant Lamp', description: 'Matte White', price: 180, imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { id: 'ln4', name: 'Wool Rug', description: 'Light Grey', price: 420, imageUrl: 'https://images.unsplash.com/photo-1575414003593-0a373d5a5700?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's7', type: 'editorial-grid', props: { title: 'Designer Collection', images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's8', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Furniture', href: '#furniture' },
    { label: 'Lighting', href: '#lighting' },
    { label: 'About', href: '#about' },
  ],
  features: [
    { id: 'search', label: 'Search' },
    { id: 'cart', label: 'Cart' },
  ]
}

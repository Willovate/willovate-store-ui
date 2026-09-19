import type { TemplateConfig } from '../../types/template'

export const ModHaus: TemplateConfig = {
  id: 'modhaus',
  name: 'ModHaus',
  description: 'Contemporary, bold, geometric interiors.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'contemporary', name: 'Contemporary' }, { id: 'geometric', name: 'Geometric' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#111111', background: '#fafafa', accent: '#ff4500' } // Bold accent color
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'MODHAUS', style: 'utility' } },
    { id: 's2', type: 'hero', props: { title: 'Bold Geometry.', subtitle: 'Redefining the modern living space.', ctaLabel: 'Shop the Collection' } },
    { id: 's3', type: 'bento-grid', props: { title: 'Featured Pieces', items: [{ title: 'The Curve Sofa', description: 'Sculptural seating.', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600', size: 'large' }, { title: 'Orb Lamp', description: 'Diffused light.', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' }, { title: 'Geo Table', description: 'Solid concrete.', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's4', type: 'product-spotlight', props: { image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=800', name: 'Abstract Vase', category: 'Decor', description: 'Hand-painted ceramic with bold graphic lines.', price: 120, features: [], imageRight: false } },
    { id: 's5', type: 'feature-comparison', props: { title: 'Choose your style', features: ['Modular', 'Washable Covers', 'Recycled Fill'], items: [{ name: 'The Block Sofa', price: '$2400', highlights: [true, true, false] }, { name: 'The Cloud Sofa', price: '$2800', highlights: [false, true, true] }] } },
    { id: 's6', type: 'editorial-grid', props: { title: 'Trending Now', images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's7', type: 'newsletter', props: {} },
    { id: 's8', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'New Arrivals', href: '#new' },
    { label: 'Best Sellers', href: '#best' },
    { label: 'Sale', href: '#sale' },
  ],
  features: [
    { id: 'search', label: 'Search' },
    { id: 'cart', label: 'Cart' },
  ]
}

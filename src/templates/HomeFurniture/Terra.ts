import type { TemplateConfig } from '../../types/template'

export const Terra: TemplateConfig = {
  id: 'terra',
  name: 'Terra',
  description: 'Natural, sustainable home goods.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'sustainable', name: 'Sustainable' }, { id: 'organic', name: 'Organic' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&q=80&w=800', // Reusing an organic looking one, but let's change
  previewImages: [
    'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#333f2e', background: '#f5f7f2', accent: '#6b7a64' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'TERRA', style: 'center' } },
    { id: 's2', type: 'full-hero', props: { title: 'Return to nature.', subtitle: 'Sustainable furniture crafted from Earth\'s finest materials.', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=1600', ctaLabel: 'Shop Eco-Friendly' } },
    { id: 's3', type: 'material-grid', props: { title: 'Our Materials', subtitle: 'Every piece tells a story of conservation and care.', materials: [{ id: 't1', name: 'Bamboo', description: 'Fast-growing & renewable.', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600' }, { id: 't2', name: 'Reclaimed Wood', description: 'Given a second life.', image: 'https://images.unsplash.com/photo-1531685250784-7569952593d2?auto=format&fit=crop&q=80&w=600' }, { id: 't3', name: 'Organic Linen', description: 'Breathable and natural.', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's4', type: 'story', props: {} },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'tr1', name: 'Bamboo Bed Frame', description: 'Sustainable', price: 1100, imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=600' },
        { id: 'tr2', name: 'Organic Cotton Sheets', description: 'Queen Size', price: 180, imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600' },
        { id: 'tr3', name: 'Reclaimed Dining Table', description: 'Unique Grain', price: 2200, imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' },
        { id: 'tr4', name: 'Jute Rug', description: 'Hand-woven', price: 350, imageUrl: 'https://images.unsplash.com/photo-1575414003593-0a373d5a5700?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'testimonials', props: { title: 'Impact', testimonials: [{ quote: 'Terra makes it easy to furnish a home beautifully without compromising on ethics.', author: 'EcoLiving Magazine' }] } },
    { id: 's7', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Furniture', href: '#furniture' },
    { label: 'Bedding', href: '#bedding' },
    { label: 'Sustainability', href: '#sustainability' },
  ],
  features: [
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'cart', label: 'Cart' },
  ]
}

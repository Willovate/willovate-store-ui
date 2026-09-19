import type { TemplateConfig } from '../../types/template'

export const Forma: TemplateConfig = {
  id: 'forma',
  name: 'Forma',
  description: 'High-end architectural furniture studio.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'minimal', name: 'Minimal' }, { id: 'architectural', name: 'Architectural' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#1a1a1a', background: '#f5f5f5', accent: '#4a4a4a' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'FORMA', style: 'utility' } },
    { id: 's2', type: 'hero', props: { title: 'Form follows function.', subtitle: 'Architecturally inspired pieces for the modern home.', ctaLabel: 'View Collection' } },
    { id: 's3', type: 'product-spotlight', props: { image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800', name: 'The Outline Chair', category: 'Seating', description: 'A study in geometry and tension. Made from solid steel and full-grain leather.', price: 1200, features: ['Solid Steel Frame', 'Full-Grain Leather', 'Made in Italy'], imageRight: false, badge: 'Signature' } },
    { id: 's4', type: 'material-grid', props: { title: 'Materials matter.', subtitle: 'We source only the highest quality materials for longevity and character.', materials: [{ id: 'm1', name: 'Italian Leather', description: 'Ages beautifully with use.', image: 'https://images.unsplash.com/photo-1591147572379-3fb2e3bbda33?auto=format&fit=crop&q=80&w=600' }, { id: 'm2', name: 'Solid Oak', description: 'Sustainably harvested.', image: 'https://images.unsplash.com/photo-1628148817290-72ee3ef2f7b8?auto=format&fit=crop&q=80&w=600' }, { id: 'm3', name: 'Powder-coated Steel', description: 'Architectural grade.', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'f1', name: 'Structural Table', description: 'Dining', price: 3200, imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' },
        { id: 'f2', name: 'Arc Floor Lamp', description: 'Lighting', price: 850, imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { id: 'f3', name: 'Minimalist Bookshelf', description: 'Storage', price: 1400, imageUrl: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=600' },
        { id: 'f4', name: 'Leather Lounge', description: 'Seating', price: 4100, imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'full-hero', props: { title: '', subtitle: '', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600', ctaLabel: 'Explore Architecture' } },
    { id: 's7', type: 'specification-grid', props: { title: 'Design Philosophy', specs: [{ label: 'Origin', value: 'Designed in Berlin' }, { label: 'Approach', value: 'Reductionist' }, { label: 'Warranty', value: '10 Years' }] } },
    { id: 's8', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Collection', href: '#collection' },
    { label: 'Materials', href: '#materials' },
    { label: 'About', href: '#about' },
  ],
  features: [
    { id: 'account', label: 'My Account' },
    { id: 'cart', label: 'Cart' },
  ]
}

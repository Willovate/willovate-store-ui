import type { TemplateConfig } from '../../types/template'

export const Solace: TemplateConfig = {
  id: 'solace',
  name: 'Solace',
  description: 'A premium luxury furniture showroom aesthetic.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'luxury', name: 'Luxury' }, { id: 'premium', name: 'Premium' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: true,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#ffffff', background: '#0a0a0a', accent: '#b39c82' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'SOLACE', style: 'minimal' } },
    { id: 's2', type: 'full-hero', props: { title: 'The Art of Living', subtitle: 'Uncompromising luxury and cinematic design.', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600', ctaLabel: 'Discover' } },
    { id: 's3', type: 'product-spotlight', props: { image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800', name: 'The Executive Chair', category: 'Statement Piece', description: 'Hand-stitched Italian leather and polished walnut.', price: 5400, features: [], imageRight: true } },
    { id: 's4', type: 'category-grid', props: { title: 'Collections', categories: [{ name: 'Seating', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600' }, { name: 'Tables', image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' }, { name: 'Lighting', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's5', type: 'craftsmanship', props: { title: 'Exquisite Craftsmanship', description: 'Created by master artisans in Milan using heritage techniques.', mainImage: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800', metadata: [{ label: 'Origin', value: 'Milan, Italy' }], reverseLayout: true } },
    { id: 's6', type: 'catalog', props: {
      products: [
        { id: 'sl1', name: 'Marble Dining Table', description: 'Carrara Marble', price: 8500, imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' },
        { id: 'sl2', name: 'Designer Sofa', description: 'Velvet', price: 12000, imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600' },
        { id: 'sl3', name: 'Chandelier', description: 'Brass & Crystal', price: 4200, imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { id: 'sl4', name: 'Luxury Bed', description: 'King Size', price: 9000, imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's7', type: 'story', props: {} },
    { id: 's8', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Collections', href: '#collections' },
    { label: 'Designers', href: '#designers' },
    { label: 'Bespoke', href: '#bespoke' },
  ],
  features: [
    { id: 'account', label: 'Client Login' },
    { id: 'cart', label: 'Cart' },
  ]
}

import type { TemplateConfig } from '../../types/template'

export const HomeFurniture16: TemplateConfig = {
  id: 'nordic-house',
  name: 'Nordic House',
  description: 'Scandinavian-inspired furniture and home goods. Minimal, bright, functional and calm.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'scandinavian', name: 'Scandinavian' }, { id: 'bright', name: 'Bright' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#2a2a2a', background: '#fafafa', accent: '#73937E' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'NORDIC HOUSE', style: 'utility' } },
    { id: 's2', type: 'full-hero', props: { 
      title: 'Simple. Functional. Beautiful.', 
      subtitle: 'Scandinavian design for everyday living.', 
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Shop Furniture' 
    } },
    { id: 's3', type: 'category-grid', props: { 
      title: '', 
      categories: [
        { name: 'Furniture', image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Lighting', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Textiles', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's4', type: 'catalog', props: {
      products: [
        { id: 'h16_1', name: 'Birch Dining Chair', description: 'Seating', price: 290, imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=600' },
        { id: 'h16_2', name: 'Minimalist Desk Lamp', description: 'Lighting', price: 150, imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { id: 'h16_3', name: 'Wool Throw Blanket', description: 'Textiles', price: 120, imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600' },
        { id: 'h16_4', name: 'Ash Wood Table', description: 'Tables', price: 890, imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's5', type: 'editorial-grid', props: { title: 'Nordic Light', images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's6', type: 'material-grid', props: { 
      title: 'Honest Materials', 
      subtitle: '',
      materials: [
        { id: 'mat1', name: 'Light Oak', description: 'Sourced from managed forests.', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
        { id: 'mat2', name: 'Natural Wool', description: 'Unbleached and undyed.', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's7', type: 'newsletter', props: {} },
    { id: 's8', type: 'footer', props: {} }
  ]
}

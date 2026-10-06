import type { TemplateConfig } from '../../types/template'

export const HomeFurniture16: TemplateConfig = {
  id: 'nordic-house',
  name: 'Nordic House',
  description: 'Scandinavian-inspired furniture and home goods. Minimal, bright, functional and calm.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'scandinavian', name: 'Scandinavian' }, { id: 'bright', name: 'Bright' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=1600'
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
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Shop Furniture' 
    } },
    { id: 's3', type: 'category-grid', props: { 
      title: '', 
      categories: [
        { name: 'Furniture', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Lighting', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Textiles', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's4', type: 'catalog', props: {
      products: [
        { id: 'h16_1', name: 'Birch Dining Chair', description: 'Seating', price: 290, imageUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=600' },
        { id: 'h16_2', name: 'Minimalist Desk Lamp', description: 'Lighting', price: 150, imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=600' },
        { id: 'h16_3', name: 'Wool Throw Blanket', description: 'Textiles', price: 120, imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=600' },
        { id: 'h16_4', name: 'Ash Wood Table', description: 'Tables', price: 890, imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's5', type: 'editorial-grid', props: { title: 'Nordic Light', images: ['https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's6', type: 'material-grid', props: { 
      title: 'Honest Materials', 
      subtitle: '',
      materials: [
        { id: 'mat1', name: 'Light Oak', description: 'Sourced from managed forests.', image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=600' },
        { id: 'mat2', name: 'Natural Wool', description: 'Unbleached and undyed.', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's7', type: 'newsletter', props: {} },
    { id: 's8', type: 'footer', props: {} }
  ]
}

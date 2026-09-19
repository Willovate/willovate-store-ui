import type { TemplateConfig } from '../../types/template'

export const HomeFurniture17: TemplateConfig = {
  id: 'casa-modern',
  name: 'Casa Modern',
  description: 'Contemporary modern home store. High-end modern interiors with strong visual hierarchy.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'modern', name: 'Modern' }, { id: 'contemporary', name: 'Contemporary' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#111827', background: '#f9fafb', accent: '#4b5563' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'Casa Modern', style: 'center' } },
    { id: 's2', type: 'split-hero', props: { 
      title: 'Modern Living', 
      subtitle: 'Redefine your space with our contemporary collection.', 
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800', 
      ctaLabel: 'Shop the Collection' 
    } },
    { id: 's3', type: 'bento-grid', props: { 
      title: 'Featured Collections',
      items: [
        { title: 'The Lounge', description: 'Modern seating.', size: 'large', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800' },
        { title: 'Dining', description: 'Entertain in style.', size: 'small', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=400' },
        { title: 'Bedroom', description: 'Rest easy.', size: 'small', image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's4', type: 'catalog', props: {
      products: [
        { id: 'h17_1', name: 'Contemporary Sofa', description: 'Seating', price: 2100, imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600' },
        { id: 'h17_2', name: 'Glass Dining Table', description: 'Tables', price: 1250, imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600' },
        { id: 'h17_3', name: 'Platform Bed', description: 'Bedroom', price: 1800, imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=600' },
        { id: 'h17_4', name: 'Modern Table Lamp', description: 'Lighting', price: 280, imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's5', type: 'editorial-grid', props: { title: 'Room Showcase', images: ['https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's6', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800',
      name: 'The Modern Table Lamp',
      category: 'Lighting',
      description: 'A striking silhouette that provides warm, ambient lighting to any modern space.',
      price: 280,
      imageRight: false
    } },
    { id: 's7', type: 'footer', props: {} }
  ]
}

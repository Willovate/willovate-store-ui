import type { TemplateConfig } from '../../types/template'

export const HomeFurniture17: TemplateConfig = {
  id: 'casa-modern',
  name: 'Verde House',
  description: 'Contemporary modern home store. High-end modern interiors with strong visual hierarchy.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'modern', name: 'Modern' }, { id: 'contemporary', name: 'Contemporary' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1502899576159-f224dc2349fa?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&q=80&w=1600'
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
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=800', 
      ctaLabel: 'Shop the Collection' 
    } },
    { id: 's3', type: 'bento-grid', props: { 
      title: 'Featured Collections',
      items: [
        { title: 'The Lounge', description: 'Modern seating.', size: 'large', image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&q=80&w=800' },
        { title: 'Dining', description: 'Entertain in style.', size: 'small', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400' },
        { title: 'Bedroom', description: 'Rest easy.', size: 'small', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's4', type: 'catalog', props: {
      products: [
        { id: 'h17_1', name: 'Contemporary Sofa', description: 'Seating', price: 2100, imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600' },
        { id: 'h17_2', name: 'Glass Dining Table', description: 'Tables', price: 1250, imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=600' },
        { id: 'h17_3', name: 'Platform Bed', description: 'Bedroom', price: 1800, imageUrl: 'https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&q=80&w=600' },
        { id: 'h17_4', name: 'Modern Table Lamp', description: 'Lighting', price: 280, imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's5', type: 'editorial-grid', props: { title: 'Room Showcase', images: ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's6', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1506484381205-f7945653044d?auto=format&fit=crop&q=80&w=800',
      name: 'The Modern Table Lamp',
      category: 'Lighting',
      description: 'A striking silhouette that provides warm, ambient lighting to any modern space.',
      price: 280,
      imageRight: false
    } },
    { id: 's7', type: 'footer', props: {} }
  ]
}

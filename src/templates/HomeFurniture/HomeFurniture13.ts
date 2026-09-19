import type { TemplateConfig } from '../../types/template'

export const HomeFurniture13: TemplateConfig = {
  id: 'forma-living',
  name: 'Forma Living',
  description: 'Modern minimalist furniture brand. Architectural minimalism, large whitespace, strong typography.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'minimalist', name: 'Minimalist' }, { id: 'modern', name: 'Modern' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Helvetica, Arial, sans-serif', body: 'Helvetica, Arial, sans-serif' },
    colors: { primary: '#000000', background: '#ffffff', accent: '#666666' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'FORMA', style: 'minimal' } },
    { id: 's2', type: 'full-hero', props: { 
      title: 'Form follows function.', 
      subtitle: 'Minimalist pieces that redefine modern living.', 
      image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Shop Collection' 
    } },
    { id: 's3', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800',
      name: 'The Mono Chair',
      category: 'Seating',
      description: 'A singular expression of comfort and geometry. Crafted from a single piece of molded plywood.',
      price: 590,
      imageRight: true
    } },
    { id: 's4', type: 'catalog', props: {
      products: [
        { id: 'h13_1', name: 'Plywood Lounge', description: 'Seating', price: 590, imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
        { id: 'h13_2', name: 'Steel Side Table', description: 'Tables', price: 280, imageUrl: 'https://images.unsplash.com/photo-1532372576444-ea6ba6a78241?auto=format&fit=crop&q=80&w=600' },
        { id: 'h13_3', name: 'Minimalist Sofa', description: 'Seating', price: 1800, imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600' },
        { id: 'h13_4', name: 'Pendant Light', description: 'Lighting', price: 320, imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's5', type: 'specification-grid', props: { 
      title: 'Design Specifications',
      specs: [
        { label: 'Materials', value: 'Molded Plywood, Steel' },
        { label: 'Finishes', value: 'Matte Black, Natural Oak' },
        { label: 'Manufacturing', value: 'Precision CNC Milled' },
        { label: 'Warranty', value: '10 Years Structural' }
      ]
    } },
    { id: 's6', type: 'editorial-grid', props: { title: 'Spaces', images: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's7', type: 'footer', props: {} }
  ]
}

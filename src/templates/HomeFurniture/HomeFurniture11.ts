import type { TemplateConfig } from '../../types/template'

export const HomeFurniture11: TemplateConfig = {
  id: 'atelier',
  name: 'Atelier Home',
  description: 'Premium contemporary furniture studio. Editorial, architectural, and sophisticated.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'premium', name: 'Premium' }, { id: 'editorial', name: 'Editorial' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#111111', background: '#fafafa', accent: '#a3a3a3' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'ATELIER HOME', style: 'minimal' } },
    { id: 's2', type: 'full-hero', props: { 
      title: 'Architectural Elegance', 
      subtitle: 'Discover our new collection of structural lounge pieces.', 
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Explore Collection' 
    } },
    { id: 's3', type: 'bento-grid', props: { 
      title: 'Curated Selections',
      items: [
        { title: 'Living Room', description: 'Sculptural seating.', size: 'large', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800' },
        { title: 'Lighting', description: 'Ambient forms.', size: 'small', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=400' },
        { title: 'Decor', description: 'Artful accents.', size: 'small', image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's4', type: 'catalog', props: {
      products: [
        { id: 'h11_1', name: 'Velvet Lounge Chair', description: 'Seating', price: 1250, imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=600' },
        { id: 'h11_2', name: 'Marble Side Table', description: 'Tables', price: 850, imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
        { id: 'h11_3', name: 'Brass Floor Lamp', description: 'Lighting', price: 420, imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { id: 'h11_4', name: 'Ceramic Vase', description: 'Decor', price: 120, imageUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's5', type: 'craftsmanship', props: { 
      title: 'Our Process', 
      description: 'Every piece is meticulously crafted using premium materials to ensure longevity and timeless appeal.', 
      mainImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600',
      metadata: [{ label: 'Materials', value: 'Ethically Sourced' }, { label: 'Design', value: 'In-House Studio' }]
    } },
    { id: 's6', type: 'editorial-grid', props: { title: 'Room Inspiration', images: ['https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's7', type: 'newsletter', props: {} },
    { id: 's8', type: 'footer', props: {} }
  ]
}

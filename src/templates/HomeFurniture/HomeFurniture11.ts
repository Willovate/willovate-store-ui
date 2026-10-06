import type { TemplateConfig } from '../../types/template'

export const HomeFurniture11: TemplateConfig = {
  id: 'atelier-home',
  name: 'Atelier Home',
  description: 'Premium contemporary furniture studio. Editorial, architectural, and sophisticated.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'premium', name: 'Premium' }, { id: 'editorial', name: 'Editorial' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=1600'
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
      image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Explore Collection' 
    } },
    { id: 's3', type: 'bento-grid', props: { 
      title: 'Curated Selections',
      items: [
        { title: 'Living Room', description: 'Sculptural seating.', size: 'large', image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800' },
        { title: 'Lighting', description: 'Ambient forms.', size: 'small', image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=400' },
        { title: 'Decor', description: 'Artful accents.', size: 'small', image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's4', type: 'catalog', props: {
      products: [
        { id: 'h11_1', name: 'Velvet Lounge Chair', description: 'Seating', price: 1250, imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=600' },
        { id: 'h11_2', name: 'Marble Side Table', description: 'Tables', price: 850, imageUrl: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?auto=format&fit=crop&q=80&w=600' },
        { id: 'h11_3', name: 'Brass Floor Lamp', description: 'Lighting', price: 420, imageUrl: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&q=80&w=600' },
        { id: 'h11_4', name: 'Ceramic Vase', description: 'Decor', price: 120, imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's5', type: 'craftsmanship', props: { 
      title: 'Our Process', 
      description: 'Every piece is meticulously crafted using premium materials to ensure longevity and timeless appeal.', 
      mainImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600',
      metadata: [{ label: 'Materials', value: 'Ethically Sourced' }, { label: 'Design', value: 'In-House Studio' }]
    } },
    { id: 's6', type: 'editorial-grid', props: { title: 'Room Inspiration', images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's7', type: 'newsletter', props: {} },
    { id: 's8', type: 'footer', props: {} }
  ]
}

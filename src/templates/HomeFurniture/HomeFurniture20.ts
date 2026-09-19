import type { TemplateConfig } from '../../types/template'

export const HomeFurniture20: TemplateConfig = {
  id: 'maison-living',
  name: 'Maison Living',
  description: 'Premium luxury home marketplace. Elegant editorial/luxury ecommerce.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'luxury', name: 'Luxury' }, { id: 'premium', name: 'Premium' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: true,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#1a1a1a', background: '#ffffff', accent: '#cda434' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'MAISON', style: 'minimal' } },
    { id: 's2', type: 'split-hero', props: { 
      title: 'The Luxury of Home', 
      subtitle: 'Exclusive furniture pieces for the discerning collector.', 
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800', 
      ctaLabel: 'Discover Maison' 
    } },
    { id: 's3', type: 'bento-grid', props: { 
      title: 'The Editorial Edit',
      items: [
        { title: 'The Velvet Collection', description: 'Rich textures.', size: 'large', image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=800' },
        { title: 'Crystal Lighting', description: 'Illumination.', size: 'small', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=400' },
        { title: 'Fine Art', description: 'Masterpieces.', size: 'small', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's4', type: 'catalog', props: {
      products: [
        { id: 'h20_1', name: 'Velvet Sofa', description: 'Premium Seating', price: 4500, imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_2', name: 'Crystal Chandelier', description: 'Lighting', price: 2800, imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_3', name: 'Marble Coffee Table', description: 'Tables', price: 1900, imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_4', name: 'Cashmere Throw', description: 'Textiles', price: 650, imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's5', type: 'shop-the-look', props: {
      title: 'Curated Elegance',
      subtitle: 'Complete the look.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 45, y: 65, product: { name: 'Marble Dining Table', price: 3200, imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600' } }
      ]
    } },
    { id: 's6', type: 'testimonials', props: { title: 'Client Reviews', testimonials: [{ quote: 'Unparalleled quality and service.', author: 'Victoria H.' }] } },
    { id: 's7', type: 'newsletter', props: {} },
    { id: 's8', type: 'footer', props: {} }
  ]
}

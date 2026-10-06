import type { TemplateConfig } from '../../types/template'

export const HomeFurniture20: TemplateConfig = {
  id: 'maison-living',
  name: 'Maison Living',
  description: 'Premium luxury home marketplace. Elegant editorial/luxury ecommerce.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'luxury', name: 'Luxury' }, { id: 'premium', name: 'Premium' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1600'
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
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=800', 
      ctaLabel: 'Discover Maison' 
    } },
    { id: 's3', type: 'bento-grid', props: { 
      title: 'The Editorial Edit',
      items: [
        { title: 'The Velvet Collection', description: 'Rich textures.', size: 'large', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800' },
        { title: 'Crystal Lighting', description: 'Illumination.', size: 'small', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400' },
        { title: 'Fine Art', description: 'Masterpieces.', size: 'small', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's4', type: 'catalog', props: {
      products: [
        { id: 'h20_1', name: 'Velvet Sofa', description: 'Premium Seating', price: 4500, imageUrl: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_2', name: 'Crystal Chandelier', description: 'Lighting', price: 2800, imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_3', name: 'Marble Coffee Table', description: 'Tables', price: 1900, imageUrl: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=600' },
        { id: 'h20_4', name: 'Cashmere Throw', description: 'Textiles', price: 650, imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's5', type: 'shop-the-look', props: {
      title: 'Curated Elegance',
      subtitle: 'Complete the look.',
      image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 45, y: 65, product: { name: 'Marble Dining Table', price: 3200, imageUrl: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=600' } }
      ]
    } },
    { id: 's6', type: 'testimonials', props: { title: 'Client Reviews', testimonials: [{ quote: 'Unparalleled quality and service.', author: 'Victoria H.' }] } },
    { id: 's7', type: 'newsletter', props: {} },
    { id: 's8', type: 'footer', props: {} }
  ]
}

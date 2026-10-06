import type { TemplateConfig } from '../../types/template'

export const HomeFurniture12: TemplateConfig = {
  id: 'hearth',
  name: 'Hearth',
  description: 'Warm, cozy home living store. Warm neutrals, soft imagery, comfortable lifestyle presentation.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'cozy', name: 'Cozy' }, { id: 'warm', name: 'Warm' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#4a3b32', background: '#fcfaf8', accent: '#b08d6a' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'HEARTH', style: 'center' } },
    { id: 's2', type: 'hero', props: { 
      title: 'Cozy Living Spaces', 
      subtitle: 'Create a home that feels like a warm embrace.', 
      ctaLabel: 'Shop the Look' 
    } },
    { id: 's3', type: 'category-grid', props: { 
      title: 'Shop by Category', 
      categories: [
        { name: 'Throws & Blankets', image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=600' },
        { name: 'Candles', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=600' },
        { name: 'Rugs', image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's4', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=800',
      name: 'The Cashmere Throw',
      category: 'Textiles',
      description: 'Incredibly soft and luxuriously warm. The perfect companion for chilly evenings by the fire.',
      price: 180,
      features: ['100% Mongolian Cashmere', 'Hand-finished fringes', 'Dry clean only'],
      badge: 'Bestseller'
    } },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'h12_1', name: 'Chunky Knit Blanket', description: 'Textiles', price: 120, imageUrl: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=600' },
        { id: 'h12_2', name: 'Scented Soy Candle', description: 'Fragrance', price: 35, imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=600' },
        { id: 'h12_3', name: 'Handwoven Rug', description: 'Floor Coverings', price: 350, imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600' },
        { id: 'h12_4', name: 'Linen Cushions', description: 'Decor', price: 45, imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'editorial-grid', props: { title: 'Home Inspiration', images: ['https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1474625121024-7595bfbc57ac?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's7', type: 'testimonials', props: { title: 'From Our Customers', testimonials: [{ quote: 'My living room has never felt more inviting.', author: 'Emily T.' }] } },
    { id: 's8', type: 'footer', props: {} }
  ]
}

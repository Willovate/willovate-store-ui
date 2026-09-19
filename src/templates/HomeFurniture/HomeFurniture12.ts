import type { TemplateConfig } from '../../types/template'

export const HomeFurniture12: TemplateConfig = {
  id: 'hearth',
  name: 'Hearth',
  description: 'Warm, cozy home living store. Warm neutrals, soft imagery, comfortable lifestyle presentation.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'cozy', name: 'Cozy' }, { id: 'warm', name: 'Warm' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1600'
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
        { name: 'Throws & Blankets', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600' },
        { name: 'Candles', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600' },
        { name: 'Rugs', image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's4', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
      name: 'The Cashmere Throw',
      category: 'Textiles',
      description: 'Incredibly soft and luxuriously warm. The perfect companion for chilly evenings by the fire.',
      price: 180,
      features: ['100% Mongolian Cashmere', 'Hand-finished fringes', 'Dry clean only'],
      badge: 'Bestseller'
    } },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'h12_1', name: 'Chunky Knit Blanket', description: 'Textiles', price: 120, imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600' },
        { id: 'h12_2', name: 'Scented Soy Candle', description: 'Fragrance', price: 35, imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600' },
        { id: 'h12_3', name: 'Handwoven Rug', description: 'Floor Coverings', price: 350, imageUrl: 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?auto=format&fit=crop&q=80&w=600' },
        { id: 'h12_4', name: 'Linen Cushions', description: 'Decor', price: 45, imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'editorial-grid', props: { title: 'Home Inspiration', images: ['https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's7', type: 'testimonials', props: { title: 'From Our Customers', testimonials: [{ quote: 'My living room has never felt more inviting.', author: 'Emily T.' }] } },
    { id: 's8', type: 'footer', props: {} }
  ]
}

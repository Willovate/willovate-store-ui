import type { TemplateConfig } from '../../types/template'

export const GeneralStore08: TemplateConfig = {
  id: 'dailyco',
  name: 'DailyCo',
  description: 'Modern everyday shopping brand. Balanced combination of promotional content and product discovery.',
  categories: [{ id: 'general', name: 'General Store' }],
  tags: [{ id: 'bright', name: 'Bright' }, { id: 'commercial', name: 'Commercial' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#0f172a', background: '#ffffff', accent: '#f59e0b' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Welcome to DailyCo! Enjoy 15% off your first order.' } },
    { id: 's2', type: 'navbar', props: { brand: 'DailyCo', style: 'center' } },
    { id: 's3', type: 'hero', props: { 
      title: 'Your Daily Upgrade.', 
      subtitle: 'Products that make every day a little brighter.', 
      ctaLabel: 'Shop New Arrivals' 
    } },
    { id: 's4', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=800',
      name: 'The Daily Tote',
      category: 'Bags',
      description: 'Carry everything you need for the day in our signature canvas tote bag.',
      price: 35,
      features: ['Durable canvas', 'Water-resistant interior', 'Multiple pockets'],
      badge: 'New',
      imageRight: true
    } },
    { id: 's5', type: 'category-grid', props: { 
      title: 'Shop by Department', 
      categories: [
        { name: 'Apparel', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Home', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's6', type: 'catalog', props: {
      products: [
        { id: 'd1', name: 'Cotton Cap', description: 'Accessories', price: 20, imageUrl: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&q=80&w=600' },
        { id: 'd2', name: 'Reusable Coffee Cup', description: 'Drinkware', price: 25, imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=600' },
        { id: 'd3', name: 'Notebook Set', description: 'Stationery', price: 22, imageUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=600' },
        { id: 'd4', name: 'Scented Candle', description: 'Home', price: 28, imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's7', type: 'story', props: {} },
    { id: 's8', type: 'footer', props: {} }
  ]
}

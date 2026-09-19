import type { TemplateConfig } from '../../types/template'

export const GeneralStore02: TemplateConfig = {
  id: 'everyday',
  name: 'Everyday',
  description: 'Everyday essentials store. Friendly, simple and highly usable shopping experience.',
  categories: [{ id: 'general', name: 'General Store' }],
  tags: [{ id: 'friendly', name: 'Friendly' }, { id: 'essentials', name: 'Essentials' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#27272a', background: '#fafaf9', accent: '#e11d48' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'EVERYDAY', style: 'utility' } },
    { id: 's2', type: 'hero', props: { 
      title: 'Better Basics for Every Day.', 
      subtitle: 'High quality essentials designed to make life a little simpler.', 
      ctaLabel: 'Shop Essentials' 
    } },
    { id: 's3', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
      name: 'The Classic Sneaker',
      category: 'Footwear',
      description: 'Our best-selling essential shoe. Designed for all-day comfort with sustainable materials.',
      price: 95,
      originalPrice: 120,
      features: ['Breathable mesh upper', 'Recycled rubber sole', 'All-day arch support'],
      badge: 'Bestseller',
      ctaLabel: 'Add to Cart'
    } },
    { id: 's4', type: 'catalog', props: {
      products: [
        { id: 'e1', name: 'Everyday Backpack', description: 'Accessories', price: 75, imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600' },
        { id: 'e2', name: 'Insulated Tumbler', description: 'Drinkware', price: 30, imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600' },
        { id: 'e3', name: 'Organic Cotton Socks', description: 'Apparel', price: 15, imageUrl: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&q=80&w=600' },
        { id: 'e4', name: 'Minimalist Wallet', description: 'Accessories', price: 45, imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's5', type: 'story', props: {} },
    { id: 's6', type: 'footer', props: {} }
  ]
}

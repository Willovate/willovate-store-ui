import type { TemplateConfig } from '../../types/template'

export const GeneralStore10: TemplateConfig = {
  id: 'emporium',
  name: 'Emporium',
  description: 'A modern, versatile store layout designed to showcase a wide variety of everyday products.',
  categories: [{ id: 'general', name: 'General Store' }],
  tags: [{ id: 'modern', name: 'Modern' }, { id: 'clean', name: 'Clean' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#111827', background: '#f9fafb', accent: '#3b82f6' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Free shipping on all orders over $50' } },
    { id: 's2', type: 'navbar', props: { brand: 'EMPORIUM', style: 'utility' } },
    { id: 's3', type: 'hero', props: { 
      title: 'Your Everyday Essentials.', 
      subtitle: 'Quality products for your daily life, curated with care.', 
      ctaLabel: 'Shop Now' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'Shop by Category', 
      categories: [
        { name: 'Home Goods', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600' },
        { name: 'Apparel', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600' },
        { name: 'Accessories', image: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'emp1', name: 'Canvas Backpack', description: 'Durable & Stylish', price: 65, imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp2', name: 'Insulated Water Bottle', description: 'Keeps cold for 24h', price: 35, imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp3', name: 'Cotton Throw Blanket', description: 'Cozy comfort', price: 45, imageUrl: 'https://images.unsplash.com/photo-1580828369631-01be14a9a468?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp4', name: 'Ceramic Mug Set', description: 'Set of 4', price: 28, imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'newsletter', props: {} },
    { id: 's7', type: 'footer', props: {} }
  ]
}

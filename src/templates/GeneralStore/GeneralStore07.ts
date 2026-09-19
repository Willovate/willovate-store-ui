import type { TemplateConfig } from '../../types/template'

export const GeneralStore07: TemplateConfig = {
  id: 'common',
  name: 'Common',
  description: 'Minimalist general-purpose ecommerce store. Strong typography, whitespace and simple product presentation.',
  categories: [{ id: 'general', name: 'General Store' }],
  tags: [{ id: 'minimalist', name: 'Minimalist' }, { id: 'clean', name: 'Clean' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Helvetica, Arial, sans-serif', body: 'Helvetica, Arial, sans-serif' },
    colors: { primary: '#111111', background: '#ffffff', accent: '#737373' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'COMMON', style: 'minimal' } },
    { id: 's2', type: 'full-hero', props: { 
      title: 'Less, but better.', 
      subtitle: 'Essentials stripped down to their purest form.', 
      image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Shop Essentials' 
    } },
    { id: 's3', type: 'catalog', props: {
      products: [
        { id: 'c1', name: 'White T-Shirt', description: 'Cotton', price: 30, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600' },
        { id: 'c2', name: 'Simple Notebook', description: 'Stationery', price: 15, imageUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=600' },
        { id: 'c3', name: 'Glass Carafe', description: 'Home', price: 40, imageUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=600' },
        { id: 'c4', name: 'Leather Cardholder', description: 'Accessories', price: 50, imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's4', type: 'editorial-grid', props: { title: '', images: ['https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's5', type: 'newsletter', props: {} },
    { id: 's6', type: 'footer', props: {} }
  ]
}

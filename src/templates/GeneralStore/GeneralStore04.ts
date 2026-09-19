import type { TemplateConfig } from '../../types/template'

export const GeneralStore04: TemplateConfig = {
  id: 'nook',
  name: 'Nook',
  description: 'Curated lifestyle and general goods store. Warm editorial presentation with carefully selected products.',
  categories: [{ id: 'general', name: 'General Store' }],
  tags: [{ id: 'curated', name: 'Curated' }, { id: 'warm', name: 'Warm' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#4a3f35', background: '#fcfaf8', accent: '#8b5a2b' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'NOOK', style: 'center' } },
    { id: 's2', type: 'split-hero', props: { 
      title: 'Make Yourself at Home.', 
      subtitle: 'Thoughtfully designed goods for everyday living.', 
      image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=800', 
      ctaLabel: 'Shop Home Goods' 
    } },
    { id: 's3', type: 'editorial-grid', props: { title: 'The Journal', images: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's4', type: 'catalog', props: {
      products: [
        { id: 'n1', name: 'Hand-Poured Candle', description: 'Home Fragrance', price: 40, imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600' },
        { id: 'n2', name: 'Ceramic Vase', description: 'Decor', price: 65, imageUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=600' },
        { id: 'n3', name: 'Linen Napkins', description: 'Dining', price: 35, imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600' },
        { id: 'n4', name: 'Wooden Serving Board', description: 'Kitchen', price: 80, imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's5', type: 'material-grid', props: { 
      title: 'Our Materials', 
      subtitle: 'Sourced responsibly and crafted with care.',
      materials: [
        { id: 'mat1', name: 'Solid Oak', description: 'Sustainable and durable.', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
        { id: 'mat2', name: 'Organic Linen', description: 'Soft, breathable, natural.', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's6', type: 'testimonials', props: { 
      title: 'Words from Our Community', 
      testimonials: [
        { quote: 'These pieces completely transformed my living space.', author: 'Alex M.' },
        { quote: 'Beautiful craftsmanship and fast shipping.', author: 'Jordan K.' }
      ] 
    } },
    { id: 's7', type: 'footer', props: {} }
  ]
}

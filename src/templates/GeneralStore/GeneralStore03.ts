import type { TemplateConfig } from '../../types/template'

export const GeneralStore03: TemplateConfig = {
  id: 'urbancart',
  name: 'UrbanCart',
  description: 'Contemporary urban lifestyle marketplace. Mix of fashion, accessories, gadgets and lifestyle products.',
  categories: [{ id: 'general', name: 'General Store' }],
  tags: [{ id: 'urban', name: 'Urban' }, { id: 'bold', name: 'Bold' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#18181b', background: '#fafafa', accent: '#f97316' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'URBANCART', style: 'minimal' } },
    { id: 's2', type: 'full-hero', props: { 
      title: 'City Life. Curated.', 
      subtitle: 'Gear up for the concrete jungle with our latest arrivals.', 
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Explore' 
    } },
    { id: 's3', type: 'category-grid', props: { 
      title: '', 
      categories: [
        { name: 'Streetwear', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Commute', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Gadgets', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's4', type: 'shop-the-look', props: {
      title: 'The Urban Explorer',
      subtitle: 'Get the complete outfit.',
      image: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 50, y: 30, product: { name: 'Canvas Jacket', price: 145, imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600' } },
        { x: 30, y: 70, product: { name: 'Messenger Bag', price: 85, imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600' } }
      ]
    } },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'u1', name: 'Urban E-Bike', description: 'Mobility', price: 1200, imageUrl: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=600' },
        { id: 'u2', name: 'Noise-Cancelling Headphones', description: 'Tech', price: 250, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600' },
        { id: 'u3', name: 'Streetwear Hoodie', description: 'Apparel', price: 80, imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600' },
        { id: 'u4', name: 'Smart Watch', description: 'Wearables', price: 300, imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'editorial-grid', props: { title: 'City Guide', images: ['https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1502899576159-f224dc2349fa?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's7', type: 'newsletter', props: {} },
    { id: 's8', type: 'footer', props: {} }
  ]
}

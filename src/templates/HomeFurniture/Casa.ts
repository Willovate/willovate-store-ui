import type { TemplateConfig } from '../../types/template'

export const Casa: TemplateConfig = {
  id: 'casa-hf', // renaming ID slightly so it doesn't conflict with the general Casa in existing templates if there is one, but wait - the prompt says "Template 07 - Casa", I will just use 'casa-hf'.
  name: 'Casa Design',
  description: 'Interior design publication meets ecommerce.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'editorial', name: 'Editorial' }, { id: 'magazine', name: 'Magazine' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#1a1a1a', background: '#ffffff', accent: '#7a7a7a' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'CASA', style: 'center' } },
    { id: 's2', type: 'full-hero', props: { title: 'The Summer Issue', subtitle: 'Embracing natural light and airy spaces.', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600', ctaLabel: 'Read Journal' } },
    { id: 's3', type: 'editorial-grid', props: { title: 'Featured Rooms', images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's4', type: 'product-spotlight', props: { image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800', name: 'Designer Pick', category: 'Trend', description: 'This season\'s must-have sculptural chair.', price: 1400, features: [], imageRight: false } },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'ca1', name: 'Velvet Sofa', description: 'Emerald Green', price: 3100, imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600' },
        { id: 'ca2', name: 'Brass Mirror', description: 'Round 36"', price: 420, imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=600' },
        { id: 'ca3', name: 'Linen Curtains', description: 'Set of 2', price: 210, imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600' },
        { id: 'ca4', name: 'Sculptural Vase', description: 'Ceramic', price: 150, imageUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'story', props: {} },
    { id: 's7', type: 'newsletter', props: {} },
    { id: 's8', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Journal', href: '#journal' },
    { label: 'Shop', href: '#shop' },
    { label: 'Designers', href: '#designers' },
  ],
  features: [
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'cart', label: 'Cart' },
  ]
}

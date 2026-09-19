import type { TemplateConfig } from '../../types/template'

export const GeneralStore09: TemplateConfig = {
  id: 'collective',
  name: 'Collective',
  description: 'Premium curated multi-category marketplace. Editorial feel combined with ecommerce functionality.',
  categories: [{ id: 'general', name: 'General Store' }],
  tags: [{ id: 'premium', name: 'Premium' }, { id: 'editorial', name: 'Editorial' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#1a1a1a', background: '#fdfbf7', accent: '#78716c' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'COLLECTIVE', style: 'minimal' } },
    { id: 's2', type: 'split-hero', props: { 
      title: 'Curated Elegance.', 
      subtitle: 'A selection of fine goods from around the world.', 
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800', 
      ctaLabel: 'Discover' 
    } },
    { id: 's3', type: 'editorial-grid', props: { title: 'The Edit', images: ['https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's4', type: 'catalog', props: {
      products: [
        { id: 'col1', name: 'Silk Scarf', description: 'Accessories', price: 120, imageUrl: 'https://images.unsplash.com/photo-1595123049187-573e3a4e9b92?auto=format&fit=crop&q=80&w=600' },
        { id: 'col2', name: 'Leather Tote', description: 'Bags', price: 350, imageUrl: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=600' },
        { id: 'col3', name: 'Fine Fragrance', description: 'Beauty', price: 180, imageUrl: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600' },
        { id: 'col4', name: 'Gold Vermeil Ring', description: 'Jewelry', price: 95, imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's5', type: 'shop-the-look', props: {
      title: 'Artisan Corner',
      subtitle: 'Featuring independent makers.',
      image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 40, y: 60, product: { name: 'Ceramic Pitcher', price: 85, imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=600' } }
      ]
    }},
    { id: 's6', type: 'testimonials', props: { 
      title: '', 
      testimonials: [
        { quote: 'A truly beautiful collection of objects.', author: 'Design Monthly' }
      ] 
    } },
    { id: 's7', type: 'newsletter', props: {} },
    { id: 's8', type: 'footer', props: {} }
  ]
}

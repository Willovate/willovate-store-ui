import type { TemplateConfig } from '../../types/template'

export const FoodGrocery02: TemplateConfig = {
  id: 'food-grocery-02',
  name: 'Harvest',
  description: 'Organic/farm-fresh and story-led.',
  categories: [{ id: 'food', name: 'Food & Grocery' }],
  tags: [{ id: 'organic', name: 'Organic' }, { id: 'editorial', name: 'Editorial' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#2d3725', background: '#fdfbf7', accent: '#c68d6c' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'Harvest', style: 'minimal' } },
    { id: 's2', type: 'full-hero', props: { title: 'From the Soil', subtitle: 'Organic, farm-fresh produce delivered to your door.', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600', ctaLabel: 'Explore' } },
    { id: 's3', type: 'story', props: {} },
    { id: 's4', type: 'editorial-grid', props: { title: 'Seasonal Picks', images: ['https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's5', type: 'product-spotlight', props: { name: 'Heirloom Tomatoes', description: 'Grown in open sunlight, our heirloom tomatoes are packed with flavor.', price: 5.50, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600', category: 'Featured Farm', badge: 'New Season' } },
    { id: 's6', type: 'bento-grid', props: { title: 'Meet the Makers', items: [{ title: 'Valley Farms', description: 'Regenerative agriculture since 1995.', size: 'large', image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's7', type: 'catalog', props: {
      products: [
        { id: 'fg02-1', name: 'Organic Carrots', description: 'Freshly pulled', price: 3.50, imageUrl: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&q=80&w=600', category: 'Vegetables', stockQuantity: 50, visualTheme: 'default', isFeatured: false, slug: 'organic-carrots', compareAtPrice: null },
        { id: 'fg02-2', name: 'Local Honey', description: 'Raw and unfiltered', price: 12.00, imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=600', category: 'Pantry', stockQuantity: 20, visualTheme: 'default', isFeatured: false, slug: 'local-honey', compareAtPrice: null }
      ]
    }},
    { id: 's8', type: 'footer', props: {} }
  ]
}

import type { TemplateConfig } from '../../types/template'

export const GeneralStore05: TemplateConfig = {
  id: 'bazaar',
  name: 'Bazaar',
  description: 'Modern digital bazaar. Rich product discovery, category navigation and promotional blocks.',
  categories: [{ id: 'general', name: 'General Store' }],
  tags: [{ id: 'vibrant', name: 'Vibrant' }, { id: 'discovery', name: 'Discovery' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#000000', background: '#f8fafc', accent: '#ec4899' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Mega Sale: Up to 50% Off Selected Items' } },
    { id: 's2', type: 'navbar', props: { brand: 'BAZAAR', style: 'utility' } },
    { id: 's3', type: 'bento-grid', props: {
      title: 'Trending Now',
      items: [
        { title: 'Home Decor', description: 'Refresh your space.', size: 'large', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800' },
        { title: 'Tech Gadgets', description: 'Latest electronics.', size: 'small', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=400' },
        { title: 'Fashion', description: 'New season arrivals.', size: 'small', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400' }
      ]
    }},
    { id: 's4', type: 'catalog', props: {
      products: [
        { id: 'b1', name: 'Colorful Throw Pillow', description: 'Decor', price: 25, imageUrl: 'https://images.unsplash.com/photo-1528317424683-11bb58763dc0?auto=format&fit=crop&q=80&w=600' },
        { id: 'b2', name: 'Smart Light Bulb', description: 'Tech', price: 15, imageUrl: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=600' },
        { id: 'b3', name: 'Printed Silk Scarf', description: 'Accessories', price: 45, imageUrl: 'https://images.unsplash.com/photo-1595123049187-573e3a4e9b92?auto=format&fit=crop&q=80&w=600' },
        { id: 'b4', name: 'Stainless Steel Bottle', description: 'Lifestyle', price: 30, imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's5', type: 'category-grid', props: {
      title: 'Shop by Department',
      categories: [
        { name: 'Kitchen', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600' },
        { name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600' },
        { name: 'Travel', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600' },
        { name: 'Pets', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'shop-the-look', props: {
      title: 'Look of the Week',
      subtitle: 'Hand-picked favorites.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 50, y: 50, product: { name: 'Evening Dress', price: 120, imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600' } }
      ]
    }},
    { id: 's7', type: 'newsletter', props: {} },
    { id: 's8', type: 'footer', props: {} }
  ]
}

import type { TemplateConfig } from '../../types/template'

export const GeneralStore01: TemplateConfig = {
  id: 'mercato',
  name: 'Mercato',
  description: 'Modern multi-category marketplace with clean ecommerce layout and strong product discovery.',
  categories: [{ id: 'general', name: 'General Store' }],
  tags: [{ id: 'modern', name: 'Modern' }, { id: 'clean', name: 'Clean' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#0f172a', background: '#ffffff', accent: '#3b82f6' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Free shipping on all orders over $75.' } },
    { id: 's2', type: 'navbar', props: { brand: 'MERCATO', style: 'center' } },
    { id: 's3', type: 'split-hero', props: { 
      title: 'Discover Everything You Need.', 
      subtitle: 'From home essentials to the latest tech, curated for modern living.', 
      image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&q=80&w=800', 
      ctaLabel: 'Shop the Collection' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'Shop by Category', 
      categories: [
        { name: 'Home', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Apparel', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Tech', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Accessories', image: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'bento-grid', props: { 
      title: 'Featured Collections', 
      items: [
        { title: 'Summer Ready', description: 'Everything you need for the season.', size: 'large', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800' },
        { title: 'Work From Home', description: 'Elevate your home office.', size: 'small', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=400' },
        { title: 'Kitchen Upgrades', description: 'Tools for the home chef.', size: 'small', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=400' }
      ] 
    } },
    { id: 's6', type: 'catalog', props: {
      products: [
        { id: 'm1', name: 'Minimalist Desk Lamp', description: 'Lighting', price: 85, imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { id: 'm2', name: 'Cotton Crew T-Shirt', description: 'Apparel', price: 28, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600' },
        { id: 'm3', name: 'Wireless Earbuds', description: 'Tech', price: 129, imageUrl: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=600' },
        { id: 'm4', name: 'Ceramic Pour-Over', description: 'Kitchen', price: 45, imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's7', type: 'newsletter', props: {} },
    { id: 's8', type: 'footer', props: {} }
  ]
}

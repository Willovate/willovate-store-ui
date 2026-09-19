import type { TemplateConfig } from '../../types/template'

export const HomeFurniture19: TemplateConfig = {
  id: 'habitat-studio',
  name: 'Habitat Studio',
  description: 'Interior design and home styling marketplace. Design-studio aesthetic.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'studio', name: 'Studio' }, { id: 'design', name: 'Design' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#000000', background: '#f4f4f5', accent: '#71717a' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'HABITAT STUDIO', style: 'minimal' } },
    { id: 's2', type: 'full-hero', props: { 
      title: 'Curated Spaces', 
      subtitle: 'Furniture and decor selected by interior designers.', 
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Shop the Lookbook' 
    } },
    { id: 's3', type: 'bento-grid', props: { 
      title: 'Design Collections',
      items: [
        { title: 'The Modernist', description: 'Clean lines.', size: 'large', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800' },
        { title: 'The Naturalist', description: 'Organic forms.', size: 'small', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=400' },
        { title: 'The Minimalist', description: 'Less is more.', size: 'small', image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's4', type: 'shop-the-look', props: {
      title: 'Studio Styling',
      subtitle: 'Shop our latest styled room.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 50, y: 50, product: { name: 'Boucle Sofa', price: 2200, imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600' } }
      ]
    } },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'h19_1', name: 'Boucle Sofa', description: 'Seating', price: 2200, imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600' },
        { id: 'h19_2', name: 'Abstract Art Print', description: 'Wall Art', price: 150, imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600' },
        { id: 'h19_3', name: 'Geometric Rug', description: 'Rugs', price: 450, imageUrl: 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?auto=format&fit=crop&q=80&w=600' },
        { id: 'h19_4', name: 'Sculptural Object', description: 'Accessories', price: 95, imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'editorial-grid', props: { title: 'Studio Journal', images: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's7', type: 'story', props: {} },
    { id: 's8', type: 'newsletter', props: {} },
    { id: 's9', type: 'footer', props: {} }
  ]
}

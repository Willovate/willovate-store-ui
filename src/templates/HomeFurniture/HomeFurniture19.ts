import type { TemplateConfig } from '../../types/template'

export const HomeFurniture19: TemplateConfig = {
  id: 'habitat-studio',
  name: 'Habitat Studio',
  description: 'Interior design and home styling marketplace. Design-studio aesthetic.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'studio', name: 'Studio' }, { id: 'design', name: 'Design' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?auto=format&fit=crop&q=80&w=1600'
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
      image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Shop the Lookbook' 
    } },
    { id: 's3', type: 'bento-grid', props: { 
      title: 'Design Collections',
      items: [
        { title: 'The Modernist', description: 'Clean lines.', size: 'large', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800' },
        { title: 'The Naturalist', description: 'Organic forms.', size: 'small', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400' },
        { title: 'The Minimalist', description: 'Less is more.', size: 'small', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's4', type: 'shop-the-look', props: {
      title: 'Studio Styling',
      subtitle: 'Shop our latest styled room.',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 50, y: 50, product: { name: 'Boucle Sofa', price: 2200, imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=600' } }
      ]
    } },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'h19_1', name: 'Boucle Sofa', description: 'Seating', price: 2200, imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=600' },
        { id: 'h19_2', name: 'Abstract Art Print', description: 'Wall Art', price: 150, imageUrl: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&q=80&w=600' },
        { id: 'h19_3', name: 'Geometric Rug', description: 'Rugs', price: 450, imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600' },
        { id: 'h19_4', name: 'Sculptural Object', description: 'Accessories', price: 95, imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'editorial-grid', props: { title: 'Studio Journal', images: ['https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's7', type: 'story', props: {} },
    { id: 's8', type: 'newsletter', props: {} },
    { id: 's9', type: 'footer', props: {} }
  ]
}

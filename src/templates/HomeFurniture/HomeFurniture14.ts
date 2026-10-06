import type { TemplateConfig } from '../../types/template'

export const HomeFurniture14: TemplateConfig = {
  id: 'terra-home',
  name: 'Morrow Home',
  description: 'Natural and organic home goods. Earth tones, natural materials, organic textures.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'organic', name: 'Organic' }, { id: 'natural', name: 'Natural' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1558401391-7899b4bd5bbf?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#3d3024', background: '#f8f5f2', accent: '#8c7b6c' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'TERRA', style: 'utility' } },
    { id: 's2', type: 'split-hero', props: { 
      title: 'Rooted in Nature', 
      subtitle: 'Bring the outside in with our organic home collection.', 
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800', 
      ctaLabel: 'Shop Nature' 
    } },
    { id: 's3', type: 'material-grid', props: { 
      title: 'Our Materials', 
      subtitle: 'Sourced from the earth, crafted by hand.',
      materials: [
        { id: 'm1', name: 'Raw Clay', description: 'Unglazed and natural.', image: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&q=80&w=600' },
        { id: 'm2', name: 'Solid Oak', description: 'Sustainably harvested.', image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=600' },
        { id: 'm3', name: 'Organic Linen', description: 'Unbleached textiles.', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'Shop by Material', 
      categories: [
        { name: 'Ceramics', image: 'https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Wood', image: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Textiles', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'h14_1', name: 'Terracotta Vase', description: 'Ceramics', price: 85, imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600' },
        { id: 'h14_2', name: 'Oak Stool', description: 'Seating', price: 210, imageUrl: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=600' },
        { id: 'h14_3', name: 'Linen Throw', description: 'Textiles', price: 140, imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600' },
        { id: 'h14_4', name: 'Woven Basket', description: 'Storage', price: 65, imageUrl: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'craftsmanship', props: { 
      title: 'Handmade Heritage', 
      description: 'We partner with artisans around the globe who use traditional methods to craft pieces that celebrate the imperfections of natural materials.', 
      mainImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=600',
      reverseLayout: true
    } },
    { id: 's7', type: 'testimonials', props: { title: '', testimonials: [{ quote: 'The natural textures bring so much warmth to my home.', author: 'A. Smith' }] } },
    { id: 's8', type: 'footer', props: {} }
  ]
}

import type { TemplateConfig } from '../../types/template'

export const HomeFurniture16: TemplateConfig = {
  id: 'nordic-house',
  name: 'Nordic House',
  description: 'Scandinavian-inspired furniture and home goods. Minimal, bright, functional and calm.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'scandinavian', name: 'Scandinavian' }, { id: 'bright', name: 'Bright' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#2a2a2a', background: '#fafafa', accent: '#73937E' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Scandinavian design, delivered. Complimentary delivery on selected furniture.' } },
    { id: 's2', type: 'navbar', props: { brand: 'NORDIC HOUSE', style: 'utility' } },
    { id: 's3', type: 'full-hero', props: { 
      title: 'Simple. Functional. Beautiful.', 
      subtitle: 'Scandinavian design for everyday living.', 
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Shop Furniture' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'Shop by Category', 
      categories: [
        { name: 'Living', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Lighting', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Textiles', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1524758658008-1417b1eb2ba8?auto=format&fit=crop&q=80&w=800',
      name: 'Arne Lounge Chair',
      category: 'Seating',
      description: 'The epitome of Scandinavian functionalism. Crafted from solid ash wood with a natural linen seat, designed for hours of comfortable sitting in any light-filled room.',
      price: 850,
      features: ['Solid ash frame', 'Natural linen upholstery', 'Hand-finished joints'],
      imageRight: false
    } },
    { id: 's6', type: 'bento-grid', props: {
      title: 'Design Principles',
      items: [
        { title: 'Form Follows Function', description: 'Quiet utility.', size: 'large', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800' },
        { title: 'Natural Materials', description: 'Oak, ash, wool.', size: 'small', image: 'https://images.unsplash.com/photo-1505692694935-ceb8c4c3e80c?auto=format&fit=crop&q=80&w=400' },
        { title: 'Modular Living', description: 'Adaptable space.', size: 'small', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aef926ec?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's7', type: 'catalog', props: {
      products: [
        { id: 'h16_1', name: 'Birch Dining Chair', description: 'Seating', price: 290, imageUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=600' },
        { id: 'h16_2', name: 'Minimalist Desk Lamp', description: 'Lighting', price: 150, imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=600' },
        { id: 'h16_3', name: 'Wool Throw Blanket', description: 'Textiles', price: 120, imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=600' },
        { id: 'h16_4', name: 'Ash Wood Table', description: 'Tables', price: 890, imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's8', type: 'shop-the-look', props: {
      title: 'Quiet Morning',
      image: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&q=80&w=1200',
      products: [
        { id: 'stl1', name: 'Oak Dining Table', price: 1200, x: 50, y: 70 },
        { id: 'stl2', name: 'Linen Chair', price: 350, x: 30, y: 60 },
        { id: 'stl3', name: 'Pendant Light', price: 220, x: 50, y: 20 },
        { id: 'stl4', name: 'Ceramic Vase', price: 85, x: 60, y: 50 }
      ]
    } },
    { id: 's9', type: 'editorial-grid', props: { title: 'Nordic Light', images: ['https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's10', type: 'material-grid', props: { 
      title: 'Honest Materials', 
      subtitle: '',
      materials: [
        { id: 'mat1', name: 'Light Oak', description: 'Sourced from managed forests.', image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=600' },
        { id: 'mat2', name: 'Natural Wool', description: 'Unbleached and undyed.', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's11', type: 'story', props: {
      title: 'Designed for everyday living.',
      text: 'Our philosophy is rooted in the belief that functional design brings calm to the home. Every piece is crafted with longevity in mind, honoring simplicity and traditional craftsmanship.',
      image: 'https://images.unsplash.com/photo-1493150134366-2cb83dd11ce2?auto=format&fit=crop&q=80&w=800'
    } },
    { id: 's12', type: 'testimonials', props: {
      title: 'Community',
      testimonials: [
        { quote: 'The Arne Lounge Chair transformed my living room. Incredibly comfortable and beautiful.', author: 'Sophie K.' },
        { quote: 'Minimalist perfection. The quality of the oak is outstanding.', author: 'Lars M.' },
        { quote: 'A seamless shopping experience for truly premium Scandinavian furniture.', author: 'Emma T.' }
      ]
    } },
    { id: 's13', type: 'newsletter', props: { title: 'Notes on quiet spaces', subtitle: 'Notes on quiet spaces, new arrivals and considered design.' } },
    { id: 's14', type: 'footer', props: {} }
  ]
}

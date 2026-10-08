import type { TemplateConfig } from '../../types/template'

export const HomeFurniture15: TemplateConfig = {
  id: 'room-and-co',
  name: 'Room & Co.',
  description: 'Contemporary urban furniture and interior design store focusing on modular spaces and city living.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'lifestyle', name: 'Lifestyle' }, { id: 'urban', name: 'Urban' }, { id: 'contemporary', name: 'Contemporary' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#1a1a1a', background: '#ffffff', accent: '#4f46e5' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'New modular pieces for modern rooms.' } },
    { id: 's2', type: 'navbar', props: { brand: 'Room & Co.', style: 'center' } },
    { id: 's3', type: 'full-width-hero', props: { 
      title: 'Make Room for Better Living.', 
      subtitle: 'Furniture designed for the way you live now—flexible spaces, considered design, and everyday functionality.', 
      image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=1600',
      ctaLabel: 'Shop The Collection' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'Spaces', 
      categories: [
        { name: 'Living Room', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Dining', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600' },
        { name: 'Home Office', image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'product-spotlight', props: { 
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800', 
      name: 'Metro Modular Sofa', 
      category: 'Seating', 
      description: 'A modular sofa designed to adapt as your space changes. Clean lines meet exceptional practical comfort.', 
      price: 1850, 
      features: ['Reversible Chaise', 'Stain-Resistant Fabric', 'High-Density Foam'], 
      imageRight: false,
      badge: 'Bestseller' 
    } },
    { id: 's6', type: 'shop-the-look', props: {
      title: 'The Modern Living Room',
      subtitle: 'Get this exact look for your apartment.',
      image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 30, y: 70, product: { name: 'Metro Lounge Sofa', price: 1400, imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=600' } },
        { x: 70, y: 50, product: { name: 'Arc Floor Lamp', price: 250, imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600' } },
        { x: 60, y: 80, product: { name: 'Grid Coffee Table', price: 400, imageUrl: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=600' } }
      ]
    } },
    { id: 's7', type: 'bento-grid', props: {
      title: 'City Living',
      items: [
        { title: 'The Modern Apartment', description: 'Flexible layouts that do more.', size: 'large', image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=1200' },
        { title: 'Modular Systems', description: 'Storage that scales.', size: 'medium', image: 'https://images.unsplash.com/photo-1504890001746-a9a68eda46e2?auto=format&fit=crop&q=80&w=800' },
        { title: 'Smart Desks', description: 'For the hybrid worker.', size: 'small', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=400' },
        { title: 'Accent Details', description: 'Small touches, big impact.', size: 'small', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's8', type: 'catalog', props: {
      products: [
        { id: 'h15_1', name: 'Metro Lounge Sofa', description: 'Living Room', price: 1400, imageUrl: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=600' },
        { id: 'h15_2', name: 'Arc Floor Lamp', description: 'Lighting', price: 250, imageUrl: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?auto=format&fit=crop&q=80&w=600' },
        { id: 'h15_3', name: 'Grid Coffee Table', description: 'Tables', price: 400, imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=600' },
        { id: 'h15_4', name: 'Loft Area Rug', description: 'Decor', price: 350, imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's9', type: 'material-grid', props: { 
      title: 'Built for everyday spaces.', 
      subtitle: 'Materials selected for durability, clean lines, and practical city living.',
      materials: [
        { id: 'm1', name: 'Powder-Coated Steel', description: 'Lightweight structural integrity.', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=600' },
        { id: 'm2', name: 'Solid Oak', description: 'Warm contrast to industrial forms.', image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=600' },
        { id: 'm3', name: 'Textured Fabric', description: 'Stain-resistant performance weave.', image: 'https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?auto=format&fit=crop&q=80&w=600' },
        { id: 'm4', name: 'Tempered Glass', description: 'Creates the illusion of more space.', image: 'https://images.unsplash.com/photo-1506484381205-f7945653044d?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's10', type: 'editorial-grid', props: { 
      title: 'Living in the City', 
      images: [
        'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=600', 
        'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=600', 
        'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=600'
      ] 
    } },
    { id: 's11', type: 'testimonials', props: { 
      title: 'City Reviews', 
      testimonials: [
        { quote: 'The modular design allowed us to actually fit a comfortable sectional into our 1-bedroom layout. Unbelievably practical.', author: 'S. Davies' },
        { quote: 'Sharp, contemporary, and arrived in boxes that fit in the elevator. Essential for city dwellers.', author: 'M. Robinson' }
      ] 
    } },
    { id: 's12', type: 'newsletter', props: {
      title: 'The Room Edit',
      description: 'New furniture, room ideas, and practical design inspiration.'
    } },
    { id: 's13', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Living', href: '#living' },
    { label: 'Dining', href: '#dining' },
    { label: 'Bedroom', href: '#bedroom' },
    { label: 'Office', href: '#office' },
  ],
  features: [
    { id: 'search', label: 'Search' },
    { id: 'cart', label: 'Cart' },
  ]
}

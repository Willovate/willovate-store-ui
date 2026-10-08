import type { TemplateConfig } from '../../types/template'

export const HomeFurniture01: TemplateConfig = {
  id: 'casa-hf',
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
    { id: 's1', type: 'promo', props: { text: 'Designed for considered living.' } },
    { id: 's2', type: 'navbar', props: { brand: 'CASA', style: 'center' } },
    { id: 's3', type: 'full-hero', props: { 
      title: 'Form, Reduced to Its Essence', 
      subtitle: 'Embracing restraint, proportion, and purposeful design in every piece.', 
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Explore Collection' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'Categories', 
      categories: [
        { name: 'Seating', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Tables', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
        { name: 'Storage', image: 'https://images.unsplash.com/photo-1595514535312-70b5ee2e690f?auto=format&fit=crop&q=80&w=600' },
        { name: 'Lighting', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { name: 'Objects', image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=600' },
        { name: 'Outdoor', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'editorial-grid', props: { 
      title: 'Stories', 
      images: [
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600', 
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=600'
      ] 
    } },
    { id: 's6', type: 'product-spotlight', props: { 
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800', 
      name: 'Casa Lounge Chair', 
      category: 'Seating', 
      description: 'A sculptural form balancing negative space and structural integrity.', 
      price: 1400, 
      features: ['Solid Oak Frame', 'Textured Linen Blend', 'Architectural Lines'], 
      imageRight: false 
    } },
    { id: 's7', type: 'material-grid', props: {
      title: 'Materials',
      subtitle: 'Selected for character and longevity.',
      materials: [
        { id: 'm1', name: 'Oak', description: 'White oak with a natural matte finish.', image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=600' },
        { id: 'm2', name: 'Stone', description: 'Honed travertine and marble.', image: 'https://images.unsplash.com/photo-1621274403997-393c87e4ec82?auto=format&fit=crop&q=80&w=600' },
        { id: 'm3', name: 'Linen', description: 'Heavyweight Belgian linen.', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=600' },
        { id: 'm4', name: 'Steel', description: 'Powder-coated structural steel.', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's8', type: 'catalog', props: {
      products: [
        { id: 'ca1', name: 'Casa Lounge Chair', description: 'Seating', price: 1400, imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600' },
        { id: 'ca2', name: 'Monument Side Table', description: 'Tables', price: 850, imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
        { id: 'ca3', name: 'Linea Credenza', description: 'Storage', price: 3200, imageUrl: 'https://images.unsplash.com/photo-1595514535312-70b5ee2e690f?auto=format&fit=crop&q=80&w=600' },
        { id: 'ca4', name: 'Arc Pendant', description: 'Lighting', price: 620, imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { id: 'ca5', name: 'Forma Dining Chair', description: 'Seating', price: 450, imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=600' },
        { id: 'ca6', name: 'Plinth Console', description: 'Storage', price: 1100, imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600' },
        { id: 'ca7', name: 'Studio Floor Lamp', description: 'Lighting', price: 780, imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600' },
        { id: 'ca8', name: 'Casa Bench', description: 'Seating', price: 890, imageUrl: 'https://images.unsplash.com/photo-1550226891-ef816aeb4ba0?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's9', type: 'shop-the-look', props: {
      title: 'Quiet Residence',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 30, y: 70, product: { name: 'Casa Lounge Chair', price: 1400, imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600' } },
        { x: 50, y: 80, product: { name: 'Monument Side Table', price: 850, imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' } },
        { x: 70, y: 30, product: { name: 'Studio Floor Lamp', price: 780, imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600' } },
        { x: 80, y: 60, product: { name: 'Plinth Console', price: 1100, imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600' } }
      ]
    } },
    { id: 's10', type: 'story', props: {
      title: 'Designed Around What Matters',
      text: 'Our focus is on proportion, function, and restraint. By selecting honest materials and removing the non-essential, we create furniture with longevity at its core.',
      image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800'
    } },
    { id: 's11', type: 'testimonials', props: { 
      title: 'Design Perspectives', 
      testimonials: [
        { quote: 'A masterclass in proportions and timeless design. The pieces integrate seamlessly into minimal interiors.', author: 'Architectural Digest' },
        { quote: 'Exceptional quality and restraint. True modern classics.', author: 'Interior Design Quarterly' }
      ] 
    } },
    { id: 's12', type: 'newsletter', props: {
      title: 'Notes on Form',
      description: 'Subscribe for design studies, material explorations, and new collections.',
      buttonText: 'Subscribe'
    } },
    { id: 's13', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Furniture', href: '#furniture' },
    { label: 'Collections', href: '#collections' },
    { label: 'Objects', href: '#objects' },
    { label: 'Materials', href: '#materials' },
    { label: 'Journal', href: '#journal' },
  ],
  features: [
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'cart', label: 'Cart' },
  ]
}

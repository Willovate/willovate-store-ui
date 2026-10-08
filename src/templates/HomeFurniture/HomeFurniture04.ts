import type { TemplateConfig } from '../../types/template'

export const Linea: TemplateConfig = {
  id: 'linea',
  name: 'Linea',
  description: 'Sleek, modern, high-contrast contemporary furniture layout with urban editorial edge.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'modern', name: 'Modern' }, { id: 'contemporary', name: 'Contemporary' }, { id: 'urban', name: 'Urban' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#2b2b2b', background: '#ffffff', accent: '#a1a8a2' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Complimentary shipping on orders over $1500.' } },
    { id: 's2', type: 'navbar', props: { brand: 'LINEA', style: 'minimal' } },
    { id: 's3', type: 'split-hero', props: { 
      title: 'Form follows living.', 
      subtitle: 'Precise geometry and refined materials for the contemporary home.', 
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800', 
      ctaLabel: 'Shop Collection' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'Shop by Category', 
      categories: [
        { name: 'Seating', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Tables', image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Storage', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'product-spotlight', props: { 
      image: 'https://images.unsplash.com/photo-1524135329990-07660cd5bf10?auto=format&fit=crop&q=80&w=800', 
      name: 'The Contour Lounge', 
      category: 'Seating', 
      description: 'A sculptural statement piece. Clean architectural lines meet engineered comfort with deep seating and a minimalist brushed steel base.', 
      price: 1850, 
      features: ['Brushed Steel Frame', 'High-density Foam', 'Premium Leather'], 
      imageRight: true, 
      badge: 'Signature' 
    } },
    { id: 's6', type: 'split-hero', props: { 
      title: 'Clarity in design.', 
      subtitle: 'Our philosophy revolves around proportion, simplicity, and considered materials. Furniture that elevates modern urban living without unnecessary clutter.', 
      image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=800', 
      ctaLabel: 'Read Our Story' 
    } },
    { id: 's7', type: 'material-grid', props: { 
      title: 'Material Language', 
      subtitle: 'High-contrast, premium finishes.', 
      materials: [
        { id: 'm1', name: 'Brushed Oak', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=600' }, 
        { id: 'm2', name: 'Smoked Glass', image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80&w=600' }, 
        { id: 'm3', name: 'Natural Stone', image: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's8', type: 'catalog', props: {
      products: [
        { id: 'c1', name: 'Modular Sofa System', description: 'Charcoal Weave', price: 3200, imageUrl: 'https://images.unsplash.com/photo-1595044426077-d36d9236d54a?auto=format&fit=crop&q=80&w=600' },
        { id: 'c2', name: 'Architectural Dining Table', description: 'Black Oak & Steel', price: 2100, imageUrl: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&q=80&w=600' },
        { id: 'c3', name: 'Minimalist Sideboard', description: 'Matte Lacquer', price: 1450, imageUrl: 'https://images.unsplash.com/photo-1545665277-5937489579f2?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's9', type: 'shop-the-look', props: { 
      title: 'City Apartment', 
      subtitle: 'A sophisticated urban interior focused on sharp contrast and refined forms.', 
      image: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&q=80&w=1600', 
      hotspots: [
        { x: 45, y: 55, product: { name: 'Sculptural Sofa', price: 3400 } },
        { x: 75, y: 65, product: { name: 'Floor Lamp', price: 650 } }
      ] 
    } },
    { id: 's10', type: 'editorial-grid', props: { 
      title: 'Modern Silhouettes', 
      images: [
        'https://images.unsplash.com/photo-1531685250784-7569952593d2?auto=format&fit=crop&q=80&w=600', 
        'https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&q=80&w=600'
      ] 
    } },
    { id: 's11', type: 'feature-comparison', props: {
      title: 'Select Your Seating',
      products: [
        { name: 'Contour Lounge', price: 1850, isHighlighted: true },
        { name: 'Linear Armchair', price: 1250 }
      ],
      rows: [
        { label: 'Material', values: ['Premium Leather', 'Woven Fabric'] },
        { label: 'Frame', values: ['Brushed Steel', 'Powder-Coated Aluminum'] },
        { label: 'Space', values: ['Living Room', 'Study / Office'] }
      ]
    } },
    { id: 's12', type: 'newsletter', props: { 
      title: 'Join Linea', 
      description: 'Subscribe for updates on new collections and editorial features.' 
    } },
    { id: 's13', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Furniture', href: '#furniture' },
    { label: 'Lighting', href: '#lighting' },
    { label: 'About', href: '#about' },
  ],
  features: [
    { id: 'search', label: 'Search' },
    { id: 'cart', label: 'Cart' },
  ]
}

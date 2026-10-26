import type { TemplateConfig } from '../../types/template'

export const Linea: TemplateConfig = {
  id: 'linea',
  name: 'Linea',
  description: 'Linear modernism and sculptural simplicity.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'modern', name: 'Modern' }, { id: 'linear', name: 'Linear' }, { id: 'sculptural', name: 'Sculptural' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#1e1e1e', background: '#ffffff', accent: '#666666' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Free delivery on all orders over $750.' } },
    { id: 's2', type: 'navbar', props: { brand: 'LINEA', style: 'minimal' } },
    { id: 's3', type: 'split-hero', props: {
      title: 'Form Follows Line',
      subtitle: 'Sculptural furniture designed with pure geometric clarity and architectural restraint.',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
      ctaLabel: 'View Collection'
    } },
    { id: 's4', type: 'category-grid', props: {
      title: 'Collections',
      categories: [
        { name: 'Seating', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600' },
        { name: 'Tables', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
        { name: 'Storage', image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's5', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
      name: 'Linea Modular Sofa System',
      category: 'Seating',
      description: 'Continuous linear profile with feather-down blend cushions upholstered in heavy Italian textured linen.',
      price: 2600,
      features: ['Steel Frame Understructure', 'Removable Covers', 'Modular Configurations'],
      imageRight: true,
      badge: 'Editor\'s Pick'
    } },
    { id: 's6', type: 'material-grid', props: {
      title: 'Material Honesty',
      subtitle: 'Materials selected for authentic surface texture and structural permanence.',
      materials: [
        { id: 'm1', name: 'Smoked Oak', description: 'Deep blackened grain with open pore satin sealer.', image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=600' },
        { id: 'm2', name: 'Brushed Chrome', description: 'Precision tubular metal with seamless welded joints.', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=600' },
        { id: 'm3', name: 'Cast Stone', description: 'Monolithic mineral composites with smooth matte touch.', image: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's7', type: 'catalog', props: {
      products: [
        { id: 'lin1', name: 'Modular Sofa System', description: 'Deep Linear Seating in Italian Linen', price: 2600, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600' },
        { id: 'lin2', name: 'Architectural Dining Table', description: 'Smoked Oak with Chamfered Perimeter', price: 1800, category: 'Tables', imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' },
        { id: 'lin3', name: 'Minimalist Sideboard', description: 'Continuous Line Oak Credenza', price: 1450, category: 'Storage', imageUrl: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=600' },
        { id: 'lin4', name: 'Cantilever Velvet Armchair', description: 'Chrome Ribbon Base with Slate Velvet', price: 980, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600' },
        { id: 'lin5', name: 'Smoked Glass Coffee Table', description: 'Tempered Smoked Bronze Glass Top', price: 850, category: 'Tables', imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
        { id: 'lin6', name: 'Low-Slung Media Credenza', description: 'Flush Acoustic Slatted Facade', price: 1650, category: 'Storage', imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600' },
        { id: 'lin7', name: 'Sculptural Dining Armchair', description: 'Formed Black Ash with Padded Seat', price: 490, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=600' },
        { id: 'lin8', name: 'Fluted Black Ash Bookshelf', description: 'Tall Column Architecture Bookcase', price: 2100, category: 'Storage', imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=600' },
        { id: 'lin9', name: 'Marble Top Console Table', description: 'Nero Marquina Narrow Entry Plinth', price: 1150, category: 'Tables', imageUrl: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&q=80&w=600' },
        { id: 'lin10', name: 'Curved Boucle Chaise', description: 'Sweeping Asymmetric Reclining Seat', price: 1850, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600' },
        { id: 'lin11', name: 'Minimalist Bed Frame', description: 'Low Platform with Integrated Ledges', price: 2200, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600' },
        { id: 'lin12', name: 'Nesting Side Tables', description: 'Dual Geometric Round Tables', price: 560, category: 'Tables', imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=600' },
        { id: 'lin13', name: 'Tall Slatted Wardrobe', description: 'Concealed Interior Organizers', price: 2800, category: 'Storage', imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=600' },
        { id: 'lin14', name: 'Leather Counter Stool', description: 'Minimalist Black Steel Stool', price: 420, category: 'Seating', imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600' },
        { id: 'lin15', name: 'Oval Oak Dining Table', description: 'Pill-Shaped Solid Wood Tabletop', price: 2450, category: 'Tables', imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=600' },
        { id: 'lin16', name: 'Floating Wall Display Unit', description: 'Seamless Mounting Floating Credenza', price: 920, category: 'Storage', imageUrl: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's8', type: 'shop-the-look', props: {
      title: 'Minimalist Horizon',
      subtitle: 'Balanced linear geometry for high-contrast interior living.',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 45, y: 65, product: { name: 'Modular Sofa System', price: 2600 } },
        { x: 75, y: 75, product: { name: 'Smoked Glass Coffee Table', price: 850 } }
      ]
    } },
    { id: 's9', type: 'editorial-grid', props: {
      title: 'Linear Horizons',
      images: [
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=600'
      ]
    } },
    { id: 's10', type: 'newsletter', props: {
      title: 'Linea Perspectives',
      description: 'Subscribe for private drops, design essays, and material updates.',
      buttonText: 'Subscribe'
    } },
    { id: 's11', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Seating', href: '#seating' },
    { label: 'Tables', href: '#tables' },
    { label: 'Storage', href: '#storage' },
    { label: 'Materials', href: '#materials' }
  ],
  features: [
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'cart', label: 'Cart' }
  ]
}

export const HomeFurniture04 = Linea

import type { TemplateConfig } from '../../types/template'

export const Solace: TemplateConfig = {
  id: 'solace',
  name: 'Solace',
  description: 'Moody elegance, rich textures, and sculptural sanctuary design.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'moody', name: 'Moody' }, { id: 'sculptural', name: 'Sculptural' }, { id: 'sanctuary', name: 'Sanctuary' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#1c1d1f', background: '#f4f4f6', accent: '#70798c' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Curated interior styling consultation available for bespoke residences.' } },
    { id: 's2', type: 'navbar', props: { brand: 'SOLACE', style: 'minimal' } },
    { id: 's3', type: 'full-hero', props: {
      title: 'The Poetry of Stillness',
      subtitle: 'Atmospheric silhouettes and rich tactile textures crafted to cocoon the modern spirit.',
      image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1600',
      ctaLabel: 'Enter Solace'
    } },
    { id: 's4', type: 'category-grid', props: {
      title: 'Curated Collections',
      categories: [
        { name: 'Lounge', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600' },
        { name: 'Dining', image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' },
        { name: 'Sleep', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600' },
        { name: 'Accents', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's5', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800',
      name: 'Atelier Sectional Sofa',
      category: 'Lounge',
      description: 'Low-slung modular silhouette upholstered in charcoal velvet with deep channel tufting and high-resilience foam core.',
      price: 2800,
      features: ['Charcoal Slub Velvet', 'Deep Channel Tufting', 'Modular Sectional Units'],
      imageRight: true,
      badge: 'Solace Signature'
    } },
    { id: 's6', type: 'catalog', props: {
      products: [
        { id: 'sol1', name: 'Atelier Sectional Sofa', description: 'Charcoal Velvet Deep Lounge', price: 2800, category: 'Lounge', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600' },
        { id: 'sol2', name: 'Eclipse Coffee Table', description: 'Smoked Glass & Cast Iron Disc', price: 920, category: 'Lounge', imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
        { id: 'sol3', name: 'Dusk Dining Chair', description: 'Curved Silhouette in Midnight Wool', price: 480, category: 'Dining', imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600' },
        { id: 'sol4', name: 'Forma Side Table', description: 'Dark Travertine Sculptural Plinth', price: 410, category: 'Lounge', imageUrl: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&q=80&w=600' },
        { id: 'sol5', name: 'Solace Minimalist Bed', description: 'Wrapped in Slate Wool with Ledge', price: 2350, category: 'Sleep', imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600' },
        { id: 'sol6', name: 'Floating Concrete Nightstand', description: 'Wall-Mounted Cast Mineral Shelf', price: 460, category: 'Sleep', imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600' },
        { id: 'sol7', name: 'Smoked Oak Dining Table', description: 'Deep Ebony Chamfered Top', price: 2100, category: 'Dining', imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' },
        { id: 'sol8', name: 'Contoured Lounge Armchair', description: 'Cocooning Silhouette in Graphite', price: 1350, category: 'Lounge', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600' },
        { id: 'sol9', name: 'Ribbed Ceramic Table Lamp', description: 'Charcoal Wash with Linen Cylinder', price: 260, category: 'Accents', imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { id: 'sol10', name: 'Monolithic Console Table', description: 'Honed Dark Basalt Entry Table', price: 1150, category: 'Accents', imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600' },
        { id: 'sol11', name: 'Matte Black Pendant Light', description: 'Architectural Dome Downlight', price: 380, category: 'Accents', imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=600' },
        { id: 'sol12', name: 'Deep Wool Plush Rug', description: 'Hand-Tufted Slate Wool Floor Cover', price: 890, category: 'Lounge', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600' },
        { id: 'sol13', name: 'Low Media Credenza', description: 'Blackened Ash Slatted Storage', price: 1780, category: 'Lounge', imageUrl: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=600' },
        { id: 'sol14', name: 'Headboard Bedroom Bench', description: 'Tufted Charcoal Wool End Bench', price: 620, category: 'Sleep', imageUrl: 'https://images.unsplash.com/photo-1547587091-f883cf8f0c12?auto=format&fit=crop&q=80&w=600' },
        { id: 'sol15', name: 'Leather Counter Stool', description: 'Blackened Steel Bar Seat', price: 440, category: 'Dining', imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600' },
        { id: 'sol16', name: 'Bronze Sculptural Mirror', description: 'Heavy Cast Bronze Freeform Frame', price: 490, category: 'Accents', imageUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's7', type: 'shop-the-look', props: {
      title: 'Midnight Salon',
      subtitle: 'Atmospheric light and deep textures composed for quiet reflection.',
      image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 40, y: 65, product: { name: 'Atelier Sectional Sofa', price: 2800 } },
        { x: 75, y: 70, product: { name: 'Eclipse Coffee Table', price: 920 } }
      ]
    } },
    { id: 's8', type: 'editorial-grid', props: {
      title: 'Shadow Studies',
      images: [
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600'
      ]
    } },
    { id: 's9', type: 'testimonials', props: {
      title: 'Solace Experiences',
      testimonials: [
        { quote: 'Solace created the mood and gravitas our loft was craving. The textures are deeply luxurious.', author: 'Julian Kane' },
        { quote: 'Impeccable proportions and dark, soothing tones that completely transform night living.', author: 'Marcella De Luca' }
      ]
    } },
    { id: 's10', type: 'newsletter', props: {
      title: 'Solace Editions',
      description: 'Private invitations to limited sculptural series and architectural explorations.',
      buttonText: 'Subscribe'
    } },
    { id: 's11', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Lounge', href: '#lounge' },
    { label: 'Dining', href: '#dining' },
    { label: 'Sleep', href: '#sleep' },
    { label: 'Accents', href: '#accents' }
  ],
  features: [
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'cart', label: 'Cart' }
  ]
}

export const HomeFurniture09 = Solace

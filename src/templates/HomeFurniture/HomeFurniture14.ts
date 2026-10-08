import type { TemplateConfig } from '../../types/template'

export const HomeFurniture14: TemplateConfig = {
  id: 'morrow-home',
  name: 'Morrow Home',
  description: 'Organic contemporary home design centered on material pairings and natural textures.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'organic', name: 'Organic' }, { id: 'natural', name: 'Natural' }, { id: 'tactile', name: 'Tactile' }],
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
    { id: 's1', type: 'promo', props: { text: 'Objects made for slower spaces.' } },
    { id: 's2', type: 'navbar', props: { brand: 'MORROW', style: 'utility' } },
    { id: 's3', type: 'split-hero', props: { 
      title: 'Made from the quiet things.', 
      subtitle: 'A thoughtful collection of natural materials, quiet proportions, and everyday craftsmanship.', 
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800', 
      ctaLabel: 'Explore the Collection' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'Spaces', 
      categories: [
        { name: 'Living', image: 'https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Dining', image: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600' },
        { name: 'Objects', image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'product-spotlight', props: { 
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800', 
      name: 'Morrow Linen Sofa', 
      category: 'Seating', 
      description: 'A solid oak frame softened by washed linen upholstery and quiet proportions.', 
      price: 2400, 
      features: ['Solid Oak Frame', 'Washed Linen', 'Hand-Stitched Detail'], 
      imageRight: true,
      badge: 'Signature Collection' 
    } },
    { id: 's6', type: 'material-grid', props: { 
      title: 'Materials with a memory.', 
      subtitle: 'Pairings of natural textures chosen to age gracefully and ground your spaces.',
      materials: [
        { id: 'm1', name: 'Raw Clay', description: 'Unglazed and natural, showing the hand of the maker.', image: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&q=80&w=600' },
        { id: 'm2', name: 'Solid Oak', description: 'Warm, tactile wood sourced from responsible forests.', image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=600' },
        { id: 'm3', name: 'Washed Linen', description: 'Softened fibers that bring subtle movement to structure.', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&q=80&w=600' },
        { id: 'm4', name: 'Travertine', description: 'Porous, earthy stone with unique inherent patterns.', image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's7', type: 'shop-the-look', props: { 
      title: 'A Natural Pairing', 
      subtitle: 'Where soft linen meets raw wood and ceramic surfaces.', 
      image: 'https://images.unsplash.com/photo-1558401391-7899b4bd5bbf?auto=format&fit=crop&q=80&w=1600', 
      hotspots: [
        { x: 30, y: 60, product: { name: 'Morrow Linen Sofa', price: 2400 } },
        { x: 65, y: 75, product: { name: 'Oak Coffee Table', price: 850 } },
        { x: 80, y: 40, product: { name: 'Ceramic Vessel', price: 120 } }
      ] 
    } },
    { id: 's8', type: 'catalog', props: {
      products: [
        { id: 'c1', name: 'Morrow Lounge Chair', description: 'Oak & Linen', price: 1200, imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600' },
        { id: 'c2', name: 'Oak Dining Table', description: 'Solid Wood', price: 2100, imageUrl: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=600' },
        { id: 'c3', name: 'Stone Side Table', description: 'Travertine', price: 540, imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600' },
        { id: 'c4', name: 'Ceramic Lamp', description: 'Hand-thrown Base', price: 320, imageUrl: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's9', type: 'craftsmanship', props: { 
      title: 'From material to object.', 
      description: 'We believe the beauty of furniture lies in the honesty of its construction. Our pieces are crafted by artisans who understand how to select, shape, and finish natural materials while honoring their inherent imperfections.', 
      mainImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=600',
      secondaryImage: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=600',
      reverseLayout: false,
      metadata: [
        { label: 'Origin', value: 'Global Workshops' },
        { label: 'Materials', value: '100% Natural' }
      ]
    } },
    { id: 's10', type: 'story', props: {} },
    { id: 's11', type: 'editorial-grid', props: { 
      title: 'The Morrow Material Journal', 
      images: [
        'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800', 
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800'
      ] 
    } },
    { id: 's12', type: 'testimonials', props: { 
      title: 'Living with Morrow', 
      testimonials: [
        { quote: 'The linen upholstery feels substantial yet incredibly soft, and the oak frame grounds the entire room.', author: 'J. Harding' },
        { quote: 'You can immediately feel the craftsmanship. It’s furniture designed with an absolute respect for the raw materials.', author: 'M. Chen' }
      ] 
    } },
    { id: 's13', type: 'newsletter', props: { 
      title: 'The Morrow Journal', 
      description: 'Material studies, new forms and notes from the studio.' 
    } },
    { id: 's14', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Living', href: '#living' },
    { label: 'Dining', href: '#dining' },
    { label: 'Materials', href: '#materials' },
    { label: 'Journal', href: '#journal' },
  ],
  features: [
    { id: 'search', label: 'Search' },
    { id: 'cart', label: 'Cart' },
  ]
}

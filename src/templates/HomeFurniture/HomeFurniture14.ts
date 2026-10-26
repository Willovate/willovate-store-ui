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
    { id: 's1', type: 'promo', props: { text: 'Objects made for slower spaces. Thoughtful materials from responsible makers.' } },
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
        { name: 'Lighting', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { name: 'Objects', image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's5', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800',
      name: 'Morrow Linen Sofa',
      category: 'Living',
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
      title: 'Quiet Objects',
      products: [
        { id: 'c1', name: 'Morrow Lounge Chair', description: 'Solid Oak & Natural Washed Flax', price: 1200, category: 'Living', imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600' },
        { id: 'c2', name: 'Oak Dining Table', description: 'Kiln-Dried Solid White Oak Plank', price: 2100, category: 'Dining', imageUrl: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=600' },
        { id: 'c3', name: 'Stone Side Table', description: 'Porous Honed Roman Travertine', price: 540, category: 'Living', imageUrl: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=600' },
        { id: 'c4', name: 'Ceramic Lamp', description: 'Hand-Thrown Clay Base & Burlap Shade', price: 320, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=600' },
        { id: 'c5', name: 'Morrow Linen Sofa', description: 'Solid Oak Base & Deep Feather Linen Cushions', price: 2400, category: 'Living', imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=600' },
        { id: 'c6', name: 'Raw Clay Vessel', description: 'Hand-Coiled Terracotta with Mineral Patina', price: 140, category: 'Objects', imageUrl: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&q=80&w=600' },
        { id: 'c7', name: 'Carved Oak Dining Chair', description: 'Sculpted Backrest & Woven Jute Cushion', price: 460, category: 'Dining', imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600' },
        { id: 'c8', name: 'Travertine Plinth Coffee Table', description: 'Monolithic Honed Stone Low Slab', price: 1350, category: 'Living', imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=600' },
        { id: 'c9', name: 'Quiet Platform Bed', description: 'Low Profile Solid White Oak Frame', price: 2350, category: 'Bedroom', imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=600' },
        { id: 'c10', name: 'Flax Linen Bedspread', description: 'Enzyme-Washed Natural Straw Colorway', price: 260, category: 'Bedroom', imageUrl: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&q=80&w=600' },
        { id: 'c11', name: 'Sculpted Wood Sideboard', description: 'Tambour Slat Sliding Doors & Brass Accents', price: 2200, category: 'Dining', imageUrl: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=600' },
        { id: 'c12', name: 'Paper Cord Bench', description: 'Hand-Laced Danish Cord & Solid Ash Frame', price: 680, category: 'Living', imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=600' },
        { id: 'c13', name: 'Mushroom Linen Floor Lamp', description: 'Woven Grass Cloth Shade & Turned Oak Foot', price: 480, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { id: 'c14', name: 'Organic Wool Area Rug', description: 'Un-Dyed Natural Ivory & Sand Textured Weave', price: 890, category: 'Living', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600' },
        { id: 'c15', name: 'Hand-Carved Wooden Bowl', description: 'Turned Solid Walnut Showing End Grain', price: 110, category: 'Objects', imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=600' },
        { id: 'c16', name: 'Floating Oak Nightstand', description: 'Wall-Mounted Minimalist Single Drawer Unit', price: 390, category: 'Bedroom', imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=600' }
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
    { label: 'Living', href: '#catalog' },
    { label: 'Dining', href: '#catalog' },
    { label: 'Materials', href: '#materials' },
    { label: 'Journal', href: '#journal' },
  ],
  features: [
    { id: 'search', label: 'Search' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'cart', label: 'Cart' },
  ]
}

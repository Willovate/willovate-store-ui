import type { TemplateConfig } from '../../types/template'

export const Nest: TemplateConfig = {
  id: 'nest',
  name: 'Nest',
  description: 'Organic sanctuary, calm neutral textures, and mindful home living.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'organic', name: 'Organic' }, { id: 'sanctuary', name: 'Sanctuary' }, { id: 'neutral', name: 'Neutral' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#2b2927', background: '#f7f6f2', accent: '#9e8a78' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Mindfully crafted goods delivered sustainably to your door.' } },
    { id: 's2', type: 'navbar', props: { brand: 'NEST', style: 'minimal' } },
    { id: 's3', type: 'split-hero', props: {
      title: 'A Sanctuary for Thoughtful Living',
      subtitle: 'Gentle contours, natural fibers, and timeless furniture created to help you unwind.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
      ctaLabel: 'Explore Sanctuary'
    } },
    { id: 's4', type: 'category-grid', props: {
      title: 'Shop by Zone',
      categories: [
        { name: 'Living', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600' },
        { name: 'Dining', image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' },
        { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600' },
        { name: 'Objects', image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's5', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
      name: 'Nest Linen Haven Sofa',
      category: 'Living',
      description: 'Generously proportioned down-filled sectional upholstered in heavy raw Belgian linen with double-stitched french seams.',
      price: 2100,
      features: ['Raw Belgian Linen', 'Down-Alternative Fill', 'Sustainable FSC Ash'],
      imageRight: true,
      badge: 'Core Sanctuary'
    } },
    { id: 's6', type: 'catalog', props: {
      products: [
        { id: 'nst1', name: 'Linen Haven Sofa', description: 'Raw Flax Down-Filled Sofa', price: 2100, category: 'Living', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600' },
        { id: 'nst2', name: 'Oak Side Table', description: 'Honed Circular Ash Pillar', price: 380, category: 'Living', imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
        { id: 'nst3', name: 'Platform Bed', description: 'Low Minimal Wood Platform Bed', price: 1650, category: 'Bedroom', imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600' },
        { id: 'nst4', name: 'Ceramic Table Lamp', description: 'Terracotta Matte Wash Glow', price: 195, category: 'Objects', imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { id: 'nst5', name: 'Organic Oval Dining Table', description: 'Natural Oak Rounded Dining Surface', price: 1550, category: 'Dining', imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' },
        { id: 'nst6', name: 'Woven Cane Dining Chair', description: 'Rattan & Solid Birch Armchair', price: 340, category: 'Dining', imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600' },
        { id: 'nst7', name: 'Curved Boucle Armchair', description: 'Cocooning Reading Nook Seat', price: 920, category: 'Living', imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600' },
        { id: 'nst8', name: 'Low Fluted Media Console', description: 'Tambour Door Low Ash Credenza', price: 1420, category: 'Living', imageUrl: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=600' },
        { id: 'nst9', name: 'Stonewashed Linen Duvet', description: 'Pre-Washed Flax Bedding Ensemble', price: 260, category: 'Bedroom', imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600' },
        { id: 'nst10', name: 'Soft Edge Wood Nightstand', description: 'Curved Bedside Pedestal Table', price: 390, category: 'Bedroom', imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600' },
        { id: 'nst11', name: 'Stoneware Clay Vase', description: 'Speckled Studio Pottery Urn', price: 110, category: 'Objects', imageUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=600' },
        { id: 'nst12', name: 'Wool Boucle Area Rug', description: 'Thick Handwoven Organic Wool', price: 780, category: 'Living', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600' },
        { id: 'nst13', name: 'Sculptural Oak Bench', description: 'Low Organic Entry Stool', price: 590, category: 'Living', imageUrl: 'https://images.unsplash.com/photo-1547587091-f883cf8f0c12?auto=format&fit=crop&q=80&w=600' },
        { id: 'nst14', name: 'Rounded Ash Wardrobe', description: 'Natural Oak Double Closet', price: 2250, category: 'Bedroom', imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=600' },
        { id: 'nst15', name: 'Brass Dome Pendant', description: 'Spun Brass Ceiling Illuminator', price: 320, category: 'Objects', imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=600' },
        { id: 'nst16', name: 'Round Solid Ash Coffee Table', description: 'Triple Pillar Low Table', price: 640, category: 'Living', imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's7', type: 'shop-the-look', props: {
      title: 'Restorative Living',
      subtitle: 'Soft neutrals and layered textures designed for everyday quiet.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 35, y: 65, product: { name: 'Linen Haven Sofa', price: 2100 } },
        { x: 65, y: 75, product: { name: 'Round Solid Ash Coffee Table', price: 640 } }
      ]
    } },
    { id: 's8', type: 'material-grid', props: {
      title: 'Earth & Fiber',
      subtitle: 'Consciously sourced raw materials that age beautifully with your home.',
      materials: [
        { id: 'm1', name: 'Unbleached Flax', description: 'Pure European linen, untreated and soft.', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=600' },
        { id: 'm2', name: 'Sustainably Harvested Ash', description: 'FSC certified pale ash finished with plant waxes.', image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=600' },
        { id: 'm3', name: 'Raw Earthenware', description: 'Local clay fired with mineral oxide glazes.', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's9', type: 'testimonials', props: {
      title: 'Life in Nest',
      testimonials: [
        { quote: 'Stepping into our home now feels like taking a deep, restorative breath. Nest creates genuine peace.', author: 'Elena Rostova' },
        { quote: 'The linen quality and joinery on the bed frame exceeded our highest expectations.', author: 'Dr. Timothy Vance' }
      ]
    } },
    { id: 's10', type: 'newsletter', props: {
      title: 'Nest Letters',
      description: 'Mindful home practices, seasonal living guides, and early preview invitations.',
      buttonText: 'Join Sanctuary'
    } },
    { id: 's11', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Living', href: '#living' },
    { label: 'Dining', href: '#dining' },
    { label: 'Bedroom', href: '#bedroom' },
    { label: 'Objects', href: '#objects' }
  ],
  features: [
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'cart', label: 'Cart' }
  ]
}

export const HomeFurniture07 = Nest

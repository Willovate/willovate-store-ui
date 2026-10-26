import type { TemplateConfig } from '../../types/template'

export const LumaLiving: TemplateConfig = {
  id: 'luma-living',
  name: 'Luma Living',
  description: 'Soft lighting, warm textiles, and calm contemporary living.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'soft', name: 'Soft' }, { id: 'lighting', name: 'Lighting' }, { id: 'calm', name: 'Calm' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#232b2b', background: '#f9f8f6', accent: '#c5a059' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Free ambient light bulb kit included with every lamp order.' } },
    { id: 's2', type: 'navbar', props: { brand: 'LUMA', style: 'center' } },
    { id: 's3', type: 'split-hero', props: {
      title: 'Illuminating Life at Home',
      subtitle: 'Soft illumination, natural warmth, and tactile materials crafted for peace of mind.',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800',
      ctaLabel: 'Shop Luma'
    } },
    { id: 's4', type: 'category-grid', props: {
      title: 'Curated Environments',
      categories: [
        { name: 'Living Room', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600' },
        { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600' },
        { name: 'Dining', image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' },
        { name: 'Lighting', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's5', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800',
      name: 'Luma Ceramic Ambient Lamp',
      category: 'Lighting',
      description: 'Wheel-thrown stoneware base with a textured raw clay wash and a natural pleated linen shade. Emits a comforting, warm diffused glow.',
      price: 180,
      features: ['Hand-thrown Stoneware', 'Pleated Belgian Linen', 'Warm Dimming LED Included'],
      imageRight: false,
      badge: 'Best Seller'
    } },
    { id: 's6', type: 'shop-the-look', props: {
      title: 'Golden Hour Sanctuary',
      subtitle: 'Layered illumination and textured linens that transition gracefully from day to dusk.',
      image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 30, y: 70, product: { name: 'Luma Ceramic Ambient Lamp', price: 180 } },
        { x: 60, y: 65, product: { name: 'Woven Area Rug', price: 650 } }
      ]
    } },
    { id: 's7', type: 'catalog', props: {
      products: [
        { id: 'lum1', name: 'Ceramic Table Lamp', description: 'Stoneware Base with Pleated Shade', price: 180, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { id: 'lum2', name: 'Woven Area Rug', description: 'Hand-Tufted Wool & Flax Meadow', price: 650, category: 'Living Room', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600' },
        { id: 'lum3', name: 'Linen Accent Pillow', description: 'Stonewashed Oatmeal Linen Cushion', price: 65, category: 'Living Room', imageUrl: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=600' },
        { id: 'lum4', name: 'Oak Side Table', description: 'Sculptural Circular Wood Pedestal', price: 320, category: 'Living Room', imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
        { id: 'lum5', name: 'Luma Cloud Sectional', description: 'Deep Feather Filled Modular Couch', price: 2350, category: 'Living Room', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600' },
        { id: 'lum6', name: 'Birch Wood Dining Table', description: 'Pale Nordic Solid Timber Table', price: 1450, category: 'Dining', imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' },
        { id: 'lum7', name: 'Spindle Back Dining Chair', description: 'Turned Birch Dowel Construction', price: 280, category: 'Dining', imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600' },
        { id: 'lum8', name: 'Upholstered Linen Daybed', description: 'Streamlined Lounging Bench', price: 1250, category: 'Living Room', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600' },
        { id: 'lum9', name: 'Linen Covered Queen Bed', description: 'Padded Wing Headboard Platform', price: 1780, category: 'Bedroom', imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600' },
        { id: 'lum10', name: 'Rounded Birch Nightstand', description: 'Cylindrical 2-Tier Bedside Table', price: 380, category: 'Bedroom', imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600' },
        { id: 'lum11', name: 'Washi Paper Pendant Light', description: 'Handmade Mulberry Bark Globe', price: 240, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=600' },
        { id: 'lum12', name: 'Brass & Linen Floor Lamp', description: 'Slender Brass Stem Diffuser', price: 390, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1520970014086-2208d157c9e2?auto=format&fit=crop&q=80&w=600' },
        { id: 'lum13', name: 'White Ash Sideboard', description: 'Soft Slotted Storage Cabinet', price: 1620, category: 'Dining', imageUrl: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=600' },
        { id: 'lum14', name: 'Wool & Silk Blend Rug', description: 'Plush Low Pile Ivory Rug', price: 890, category: 'Living Room', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600' },
        { id: 'lum15', name: 'Woven Rattan Bench', description: 'Bedroom End of Bed Stool', price: 480, category: 'Bedroom', imageUrl: 'https://images.unsplash.com/photo-1547587091-f883cf8f0c12?auto=format&fit=crop&q=80&w=600' },
        { id: 'lum16', name: 'Opal Glass Wall Sconce', description: 'Diffused Spherical Wall Light', price: 195, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's8', type: 'testimonials', props: {
      title: 'Living in Soft Light',
      testimonials: [
        { quote: 'Luma pieces create an instant feeling of calm and warmth in our apartment. The light quality is unmatched.', author: 'Clara M.' },
        { quote: 'The ceramic table lamp has become the focal point of our evening living room ritual.', author: 'Julian S.' }
      ]
    } },
    { id: 's9', type: 'newsletter', props: {
      title: 'Luma Journal',
      description: 'Sign up for seasonal home stories, lighting guides, and new releases.',
      buttonText: 'Subscribe'
    } },
    { id: 's10', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Living', href: '#living' },
    { label: 'Bedroom', href: '#bedroom' },
    { label: 'Dining', href: '#dining' },
    { label: 'Lighting', href: '#lighting' }
  ],
  features: [
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'cart', label: 'Cart' }
  ]
}

export const HomeFurniture05 = LumaLiving

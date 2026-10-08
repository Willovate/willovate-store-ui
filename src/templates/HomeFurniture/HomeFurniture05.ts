import type { TemplateConfig } from '../../types/template'

export const LumaLiving: TemplateConfig = {
  id: 'luma-living',
  name: 'Luma Living',
  description: 'Warm organic interiors with sunlight-driven photography and tactile natural materials.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'organic', name: 'Organic' }, { id: 'lifestyle', name: 'Lifestyle' }, { id: 'warm', name: 'Warm' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#2a2626', background: '#faf9f7', accent: '#c2a386' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Free shipping on all furniture orders.' } },
    { id: 's2', type: 'navbar', props: { brand: 'LUMA LIVING', style: 'center' } },
    { id: 's3', type: 'split-hero', props: { 
      title: 'Spaces that feel like home.', 
      subtitle: 'Warm sunlight, natural oak, and tactile linen. A collection designed for relaxed, everyday living.', 
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800', 
      ctaLabel: 'Shop the Collection' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'Explore by Space', 
      categories: [
        { name: 'Living Room', image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Dining', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600' },
        { name: 'Lighting', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'product-spotlight', props: { 
      image: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&q=80&w=800', 
      name: 'The Linen Sofa', 
      category: 'Seating', 
      description: 'Generously proportioned and deeply comfortable. Upholstered in pure Belgian linen that softens beautifully over time.', 
      price: 2600, 
      features: ['Pure Belgian Linen', 'Down-wrapped Cushions', 'Solid Oak Frame'], 
      imageRight: false, 
      badge: 'Bestseller' 
    } },
    { id: 's6', type: 'shop-the-look', props: { 
      title: 'Sunlit Living Room', 
      subtitle: 'A composed, airy living space grounded by natural textures.', 
      image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=1600', 
      hotspots: [
        { x: 35, y: 65, product: { name: 'Linen Sofa', price: 2600 } },
        { x: 65, y: 75, product: { name: 'Oak Coffee Table', price: 850 } },
        { x: 80, y: 45, product: { name: 'Sculptural Floor Lamp', price: 450 } }
      ] 
    } },
    { id: 's7', type: 'material-grid', props: { 
      title: 'Our Materials', 
      subtitle: 'Honest, tactile, and designed to age gracefully.', 
      materials: [
        { id: 'm1', name: 'Solid Oak', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=600' }, 
        { id: 'm2', name: 'Washed Linen', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=600' }, 
        { id: 'm3', name: 'Natural Wool', image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=600' },
        { id: 'm4', name: 'Honed Stone', image: 'https://images.unsplash.com/photo-1520699697851-3dc68aa3a474?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's8', type: 'catalog', props: {
      products: [
        { id: 'c1', name: 'Ceramic Table Lamp', description: 'Handcrafted Sand', price: 280, imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600' },
        { id: 'c2', name: 'Woven Area Rug', description: 'Natural 8x10', price: 850, imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600' },
        { id: 'c3', name: 'Linen Accent Pillow', description: 'Ochre', price: 65, imageUrl: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=600' },
        { id: 'c4', name: 'Oak Side Table', description: 'Matte Finish', price: 320, imageUrl: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's9', type: 'split-hero', props: { 
      title: 'Thoughtful interiors.', 
      subtitle: 'We believe in the beauty of slow living. Our collections prioritize comfort, natural light, and timeless materials that bring a sense of calm to your daily rituals.', 
      image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800', 
      ctaLabel: 'Read Our Story' 
    } },
    { id: 's10', type: 'testimonials', props: { 
      title: 'From Our Homes', 
      testimonials: [
        { quote: 'Luma Living transformed our house. Everything feels so much warmer and incredibly inviting.', author: 'Sarah J., Interior Designer' },
        { quote: 'The linen sofa is easily the most comfortable piece of furniture we own. Stunning craftsmanship.', author: 'Mark T.' }
      ] 
    } },
    { id: 's11', type: 'newsletter', props: { 
      title: 'Notes for a warmer home.', 
      description: 'Join our community to receive design inspiration and access to new collections.' 
    } },
    { id: 's12', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Living', href: '#living' },
    { label: 'Dining', href: '#dining' },
    { label: 'Bedroom', href: '#bedroom' },
    { label: 'Journal', href: '#journal' },
  ],
  features: [
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'cart', label: 'Cart' },
  ]
}

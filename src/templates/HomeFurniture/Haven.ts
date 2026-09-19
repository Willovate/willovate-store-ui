import type { TemplateConfig } from '../../types/template'

export const Haven: TemplateConfig = {
  id: 'haven',
  name: 'Haven',
  description: 'Premium modern furniture showroom with a clean, approachable aesthetic.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'modern', name: 'Modern' }, { id: 'premium', name: 'Premium' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: true,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#2d3326', background: '#fcfcfc', accent: '#a68c70' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Complimentary white-glove delivery on all orders.' } },
    { id: 's2', type: 'navbar', props: { brand: 'Haven', style: 'minimal' } },
    { id: 's3', type: 'full-hero', props: { title: 'Modern living, curated.', subtitle: 'Discover pieces that make your house feel like home.', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1600', ctaLabel: 'Shop Now' } },
    { id: 's4', type: 'category-grid', props: { title: 'Shop by Room', categories: [{ name: 'Living Room', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=600' }, { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600' }, { name: 'Dining', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's5', type: 'split-hero', props: { title: 'The Fall Collection', subtitle: 'Warm tones and tactile textures for the changing season.', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800', ctaLabel: 'Explore Fall' } },
    { id: 's6', type: 'catalog', props: {
      products: [
        { id: 'hf1', name: 'Modular Sofa', description: 'Oatmeal Linen', price: 2400, imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600' },
        { id: 'hf2', name: 'Lounge Chair', description: 'Boucle', price: 850, imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600' },
        { id: 'hf3', name: 'Coffee Table', description: 'Solid Ash', price: 550, imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
        { id: 'hf4', name: 'Ceramic Vase', description: 'Handcrafted', price: 95, imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's7', type: 'editorial-grid', props: { title: 'Room Inspiration', images: ['https://images.unsplash.com/photo-1598928506311-c55dd71358a9?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's8', type: 'newsletter', props: {} },
    { id: 's9', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Living', href: '#living' },
    { label: 'Dining', href: '#dining' },
    { label: 'Bedroom', href: '#bedroom' },
    { label: 'Décor', href: '#decor' },
  ],
  features: [
    { id: 'account', label: 'My Account' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'cart', label: 'Cart' },
  ]
}

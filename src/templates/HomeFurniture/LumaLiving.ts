import type { TemplateConfig } from '../../types/template'

export const LumaLiving: TemplateConfig = {
  id: 'luma-living',
  name: 'Luma Living',
  description: 'Interior design magazine meets ecommerce.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'editorial', name: 'Editorial' }, { id: 'lifestyle', name: 'Lifestyle' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1598928506311-c55dd71358a9?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1598928506311-c55dd71358a9?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#2a2626', background: '#faf9f7', accent: '#c2a386' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'LUMA LIVING', style: 'center' } },
    { id: 's2', type: 'split-hero', props: { title: 'The Spring Issue', subtitle: 'Refresh your space with light fabrics and natural woods.', image: 'https://images.unsplash.com/photo-1598928506311-c55dd71358a9?auto=format&fit=crop&q=80&w=800', ctaLabel: 'Read the Journal' } },
    { id: 's3', type: 'category-grid', props: { title: '', categories: [{ name: 'Lighting', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600' }, { name: 'Textiles', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600' }, { name: 'Objects', image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's4', type: 'shop-the-look', props: { title: 'Shop the Look', subtitle: 'The serene living room.', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600', hotspots: [
      { x: 30, y: 70, product: { name: 'Boucle Sofa', price: 2100, imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600' } },
      { x: 65, y: 45, product: { name: 'Paper Lantern', price: 180, imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600' } },
      { x: 75, y: 80, product: { name: 'Oak Side Table', price: 350, imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' } }
    ] } },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'l1', name: 'Linen Throw', description: 'Sand', price: 120, imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600' },
        { id: 'l2', name: 'Ceramic Table Lamp', description: 'Handcrafted', price: 280, imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { id: 'l3', name: 'Woven Rug', description: '8x10', price: 850, imageUrl: 'https://images.unsplash.com/photo-1575414003593-0a373d5a5700?auto=format&fit=crop&q=80&w=600' },
        { id: 'l4', name: 'Accent Pillow', description: 'Ochre', price: 65, imageUrl: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'testimonials', props: { title: 'Designer Spaces', testimonials: [{ quote: 'Luma Living brings an unparalleled sense of calm to my clients\' homes.', author: 'Architectural Digest' }] } },
    { id: 's7', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Shop', href: '#shop' },
    { label: 'Journal', href: '#journal' },
    { label: 'Designers', href: '#designers' },
  ],
  features: [
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'cart', label: 'Cart' },
  ]
}

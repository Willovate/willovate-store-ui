import type { TemplateConfig } from '../../types/template'

export const OakAndCo: TemplateConfig = {
  id: 'oak-and-co',
  name: 'Oak & Co.',
  description: 'Handcrafted wooden furniture with an artisan aesthetic.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'wood', name: 'Wood' }, { id: 'artisan', name: 'Artisan' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1628148817290-72ee3ef2f7b8?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1628148817290-72ee3ef2f7b8?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#3b2f2f', background: '#fcfaf5', accent: '#8c593b' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'OAK & CO.', style: 'minimal' } },
    { id: 's2', type: 'full-hero', props: { title: 'Crafted for life.', subtitle: 'Solid wood furniture made by hand in our workshop.', image: 'https://images.unsplash.com/photo-1628148817290-72ee3ef2f7b8?auto=format&fit=crop&q=80&w=1600', ctaLabel: 'Shop Furniture' } },
    { id: 's3', type: 'category-grid', props: { title: '', categories: [{ name: 'Dining Tables', image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' }, { name: 'Chairs', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600' }, { name: 'Storage', image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's4', type: 'material-grid', props: { title: 'Our Woods', subtitle: 'Sustainably sourced, kiln-dried, and finished by hand.', materials: [{ id: 'w1', name: 'White Oak', description: 'Light, durable, with distinctive grain.', image: 'https://images.unsplash.com/photo-1531685250784-7569952593d2?auto=format&fit=crop&q=80&w=600' }, { id: 'w2', name: 'Black Walnut', description: 'Rich, dark chocolate tones.', image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's5', type: 'craftsmanship', props: { title: 'Made By Hand', description: 'Every piece is built to order in our workshop. We use traditional joinery techniques ensuring your furniture will last for generations.', mainImage: 'https://images.unsplash.com/photo-1517420879524-86d64ac2f339?auto=format&fit=crop&q=80&w=800', secondaryImage: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=600', metadata: [{ label: 'Location', value: 'Portland, OR' }, { label: 'Technique', value: 'Mortise & Tenon' }], reverseLayout: false } },
    { id: 's6', type: 'catalog', props: {
      products: [
        { id: 'o1', name: 'Solid Oak Dining Table', description: 'Seats 6-8', price: 2800, imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' },
        { id: 'o2', name: 'Walnut Lounge Chair', description: 'Leather seat', price: 1200, imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600' },
        { id: 'o3', name: 'Handcrafted Side Table', description: 'Ash Wood', price: 450, imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
        { id: 'o4', name: 'Wooden Bookshelf', description: 'Minimal Design', price: 1800, imageUrl: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's7', type: 'story', props: {} },
    { id: 's8', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Tables', href: '#tables' },
    { label: 'Seating', href: '#seating' },
    { label: 'Workshop', href: '#workshop' },
  ],
  features: [
    { id: 'account', label: 'Sign In' },
    { id: 'cart', label: 'Cart' },
  ]
}

import type { TemplateConfig } from '../../types/template'

export const OakAndCo: TemplateConfig = {
  id: 'oak-and-co',
  name: 'Oak & Co.',
  description: 'Traditional, timeless craftsmanship with rich dark woods and understated elegance.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'traditional', name: 'Traditional' }, { id: 'craftsmanship', name: 'Craftsmanship' }, { id: 'heritage', name: 'Heritage' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1585435465945-bef5a93f8849?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1585435465945-bef5a93f8849?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#3b2f2f', background: '#fcfaf5', accent: '#8c593b' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Complimentary white-glove delivery on all furniture orders.' } },
    { id: 's2', type: 'navbar', props: { brand: 'OAK & CO.', style: 'minimal' } },
    { id: 's3', type: 'full-hero', props: { 
      title: 'Furniture made to be kept.', 
      subtitle: 'Substantial, timeless designs crafted from solid woods. Built for the generations to come.', 
      image: 'https://images.unsplash.com/photo-1585435465945-bef5a93f8849?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Discover the Collection' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'Shop by Room', 
      categories: [
        { name: 'Living Room', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Dining Room', image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&q=80&w=600' },
        { name: 'Study', image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'product-spotlight', props: { 
      image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&q=80&w=800', 
      name: 'The Heritage Library Desk', 
      category: 'Workspace', 
      description: 'A commanding presence in any study. Crafted from solid walnut with traditional mortise-and-tenon joinery, designed to age gracefully over decades of daily use.', 
      price: 3200, 
      features: ['Solid American Walnut', 'Hand-finished Leather Top', 'Dovetail Drawers'], 
      imageRight: true, 
      badge: 'Signature Piece' 
    } },
    { id: 's6', type: 'material-grid', props: { 
      title: 'Materials of Substance', 
      subtitle: 'We select only the finest natural materials, chosen for their longevity and character.', 
      materials: [
        { id: 'm1', name: 'Solid Oak', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600' }, 
        { id: 'm2', name: 'Dark Walnut', image: 'https://images.unsplash.com/photo-1592839719941-8e2651039d01?auto=format&fit=crop&q=80&w=600' }, 
        { id: 'm3', name: 'Natural Leather', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=600' },
        { id: 'm4', name: 'Aged Brass', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's7', type: 'craftsmanship', props: { 
      title: 'The Art of Joinery', 
      description: 'Every piece is built to order using time-honored traditional woodworking techniques. We believe that true luxury lies in the unseen details—the perfect fit of a dovetail joint, the smooth glide of a wooden drawer, and the hand-rubbed oil finish that protects the wood while letting it breathe.', 
      mainImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800', 
      secondaryImage: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&q=80&w=600', 
      metadata: [{ label: 'Technique', value: 'Mortise & Tenon' }, { label: 'Origin', value: 'Handcrafted' }], 
      reverseLayout: false 
    } },
    { id: 's8', type: 'catalog', props: {
      products: [
        { id: 'c1', name: 'Solid Oak Dining Table', description: 'Extendable, Seats 10', price: 3400, imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600' },
        { id: 'c2', name: 'Leather Wingback Chair', description: 'Antique Brown', price: 1850, imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600' },
        { id: 'c3', name: 'Walnut Sideboard', description: 'Brass Hardware', price: 2600, imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=600' },
        { id: 'c4', name: 'Classic Bookcase', description: 'Adjustable Shelves', price: 2100, imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's9', type: 'shop-the-look', props: { 
      title: 'The Library', 
      subtitle: 'A quiet, commanding space anchored by rich wood and supple leather.', 
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1600', 
      hotspots: [
        { x: 50, y: 50, product: { name: 'Heritage Desk', price: 3200 } },
        { x: 25, y: 65, product: { name: 'Wingback Chair', price: 1850 } },
        { x: 85, y: 30, product: { name: 'Brass Table Lamp', price: 420 } }
      ] 
    } },
    { id: 's10', type: 'full-hero', props: { 
      title: 'An Heirloom Philosophy', 
      subtitle: 'We don\'t believe in disposable furniture. Oak & Co. pieces are designed to outlive trends, bearing the beautiful marks of a life well-lived before being passed to the next generation.', 
      image: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Read Our Story' 
    } },
    { id: 's11', type: 'testimonials', props: { 
      title: 'From Our Clients', 
      testimonials: [
        { quote: 'The dining table we purchased from Oak & Co. is magnificent. You can genuinely feel the craftsmanship and care that went into it. It is the anchor of our home.', author: 'Jonathan H.' },
        { quote: 'True traditional furniture is hard to find. Their attention to proportion and joinery is unmatched in today\'s market.', author: 'Eleanor S., Interior Designer' }
      ] 
    } },
    { id: 's12', type: 'newsletter', props: { 
      title: 'Notes from the workshop.', 
      description: 'Subscribe to receive updates on our craftsmanship, heritage design, and new pieces.' 
    } },
    { id: 's13', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Living', href: '#living' },
    { label: 'Dining', href: '#dining' },
    { label: 'Study', href: '#study' },
    { label: 'Workshop', href: '#workshop' },
  ],
  features: [
    { id: 'cart', label: 'Cart' },
    { id: 'search', label: 'Search' },
  ]
}

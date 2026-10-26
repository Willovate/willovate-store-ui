import type { TemplateConfig } from '../../types/template'

export const OakAndCo: TemplateConfig = {
  id: 'oak-and-co',
  name: 'Oak & Co.',
  description: 'Heritage solid oak craftsmanship, bench-made furniture, and heirloom joinery.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'heritage', name: 'Heritage' }, { id: 'craftsmanship', name: 'Craftsmanship' }, { id: 'solid-wood', name: 'Solid Wood' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#24211e', background: '#faf8f5', accent: '#8c6747' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Heirloom lifetime structural warranty on all bench-made solid oak pieces.' } },
    { id: 's2', type: 'navbar', props: { brand: 'OAK & CO.', style: 'center' } },
    { id: 's3', type: 'full-hero', props: {
      title: 'Built to Outlive Generations',
      subtitle: 'Solid Appalachian white oak and traditional mortise-and-tenon joinery bench-made by master woodworkers.',
      image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=1600',
      ctaLabel: 'Explore the Workshop'
    } },
    { id: 's4', type: 'category-grid', props: {
      title: 'Handcrafted Collections',
      categories: [
        { name: 'Living Room', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600' },
        { name: 'Dining Room', image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' },
        { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600' },
        { name: 'Study', image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's5', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=800',
      name: 'The Heritage Oak Trestle Table',
      category: 'Dining Room',
      description: 'Solid 2-inch thick white oak planks joined with butterfly keys over a heavy timber trestle base. Finished with organic hardwax oil.',
      price: 2200,
      features: ['2-Inch Solid White Oak', 'Hand-Cut Butterfly Keys', 'Organic Hardwax Oil'],
      imageRight: false,
      badge: 'Heirloom Masterpiece'
    } },
    { id: 's6', type: 'craftsmanship', props: {
      title: 'The Workshop Tradition',
      description: 'We reject veneers and flatpack shortcuts. Every table, chair, and cabinet is individually numbered, signed by the joiner, and built using centuries-old woodworking methods.',
      mainImage: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800',
      metadata: [
        { label: 'Timber', value: 'Appalachian White Oak & American Walnut' },
        { label: 'Joinery', value: 'Hand-cut Mortise & Tenon, Dovetail Drawers' }
      ]
    } },
    { id: 's7', type: 'catalog', props: {
      products: [
        { id: 'oak1', name: 'Solid Oak Dining Table', description: 'Trestle Table in 2-Inch Solid White Oak', price: 2200, category: 'Dining Room', imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' },
        { id: 'oak2', name: 'Leather Wingback Chair', description: 'Hand-Tufted Saddle Leather Lounge', price: 1450, category: 'Living Room', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600' },
        { id: 'oak3', name: 'Walnut Sideboard', description: 'Hand-Planed Dovetail Credenza', price: 1950, category: 'Dining Room', imageUrl: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=600' },
        { id: 'oak4', name: 'Classic Bookcase', description: 'Tongue-and-Groove Library Shelving', price: 1600, category: 'Study', imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=600' },
        { id: 'oak5', name: 'Heritage Chesterfield Sofa', description: 'Deep Tufted Full-Grain Leather', price: 3200, category: 'Living Room', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600' },
        { id: 'oak6', name: 'Solid Oak Writing Desk', description: 'Drawers with Hand-Cut Dovetails', price: 1750, category: 'Study', imageUrl: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=600' },
        { id: 'oak7', name: 'Tufted Leather Desk Chair', description: 'Padded Executive Swivel Armchair', price: 890, category: 'Study', imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600' },
        { id: 'oak8', name: 'Spindle Oak Platform Bed', description: 'Continuous Turned Oak Headboard', price: 2100, category: 'Bedroom', imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600' },
        { id: 'oak9', name: 'Mortise Bedside Nightstand', description: 'Solid Oak 2-Drawer Cabinet', price: 520, category: 'Bedroom', imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600' },
        { id: 'oak10', name: 'Windsor Spindle Dining Chair', description: 'Sculpted Solid Saddle Seat', price: 360, category: 'Dining Room', imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600' },
        { id: 'oak11', name: 'Round Oak Pedestal Table', description: 'Turned Center Column Dining Table', price: 1480, category: 'Dining Room', imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=600' },
        { id: 'oak12', name: 'Solid Oak Coffee Table', description: 'Heavy Plinth Living Room Table', price: 780, category: 'Living Room', imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
        { id: 'oak13', name: 'Slatted Oak Wardrobe', description: 'Full-Height Double Armoire', price: 2650, category: 'Bedroom', imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=600' },
        { id: 'oak14', name: 'Craftsman Accent Bench', description: 'Through-Tenon Timber Bench', price: 640, category: 'Living Room', imageUrl: 'https://images.unsplash.com/photo-1547587091-f883cf8f0c12?auto=format&fit=crop&q=80&w=600' },
        { id: 'oak15', name: 'Library Ladder & Shelving', description: 'Floor-to-Ceiling Wall System', price: 2850, category: 'Study', imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600' },
        { id: 'oak16', name: 'Leather Footstool Ottoman', description: 'Heavy Antique Brass Nailheads', price: 480, category: 'Living Room', imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's8', type: 'shop-the-look', props: {
      title: 'The Great Room',
      subtitle: 'Living spaces defined by the quiet strength of American timber.',
      image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 30, y: 70, product: { name: 'Solid Oak Dining Table', price: 2200 } },
        { x: 70, y: 50, product: { name: 'Leather Wingback Chair', price: 1450 } }
      ]
    } },
    { id: 's9', type: 'testimonials', props: {
      title: 'Heirloom Stories',
      testimonials: [
        { quote: 'The trestle table is the centerpiece of our home. You can feel the weight, the hand-planed texture, and the pride in the joinery.', author: 'Arthur & Margaret P.' },
        { quote: 'We bought our dining set ten years ago; it looks even richer today than the day it was delivered.', author: 'Sarah C.' }
      ]
    } },
    { id: 's10', type: 'newsletter', props: {
      title: 'Workshop Chronicles',
      description: 'Receive timber logs, joinery tutorials, and early access to numbered batch releases.',
      buttonText: 'Subscribe'
    } },
    { id: 's11', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Living', href: '#living' },
    { label: 'Dining', href: '#dining' },
    { label: 'Bedroom', href: '#bedroom' },
    { label: 'Study', href: '#study' }
  ],
  features: [
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'cart', label: 'Cart' }
  ]
}

export const HomeFurniture08 = OakAndCo

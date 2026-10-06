import type { TemplateConfig } from '../../types/template'

export const GeneralStore10: TemplateConfig = {
  id: 'emporium',
  name: 'Emporium',
  description: 'A modern digital department store. Broad selection, clear navigation, and expansive discovery.',
  categories: [{ id: 'general', name: 'General Store' }],
  tags: [{ id: 'department', name: 'Department Store' }, { id: 'modern', name: 'Modern' }, { id: 'broad', name: 'Broad' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: '"DM Sans", sans-serif', body: '"IBM Plex Sans", sans-serif' },
    colors: { primary: '#111111', background: '#f5f1e8', accent: '#c62828' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Free shipping over $50 · Easy returns · New arrivals every week' } },
    { id: 's2', type: 'navbar', props: { brand: 'EMPORIUM', style: 'full' } },
    { id: 's3', type: 'split-hero', props: {
      title: 'More to discover.',
      subtitle: 'Everyday essentials, useful upgrades, and unexpected finds — all under one roof.',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600',
      ctaLabel: 'Shop everything',
      imageRight: true
    } },
    { id: 's4', type: 'bento-grid', props: {
      title: 'Department Directory',
      items: [
        { title: 'Home', description: 'Living & Decor', span: 1 },
        { title: 'Everyday', description: 'Daily Essentials', span: 1 },
        { title: 'Travel', description: 'On the move', span: 1 },
        { title: 'Work', description: 'Desk & Office', span: 1 },
        { title: 'Kitchen', description: 'Tools & Dining', span: 1 },
        { title: 'Accessories', description: 'Personal items', span: 1 },
        { title: 'Tech', description: 'Small electronics', span: 1 },
        { title: 'Gifts', description: 'For everyone', span: 1 }
      ]
    }},
    { id: 's5', type: 'catalog', props: {
      title: 'Featured Deals',
      subtitle: 'Good finds. Better prices.',
      products: [
        { id: 'emp1', name: 'Stack Storage Set', description: 'Home', price: 45, badge: 'Sale', imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp2', name: 'Charge Hub', description: 'Tech', price: 35, badge: 'Sale', imageUrl: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp3', name: 'Fold Travel Pouch', description: 'Travel', price: 28, badge: 'Sale', imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp4', name: 'Countertop Organizer', description: 'Kitchen', price: 32, badge: 'Sale', imageUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'catalog', props: {
      title: 'What\'s moving fast',
      subtitle: 'Best Sellers',
      products: [
        { id: 'emp5', name: 'Daily Mug', description: 'Kitchen', price: 18, imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp6', name: 'Grid Notebook', description: 'Work', price: 22, imageUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp7', name: 'Transit Tote', description: 'Travel', price: 65, imageUrl: 'https://images.unsplash.com/photo-1597816041042-45e3ed609f98?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp8', name: 'Pocket Speaker', description: 'Tech', price: 85, imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp9', name: 'Everyday Cap', description: 'Accessories', price: 25, imageUrl: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp10', name: 'Counter Tray', description: 'Home', price: 38, imageUrl: 'https://images.unsplash.com/photo-1611077544719-741ce2b9894e?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's7', type: 'catalog', props: {
      title: 'Department: Home',
      subtitle: 'Everything for your living spaces.',
      products: [
        { id: 'emp11', name: 'Everyday Organizer', description: 'Home', price: 42, imageUrl: 'https://images.unsplash.com/photo-1595514535316-24eb22442ad4?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp12', name: 'Prep Storage Set', description: 'Kitchen', price: 55, imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp13', name: 'Glass Carafe', description: 'Tabletop', price: 34, imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp14', name: 'Ceramic Catchall', description: 'Decor', price: 28, imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's8', type: 'catalog', props: {
      title: 'Department: Work & Everyday',
      subtitle: 'Tools for focus and routine.',
      products: [
        { id: 'emp15', name: 'Desk Tray', description: 'Work', price: 32, imageUrl: 'https://images.unsplash.com/photo-1528301721190-186c3bd85418?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp16', name: 'Arc Desk Lamp', description: 'Lighting', price: 115, imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp17', name: 'Cable Wrap Set', description: 'Tech Accessories', price: 15, imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp18', name: 'Aluminum Laptop Stand', description: 'Work', price: 65, imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's9', type: 'catalog', props: {
      title: 'Department: Travel',
      subtitle: 'Built for motion.',
      products: [
        { id: 'emp19', name: 'Go Bottle', description: 'Hydration', price: 35, imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp20', name: 'Compact Umbrella', description: 'Travel', price: 42, imageUrl: 'https://images.unsplash.com/photo-1559404289-4b68ff05f57a?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp21', name: 'Utility Pouch', description: 'Accessories', price: 24, imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp22', name: 'Key Organizer', description: 'Everyday Carry', price: 28, imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's10', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800',
      name: 'The Commuter Backpack',
      category: 'The one you\'ll keep reaching for.',
      description: 'Built for the daily transit. Water-resistant exterior, dedicated tech sleeve, and comfort straps for all-day carry.',
      price: 110,
      features: ['15" Laptop Sleeve', 'Water-resistant', 'Quick-access pockets'],
      badge: 'Highly Rated',
      imageRight: false
    }},
    { id: 's11', type: 'bento-grid', props: {
      title: 'Shop by Need',
      items: [
        { title: 'Organize', description: 'Clear the clutter.', span: 1 },
        { title: 'Carry', description: 'Bags and totes.', span: 1 },
        { title: 'Work', description: 'Focus tools.', span: 1 },
        { title: 'Relax', description: 'Unwind.', span: 1 },
        { title: 'Travel', description: 'On the go.', span: 1 },
        { title: 'Gift', description: 'Thoughtful finds.', span: 1 }
      ]
    }},
    { id: 's12', type: 'catalog', props: {
      title: 'New Arrivals',
      products: [
        { id: 'emp23', name: 'Reading Light', description: 'Home', price: 55, imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp24', name: 'Ceramic Pour Over', description: 'Kitchen', price: 38, imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp25', name: 'Bamboo Organizer', description: 'Home', price: 28, imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp26', name: 'Linen Throw Blanket', description: 'Lifestyle', price: 95, imageUrl: 'https://images.unsplash.com/photo-1528317424683-11bb58763dc0?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp27', name: 'Steel Cutlery Set', description: 'Kitchen', price: 45, imageUrl: 'https://images.unsplash.com/photo-1584820927498-cafe6c1c1f9b?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp28', name: 'Aromatherapy Candle', description: 'Home', price: 32, imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's13', type: 'catalog', props: {
      title: 'Weekend-ready',
      subtitle: 'Small upgrades for the season.',
      products: [
        { id: 'emp29', name: 'Canvas Travel Pouch', description: 'Travel', price: 26, imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp30', name: 'Travel Pill Organizer', description: 'Accessories', price: 14, imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp31', name: 'Weekend Gift Set', description: 'Gifts', price: 65, imageUrl: 'https://images.unsplash.com/photo-1517006886278-f71f6d0f01ba?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's14', type: 'catalog', props: {
      title: 'Value Bundles',
      products: [
        { id: 'emp32', name: 'Everyday Starter', description: 'Mug, Notebook, Tote', price: 85, badge: 'Bundle', imageUrl: 'https://images.unsplash.com/photo-1596526131083-e8c638c478d5?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp33', name: 'Desk Reset', description: 'Tray, Lamp, Organizer', price: 165, badge: 'Bundle', imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp34', name: 'Travel Ready', description: 'Pouch, Bottle, Umbrella', price: 95, badge: 'Bundle', imageUrl: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's15', type: 'testimonials', props: {
      title: 'Customer Notes',
      testimonials: [
        { quote: 'I love being able to find everything I need in one place without sacrificing quality. The curation is fantastic.', author: 'Sarah W.' },
        { quote: 'Emporium has become my go-to for gifts, home upgrades, and everyday essentials. Fast shipping, too.', author: 'Michael T.' },
        { quote: 'The Travel Ready bundle had exactly what I needed for my weekend trip. Highly recommended.', author: 'Jessica K.' }
      ]
    }},
    { id: 's16', type: 'bento-grid', props: {
      title: 'Why Emporium',
      items: [
        { title: 'Broad selection', description: 'Thousands of items.', span: 1 },
        { title: 'Clear pricing', description: 'No hidden fees.', span: 1 },
        { title: 'Easy returns', description: 'Simple process.', span: 1 },
        { title: 'Fast delivery', description: 'Quick shipping.', span: 1 },
        { title: 'Secure checkout', description: 'Safe & encrypted.', span: 2 }
      ]
    }},
    { id: 's17', type: 'newsletter', props: {
      title: 'Keep discovering.',
      subtitle: 'New arrivals, useful finds, seasonal edits, and offers — delivered occasionally.',
      buttonText: 'Join the list'
    }},
    { id: 's18', type: 'footer', props: {
      brand: 'EMPORIUM',
      text: 'Everyday essentials, useful upgrades, and unexpected finds — all under one roof.',
      social: [
        { label: 'Instagram', href: '#' },
        { label: 'Twitter', href: '#' },
        { label: 'Facebook', href: '#' }
      ]
    }}
  ]
}
